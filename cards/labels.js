// PATCH
// Args: Board ID, Card ID, Value, New Value 
// Code: Be-C-E

const express = require("express");
const router = express.Router();
const dbConnect = require("../database.js")
const Card = require("../schema/card.js")
const crypto = require("crypto")

router.patch("/:cardID", async (req, res) =>{
  try{

    const db = await dbConnect()
	
	let cardID = req.params.cardID
  let {type, name} = req.body;


// Security & Validation
    if (type && name !== undefined && cardID){
      cardID = cardID.toString();
      value = value.toString();




          // check for user perms

    const {hasBoardPermission} = require("../auth/perms.js") 
    const authSys_token = req.headers.authorization?.split(" ")[1] || req.cookies?.frames_token
    const authSys_cardID = await Card.findOne({card_id: cardID})
    if (!authSys_cardID) return;
    const authSys_boardID = authSys_cardID.board
    if (!authSys_token) return res.status(401).json({oK: false, error: "Please include a token in your response."})
    const authSys_editPerms = await hasBoardPermission(authSys_token,authSys_boardID,"write")
  if (!authSys_editPerms) return res.status(403).json({ok: false, error: "You need write permissions to edit this board."})



// Edit the card
	
	if (type == "add"){
        const edit = await Card.findOneAndUpdate({card_id: cardID}, {$push: {labels: name}}, {new: true, runValidators: true})
        if (!edit){
            return res.status(404).json({ok: false, error: "Card not found"})
          
          } else {
            res.status(200).json({
                ok: true,
                edit
            })
          }
    } else if (type == "remove"){
        const edit = await Card.findOneAndUpdate({card_id: cardID}, {$pull: {labels: name}}, {new: true, runValidators: true})
        if (!edit){
            return res.status(404).json({ok: false, error: "Card not found"})
          
          } else {
            res.status(200).json({
                ok: true,
                edit
            })
          }
    }






    // Complete the request
  } else {
    res.status(400).json({ok: false, error: "Failed to update card labels - Missing Information"})

  }

  }catch(err){
    console.log(`FRAMES_ERROR - Update Card: ${err}`)
    res.status(500).json({ok: false, error: "Failed to update card labels, check logs for more information."})
  }

})

module.exports = router;