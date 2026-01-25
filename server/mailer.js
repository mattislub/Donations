import fs from 'fs/promises';
import nodemailer from 'nodemailer';

const REQUIRED_ENV = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_FROM'];

const getSmtpConfig = () => {
  const missing = REQUIRED_ENV.filter((key) => !process.env[key]);
  if (missing.length > 0) {
    throw new Error(`Missing SMTP configuration: ${missing.join(', ')}`);
  }

  const port = Number(process.env.SMTP_PORT);
  return {
    host: process.env.SMTP_HOST,
    port,
    secure:
      process.env.SMTP_SECURE === 'true' ||
      process.env.SMTP_SECURE === '1' ||
      port === 465,
    auth:
      process.env.SMTP_USER && process.env.SMTP_PASS
        ? {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          }
        : undefined,
  };
};

const getLogoAttachment = async () => {
  const logoUrl = new URL('../src/assets/logo (2).png', import.meta.url);
  const content = await fs.readFile(logoUrl);
  return {
    filename: 'logo.png',
    content,
    cid: 'brand-logo',
  };
};

export const createMailer = async () => {
  const transporter = nodemailer.createTransport(getSmtpConfig());
  const logoAttachment = await getLogoAttachment();

  return {
    sendMail: async ({ to, subject, html, text, replyTo }) =>
      transporter.sendMail({
        from: process.env.SMTP_FROM,
        to,
        replyTo,
        subject,
        html,
        text,
        attachments: [logoAttachment],
      }),
  };
};
