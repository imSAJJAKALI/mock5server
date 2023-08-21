const jwt = require('jsonwebtoken');
require("dotenv").config();
const { UserModel } = require("../model/User.model")
const auth = async (req, res, next)=>{
    try {
        const token = req.headers.authorization;
        const decodedToken = jwt.verify(token,"sajju");
        const { userId } = decodedToken;
        const user = await UserModel.findOne({ _id: userId });
        next();
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: "Unauthorized" });
    }
}
module.exports = {
    auth
}