import nodemailer from 'nodemailer';
import * as process from 'process';

interface IOptions {
  email: string;
  subject: string;
  message: string;
}

const sendEmail = async (options: IOptions) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: 'Ruslan XXl',
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  return await transporter.sendMail(mailOptions);
};

export default sendEmail;
