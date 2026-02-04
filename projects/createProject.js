// POST
// Args: Project Name, Visibility
// Code: Be-P-C

// POST
// Args: Board Name, Visibiity
// Code: Be-B-C

const express = require("express");
const router = express.Router();
const dbConnect = require("../database.js")
const Project = require("../schema/project.js")
const crypto = require("crypto")

router.post("/", async (req, res) =>{
  try{
    const db = await dbConnect()

    const {name, permissions} = req.body;

    const project = new Project({
        project_id: crypto.randomUUID(),
        name,
        permissions: permissions
    })

    await project.save()

    res.status(201).json({
        ok: true,
        board
    })
  }catch(err){
    console.log(`FRAMES_ERROR - Create Project: ${err}`)
    res.status(500).json({ok: false, error: "Failed to create project, check logs for more information."})
  }

})

module.exports = router;