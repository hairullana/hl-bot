import ResponseObject from "./responseInterface";
/**
 * Now using the standard 'https' module instead of 'request' deprecated dependency.
 *
 * To tweak the method, edit 'postToImgbb.ts' with the help of [the docs](https://nodejs.org/api/https.html#https_https_request_options_callback)
 * @param {string} apiKey - Your imgBB API key
 * @param {string} base64string - Typically, the output of fileToString("path") function
 * @returns A promise. Use `.then` as shown in [the README](https://github.com/TheRealBarenziah/imgbb-uploader#use) :
 */
interface IPostParams {
    apiKey: string;
    base64str: string;
    name: string | null;
    expiration: number | null;
}
export declare const postToImgbb: (params: IPostParams) => Promise<ResponseObject>;
export {};
