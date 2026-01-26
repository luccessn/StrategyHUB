require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
// const TracksModel = require("./Models/tracks");
const CarModel = require("./Models/cars");
const cron = require("node-cron");
const axios = require("axios");

const app = express();

app.use(cors());
app.use(express.json());

//
mongoose
  .connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 50000,
  })
  .then(() => {
    console.log("Mongodb სთან კავშირი დამყარებულია");
  })
  .catch((err) => {
    console.error("Mongodb სთან კავშირის ერრორი", err);
  });
//
app.get("/", (req, res) => {
  res.send("Formula Strategy server is /server");
});
app.get("/server", (req, res) => {
  res.send("ForMula Strategy Server IS RUNNING ");
});
//Get Tracks
// app.get("/server/getTracks", (req, res) => {
//   TracksModel.find()
//     .then((track) => res.json(track))
//     .catch((err) => res.status(500).json({ message: err }));
// });
app.use("/server", require("./Routes/Tracks/getTracks"));
// app.get("/server/getcar", (req, res) => {
//   CarModel.find()
//     .then((car) => res.json(car))
//     .catch((err) => res.status(500).json({ message: err }));
// });
app.use("/server", require("./Routes/Cars/getCars"));
//printful and his restart timeline
app.use("/server/printful", require("./Routes/PrintFull/getPrintfull"));
cron.schedule("*/5 * * * *", async () => {
  console.log("Printful ის სიქრონიზაცია დაიწყო>>>");
  try {
    const response = await axios.get(
      "http://localhost:5000/server/printful/sync",
    );
    console.log("Printful სინქრონიზაცია წარმატებულია:", response.data.message);
  } catch (error) {
    console.error("სინქრონიზაციის შეცდომა:", error.message);
  }
});
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is Working on ${PORT} port`);
});
