import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });
import bodyParser from "body-parser";
import express from "express";
const dbKey = process.env.DB_KEY.toString();
//console.log(url);
import mongoose from "mongoose";
const app = express();
import transactionRoute from "./routes/transaction.js";
import userRoute from "./routes/user.js";
app.listen(process.env.APP_PORT, () => {
  console.log("server is listening on port ", process.env.APP_PORT);
});
app.use(bodyParser.json());

mongoose
  .connect(dbKey)
  .then(() => {
    console.log(`DB CONNECTION SUCCESSFUL`);
  })
  .catch((err) => console.error(err));

app.use("/trans", transactionRoute);
app.use("/user", userRoute);
