import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";

// const TracksModel = require("./Models/tracks");
import cron from "node-cron";
import axios from "axios";
const app = express();
app.use(cors());
app.use(express.json());
// Imports Routes
import authRoute from "./Routes/auth.js";
import getTrackRoute from "./Routes/Tracks/getTracks.js";
import getCarRoute from "./Routes/Cars/getCars.js";
import printfulAPI from "./Routes/PrintFull/getPrintfull.js";
import freetrial from "./Routes/subscriptions/freetrial.js";
import paypalOrder from "./Routes/payment/paypalOrder.js";
import stockRoutes from "./Routes/PrintFull/stockRoutes.js";
//
// mongoose
//   .connect(process.env.MONGO_URI, {
//     serverSelectionTimeoutMS: 50000,
//   })
//   .then(() => {
//     console.log("Mongodb სთან კავშირი დამყარებულია");
//   })
//   .catch((err) => {
//     console.error("Mongodb სთან კავშირის ერრორი", err);
//   });
//
app.get("/", (req, res) => {
  res.send("Formula Strategy server is /server");
});
app.get("/server", (req, res) => {
  res.send("ForMula Strategy Server IS RUNNING ");
});
//Get Users Authentification
// app.use("/server", require("./Routes/auth"));

//Get Tracks
app.use("/server", authRoute);
app.use("/server", getTrackRoute);
app.use("/server", getCarRoute);
//printful and his restart timeline
app.use("/server/printful", printfulAPI);
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
//subs
app.use("/server/subscription", freetrial);
//paypal
app.use("/server/api/paypal", paypalOrder);
app.use("/server/api/stock", stockRoutes);
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is Working on ${PORT} port`);
});
