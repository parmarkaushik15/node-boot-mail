import { Attachment } from "nodemailer/lib/mailer";

export const mailSupport = ['smtp'];

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