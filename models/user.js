const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  balance : {
    type: Number,
    default: 10000
  }
//   transactionID: [
//     {
//       type: Schema.Types.ObjectId,
//       ref: 'Transaction'
//     }
//   ]
})

module.exports = mongoose.model('user', userSchema)
