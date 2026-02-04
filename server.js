const express = require('express')
const app = express()
const port = 3000

app.use(express.json())

app.get('/', (req, res) => {
    res.json({status: "ok", message:"Frames backend is running."})
})

app.listen(port, ()=>{
    console.log("Frames back end is Running ");
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