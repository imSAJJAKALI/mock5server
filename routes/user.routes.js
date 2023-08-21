const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require("dotenv").config()
const UserRouter = express.Router();
const  {UserModel} = require('../model/User.model') ;

UserRouter.post("/signup", async (req, res) => {
    try {
        const { name,email, password, confirmPassword } = req.body;
        if (password !== confirmPassword) { 
            return res.status(400).json({ message: "Invalid password" });
        }
        const userExists = await UserModel.findOne({ email });
        if (userExists) { 
            return res.status(200).json({ message: "User Already Exist" });
        }
        let confirmHashedPassword = await bcrypt.hash(confirmPassword, 10);
        bcrypt.hash(password, 8, async (err, hash) => {
            if (err) {
                res.send({msg:"Something went wrong"})
            } else {
                const user = new UserModel({ email, password:hash, confirmPassword:confirmHashedPassword })
                await user.save();
                res.send({msg:"New User registered successfully"})
            }
        })
    } catch (error) {
        console.error("Error while creating")
        res.status(500).json({ msg: "Something went wrong" });
    }
})

UserRouter.post("/login", async (req, res) => { 
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        console.log(user);
        if (!user) {
            return res.status(401).json({message: "No User found with this email address"})
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) { 
            return res.status(401).json({message: "Invalid User Name or Password"});
        }
        const token = jwt.sign({ userId: user._id },"sajju")
        res.status(200).json({msg:"Login successful", token: token});
        
    } catch (error) {
        console.error("Error while creating")
        res.status(500).json({ msg: "Something went wrong" });
    }
})

module.exports = {
    UserRouter
}