import express from "express";
import { UserModel } from "../../Models/users.js";
import authMiddleware from "../authMiddleware.js";
const router = express.Router();

export const checkTrialExpiration = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const now = new Date();

    if (user.trial.isActive && user.trial.expiresAt < now) {
      user.trial.isUsed = true;
      user.trial.isActive = false;
      await user.save();
    }

    req.userData = user;
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

router.post(
  "/start-trial",
  authMiddleware,
  checkTrialExpiration,
  async (req, res) => {
    try {
      const user = await UserModel.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      } else if (user.trial.isUsed) {
        return res.status(400).json({ message: "Trial Already Used" });
      }
      user.trial.isUsed = true;
      user.trial.isActive = true;
      user.trial.startedAt = new Date();
      // user.trial.expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
      user.trial.expiresAt = new Date(Date.now() + 10 * 60 * 1000);
      await user.save();
      res.status(200).json({
        message: "Free sub has activated",
        trial: user.trial,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  },
);
export default router;
