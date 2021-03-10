const express = require("express");
const path = require("path");
const router = express.Router();

router.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/stats.html"));
});

module.exports = router;
