import nodemailer from "nodemailer";
import { siteConfig } from "@/lib/constants/site";

export async function sendNotificationEmail(options: {
  to: string;
  subject: string;
  text: string;
  html?: string;
}) {
  if (!process.env.SMTP_HOST) {
    console.info("Email skipped. Configure SMTP_HOST to enable notifications.", options);
    return;
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: Number(process.env.SMTP_PORT || 587) === 465,
    auth: process.env.SMTP_USER
      ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
      : undefined
  });

  await transporter.sendMail({
    from: process.env.MAIL_FROM || `${siteConfig.name} <sales@agnexa.com>`,
    ...options
  });
}
