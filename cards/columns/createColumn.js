// POST
// Args: Board ID, Page ID, Column Name
// Code: Be-Cc-C

const express = require("express");
const router = express.Router();
const dbConnect = require("~/database.js")
const Column = require("~/schema/column.js")
const crypto = require("crypto")

router.post("/", async (req, res) =>{
  try{

    
    const db = await dbConnect()

    let {title, boardID, position} = req.body;

    if (!title || !boardID || !position){
      return res.status(400).json({ok: false, error: "Some information is missing, please make sure Title, BoardID, and position are in the request."})

    }

    // check for user perms

    const {hasBoardPermission} = require(".../auth/perms.js") 
    const authSys_token = req.headers.authorization?.split(" ")[1]
    if (!authSys_token) return res.status(401).json({oK: false, error: "Please include a token in your response."})
    const authSys_editPerms = await hasBoardPermission(authSys_token,boardID,"write")
  if (!authSys_editPerms) return res.status(403).json({ok: false, error: "You need write permissions to edit this board."})



    title = title.toString()
    boardID = boardID.toString()
    position = parseInt(position)
      if (isNaN(position)){
        return res.status(418).json({ok: false, error: "I am a teapot. Give Me A NUMBER in ounces so I can make the correct amount of tra."})

      }



    const column = new Column({
        column: crypto.randomUUID(),
        board: boardID,
        project: "?",
        position,
        title: title
        
        
    })

    await column.save()

    res.status(201).json({
        ok: true,
        column
    })
  }catch(err){
    console.log(`FRAMES_ERROR - Create Column: ${err}`)
    res.status(500).json({ok: false, error: "Failed to create column, check logs for more information."})
  }

})

module.exports = router;