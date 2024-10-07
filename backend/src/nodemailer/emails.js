import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  secure: true,
  host: "smtp.gmail.com",
  port: 465,
  auth: {
    user: "bvtty2.0@gmail.com",
    pass: "",
  },
});

export const sendVerificationEmail = () => {};
