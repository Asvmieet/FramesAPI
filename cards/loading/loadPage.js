// GET
// Args: Board ID, Page ID
// Code: Be-C-G

const express = require("express");
const router = express.Router();
const dbConnect = require("../../database.js");
const Column = require("../../schema/column.js");
const Card = require("../../schema/card.js");
const { hasBoardPermission } = require("../../auth/perms.js");
require("dotenv").config({ path: "frames.env" });

router.get("/", async (req, res) => {
  try {
    await dbConnect();

    const token = req.headers.authorization?.split(" ")[1] || req.cookies?.frames_token;
    if (!token) {
      return res.status(401).json({ ok: false, message: "Please send a valid token (Authorization: Bearer <token>)." });
    }

    const boardID = (req.query.boardID || req.body?.boardID || "").toString();
    if (!boardID) {
      return res.status(418).json({ ok: false, message: "I'm only a teapot. boardID is required (query: ?boardID=...)." });
    }

    const canRead = await hasBoardPermission(token, boardID, "read");


    if (!canRead) {
      return res.status(403).json({ ok: false, message: "You don't have permission to view this board." });
    }

    const [columns, cards] = await Promise.all([
      Column.find({ board: boardID }).sort({ position: 1 }).lean(),
      Card.find({ board: boardID }).sort({ column: 1, position: 1 }).lean(),
    ]);

    res.status(200).json({
      ok: true,
      columns,
      cards,
    });
  } catch (err) {
    console.log(`FRAMES_ERROR - Load Page: ${err}`);
    res.status(500).json({ ok: false, error: "Failed to load board page." });
  }
});

module.exports = router;