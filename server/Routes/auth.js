import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserModel from "../Models/users";

const router = express.Router();

import userDb from "../Config/db";

// log In
router.post("/login", async (req, res) => {
  const { email, password, firstName } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email and password are required." });
  }

  UserModel.findOne({ email: email })
    .then(async (user) => {
      if (!user) {
        return res
          .status(404)
          .json({ message: "აქაუნთი არ არსებობს ან არასწორი მონაცემებია" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "არასწორი პაროლია" });
      }

      //  აქ გენერირდება ტოკენი
      const payload = {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "12h",
      });

      // წარმატებული ავტორიზაცია
      return res.status(200).json({
        message: "Success",
        token, //  frontend-ს ტოკენი
        user: payload, // საჭირო ინფო თუ გინდა გადაეცეს
      });
    })
    .catch((error) => {
      console.error("Login error:", error);
      return res.status(500).json({ message: "An error occurred", error });
    });
});
// registration

router.post("/register", async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Please Require Email" });
  try {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }
    const newUser = new UserModel(req.body);
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Registration Error:", err);
    res
      .status(500)
      .json({ message: "Registration failed. Please try again later.", err });
  }
});
