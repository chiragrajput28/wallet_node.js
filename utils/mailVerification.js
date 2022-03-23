import { createTransport } from "nodemailer";
import nodemailer from 'nodemailer';
import sendGridtrasnporter from "nodemailer-sendgrid-transport";
import userOTPVerification  from "../models/userOTPVerification.js";
import bcrypt from "bcryptjs";

export const emailSender = async (email, name) => {
  // const transporter = nodemailer.createTransport({
  //   service: "SendGrid",
  //     auth: {
  //       // user: process.env.SENDGRID_USERNAME,
  //       // pass: process.env.SENDGRID_PASSWORD,
  //       api_user: process.env.EMAILVERIFICATION_KEY
  //     },
  // })
  // try {
  //   const otp = `${Math.floor(1000 + Math.random() * 9000)}`
  //   console.log(otp);
  //   const mailOptions = {
  //     from: process.env.SENDGRID_USERNAME,
  //     to: email,
  //     subject: "verify your email",
  //     html: `<p>Enter <b>${otp}</b> to verify your account.</p><p>This code expires in 1 hour.</p>`
  //   }
    
  //   //const hashedOTP = await bcrypt.hash(otp, 12)
  //   //console.log(hashedOTP);
  //   const newOTPVerification = await new userOTPVerification({
  //     name: name,
  //     otp: otp,
  //     createdAt: Date.now(),
  //     expiresAt: Date.now() + 3600000
  //   })
  //   console.log(otp);
  //   newOTPVerification.save()
  //   transporter.sendMail(mailOptions)
  //   res.json({
  //     status: "pending",
  //     message: "verification opt mail sent",
  //     data: {
  //       name: name,
  //       email: email
  //     }
  //   })

  // } catch (error) {
  //   res.json({
  //     status: "failed",
  //     message: error.message 
  //   })
  // }
  const options = {
      auth: {
        api_user: process.env.EMAILVERIFICATION_KEY
      }
  };
  //console.log(auth.api_key);
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
