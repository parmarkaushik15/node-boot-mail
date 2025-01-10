"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSmtpTransportWithConfig = exports.getSmtpTransport = void 0;
var node_boot_core_1 = require("node-boot-core");
var nodemailer = require("nodemailer");
var getSmtpTransport = function (properties) {
    var mailType = (0, node_boot_core_1.getPropertiesData)(properties, 'mail.type', 'smtp');
    if (mailType == 'smtp') {
        return nodemailer.createTransport({
            host: properties['mail.host'],
            port: properties['mail.port'],
            secure: properties['mail.secure'] == "true" ? true : false,
            tls: { rejectUnauthorized: false },
            auth: {
                user: properties['mail.auth.user'],
                pass: properties['mail.auth.pass'],
            },
            logger: properties['mail.logger'] == "true" ? true : false
        });
    }
};
exports.getSmtpTransport = getSmtpTransport;
var getSmtpTransportWithConfig = function (config) {
    return nodemailer.createTransport({
        host: config['host'],
        port: config['port'],
        secure: config['secure'] == "true" ? true : false,
        tls: { rejectUnauthorized: false },
        auth: {
            user: config['user'],
            pass: config['pass'],
        },
        logger: config['logger'] == "true" ? true : false
    });
};
exports.getSmtpTransportWithConfig = getSmtpTransportWithConfig;
//# sourceMappingURL=smtp.js.map