import { createTransport } from "nodemailer";
import sendGridtrasnporter from "nodemailer-sendgrid-transport";

export const emailFail = async (name, money) => {
  const auth = {
    auth: {
      api_key: process.env.EMAILVERIFICATION_KEY
    },
  };

  const trasnporter = createTransport(sendGridtrasnporter(auth));

  const sendFrom = "chirag.ccdps28@gmail.com";
  const inputuserEmail = "chirag.18bit1184@abes.ac.in";

  const mailOptions = {
    from: sendFrom,
    to: inputuserEmail,
    subject: "Failed to transfer your money",
    html: `<h1>Hi ${name} your money has not been transfered due to some issue kindly be patient.</h1>
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

export const emailSucsessTransfer = async (name, money) => {
  const auth = {
    auth: {
      api_key: process.env.EMAILVERIFICATION_KEY
    },
  };

  const trasnporter = createTransport(sendGridtrasnporter(auth));

  const sendFrom = "chirag.ccdps28@gmail.com";
  const inputuserEmail = "chirag.18bit1184@abes.ac.in";

  const mailOptions = {
    from: sendFrom,
    to: inputuserEmail,
    subject: "Sucsessfully transfered",
    html: `<h1>Hi ${name} your money has been succesfully transfered.</h1>
            <p>The amount that has been debited from your account is ${money}</p>
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
