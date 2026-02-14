const express = require('express')
const app = express()
const port = 3000
require("dotenv").config({path: "frames.env"})
app.use(express.json())

app.get('/', (req, res) => {
    res.json({status: "ok", message:"Frames backend is running."})
})

app.listen(port, ()=>{
    console.log(`Frames back end is Running (Away at ${port} miles per second)`);
})

function apiKey(req, res, next){
    const apiKey = req.headers['frames-api-key']
    if(!apiKey || apiKey !== process.env.FRAMES_API_KEY){
        return res.status(401).json({ok: false, error:"Access denied. To use the Frames API, you need a valid API key." })
    }
    next()
}

// Routes

app.use("/boards/create", apiKey, require("./boards/createBoard.js"))
app.use("/projects/create", apiKey, require("./projects/createProject.js"))
app.use("/card/create", apiKey, require("./cards/createCard.js"))
app.use("/card/edit", apiKey, require("./cards/editCard.js"))
app.use("/card/delete", apiKey, require("./cards/deleteCard.js"))
app.use("/column/create", apiKey, require("./cards/columns/createColumn.js"))
app.use("/column/delete", apiKey, require("./cards/columns/deleteColumn.js"))
app.use("/column/edit", apiKey, require("./cards/columns/editColumn.js"))
app.use("/boards/permissions", apiKey, require("./boards/editPermissions.js"))
app.use("/interface/loadHome", apiKey, require("./cards/loading/loadBoards.js"))


// Auth

app.use("/auth/register", apiKey, require("./auth/register.js"))
app.use("/auth/login", apiKey, require("./auth/login.js"))

