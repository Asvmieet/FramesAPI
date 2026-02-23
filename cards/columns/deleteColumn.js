// DELETE
// Args: Board ID, Page ID, Column ID
// Code: Be-Cc-D

const express = require("express");
const router = express.Router();
const dbConnect = require("../../database.js")
const Column = require("../../schema/column.js")
const board = require("../../schema/board.js");
const col = require("../../schema/column.js");
const Card = require("../../schema/card.js")


router.delete("/:boardID/:columnID", async (req, res) =>{
  try{

    const db = await dbConnect()
	
	let columnID = req.params.columnID
    let boardID = req.params.boardID

  



// Security & Validation

if (!columnID || !boardID){
    return res.status(400).json({ok: false, error: "Some information is missing, please make sure columnID and boardID are in the request."})

}

columnID = columnID.toString()
boardID = boardID.toString()

    // check for user perms

    const {hasBoardPermission} = require("../../auth/perms.js") 
    const authSys_token = req.cookies.frames_token || req.headers.authorization?.split(" ")[1]
    if (!authSys_token) return res.status(401).json({oK: false, error: "Please include a token in your response."})
    const authSys_editPerms = await hasBoardPermission(authSys_token,boardID,"write")
  if (!authSys_editPerms) return res.status(403).json({ok: false, error: "You need write permissions to edit this board."})



// Delete the column
	
	

const edit = await Column.findOneAndDelete({column_id: columnID, board: boardID})
const editCards = await Card.deleteMany({column: columnID})


if (!edit){
  return res.status(404).json({ok: false, error: "Column not found"})

}

    res.status(200).json({
        ok: true,
        
    })

    // Complete the request


  }catch(err){
    console.log(`FRAMES_ERROR - Delete Column: ${err}`)
    res.status(500).json({ok: false, error: "Failed to delete column, check logs for more information."})
  }

})

module.exports = router;