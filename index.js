const express = require('express');
const cors  = require('cors') ;
const { connection } = require('./config/db');
const { UserRouter } = require("./routes/user.routes")
const { auth } = require("./middleware/authentication")
const { AppointRouter }=require("./routes/appointment.routes")
require("dotenv").config();
const app = express();
app.use(express.json());
app.use(cors());

app.get('/' , (req,res) => {
    res.send("Welcome to Masai Hospital");
})
app.use(UserRouter);
app.use(auth)
app.use(AppointRouter);

const PORT =  8080;
app.listen(PORT, async () => {
    try {
        await connection;
        console.log('Connection established');
        
    } catch (error) {
      console.log('error');
        
    }
    console.log(`Server is listening on ${PORT}`);
    
})