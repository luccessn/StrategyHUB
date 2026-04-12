import mongoose from "mongoose";
import { userDb } from "../Config/db.js";

const orderSchema = new mongoose.Schema({
  user: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String },
  },

  items: [
    {
      name: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
    },
  ],

  total: { type: Number, required: true },

  paypalOrderId: { type: String, required: true, unique: true, index: true },
  paypalCaptureId: { type: String },

  status: {
    type: String,
    enum: ["pending", "paid", "failed"],
    default: "paid",
  },

  createdAt: { type: Date, default: Date.now },
});

export const Order = userDb.model("Order", orderSchema);
