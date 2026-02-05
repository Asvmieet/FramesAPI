// POST
// Args: Board ID, Card Name
// Code: Be-C-C

const express = require("express");
const router = express.Router();
const dbConnect = require("../database.js")
const Card = require("../schema/card.js")
const crypto = require("crypto")

router.post("/", async (req, res) =>{
  try{
    const db = await dbConnect()

    const {title, boardID, position, columnID} = req.body;

    const card = new Card({
        board_id: boardID,
        title,
        position,
        isArchived: false,
        column: columnID
        
        
    })

    await card.save()

    res.status(201).json({
        ok: true,
        card
    })
  }catch(err){
    console.log(`FRAMES_ERROR - Create Card: ${err}`)
    res.status(500).json({ok: false, error: "Failed to create card, check logs for more information."})
  }

})

module.exports = router;