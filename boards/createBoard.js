// POST
// Args: Board Name, Visibiity
// Code: Be-B-C

const express = require("express");
const router = express.Router();
const dbConnect = require("../database.js")
const Board = require("../schema/board.js")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const crypto = require("crypto")
require("dotenv").config({path: "frames.env"})

router.post("/", async (req, res) =>{
  try{
    const db = await dbConnect()

    let {name, permsWrite, owner_id,permsRead} = req.body;

if (!name || !permsWrite || !owner_id || !permsRead){
  return res.status(400).json({ok: false, error: "Some information is missing, please make sure name, and permission are in the request."})
}

if (!Array.isArray(permsWrite) || !Array.isArray(permsRead)){
  return res.status(400).json({ok: false, error: "Permissions needs to be an array."})

}

name = name.toString();
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET)

owner_id = decodedToken.user_id
    const board = new Board({
        board_id: crypto.randomUUID(),
        name,
        owner_id,
        permissionsWrite: permsWrite,
        permissionsRead: permsRead,
    })

    await board.save()

    res.status(201).json({
        ok: true,
        board
    })
  }catch(err){
    console.log(`FRAMES_ERROR - Create Board: ${err}`)
    res.status(500).json({ok: false, error: "Failed to create board, check logs for more information."})
  }

})

module.exports = router;