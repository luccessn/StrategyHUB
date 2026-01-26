const express = require("express");
const CarModel = require("../../Models/cars");
const router = express.Router();

router.get("/getCars", (req, res) => {
  CarModel.find()
    .then((car) => res.json(car))
    .cath((err) => res.status(500).json({ message: err }));
});

module.exports = router;
