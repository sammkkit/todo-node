require("dotenv").config();
const express = require("express");
const {connectToMongo} = require("./connection");
const taskRouter = require("./routes/taskRoutes");
const userRouter = require("./routes/user");
const app = express();
const PORT = process.env.PORT || 3000;
const {authenticateUser} = require("./middleware/user")
//connection to DB
connectToMongo(process.env.MONGO_URL).then(()=>{
    console.log("connected to mongoDB");
})
app.use(express.json());
app.use("/api",authenticateUser,taskRouter);
app.use("/user",userRouter)
app.listen(PORT,()=>{
    console.log(`server started at port ${PORT}`);
})