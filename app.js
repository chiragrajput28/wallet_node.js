import dotenv from "dotenv";
//const path = require('path');
import bodyParser from "body-parser";
import express from 'express';
const url = 'mongodb+srv://chiragRajput:D1ukRk32EkxaU7iF@cluster0.xcmim.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
import mongoose from 'mongoose';
const app = express();
import transactionRoute from './routes/transaction.js';
import userRoute from './routes/user.js';

dotenv.config({ path: "./config.env" });
// app.use(express.static(path.join(__dirname, 'public')));

// app.get('/api', (req,res) => {
//     res.json({
//         success: 1,
//         message: "this is rest api working"
//     })
// })
//app.set('views', 'views');

//console.log("connected");
app.listen(3000 , () => {
    console.log('server is listening on port ', 3000)
}); 
app.use(bodyParser.json());
// mongoose.connect(url)
// const con = mongoose.connection
// con.on('open', () => {
//     console.log("connected..");
// })

mongoose
  .connect(url)
  .then(() => {
    console.log(`DB CONNECTION SUCCESSFUL`);
  })
  .catch((err) => console.error(err));

app.use("/trans", transactionRoute);
app.use("/user", userRoute);