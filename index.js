const express = require("express");
const app = express();
const DB = require("./database").connectDB;
//import routes
const userRouter = require("./routers/userRouter");
const postRouter = require("./routers/postRouter");
const followRouter = require("./routers/followSystemRouter");

DB();

app.use(express.json());

app.use("/api/registration", userRouter);

//1. http://localhost:3000
//2. /api/registration
//3.register
app.use("/api/posts", postRouter);
app.use("/api/user", followRouter);





app.listen(process.env.PORT, () => {
    console.log('Listening on port:', +process.env.PORT);
});
