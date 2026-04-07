// PATCH
// Args: IDs, Pos, ColID
// Code: Be-C-Pc

const express = require("express");
const router = express.Router();
const dbConnect = require("../../database.js")
const Column = require("../../schema/column.js")
const crypto = require("crypto")

router.patch("", async (req, res) =>{
  try{

    const db = await dbConnect()
	
  let {updates, boardID} = req.body;
  

// Security & Validation
    if (updates && Array.isArray(updates)){






          // check for user perms

          const {hasBoardPermission} = require("../../auth/perms.js") 
          const authSys_token = req.headers.authorization?.split(" ")[1] || req.cookies?.frames_token
          if (!authSys_token) return res.status(401).json({oK: false, error: "Please include a token in your request."})
          const authSys_editPerms = await hasBoardPermission(authSys_token,boardID,"write")
        if (!authSys_editPerms) return res.status(403).json({ok: false, error: "You need write permissions to edit this board."})
      




// Edit the Pos

const operations = updates.map(a => ({
    updateOne: {
        filter: {column_id: a.column_id},
        update: {$set: {position: a.position}}

    }
}))
	
	
if (operations.length === 0) return res.json({ ok: true, message: "No pos updated needed."})

    const updts = await Column.bulkWrite(operations)


    res.status(200).json({
        ok: true,
        updts
    })

    // Complete the request
  } else {
    res.status(400).json({ok: false, error: "Failed to update col - Missing Information"})

  }

  }catch(err){
    console.log(`FRAMES_ERROR - Pos Changer: ${err}`)
    res.status(500).json({ok: false, error: "Failed to update pos data, check logs for more information."})
  }

})

module.exports = router;