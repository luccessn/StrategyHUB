import mongoose from "mongoose";
import { dataDb } from "../Config/db.js";

const TracksSchema = new mongoose.Schema({
  name: String,
  lenght: String,
  firstGP: String,
  fastestlap: String,
  fastestmn: String,
  descr: String,
  type: String,
  country: String,
  src: String,
});

export const TracksModel = dataDb.model("Tracks", TracksSchema);
