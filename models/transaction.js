import mongoose from "mongoose";

const transSchema = new mongoose.Schema(
  {
    sender: {
      type: String,
      required: true,
    },
    recipient: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    initiator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
  },
  { timestramp: true }
);

export default mongoose.model("Transaction", transSchema);
