import { createTransport } from "nodemailer";
import sendGridtrasnporter from "nodemailer-sendgrid-transport";
import userOTPVerification  from "../models/userOTPVerification.js"

export const emailSender = async (email, name) => {
  const options = {
      auth: {
        api_user: process.env.EMAILVERIFICATION_KEY
      }
  };
  const trasnporter = createTransport(sendGridtrasnporter(options));

  const sendFrom = "chirag.ccdps28@gmail.com";
  const inputuserEmail = email;
  const otp = `${Math.floor(1000 + Math.random() * 9000)}`
  const newOTPVerification = await new userOTPVerification({
    name: name,
    otp: otp,
    createdAt: Date.now(),
    expiresAt: Date.now() + 300000      //5 min
  })
  newOTPVerification.save()
  const mailOptions = {
    from: sendFrom,
    to: inputuserEmail,
    subject: "verify your email",
      html: `<p>Enter <b>${otp}</b> to verify your account.</p><p>This code expires in 1 hour.</p>`
  };

  trasnporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log("message Sent: ", data);
    }
  });
};

export default emailSender;
