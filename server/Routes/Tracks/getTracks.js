import express from "express";
import { TracksModel } from "../../Models/tracks.js";
const router = express.Router();

router.get("/gettracks", (req, res) => {
  TracksModel.find()
    .then((track) => res.json(track))
    .catch((err) => res.status(500).json({ message: err }));
});

export default router;
