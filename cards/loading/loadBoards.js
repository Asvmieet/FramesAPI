// POST
// Args: User ID
// Code: Be-L-B

const express = require("express");
const router = express.Router();
const dbConnect = require("../../database.js")
const Board = require("../../schema/board.js")

router.get("/", async (req, res) =>{
  try{
    const db = await dbConnect()

    let {userID} = req.body;

if (!userID){
  return res.status(400).json({ok: false, error: "Please include userID in the body."})
}


userID = userID.toString();

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