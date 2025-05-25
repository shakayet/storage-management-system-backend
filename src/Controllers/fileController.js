const File = require("../Models/File");
const fs = require("fs");

const uploadFile = async (req, res) => {
  try {
    const file = req.file;
    const { type, folderId, isPrivate } = req.body;

    // Validate file type
    if (!["note", "image", "pdf"].includes(type)) {
      return res.status(400).json({ message: "Invalid file type" });
    }

    // Save file to DB
    const fileDoc = await File.create({
      name: file.originalname,
      type,
      size: file.size,
      url: file.path,
      user: req.user.id, // ✅ Updated
      folder: folderId || null,
      isPrivate: isPrivate === "true",
    });

    res.status(201).json({ message: "File uploaded", file: fileDoc });
  } catch (error) {
    console.error("File upload error:", error);
    res.status(500).json({ message: "File upload failed", error: error.message || error });
  }
};

module.exports = { uploadFile };
