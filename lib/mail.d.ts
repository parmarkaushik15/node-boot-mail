import { MailBody } from "./util";
export declare const sendMail: (body: MailBody, config?: any) => Promise<import("nodemailer/lib/smtp-transport").SentMessageInfo | undefined>;
export declare abstract class BootMail {
    sendMail(body: MailBody, config?: any): Promise<import("nodemailer/lib/smtp-transport").SentMessageInfo | undefined>;
}
