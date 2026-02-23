const express = require('express')
const app = express()
const port = 3000
const cors = require("cors")
const cookieParser = require("cookie-parser")
require("dotenv").config({path: "frames.env"})
app.use(express.json())
app.use(cookieParser())
app.get('/', (req, res) => {
    res.json({status: "ok", message:"Frames backend is running."})
})

app.listen(port, ()=>{
    console.log(`Frames back end is Running (Away at ${port} miles per second)`);
})

//function apiKey(req, res, next){
  //  const apiKey = req.headers['frames-api-key']
    //if(!apiKey || apiKey !== process.env.FRAMES_API_KEY){
      //  return res.status(401).json({ok: false, error:"Access denied. To use the Frames API, you need a valid API key." })
    //}
    //next()
//}

app.use(cors({
    origin: "https://frames-web-three.vercel.app",

    methods: ["GET", "POST", "OPTIONS", "PATCH"],
    allowedHeaders: ["Content-Type", "authorization"],
    credentials: true
}))

// Routes

app.use("/boards/create", require("./boards/createBoard.js"))
app.use("/projects/create", require("./projects/createProject.js"))
app.use("/card/create", require("./cards/createCard.js"))
app.use("/card/edit", require("./cards/editCard.js"))
app.use("/card/delete", require("./cards/deleteCard.js"))
app.use("/column/create", require("./cards/columns/createColumn.js"))
app.use("/column/delete", require("./cards/columns/deleteColumn.js"))
app.use("/column/edit", require("./cards/columns/editColumn.js"))
app.use("/boards/permissions", require("./boards/editPermissions.js"))
app.use("/interface/loadHome", require("./cards/loading/loadBoards.js"))


// Auth

app.use("/auth/register", require("./auth/register.js"))
app.use("/auth/login", require("./auth/login.js"))
app.use("/auth/validate", require("./auth/validate.js"))

