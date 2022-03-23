import { createTransport } from "nodemailer";
import sendGridtrasnporter from "nodemailer-sendgrid-transport";

export const emailSender = async (email, name) => {
  const auth = {
      api_key: process.env.EMAILVERIFICATION_KEY
  };

  const trasnporter = createTransport(sendGridtrasnporter(auth));

  const sendFrom = "chirag.ccdps28@gmail.com";
  const inputuserEmail = "chirag.18bit1184@abes.ac.in";

  const mailOptions = {
    from: sendFrom,
    to: inputuserEmail,
    subject: "User Verification",
    html: `<h1>Hi ${name}</h1>
            <p>Your account is now verified.</p>
            `,
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
