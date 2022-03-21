import bcrypt from "bcryptjs";
import User from "../models/user.js";
import jwt from "jsonwebtoken";
import { emailSender } from "../utils/mailVerification.js";

export const signup = async function (req, res, next) {
  const serviceUser = await createUser(
    req.body.email,
    req.body.password,
    req.body.name
  );
  try {
    if (serviceUser) {
      emailSender(res.body.email, res.body.name);
    }
  } catch (err) {
    console.log("problem in email server");
  }
  res.status(201).json({
    id: serviceUser._id,
    email: serviceUser.email,
    user: serviceUser.user,
  });
  next();
};

export const login = async function (req, res, next) {
  const DBloginCheck = await loginCheckDB(req.body.email, req.body.password);
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

export const createUser = async (email, password, name, phone) => {
  const existingUser = await User.findOne({ email: email });
  if (existingUser) {
    console.log("User exists already!");
  }
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
