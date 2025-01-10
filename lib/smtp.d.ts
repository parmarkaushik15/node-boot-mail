import * as nodemailer from "nodemailer";
export declare const getSmtpTransport: (properties: any) => nodemailer.Transporter<import("nodemailer/lib/smtp-transport").SentMessageInfo> | undefined;
export declare const getSmtpTransportWithConfig: (config: any) => nodemailer.Transporter<import("nodemailer/lib/smtp-transport").SentMessageInfo>;
