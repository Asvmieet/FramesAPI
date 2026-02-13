// DELETE
// Args: Board ID, Card ID, 
// Code: Be-C-D

const express = require("express");
const router = express.Router();
const dbConnect = require("../database.js")
const Card = require("../schema/card.js")
const board = require("../schema/board.js");

router.delete("/:boardID/:cardID", async (req, res) =>{
  try{

    const db = await dbConnect()
	
	let cardID = req.params.cardID
    let boardID = req.params.boardID

  



// Security & Validation

if (!cardID || !boardID){
    return res.status(400).json({ok: false, error: "Some information is missing, please make sure cardID and boardID are in the request."})

}

cardID = cardID.toString()
boardID = boardID.toString()

    // check for user perms

    const {hasBoardPermission} = require("../auth/perms.js") 
    const authSys_token = req.headers.authorization?.split(" ")[1]
    if (!authSys_token) return res.status(401).json({oK: false, error: "Please include a token in your response."})
    const authSys_editPerms = await hasBoardPermission(authSys_token,boardID,"write")
  if (!authSys_editPerms) return res.status(403).json({ok: false, error: "You need write permissions to edit this board."})



// Delete the card
	
	

const edit = await Card.findOneAndDelete({card_id: cardID, board: boardID})

if (!edit){
  return res.status(404).json({ok: false, error: "Card not found"})

}

    res.status(200).json({
        ok: true,
        
    })

    // Complete the request


  }catch(err){
    console.log(`FRAMES_ERROR - Delete Card: ${err}`)
    res.status(500).json({ok: false, error: "Failed to delete card, check logs for more information."})
  }

})

module.exports = router;