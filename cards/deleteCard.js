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