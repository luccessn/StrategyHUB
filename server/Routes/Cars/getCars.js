import express from "express";
import { CarsModel } from "../../Models/cars.js";
const router = express.Router();

router.get("/getcars", (req, res) => {
  CarsModel.find()
    .then((car) => res.json(car))
    .catch((err) => res.status(500).json({ message: err }));
});

export default router;
