import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { userDb } from "../Config/db.js";

export const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: {
    type: String,
    required: true,
  },
  // uniqueId: {
  //   type: String,
  //   unique: true,
  //   required: true,
  // },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  address: [
    {
      firstName: String,
      lastName: String,
      email: String,
      phone: String,
      city: String,
      address: String,
      address2: String,
    },
  ],
});

export const UserModel = userDb.model("User", UserSchema);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
