declare const Imap: any;
export interface ImapConnect {
    user: string;
    password: string;
    host: string;
    port: string;
    tls: boolean;
    authTimeout?: number;
    connTimeout?: number;
    keepAlive: boolean;
}
export declare const getImapConnection: (connect?: ImapConnect) => any;
export declare const getMails: (imap: typeof Imap, cb: any, readFrom?: Date) => void;
export {};
