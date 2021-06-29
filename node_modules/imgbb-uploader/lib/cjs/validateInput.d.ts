/**
 * Formally validate input params
 *
 * @param {string} apiKey - Should be 32-character long string
 * @param {string} path - Should be a valid file path
 * @returns {Promise.<Boolean>}
 *    A promise that resolve to `true` if things are looking good, and to `false` otherwise
 */
export declare const validateInput: (apiKey: string, path: string) => Promise<boolean>;
