"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMails = exports.getImapConnection = void 0;
var tslib_1 = require("tslib");
var Imap = require('imap');
var simpleParser = require('mailparser').simpleParser;
var node_boot_core_1 = require("node-boot-core");
var getImapConnection = function (connect) {
    var globalProperties = global;
    var properties = (0, node_boot_core_1.readProperties)();
    if (globalProperties && globalProperties.imapStatus && properties) {
        var imapEnable = (0, node_boot_core_1.getPropertiesData)(properties, 'imap.enable', false);
        if (imapEnable) {
            if (!connect) {
                var imapHost = (0, node_boot_core_1.getPropertiesData)(properties, 'imap.host', "");
                var imapPort = (0, node_boot_core_1.getPropertiesData)(properties, 'imap.port', "");
                var imapUser = (0, node_boot_core_1.getPropertiesData)(properties, 'imap.user', "");
                var imapPass = (0, node_boot_core_1.getPropertiesData)(properties, 'imap.pass', "");
                var imapTls = (0, node_boot_core_1.getPropertiesData)(properties, 'imap.tls', "true");
                var imapKeep = (0, node_boot_core_1.getPropertiesData)(properties, 'imap.keep', "true");
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
                    };
                    return getConnection(connect);
                }
                else {
                    throw new Error("Please set imap configuration in application level");
                }
            }
            else {
                return getConnection(connect);
            }
        }
    }
    else {
        throw new Error("Please enable imap in application level");
    }
};
exports.getImapConnection = getImapConnection;
var getConnection = function (connect) {
    return new Imap({
        user: connect === null || connect === void 0 ? void 0 : connect.user,
        password: connect === null || connect === void 0 ? void 0 : connect.password,
        host: connect === null || connect === void 0 ? void 0 : connect.host,
        port: connect === null || connect === void 0 ? void 0 : connect.port,
        tls: connect === null || connect === void 0 ? void 0 : connect.tls,
        authTimeout: connect === null || connect === void 0 ? void 0 : connect.authTimeout,
        connTimeout: connect === null || connect === void 0 ? void 0 : connect.connTimeout,
        keepalive: connect === null || connect === void 0 ? void 0 : connect.keepAlive,
        tlsOptions: {
            rejectUnauthorized: false
        }
    });
};
var openInbox = function (imap, cb) {
    imap.openBox('INBOX', false, cb);
};
var getMails = function (imap, cb, readFrom) {
    var mailsData = [];
    try {
        imap.once('ready', function () {
            openInbox(imap, function (err, box) {
                imap.search(['UNSEEN', ['SINCE', readFrom ? readFrom : new Date()]], function (err, results) {
                    if (err) {
                        console.log('Done fetching all messages!');
                        imap.end();
                    }
                    else if (!results || !results.length) {
                        console.log("The server didn't find any emails matching the specified criteria");
                        console.log('Done fetching all messages!');
                        imap.end();
                    }
                    else {
                        var f = imap.fetch(results, { bodies: '' });
                        f.on('message', function (msg) {
                            msg.on('body', function (stream) {
                                var _this = this;
                                simpleParser(stream, function (err, parsed) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                    return tslib_1.__generator(this, function (_a) {
                                        mailsData.push(parsed);
                                        return [2];
                                    });
                                }); });
                            });
                            msg.once('attributes', function (attrs) {
                                var uid = attrs.uid;
                                imap.addFlags(uid, ['\\Seen'], function (err) {
                                });
                            });
                        });
                        f.once('error', function (err) {
                            return Promise.reject(err);
                        });
                        f.once('end', function () {
                            console.log('Done fetching all messages!');
                            imap.end();
                        });
                    }
                });
            });
        });
        imap.once('error', function (err) {
            cb(err, []);
        });
        imap.once('end', function () {
            cb(null, mailsData);
        });
        imap.connect();
    }
    catch (e) {
        console.log("error=", e);
    }
};
exports.getMails = getMails;
//# sourceMappingURL=imap-util.js.map