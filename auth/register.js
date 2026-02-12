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

username = username.toString()
password = password.toString()

// Check if a user exists
const existingUser = await User.findOne({username})
if (existingUser) return res.status(409).json({ok: false, error:"User already exists"})

    // Create the user
    
	password = await bcrypt.hash(password, 10)

	
const user = new User({
    user_id: crypto.randomUUID(),
    username,
    password
})

await user.save()

const token = jwt.sign({user_id: user.user_id}, process.env.JWT_SECRET, {expiresIn: "7d"})
    res.status(201).json({
        ok: true,
        token
        
    })

    // Complete the request


  }catch(err){
    console.log(`FRAMES_ERROR -  Create user: ${err}`)
    res.status(500).json({ok: false, error: "Failed to create user, check logs for more information."})
  }

})

module.exports = router;