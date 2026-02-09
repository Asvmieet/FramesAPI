// POST
// Args: Board Name, Visibiity
// Code: Be-B-C

const express = require("express");
const router = express.Router();
const dbConnect = require("../database.js")
const Board = require("../schema/board.js")
const crypto = require("crypto")

router.post("/", async (req, res) =>{
  try{
    const db = await dbConnect()

    let {name, permissions} = req.body;

if (!name || !permissions){
  return res.status(400).json({ok: false, error: "Some information is missing, please make sure name, and permission are in the request."})
}

if (!Array.isArray(permissions)){
  return res.status(400).json({ok: false, error: "Permissions needs to be an array."})

}

name = name.toString();

    const board = new Board({
        board_id: crypto.randomUUID(),
        name,
        permissions: permissions
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