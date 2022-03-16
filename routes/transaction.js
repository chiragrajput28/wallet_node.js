import { Router } from 'express';


import { createTransaction, getTransaction } from '../controller/transaction.js';

const transRoutes = Router();


transRoutes.post('/transaction', createTransaction);

transRoutes.post('/transactionUserView', getTransaction);


export default transRoutes;