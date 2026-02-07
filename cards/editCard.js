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
  let {value, content} = req.body;
  



// Security & Validation
    if (value && content !== undefined && cardID){
      cardID = cardID.toString();
      value = value.toString()

      if (["__proto__", "constructor", "prototype"].includes(value)){
return res.status(403).json({ok: false, error: "Cannot update card for security reasons."})
      }


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