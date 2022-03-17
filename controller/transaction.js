// import validator from "validator";
import {
    transferMoney,
    getTransactionByUser,
} from "../transferFunctionality/transaction.js";
import { 
    emailFail, 
    emailSucsessTransfer 
} from "../utils/transaction.js"; 

export async function createTransaction(req, res, next) {

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
        res.json({ Message: " No transaction registered cant fetch any" });
    }
    next();
}
