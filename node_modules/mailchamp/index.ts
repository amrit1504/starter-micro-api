// tslint:disable-next-line
const debug = require('debug')('mailchamp');

import { resolveMx } from 'dns';
import { toASCII } from 'punycode';

export interface MxRecord {
  priority: number;
  exchange: string;
}

/**
 * Query DNS and get MX records for given email address.
 *
 * @param email - Email address to retrieve the MX records for
 */
export const getMxRecords = (email: string): Promise<MxRecord[]> => {
  debug(`getMxRecords(${email})`);

  const hostname = toASCII(email.split('@')[1]);
  debug(`hostname = ${hostname}`);

  return new Promise(
    (resolve, reject) =>
      resolveMx(hostname, (error, addresses) => {
        if (error) {
          reject(error);
        }

        resolve(addresses);
      })
  );
};

export const isValidEmail = async (email: string): Promise<boolean> => {
  try {
    const mxRecords = await getMxRecords(email);
    return mxRecords.length > 0;
  } catch (err) {
    return false;
  }
};
