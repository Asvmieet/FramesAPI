// POST
// Args: Board ID
// Code: Be-G-P

const express = require("express");
const router = express.Router();
const dbConnect = require("../database.js")
const Board = require("../schema/board.js")
require("dotenv").config({path: "frames.env"})


router.get("/", async (req, res) =>{
  try{
    const db = await dbConnect()
    const boardID = (req.query.boardID || req.body?.boardID || "").toString();



let board = await Board.findOne({board_id: boardID})

    res.status(200).json({
        ok: true,
        write: board.permissionsWrite,
        read: board.permissionsRead,
    })
  }catch(err){
    console.log(`FRAMES_ERROR - Get Perms: ${err}`)
    res.status(500).json({ok: false, error: "Failed to get permissions, check logs for more information."})
  }

})

module.exports = router;