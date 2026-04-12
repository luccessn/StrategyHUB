import express from "express";
const router = express.Router();
import { merch } from "../../Models/merch.js";

router.patch("/update-stock", async (req, res) => {
  const { items } = req.body;
  try {
    const updatedStock = [];
    for (const item of items) {
      const { printfulProductId, quantity } = item;
      const design = await merch.findOne({ printfulProductId });
      if (!design) {
        continue;
      }
      design.stock = Math.max((design.stock || 0) - quantity, 0);
      await design.save();
      updatedStock.push({
        printfulProductId,
        stock: design.stock,
      });
    }
    res.json({ updatedStock });
  } catch {
    res.status(500).json({ message: "Failed to update the stock" });
  }
});

export default router;
