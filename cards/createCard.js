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

    let {title, boardID, position, columnID} = req.body;

    if (!title || !boardID || !position || !columnID){
      return res.status(400).json({ok: false, error: "Some information is missing, please make sure Title, BoardID, position, and columnID are in the request."})

    }

    title = title.toString()
    boardID = boardID.toString()
    position = parseInt(position)
      if (isNaN(position)){
        return res.status(418).json({ok: false, error: "I am a teapot. Give Me A NUMBER in ounces so I can make the correct amount of tra."})

      }
    columnID = columnID.toString();



    const card = new Card({
        card_id: crypto.randomUUID(),
        board: boardID,
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