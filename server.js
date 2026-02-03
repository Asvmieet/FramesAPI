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

// Routes

app.use("/boards/create", require("./boards/createBoard.js"))