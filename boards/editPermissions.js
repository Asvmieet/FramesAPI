// PATCH
// Args: Board ID, Value, New Value
// Code: Be-B-E

const express = require("express");
const router = express.Router();
const dbConnect = require("../database.js")
const Board = require("../schema/board.js")
const User = require("../schema/user.js")

const crypto = require("crypto")

router.patch("/:boardID", async (req, res) =>{
  try{

    const db = await dbConnect()
	
	let boardID = req.params.boardID
  let {type, username} = req.body;
  



// Security & Validation
    if (type && username && boardID){
      boardID = boardID.toString();
      username = username.toString();
      type = type.toString();

let UID = ""

          // check for user perms

          const {hasBoardPermission} = require("../auth/perms.js") 
          const authSys_token = req.headers.authorization?.split(" ")[1] || req.cookies?.frames_token
          if (!authSys_token) return res.status(401).json({oK: false, error: "Please include a token in your response."})
          const authSys_editPerms = await hasBoardPermission(authSys_token,boardID,"write")
        if (!authSys_editPerms) return res.status(403).json({ok: false, error: "You need write permissions to edit this board."})
      

// Edit the permissions
    
let usr = await User.findOne({username: username})
if(usr){
UID = usr.user_id

	if (type == "write"){
        await Board.updateOne({board_id: boardID}, {

            $addToSet: {permissionsWrite: UID},
            $pull: {permissionsRead: UID}

        })

    } else if (type == "read"){
        await Board.updateOne({board_id: boardID}, {

            $addToSet: {permissionsRead: UID},
            $pull: {permissionsWrite: UID}

        })
    }




    res.status(200).json({
        ok: true,

    })
}
    // Complete the request
  } else {
    res.status(400).json({ok: false, error: "Failed to update permissions - Missing Information"})

  }

  }catch(err){
    console.log(`FRAMES_ERROR - Update Permissions: ${err}`)
    res.status(500).json({ok: false, error: "Failed to update permissions, check logs for more information."})
  }

})

module.exports = router;