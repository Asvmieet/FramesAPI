// PATCH
// Args: Board ID, Page ID, Column ID, Value, New Value
// Code: Be-Cc-D

const express = require("express");
const router = express.Router();
const dbConnect = require(".../database.js")
const Column = require(".../schema/column.js")
const crypto = require("crypto")

router.patch("/:columnID", async (req, res) =>{
  try{

    const db = await dbConnect()
	
	let columnID = req.params.columnID
  let {value, content} = req.body;
  



// Security & Validation
    if (value && content !== undefined && columnID){
      columnID = columnID.toString();
      value = value.toString()
      content = content.toString()

      if (["__proto__", "constructor", "prototype"].includes(value)){
return res.status(403).json({ok: false, error: "Cannot update column for security reasons."})
      }

          // check for user perms

    const {hasBoardPermission} = require(".../auth/perms.js") 
    const authSys_token = req.headers.authorization?.split(" ")[1]
    const authSys_cardID = await Column.findOne({column_id: columnID})
    if (!authSys_cardID) return;
    const authSys_boardID = authSys_cardID.board
    if (!authSys_token) return res.status(401).json({oK: false, error: "Please include a token in your response."})
    const authSys_editPerms = await hasBoardPermission(authSys_token,authSys_boardID,"write")
  if (!authSys_editPerms) return res.status(403).json({ok: false, error: "You need write permissions to edit this board."})




const allowedFields = Object.keys(Column.schema.paths)
      .filter(field =>
        !["_id", "__v", "c","column_id", "board"].includes(field)
      )

      if (!allowedFields.includes(value)){
        return res.status(403).json({ok: false, error: "Cannot update this field."})

      }


// Edit the column
	
	

const edit = await Column.findOneAndUpdate({column_id: columnID}, {$set: {[value]: content}}, {new: true, runValidators: true})

if (!edit){
  return res.status(404).json({ok: false, error: "Column not found"})

}

    res.status(200).json({
        ok: true,
        edit
    })

    // Complete the request
  } else {
    res.status(400).json({ok: false, error: "Failed to update column - Missing Information"})

  }

  }catch(err){
    console.log(`FRAMES_ERROR - Update Column: ${err}`)
    res.status(500).json({ok: false, error: "Failed to update column, check logs for more information."})
  }

})

module.exports = router;