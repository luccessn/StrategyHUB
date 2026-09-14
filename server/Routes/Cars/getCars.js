import express from "express";
import { CarsModel } from "../../Models/cars.js";
const router = express.Router();

router.get("/getcars", async (req, res) => {
  try {
    const { _id } = req.query;
    if (_id) {
      const car = await CarsModel.findById(_id);
      if (!car) {
        return res.status(404).json({ message: "Car Not Found" });
      }
      return res.json(car);
    }
    const cars = await CarsModel.find();
    return res.json(cars);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  // CarsModel.find()
  //   .then((car) => res.json(car))
  //   .catch((err) => res.status(500).json({ message: err }));
});

export default router;
