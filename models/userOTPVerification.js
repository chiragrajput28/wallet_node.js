import mongoose from "mongoose";

const userOTPVerificationSchema = new mongoose.Schema({
  name: String,
  otp: String,
  createdAt: Date,
  expiresAt: Date
});

export default mongoose.model("userOTPVerification", userOTPVerificationSchema); 
