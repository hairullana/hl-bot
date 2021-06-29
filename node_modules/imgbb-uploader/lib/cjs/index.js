"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var fileToString_1 = require("./fileToString");
var postToImgbb_1 = require("./postToImgbb");
var validateInput_1 = require("./validateInput");
var imgbbUploader = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return __awaiter(void 0, void 0, void 0, function () {
        var _a, _b, e_1, _c, imagePath, apiKey, _d, name_1, _e, expiration, _f, base64string, _g, _h, _j, e_2;
        return __generator(this, function (_k) {
            switch (_k.label) {
                case 0:
                    if (!(args.length === 2)) return [3 /*break*/, 8];
                    return [4 /*yield*/, validateInput_1.validateInput(String(args[0]), String(args[1]))];
                case 1:
                    if (!_k.sent()) return [3 /*break*/, 6];
                    _k.label = 2;
                case 2:
                    _k.trys.push([2, 4, , 5]);
                    _a = postToImgbb_1.postToImgbb;
                    _b = {
                        apiKey: String(args[0])
                    };
                    return [4 /*yield*/, fileToString_1.fileToString(String(args[1]))];
                case 3: return [2 /*return*/, _a.apply(void 0, [(_b.base64str = _k.sent(),
                            _b.name = null,
                            _b.expiration = null,
                            _b)])];
                case 4:
                    e_1 = _k.sent();
                    throw new Error(e_1);
                case 5: return [3 /*break*/, 7];
                case 6: throw new Error("Invalid params: please make sure that first argument is an imgBB API key, and second argument is a valid path to image file.");
                case 7: return [3 /*break*/, 16];
                case 8:
                    if (!(args.length === 1 && typeof args[0] === "object")) return [3 /*break*/, 15];
                    _c = __assign({}, args[0]), imagePath = _c.imagePath, apiKey = _c.apiKey, _d = _c.name, name_1 = _d === void 0 ? null : _d, _e = _c.expiration, expiration = _e === void 0 ? null : _e, _f = _c.base64string, base64string = _f === void 0 ? null : _f;
                    _k.label = 9;
                case 9:
                    _k.trys.push([9, 13, , 14]);
                    _g = postToImgbb_1.postToImgbb;
                    _h = {
                        apiKey: String(apiKey)
                    };
                    if (!base64string // if base64string is provided, skip fs call
                    ) return [3 /*break*/, 10]; // if base64string is provided, skip fs call
                    _j = base64string;
                    return [3 /*break*/, 12];
                case 10: return [4 /*yield*/, fileToString_1.fileToString(String(imagePath))];
                case 11:
                    _j = _k.sent();
                    _k.label = 12;
                case 12: return [2 /*return*/, _g.apply(void 0, [(_h.base64str = _j,
                            _h.name = name_1 ? String(name_1) : null,
                            _h.expiration = expiration ? Number(expiration) : null,
                            _h)])];
                case 13:
                    e_2 = _k.sent();
                    throw new Error(e_2);
                case 14: return [3 /*break*/, 16];
                case 15: throw new Error("It seems you didn't pass your arguments properly! Please check imgbbUploader documentation here:\nhttps://github.com/TheRealBarenziah/imgbb-uploader/tree/master");
                case 16: return [2 /*return*/];
            }
        });
    });
};
module.exports = imgbbUploader;
