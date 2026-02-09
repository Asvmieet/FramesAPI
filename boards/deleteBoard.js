// DELETE
// Args: Board ID
// Code: Be-B-D

// DELETE
// Args: Board ID, Card ID, 
// Code: Be-C-D

const express = require("express");
const router = express.Router();
const dbConnect = require("../database.js")
const Card = require("../schema/card.js")
const Board = require("../schema/board.js");

router.delete("/:boardID", async (req, res) =>{
  try{

    const db = await dbConnect()
	    let boardID = req.params.boardID

  



// Security & Validation

if (!boardID){
    return res.status(400).json({ok: false, error: "Some information is missing, please make sure boardID is in the request."})

}

boardID = boardID.toString()

// Delete the board & cards
	
	

const edit = await Board.findOneAndDelete({board_id: boardID})
const editCards = await Card.deleteMany({board: boardID})

if (!edit){
  return res.status(404).json({ok: false, error: "Board not found"})

}

    res.status(200).json({
        ok: true,
        
    })

    // Complete the request


  }catch(err){
    console.log(`FRAMES_ERROR - Delete Board: ${err}`)
    res.status(500).json({ok: false, error: "Failed to delete board, check logs for more information."})
  }

})

module.exports = router;