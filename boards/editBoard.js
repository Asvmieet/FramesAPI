// PATCH
// Args: Board ID, Value, New Value
// Code: Be-B-E

const express = require("express");
const router = express.Router();
const dbConnect = require("../database.js")
const Board = require("../schema/board.js")
const crypto = require("crypto")

router.patch("/:boardID", async (req, res) =>{
  try{

    const db = await dbConnect()
	
	let boardID = req.params.boardID
  let {value, content} = req.body;
  



// Security & Validation
    if (value && content !== undefined && boardID){
      boardID = boardID.toString();
      value = value.toString();
      content = content.toString();

      if (["__proto__", "constructor", "prototype"].includes(value)){
return res.status(403).json({ok: false, error: "Cannot update card for security reasons."})
      }

          // check for user perms

          const {hasBoardPermission} = require("../auth/perms.js") 
          const authSys_token = req.cookies.frames_token || req.headers.authorization?.split(" ")[1]
          if (!authSys_token) return res.status(401).json({oK: false, error: "Please include a token in your response."})
          const authSys_editPerms = await hasBoardPermission(authSys_token,boardID,"write")
        if (!authSys_editPerms) return res.status(403).json({ok: false, error: "You need write permissions to edit this board."})
      


const allowedFields = Object.keys(Card.schema.paths)
      .filter(field =>
        !["_id", "__v", "card_id", "board"].includes(field)
      )

      if (!allowedFields.includes(value)){
        return res.status(403).json({ok: false, error: "Cannot update this field."})

      }


// Edit the card
	
	

const edit = await Card.findOneAndUpdate({card_id: cardID}, {$set: {[value]: content}}, {new: true, runValidators: true})

if (!edit){
  return res.status(404).json({ok: false, error: "Card not found"})

}

    res.status(200).json({
        ok: true,
        edit
    })

    // Complete the request
  } else {
    res.status(400).json({ok: false, error: "Failed to update card - Missing Information"})

  }

  }catch(err){
    console.log(`FRAMES_ERROR - Update Card: ${err}`)
    res.status(500).json({ok: false, error: "Failed to update card, check logs for more information."})
  }

})

module.exports = router;