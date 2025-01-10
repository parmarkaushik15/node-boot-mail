import { getPropertiesData } from "node-boot-core";
import * as nodemailer from "nodemailer";

export const getSmtpTransport = (properties: any) => {
    const mailType = getPropertiesData(properties, 'mail.type', 'smtp');
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
}

export const getSmtpTransportWithConfig = (config: any) => {
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
}