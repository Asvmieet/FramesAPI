// internal file used soley to check if a user has perms to edit a board and or its contents.
const dbConnect = require("../database.js")
const jwt = require("jsonwebtoken")
require("dotenv").config({path: "frames.env"})

const board = require("../schema/board.js");

async function hasBoardPermission(jwtKey, boardID,permType){

    try{
    const BoardDoc = await board.findOne({board_id: boardID})
jwtKey = jwt.verify(jwtKey, process.env.JWT_SECRET)
const userID = jwtKey.user_id;

    if (permType == "write"){
        return BoardDoc.permissionsWrite.includes(userID)
    } else if (permType == "read"){
        return BoardDoc.permissionsRead.includes(userID)||  BoardDoc.permissionsWrite.includes(userID)


    } else {
        return false
    }
} catch (err) {
    console.log(`Error checking user permissions: ${err}`)
}
}

module.exports = {hasBoardPermission}