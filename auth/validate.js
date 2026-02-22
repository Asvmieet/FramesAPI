// used to validate JWT tokens

const express = require("express");
const router = express.Router();
const dbConnect = require("../database.js")
const User = require("../schema/user.js")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const crypto = require("crypto")
require("dotenv").config({path: "frames.env"})

router.get("/", async (req, res) => {
try{
    const token = req.headers.authorization?.split(" ")[1]
    if (!token){
        res.status(401).json({ok: false, message:"No token provided"})
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET)

        res.status(200).json({ok:true})
    

}catch(error){

    res.status(403).json({ok:false})

}

})

module.exports = router;