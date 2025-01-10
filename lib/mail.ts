import { getPropertiesData, readProperties } from "node-boot-core";
import { getSmtpTransport, getSmtpTransportWithConfig } from "./smtp";
import { MailBody, mailSupport } from "./util";

const sent = async (body: MailBody, config?:any) => {
    const globalProperties: any = global;
    const properties = readProperties();
    if (globalProperties && globalProperties.mailStatus && properties) {
        const mailType = getPropertiesData(properties, 'mail.type', 'smtp');
        if (mailSupport.indexOf(mailType) == -1) {
            throw new Error("Current mail have support only : " + mailSupport.join(", "));
        } else {
            try {
                if (mailType == 'smtp') {
                    let transport = null
                    if(config) {
                        transport = getSmtpTransportWithConfig(config);
                    }else{
                        transport = getSmtpTransport(properties);
                    }
                    if (transport) {
                        if (!body.from) {
                            body.from = `No Reply <${properties['mail.auth.user']}>`;
                        }
                        return await transport.sendMail({
                            ...body,
                            html: body.body
                        });
                    }
                }
            } catch (e) {
                throw e;
            }
        }
    } else {
        throw new Error("Please enable mail in application level");
    }
}
export const sendMail = async (body: MailBody, config?:any) => {
    return await sent(body, config);
}
export abstract class BootMail {
    public async sendMail(body: MailBody, config?:any) {
        return await sent(body, config);
    } 
}
