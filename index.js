const express = require('express');
const connectionToDb = require('./config/connection');
const userRoute = require('./controllers/user.controller');
const resRoute = require('./controllers/restaurent.controller');
const app = express();
app.use(express.json());
app.use("/user", userRoute)
app.use("/restaurents", resRoute)


app.listen(4001,async ()=>{
    try {
        await connectionToDb
        console.log("connection to db")
        console.log("server started")
    } catch (error) {
        console.log(error.message)
    }
})