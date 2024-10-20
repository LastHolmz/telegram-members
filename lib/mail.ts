import { env } from "process";
import nodemailer from "nodemailer";
export const sendMail = async ({
  body,
  name,
  subject,
  to,
}: {
  to: string;
  name: string;
  subject: string;
  body: string;
}) => {
  const { SMTP_PASSWORD, SMTP_EMAIL } = env;
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", // Corrected host
    port: 587, // Use port 587 for TLS
    secure: false, // true for port 465, false for other ports
    auth: {
      user: SMTP_EMAIL,
      pass: SMTP_PASSWORD,
    },
  });
  await transporter.sendMail({
    from: SMTP_EMAIL,
    to, // list of receivers
    subject, // Subject line
    text: name, // plain text body
    html: body, // html body
  });
};
