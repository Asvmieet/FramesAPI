// POST
// Args: User ID
// Code: Be-L-B

const express = require("express");
const router = express.Router();
const dbConnect = require("../../database.js")
const Board = require("../../schema/board.js")
require("dotenv").config({path: "frames.env"})
const jwt = require("jsonwebtoken")


router.get("/", async (req, res) =>{
  try{
    const db = await dbConnect()

      const token = req.headers.authorization?.split(" ")[1]
if (!token){
  return res.status(401).json({ok:false, message:"Please input a valid token with the request."})
}
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET)

let userID = decodedToken.user_id

let boardsWrite = await Board.find({permissionsWrite: userID})
let boardsRead = await Board.find({permissionsRead: userID})


    res.status(200).json({
        ok: true,
        write: boardsWrite,
        read: boardsRead
    })
  }catch(err){
    console.log(`FRAMES_ERROR - Load Boards: ${err}`)
    res.status(500).json({ok: false, error: "Failed to load boards, check logs for more information."})
  }

})

module.exports = router;