// POST
// Args: Board ID
// Code: Be-G-P

const express = require("express");
const router = express.Router();
const dbConnect = require("../database.js")
const Board = require("../schema/board.js")
const User = require("../schema/user.js")
require("dotenv").config({path: "frames.env"})
const Card = require("../schema/card.js")


router.get("/", async (req, res) =>{
  try{
    const db = await dbConnect()
    const boardID = (req.query.boardID || req.body?.boardID || "").toString();



let board = await Board.findOne({board_id: boardID})
let arrayWrite = []
let arrayRead = []
for (let a = 0; a < board.permissionsWrite.length ; a++) {
    let usr = await User.findOne({user_id: board.permissionsWrite[a]})
    arrayWrite[a] = usr.username
}

for (let a = 0; a < board.permissionsRead.length ; a++) {
    let usr = await User.findOne({user_id: board.permissionsRead[a]})
    arrayRead[a] = usr.username
}

    res.status(200).json({
        ok: true,
        write: arrayWrite,
        read: arrayRead,
    })
  }catch(err){
    console.log(`FRAMES_ERROR - Get Perms: ${err}`)
    res.status(500).json({ok: false, error: "Failed to get permissions, check logs for more information."})
  }

})

module.exports = router;