"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WAConnection = void 0;
const Curve = __importStar(require("curve25519-js"));
const Utils = __importStar(require("./Utils"));
const _0_Base_1 = require("./0.Base");
const Constants_1 = require("./Constants");
class WAConnection extends _0_Base_1.WAConnection {
    /** Authenticate the connection */
    async authenticate(reconnect) {
        var _a, _b, _c, _d, _e, _f;
        // if no auth info is present, that is, a new session has to be established
        // generate a client ID
        if (!((_a = this.authInfo) === null || _a === void 0 ? void 0 : _a.clientID)) {
            this.authInfo = { clientID: Utils.generateClientID() };
        }
        const canLogin = this.canLogin();
        this.referenceDate = new Date(); // refresh reference date
        let isNewUser = false;
        this.startDebouncedTimeout();
        const initQuery = (async () => {
            var _a;
            const { ref, ttl } = await this.query({
                json: ['admin', 'init', this.version, this.browserDescription, (_a = this.authInfo) === null || _a === void 0 ? void 0 : _a.clientID, true],
                expect200: true,
                waitForOpen: false,
                longTag: true,
                requiresPhoneConnection: false,
                startDebouncedTimeout: true
            });
            if (!canLogin) {
                this.stopDebouncedTimeout(); // stop the debounced timeout for QR gen
                this.generateKeysForAuth(ref, ttl);
            }
        })();
        let loginTag;
        if (canLogin) {
            // if we have the info to restore a closed session
            const json = [
                'admin',
                'login',
                (_b = this.authInfo) === null || _b === void 0 ? void 0 : _b.clientToken,
                (_c = this.authInfo) === null || _c === void 0 ? void 0 : _c.serverToken,
                (_d = this.authInfo) === null || _d === void 0 ? void 0 : _d.clientID,
            ];
            loginTag = this.generateMessageTag(true);
            if (reconnect)
                json.push(...['reconnect', reconnect.replace('@s.whatsapp.net', '@c.us')]);
            else
                json.push('takeover');
            // send login every 10s
            const sendLoginReq = () => {
                var _a;
                if (!this.conn || ((_a = this.conn) === null || _a === void 0 ? void 0 : _a.readyState) !== this.conn.OPEN) {
                    this.logger.warn('Received login timeout req when WS not open, ignoring...');
                    return;
                }
                if (this.state === 'open') {
                    this.logger.warn('Received login timeout req when state=open, ignoring...');
                    return;
                }
                this.logger.debug('sending login request');
                this.sendJSON(json, loginTag);
                this.initTimeout = setTimeout(sendLoginReq, 10000);
            };
            sendLoginReq();
        }
        await initQuery;
        // wait for response with tag "s1"
        let response = await Promise.race([
            this.waitForMessage('s1', false, undefined),
            loginTag && this.waitForMessage(loginTag, false, undefined)
        ]
            .filter(Boolean));
        this.startDebouncedTimeout();
        this.initTimeout && clearTimeout(this.initTimeout);
        this.initTimeout = null;
        if (response.status && response.status !== 200) {
            throw new Constants_1.BaileysError(`Unexpected error in login`, { response, status: response.status });
        }
        // if its a challenge request (we get it when logging in)
        if ((_e = response[1]) === null || _e === void 0 ? void 0 : _e.challenge) {
            await this.respondToChallenge(response[1].challenge);
            response = await this.waitForMessage('s2', true);
        }
        const newUser = this.validateNewConnection(response[1]); // validate the connection
        if (newUser.jid !== ((_f = this.user) === null || _f === void 0 ? void 0 : _f.jid)) {
            isNewUser = true;
            // clear out old data
            this.chats.clear();
            this.contacts = {};
        }
        this.user = newUser;
        this.logger.info('validated connection successfully');
        this.emit('connection-validated', this.user);
        if (this.loadProfilePicturesForChatsAutomatically) {
            const response = await this.query({
                json: ['query', 'ProfilePicThumb', this.user.jid],
                waitForOpen: false,
                expect200: false,
                requiresPhoneConnection: false,
                startDebouncedTimeout: true
            });
            this.user.imgUrl = (response === null || response === void 0 ? void 0 : response.eurl) || '';
        }
        this.sendPostConnectQueries();
        this.logger.debug('sent init queries');
        return { isNewUser };
    }
    /**
     * Send the same queries WA Web sends after connect
     */
    sendPostConnectQueries() {
        this.sendBinary(['query', { type: 'contacts', epoch: '1' }, null], [Constants_1.WAMetric.queryContact, Constants_1.WAFlag.ignore]);
        this.sendBinary(['query', { type: 'chat', epoch: '1' }, null], [Constants_1.WAMetric.queryChat, Constants_1.WAFlag.ignore]);
        this.sendBinary(['query', { type: 'status', epoch: '1' }, null], [Constants_1.WAMetric.queryStatus, Constants_1.WAFlag.ignore]);
        this.sendBinary(['query', { type: 'quick_reply', epoch: '1' }, null], [Constants_1.WAMetric.queryQuickReply, Constants_1.WAFlag.ignore]);
        this.sendBinary(['query', { type: 'label', epoch: '1' }, null], [Constants_1.WAMetric.queryLabel, Constants_1.WAFlag.ignore]);
        this.sendBinary(['query', { type: 'emoji', epoch: '1' }, null], [Constants_1.WAMetric.queryEmoji, Constants_1.WAFlag.ignore]);
        this.sendBinary(['action', { type: 'set', epoch: '1' }, [['presence', { type: Constants_1.Presence.available }, null]]], [Constants_1.WAMetric.presence, Constants_1.WAFlag.available]);
    }
    /**
     * Refresh QR Code
     * @returns the new ref
     */
    async requestNewQRCodeRef() {
        const response = await this.query({
            json: ['admin', 'Conn', 'reref'],
            expect200: true,
            waitForOpen: false,
            longTag: true,
            requiresPhoneConnection: false
        });
        return response;
    }
    /**
     * Once the QR code is scanned and we can validate our connection, or we resolved the challenge when logging back in
     * @private
     * @param {object} json
     */
    validateNewConnection(json) {
        // set metadata: one's WhatsApp ID [cc][number]@s.whatsapp.net, name on WhatsApp, info about the phone
        const onValidationSuccess = () => ({
            jid: Utils.whatsappID(json.wid),
            name: json.pushname,
            phone: json.phone,
            imgUrl: null
        });
        if (!json.secret) {
            let credsChanged = false;
            // if we didn't get a secret, we don't need it, we're validated
            if (json.clientToken && json.clientToken !== this.authInfo.clientToken) {
                this.authInfo = { ...this.authInfo, clientToken: json.clientToken };
                credsChanged = true;
            }
            if (json.serverToken && json.serverToken !== this.authInfo.serverToken) {
                this.authInfo = { ...this.authInfo, serverToken: json.serverToken };
                credsChanged = true;
            }
            if (credsChanged) {
                this.emit('credentials-updated', this.authInfo);
            }
            return onValidationSuccess();
        }
        const secret = Buffer.from(json.secret, 'base64');
        if (secret.length !== 144) {
            throw new Error('incorrect secret length received: ' + secret.length);
        }
        // generate shared key from our private key & the secret shared by the server
        const sharedKey = Curve.sharedKey(this.curveKeys.private, secret.slice(0, 32));
        // expand the key to 80 bytes using HKDF
        const expandedKey = Utils.hkdf(sharedKey, 80);
        // perform HMAC validation.
        const hmacValidationKey = expandedKey.slice(32, 64);
        const hmacValidationMessage = Buffer.concat([secret.slice(0, 32), secret.slice(64, secret.length)]);
        const hmac = Utils.hmacSign(hmacValidationMessage, hmacValidationKey);
        if (!hmac.equals(secret.slice(32, 64))) {
            // if the checksums didn't match
            throw new Constants_1.BaileysError('HMAC validation failed', json);
        }
        // computed HMAC should equal secret[32:64]
        // expandedKey[64:] + secret[64:] are the keys, encrypted using AES, that are used to encrypt/decrypt the messages recieved from WhatsApp
        // they are encrypted using key: expandedKey[0:32]
        const encryptedAESKeys = Buffer.concat([
            expandedKey.slice(64, expandedKey.length),
            secret.slice(64, secret.length),
        ]);
        const decryptedKeys = Utils.aesDecrypt(encryptedAESKeys, expandedKey.slice(0, 32));
        // set the credentials
        this.authInfo = {
            encKey: decryptedKeys.slice(0, 32),
            macKey: decryptedKeys.slice(32, 64),
            clientToken: json.clientToken,
            serverToken: json.serverToken,
            clientID: this.authInfo.clientID,
        };
        this.emit('credentials-updated', this.authInfo);
        return onValidationSuccess();
    }
    /**
     * When logging back in (restoring a previously closed session), WhatsApp may challenge one to check if one still has the encryption keys
     * WhatsApp does that by asking for us to sign a string it sends with our macKey
     */
    respondToChallenge(challenge) {
        const bytes = Buffer.from(challenge, 'base64'); // decode the base64 encoded challenge string
        const signed = Utils.hmacSign(bytes, this.authInfo.macKey).toString('base64'); // sign the challenge string with our macKey
        const json = ['admin', 'challenge', signed, this.authInfo.serverToken, this.authInfo.clientID]; // prepare to send this signed string with the serverToken & clientID
        this.logger.info('resolving login challenge');
        return this.query({ json, expect200: true, waitForOpen: false, startDebouncedTimeout: true });
    }
    /** When starting a new session, generate a QR code by generating a private/public key pair & the keys the server sends */
    generateKeysForAuth(ref, ttl) {
        this.curveKeys = Curve.generateKeyPair(Utils.randomBytes(32));
        const publicKey = Buffer.from(this.curveKeys.public).toString('base64');
        const qrLoop = ttl => {
            const qr = [ref, publicKey, this.authInfo.clientID].join(',');
            this.emit('qr', qr);
            this.initTimeout = setTimeout(async () => {
                if (this.state === 'open')
                    return;
                this.logger.debug('regenerating QR');
                try {
                    const { ref: newRef, ttl } = await this.requestNewQRCodeRef();
                    ref = newRef;
                    qrLoop(ttl);
                }
                catch (error) {
                    this.logger.warn({ error }, `error in QR gen`);
                    if (error.status === 429) { // too many QR requests
                        this.emit('ws-close', { reason: error.message });
                    }
                }
            }, ttl || 20000); // default is 20s, on the off-chance ttl is not present
        };
        qrLoop(ttl);
    }
}
exports.WAConnection = WAConnection;
