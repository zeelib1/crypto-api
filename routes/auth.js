const express = require("express");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
// const ensureAuthenticated = require('../middleware/authMiddleware');
const jwt = require("jsonwebtoken");
require("dotenv").config();
const {
  verifyToken,
  ensureAuthenticated,
} = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (user) {
    res.status(400).json({ success: false, message: "User already exists" });
  } else {
    const newUser = new User({ name, email, password });
    await newUser.save();
    res.status(200).json({ success: true, message: "Registered successfully" });
  }
});

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.error(`Error: ${err}`);
      return res
        .status(500)
        .json({ message: "An error occurred during authentication." });
    }
    if (!user) {
      console.log("Authentication failed. Info:", info);
      return res
        .status(400)
        .json({ message: info.message || "Authentication failed." });
    }
    req.logIn(user, (err) => {
      if (err) {
        console.error(`Error: ${err}`);
        return res
          .status(500)
          .json({ message: "Failed to establish a session." });
      }

      // Generate JWT token
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
      });

      // Set token as a HTTP-only cookie
      res.cookie("jwt", token, {
        httpOnly: true,
        // Set secure to true if your using HTTPS
        secure: process.env.NODE_ENV === "production" ? true : false,
        // SameSite attribute for protection against CSRF attacks
        sameSite: "strict",
      });

      console.log("Authentication successful. User:", user);
      return res.json({ message: "Authentication successful.", user });
    });
  })(req, res, next);
});

router.get("/logout", (req, res) => {
  req.session.destroy(function (err) {
    if (err) {
      // Handle error
    } else {
      res.clearCookie("jwt"); // clear the JWT cookie
      res.status(200).json({ message: "Logout successful." });
    }
  });
});

router.get("/profile", async (req, res) => {
  // req.user is available here if the token was valid
  if (req.user) {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ user, savedNews: user.savedNews });
  } else {
    res.status(401).json({ message: "Not authorized" });
  }
});
router.post("/user/:userId/save-news", async (req, res) => {
  try {
    const { userId } = req.params;
    const { image, title, preview, url, readMore, _id } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the article is already saved
    const isSaved = user.savedNews.some((news) => news._id.toString() === _id);
    if (isSaved) {
      return res
        .status(400)
        .json({ message: "This article is already saved!" });
    }

    // Add new article to saved news
    user.savedNews.push({ image, title, preview, url, readMore, _id });

    await user.save();

    return res
      .status(200)
      .json({ message: "News article saved successfully." });
  } catch (error) {
    console.error(`Error: ${error}`);
    return res
      .status(500)
      .json({ message: "An error occurred while saving the news article." });
  }
});

router.delete("/user/:userId/save-news/:newsId", async (req, res) => {
  try {
    const { userId, newsId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Remove news article from saved news
    user.savedNews = user.savedNews.filter((news) => news._id != newsId);

    await user.save();

    return res
      .status(200)
      .json({ message: "News article removed successfully." });
  } catch (error) {
    console.error(`Error: ${error}`);
    return res
      .status(500)
      .json({ message: "An error occurred while removing the news article." });
  }
});
// GET /user/:userId/saved-news/:newsId
router.get("/user/:userId/saved-news/:newsId", async (req, res) => {
  try {
    const { userId, newsId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the news article is already saved
    const isSaved = user.savedNews.some(
      (news) => news._id.toString() === newsId
    );

    return res.status(200).json({ isSaved });
  } catch (error) {
    console.error(`Error: ${error}`);
    return res
      .status(500)
      .json({ message: "An error occurred while checking the news article." });
  }
});

module.exports = router;
