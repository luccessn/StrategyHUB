const mongoose = require("mongoose");
const { dataDb } = require("../Config/db");

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

const TracksModel = dataDb.model("Tracks", TracksSchema);
module.exports = TracksModel;
