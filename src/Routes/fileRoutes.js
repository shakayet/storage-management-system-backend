const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const { uploadFile } = require("../Controllers/fileController");
const { verifyToken } = require("../Middlewares/authMiddleware");

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // ensure this folder exists
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// @route   POST /api/files
// @desc    Upload a file (note, image, or pdf)
// @access  Private
router.post("/", verifyToken, upload.single("file"), uploadFile);

module.exports = router;
