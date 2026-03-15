// POST
// Args: Board Name, Visibiity
// Code: Be-B-C

const express = require("express");
const router = express.Router();
const dbConnect = require("../database.js")
const Board = require("../schema/board.js")
const User = require("../schema/user.js")
const jwt = require("jsonwebtoken")
const crypto = require("crypto");
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
  const decodedToken = jwt.verify(owner_id, process.env.JWT_SECRET)

owner_id = decodedToken.user_id

let permsWriteLength = permsWrite.length
let permsReadLength = permsRead.length

let writeID = []
let readID = []
if (permsWriteLength >= 1){

for (let count = 0; count < permsWriteLength; count++){
  // debugging
  console.log(`Checking user: "${permsWrite[count]}"`)
  const user = await User.findOne({ username: permsWrite[count] })
  if (user.username == permsWrite[count]){
    writeID[count] = user.user_id;
  } else {
    return res.status(400).json({ ok: false, error: `User not found: "${permsWrite[count]}". All usernames in permissions must be existing users.` })
  }
}
}

if (permsReadLength >= 1){

for (let count = 0; count < permsReadLength; count++){
  const user = await User.findOne({ username: permsRead[count] })
  if (user){
    readID[count] = user.user_id;
  } else {
    return res.status(400).json({ ok: false, error: `User not found: "${permsRead[count]}". All usernames in permissions must be existing users.` })
  }
}
}

    const board = new Board({
        board_id: crypto.randomUUID(),
        name,
        owner_id,
        permissionsWrite: writeID,
        permissionsRead: readID,
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