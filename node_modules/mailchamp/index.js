"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable-next-line
const debug = require('debug')('mailchamp');
const dns_1 = require("dns");
const punycode_1 = require("punycode");
/**
 * Query DNS and get MX records for given email address.
 *
 * @param email - Email address to retrieve the MX records for
 */
exports.getMxRecords = (email) => {
    debug(`getMxRecords(${email})`);
    const hostname = punycode_1.toASCII(email.split('@')[1]);
    debug(`hostname = ${hostname}`);
    return new Promise((resolve, reject) => dns_1.resolveMx(hostname, (error, addresses) => {
        if (error) {
            reject(error);
        }
        resolve(addresses);
    }));
};
exports.isValidEmail = (email) => __awaiter(this, void 0, void 0, function* () {
    try {
        const mxRecords = yield exports.getMxRecords(email);
        return mxRecords.length > 0;
    }
    catch (err) {
        return false;
    }
});
//# sourceMappingURL=index.js.map