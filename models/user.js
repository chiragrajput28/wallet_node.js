import mongoose from 'mongoose'

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
    },
    transactionID: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Transaction'
    }]
})

export default mongoose.model('User', userSchema);
