const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const { uploadFile, toggleFavourite, renameFile, copyFile, deleteFile, getAllNotes, getAllPDFs, getAllImages } = require("../Controllers/fileController");
const getRecentFiles = require("../Controllers/getRecentFiles");
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


router.get("/notes", verifyToken, getAllNotes);
router.get("/pdfs", verifyToken, getAllPDFs);
router.get("/images", verifyToken, getAllImages);
router.get("/recent", verifyToken, getRecentFiles);
router.post("/", verifyToken, upload.single("file"), uploadFile);
router.patch("/:id/favourite", verifyToken, toggleFavourite);
router.patch("/:id/rename", verifyToken, renameFile);
router.post("/:id/copy", verifyToken, copyFile);
router.delete("/:id", verifyToken, deleteFile);


module.exports = router;
