import express from "express";
import bodyParser from "body-parser"
import cookieSession from "cookie-session";
import authRouter from "./routes/admin/auth.js";
import userRouter from "./routes/admin/products.js";

const app = express();

app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieSession({keys: ['key1']}))
app.use(authRouter);
app.use(userRouter);

app.listen(3000, () => {
  console.log("listening");
});
