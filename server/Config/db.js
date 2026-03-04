import mongoose from "mongoose";
export const userDb = mongoose.createConnection(process.env.MONGO_URI_USER, {
  serverSelectionTimeoutMS: 50000,
});
export const dataDb = mongoose.createConnection(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 50000,
});
