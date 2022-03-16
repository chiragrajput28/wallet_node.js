/* eslint-disable import/extensions */
import { createTransport } from "nodemailer";
import sendGridtrasnporter from "nodemailer-sendgrid-transport";

 export const emailSender = async (email , name) => {
  const auth = {
    auth: {
      api_key: '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',
    },
  };

  const trasnporter = createTransport(sendGridtrasnporter(auth));

  const sendFrom = 'chirag.ccdps28@gmail.com';
  const inputuserEmail = 'chirag.18bit1184@abes.ac.in'

  const mailOptions = {
    from: sendFrom,
    to: inputuserEmail,
    subject: "User Verification",
    html: `<h1>Hi ${name}</h1>
            <p>Thanks for signing up your account you are now verified now .kindly,please exchange your money using our seervices.</p>
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
