import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { userDb } from "../Config/db.js";

export const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
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
  trial: {
    isUsed: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    startedAt: {
      type: Date,
      default: null,
    },
    expiresAt: {
      type: Date,
      default: null,
    },
  },
  subscription: {
    plan: {
      type: String,
      enum: ["none", "standard", "premium", "enterprise"],
      default: "none",
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    startedAt: {
      type: Date,
      default: null,
    },
    expiresAt: {
      type: Date,
      default: null,
    },
  },
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

export const UserModel = userDb.model("user", UserSchema);
