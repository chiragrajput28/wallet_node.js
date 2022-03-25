import authenticateToken from "../controller/session.js";
import Transaction from "../models/transaction.js";
import User from "../models/user.js";
import { emailFail, emailSucsessTransfer } from "../utils/mailHelper.js";
// Money transfer functionality
export async function createTransaction(req, res, next) {
  //authenticateToken(req, res)
  const createdTransaction = await transferMoney(
    req.body.amount,
    req.body.sender,
    req.body.recipient
  );
  try {
    if (createdTransaction) {
      await emailSucsessTransfer(req.body.sender, req.body.amount);
    } else {
      await emailFail(req.body.sender, req.body.amount);
    }
  } catch (err) {
    console.log("problem in email server");
  }
  res.json({
    createdTransaction,
    _id: createdTransaction._id,
    createdAt: createdTransaction.createdAt,
    updatedAt: createdTransaction.updatedAt,
  });
  next();
}

export async function getTransaction(req, res, next) {
  const getUserViewTransaction = await getTransactionByUser(req.body.sender);

  if (getUserViewTransaction) {
    res.json({ userTransaction: getUserViewTransaction });
  } else {
    res.json({ Message: "No transaction found" });
  }
  next();
}

export const transferMoney = async (amount, sender, recipient) => {
  const user = await User.findOne({ name: sender });
  if (!user) {
    console.error("Invalid user.");
  }
  const transaction = new Transaction({
    sender: sender,
    recipient: recipient,
    amount: amount,
  });
  // authenticateToken(req, res)
  const savedTransaction = await transaction.save();
  const Amount = savedTransaction.amount;
  let senderUser = savedTransaction.sender;
  let recipientUser = savedTransaction.recipient;

  senderUser = await User.findOne({ name: senderUser });

  recipientUser = await User.findOne({ name: recipientUser });

  if (senderUser === null) {
    return "please enter a valid sender name"
  }

  if (recipientUser === null) {
    return "please enter a valid recipient name"
  }
  const senderBalance = senderUser.balance;
  const recipientBalance = recipientUser.balance;

  if (senderBalance <= 0) {
    return "User bank balance is empty";
  }

  let updatedSenderBalance = senderBalance - Amount;
  let updatedRecipientBalance = recipientBalance + Amount;

  updatedSenderBalance = await senderUser.updateOne({
    balance: updatedSenderBalance,
  });

  updatedRecipientBalance = await recipientUser.updateOne({
    balance: updatedRecipientBalance,
  });
  await senderUser.save();
  await recipientUser.save();

  user.transactionID.push(savedTransaction);
  await user.save();
  return {
    savedTransaction,
    _id: savedTransaction._id,
    email: savedTransaction.email,
    createdAt: savedTransaction.createdAt,
    updatedAt: savedTransaction.updatedAt,
  };
};

export const getTransactionByUser = async (sender) => {
  try {
    const oneuser = await User.findOne({ name: sender });
    const transId = oneuser.transactionID;
    return {
      message: 'fetched',
      name: oneuser.name,
      balance: oneuser.balance,
      transaction: transId,
    };
  } catch (err) {
    console.log("user cant be found");
  }
};
