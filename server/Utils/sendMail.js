"use strict";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  secure: true,
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASSWORD,
  },
});

export const sendMail = async (options) => {
  try {
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: process.env.NODEMAILER_EMAIL, // sender address
      to: options.email,
      subject: options.subject, // Subject line
      text: options.text, // plain text body
      html: options.html, // html body
    });

    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.log(error);
  }
};
