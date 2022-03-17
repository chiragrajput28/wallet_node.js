
import Transaction from "../models/transaction.js";
import User from "../models/user.js";

// Money transfer functionality
export const transferMoney = async (amount, sender, recipient) => {
    const user = await User.findOne({ name: sender });
    if (!user) {
        console.error("Invalid user.")
    }
    const transaction = new Transaction({
        sender: sender,
        recipient: recipient,
        amount: amount
    })

    const savedTransaction = await transaction.save()
    const Amount = savedTransaction.amount
    let senderUser = savedTransaction.sender
    let recipientUser = savedTransaction.recipient

    senderUser = await User.findOne({ name: senderUser })

    recipientUser = await User.findOne({ name: recipientUser })
    

    const senderBalance = senderUser.balance
    const recipientBalance = recipientUser.balance

    if (senderBalance <= 0 ){
        return 'User bank balance is empty' 
    }

    let updatedSenderBalance = senderBalance - Amount
    let updatedRecipientBalance = recipientBalance + Amount

    updatedSenderBalance = await senderUser.updateOne({
        balance: updatedSenderBalance,
    })

    updatedRecipientBalance = await recipientUser.updateOne({
        balance: updatedRecipientBalance,
    })
    await senderUser.save()
    await recipientUser.save()

    user.transactionID.push(savedTransaction)
    await user.save()
    return {
      savedTransaction,
      _id: savedTransaction._id,
      email: savedTransaction.email,
      createdAt: savedTransaction.createdAt,
      updatedAt: savedTransaction.updatedAt
    }
}

export const getTransactionByUser = async (sender) => {
  try {
    const oneuser = await user.findOne({ name: sender });
    const transId = oneuser.transactionID;
    return {
      message: `fetched. Transaction Ids of user ${oneuser.name} `,
      transaction: transId,
    };
  } catch (err) {
    console.log("user cant be found");
  }
};
