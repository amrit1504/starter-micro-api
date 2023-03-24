export interface MxRecord {
    priority: number;
    exchange: string;
}
/**
 * Query DNS and get MX records for given email address.
 *
 * @param email - Email address to retrieve the MX records for
 */
export declare const getMxRecords: (email: string) => Promise<MxRecord[]>;
export declare const isValidEmail: (email: string) => Promise<boolean>;
