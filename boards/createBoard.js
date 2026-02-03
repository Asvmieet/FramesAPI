// POST
// Args: Board Name, Visibiity
// Code: Be-B-C

const express = require("express");
const router = express.Router();
const dbConnect = require("../database.js")
router.post("/", async (req, res) =>{
    const db = await dbConnect()

    // use db funcs here


res.send("Create board endpoint.")
})

module.exports = router;