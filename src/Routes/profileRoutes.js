const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const { updateProfile, setSecurityPassword } = require("../Controllers/profileController");
const { verifyToken } = require("../Middlewares/authMiddleware");

// Multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/profile/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Routes
router.patch("/security-password", verifyToken, setSecurityPassword);
router.patch("/update", verifyToken, upload.single("profilePhoto"), updateProfile);

module.exports = router;
