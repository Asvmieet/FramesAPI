const express = require("express");
const router = express.Router();
const dbConnect = require("../database.js")
const User = require("../schema/user.js")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const crypto = require("crypto")
require("dotenv").config({path: "frames.env"})


router.post("/", async (req, res) =>{
  try{

    const db = await dbConnect()
	let {username, password} = req.body

    


// Security & Validation

if (!username || !password){
    return res.status(400).json({ok: false, error: "Some information is missing, please make sure username, and password is in the request."})

}

username = username.toString().trim();
password = password.toString();

// Check if a user exists
const userAccount = await User.findOne({username})    

if (!userAccount){
    return res.status(401).json({ok: false, error: "No account found."})
}

const passCheck = await bcrypt.compare(password, userAccount.password);
if (!passCheck) {
    return res.status(401).json({ok: false, error: "Invalid credentials."})
}

const token = jwt.sign({user_id: userAccount.user_id}, process.env.JWT_SECRET, {expiresIn: "7d"})

res.cookie("frames_token", token, {
  httpOnly: true,
  sameSite: "None",
  secure: true,
  domain: "framesapi.onrender.com",
  path: "/",
  maxAge: 7 * 24 * 60 * 60 * 1000
})

res.status(200).json({
        ok: true,
        token
        
    })

    // Complete the request


  }catch(err){
    console.log(`FRAMES_ERROR -  Login user: ${err}`)
    res.status(500).json({ok: false, error: "Failed to login user, check logs for more information."})
  }

})

module.exports = router;