const express = require("express");
const TracksModel = require("../../Models/tracks");
const router = express.Router();

router.get("/gettracks", (req, res) => {
  TracksModel.find()
    .then((track) => res.json(track))
    .catch((err) => res.status(500).json({ message: err }));
});

module.exports = router;
