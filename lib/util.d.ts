import { Attachment } from "nodemailer/lib/mailer";
export declare const mailSupport: string[];
export interface MailBody {
    to: any;
    subject: any;
    body: any;
    from?: any;
    headers?: {};
    cc?: any;
    bcc?: any;
    priority?: any;
    messageId?: any;
    date?: any;
    attachments?: Attachment[];
}
