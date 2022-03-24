import bcrypt from "bcryptjs";
import User from "../models/user.js";
import jwt from "jsonwebtoken";
import { emailSender } from "../utils/mailVerification.js";
import userOTPVerification from "../models/userOTPVerification.js";

export const signup = async (req, res, next) => {
  const serviceUser = await createUser(
    req.body.email,
    req.body.password,
    req.body.name
  );
  emailSender(req.body.email, req.body.name);
  try {
    res.status(201).json({
      id: serviceUser._id,
      email: serviceUser.email,
      user: serviceUser.user,
    });
  }
  catch (error) {
    res.json({
      status: "user already exist",
    })
  }
};

export const verifyOTP = async (req, res) => {
  try{
    const {name, otp} = req.body
    const userOTPVerificationRecord = await userOTPVerification.find()
    console.log(userOTPVerificationRecord);
    const expiresAt = userOTPVerificationRecord[0].expiresAt
    const DB_OTP = userOTPVerificationRecord[0].otp
    if (expiresAt < Date.now()) {
      await userOTPVerification.deleteMany({name})
      throw new error('OTP has expired') 
    }
    else {
      if(DB_OTP === otp) {
        res.json({
          status: "verified",
          message: "user email verified successfully"
        })
      }
      else {
        res.json({
          status: "not verified",
          message: "incorrect otp"
        })
      }
    }
  }
  catch(error) {
    res.json({
      status: "failed",
      message: error.message
    })
  }
}

export const login = async (req, res, next) => {
  const DBloginCheck = await loginCheckDB(req.body.email, req.body.password);
  emailSender(req.body.email, req.body.name);
  if (DBloginCheck) {
    const token = jwt.sign(
      {
        userId: DBloginCheck.id,
        email: DBloginCheck.email,
      },
      "authtoken",
      { expiresIn: "1h" }
    );
    res.status(200).json({ token: token, userId: DBloginCheck.id });
  }
  next();
};

export const createUser = async (email, password, name) => {
  const existingUser = await User.findOne({ email: email });
  if (existingUser) {
    console.log("User exists already!");   
    return
  }
  else {
  const hashedPw = await bcrypt.hash(password, 12);
  const user = new User({
    email: email,
    password: hashedPw,
    name: name,
  });
  const createdUser = await user.save();
  console.log(createdUser);
  return {
    id: createdUser._id.toString(),
    email: createdUser.email,
    user: createdUser,
  };
  }
};

export const loginCheckDB = async (email, password) => {
  const Email = email;
  const Password = password;
  const user = await User.findOne({ email: Email });
  if (!user) {
    console.error("user doesnt exist , you need to signup");
  }
  const isEqual = await bcrypt.compare(Password, user.password);
  if (!isEqual) {
    console.error("Password is incorrect.");
  }
  return { id: user._id.toString(), email: Email };
};
