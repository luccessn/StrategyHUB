import mongoose from "mongoose";
import { dataDb } from "../Config/db.js";

const merchSchema = new mongoose.Schema({
  name: String,
  printfulProductId: String,
  images: {
    img1: String,
    img2: String,
    img3: String,
    img4: String,
    img5: String,
    img6: String,
  },
  variants: [
    {
      sync_variant_id: Number,
      variant_id: Number,
      size: String,
      color: String,
      color_code: String,
      retail_price: String,
      preview_url: String,
    },
  ],
  // type: String,
  price: String,
  ourprice: { type: String, default: "0" },
  minPrice: String,
  maxPrice: String,
  stock: { type: Number, default: 0 }, //  stock
});
export const merch = dataDb.model("merch", merchSchema);
