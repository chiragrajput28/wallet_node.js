import bcrypt from "bcryptjs";
import User from "../models/user.js";

export const createUser = async (email, password, name, phone) => {
  const existingUser = await User.findOne({ email: email });
  if (existingUser) {
    console.log("User exists already!");
  }
  const hashedPw = await bcrypt.hash(password, 12);
  const user = new User({
    email: email,
    password: hashedPw,
    name:name
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
  return {id :user._id.toString() , email : Email}
}