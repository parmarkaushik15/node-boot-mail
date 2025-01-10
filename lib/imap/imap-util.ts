const Imap = require('imap')
const { simpleParser } = require('mailparser');

import { getPropertiesData, readProperties } from "node-boot-core";

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

export const getImapConnection = (connect?: ImapConnect) => {
    const globalProperties: any = global;
    const properties: any = readProperties();
    if (globalProperties && globalProperties.imapStatus && properties) {
        const imapEnable = getPropertiesData(properties, 'imap.enable', false);
        if (imapEnable) {
            if (!connect) {
                const imapHost = getPropertiesData(properties, 'imap.host', "");
                const imapPort = getPropertiesData(properties, 'imap.port', "");
                const imapUser = getPropertiesData(properties, 'imap.user', "");
                const imapPass = getPropertiesData(properties, 'imap.pass', "");
                const imapTls = getPropertiesData(properties, 'imap.tls', "true");
                const imapKeep = getPropertiesData(properties, 'imap.keep', "true");
                if (imapHost && imapPort && imapPass && imapUser) {
                    connect = {
                        user: imapUser,
                        password: imapPass,
                        host: imapHost,
                        port: imapPort,
                        tls: imapTls && imapTls == 'true' ? true : false,
                        keepAlive: imapKeep && imapKeep == 'true' ? true : false,
                        authTimeout: 10000,
                        connTimeout: 30000
                    }
                    return getConnection(connect);
                } else {
                    throw new Error("Please set imap configuration in application level");
                }
            } else {
                return getConnection(connect);
            }
        }
    } else {
        throw new Error("Please enable imap in application level");
    }
}

const getConnection = (connect?: ImapConnect) => {
    return new Imap({
        user: connect?.user,
        password: connect?.password,
        host: connect?.host,
        port: connect?.port,
        tls: connect?.tls,
        authTimeout: connect?.authTimeout,
        connTimeout: connect?.connTimeout,
        keepalive: connect?.keepAlive,
        tlsOptions: {
            rejectUnauthorized: false
        }
    });
}

const openInbox = (imap: typeof Imap, cb:any) => {
    imap.openBox('INBOX', false, cb);
}

export const getMails = (imap: typeof Imap, cb: any, readFrom?: Date,) => {
    const mailsData: any[] = [];
    try {
        imap.once('ready', function () {
            openInbox(imap,function (err: any, box: any) {
                imap.search(['UNSEEN', ['SINCE', readFrom ? readFrom : new Date()]], (err: any, results: any) => {
                    if (err) {
                        console.log('Done fetching all messages!');
                        imap.end();
                    } else if (!results || !results.length) {
                        console.log("The server didn't find any emails matching the specified criteria");
                        console.log('Done fetching all messages!');
                        imap.end();
                    } else {
                        var f = imap.fetch(results, { bodies: '' });
                        f.on('message', function (msg: any) {
                            msg.on('body', function (stream: any) {
                                simpleParser(stream, async (err: any, parsed: any) => {
                                    mailsData.push(parsed);
                                });
                            });
                            msg.once('attributes', function (attrs: any) {
                                const { uid } = attrs;
                                imap.addFlags(uid, ['\\Seen'], (err: any) => {
                                });
                            });
                        });
                        f.once('error', function (err: any) {
                            return Promise.reject(err);
                        });
                        f.once('end', function () {
                            console.log('Done fetching all messages!');
                            imap.end();
                        });
                    }
                });
            })
        });

        imap.once('error', function (err:any) {
            cb(err, []);
        });

        imap.once('end', function () {
            cb(null, mailsData);
        });
        imap.connect();
    } catch (e) {
        console.log("error=", e);
    }
}