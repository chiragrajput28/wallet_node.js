import mongoose from 'mongoose'

const transSchema = new mongoose.Schema(
  {
    sender: {
      type: String,
      required: true
    },
    recipient: {
      type: String,
      required: true
    },
    amount: {
      type: Number,
      required : true
    }
    // initiator: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'User',
    //   required: true
    // }
  },
  { timestramp: true }
);

export default mongoose.model('transaction', transSchema);