// POST
// Args: Board Name, Visibiity
// Code: Be-B-C

const express = require("express");
const router = express.Router();

router.post("/", (req, res) =>{
res.send("Create board endpoint.")
})