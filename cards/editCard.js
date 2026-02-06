// PATCH
// Args: Board ID, Card ID, Value, New Value 
// Code: Be-C-E

const express = require("express");
const router = express.Router();
const dbConnect = require("../database.js")
const Card = require("../schema/card.js")
const crypto = require("crypto")

router.post("/", async (req, res) =>{
  try{
    const db = await dbConnect()
	
	const cardID = req.params
    const {value, content} = req.body;
	const edit = await Card.findOne({card_id: cardID})
	
	
	card[value] = content;
	
	card.save()

    res.status(201).json({
        ok: true,
        card
    })
  }catch(err){
    console.log(`FRAMES_ERROR - Update Card: ${err}`)
    res.status(500).json({ok: false, error: "Failed to update card, check logs for more information."})
  }

})

module.exports = router;