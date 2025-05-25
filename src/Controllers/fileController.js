const File = require("../Models/File");
const fs = require("fs");
const path = require("path");

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
      user: req.user.id,
      folder: folderId || null,
      isPrivate: isPrivate === "true",
    });

    res.status(201).json({ message: "File uploaded", file: fileDoc });
  } catch (error) {
    console.error("File upload error:", error);
    res.status(500).json({ message: "File upload failed", error: error.message || error });
  }
};

const toggleFavourite = async (req, res) => {
  try {
    const userId = req.user.id;
    const fileId = req.params.id;

    const file = await File.findOne({ _id: fileId, user: userId });
    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }

    file.isFavorite = !file.isFavorite;
    await file.save();

    res.status(200).json({ message: `File ${file.isFavorite ? "added to" : "removed from"} favourites`, file });
  } catch (error) {
    console.error("Toggle favourite error:", error);
    res.status(500).json({ message: "Failed to toggle favourite", error: error.message || error });
  }
};

const renameFile = async (req, res) => {
  try {
    const userId = req.user.id;
    const fileId = req.params.id;
    const { newName } = req.body;

    if (!newName || typeof newName !== "string" || newName.trim() === "") {
      return res.status(400).json({ message: "New name is required and must be a non-empty string" });
    }

    const file = await File.findOne({ _id: fileId, user: userId });
    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }

    file.name = newName.trim();
    await file.save();

    res.status(200).json({ message: "File renamed successfully", file });
  } catch (error) {
    console.error("Rename file error:", error);
    res.status(500).json({ message: "Failed to rename file", error: error.message || error });
  }
};

const copyFile = async (req, res) => {
  try {
    const userId = req.user.id;
    const fileId = req.params.id;

    const file = await File.findOne({ _id: fileId, user: userId });
    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }

    // Generate new name with " - copy" suffix (if already contains, add a timestamp)
    let newName;
    if (file.name.includes(" - copy")) {
      newName = `${file.name} (${Date.now()})`;
    } else {
      const ext = path.extname(file.name);
      const baseName = path.basename(file.name, ext);
      newName = `${baseName} - copy${ext}`;
    }

    // For now, duplicate metadata only, file url stays same (optional: copy physical file later)
    const copiedFile = await File.create({
      name: newName,
      type: file.type,
      size: file.size,
      url: file.url,  // If you want, implement physical file copy and update this path
      user: userId,
      folder: file.folder,
      isPrivate: file.isPrivate,
      isFavorite: false,  // copied file is not favorite by default
    });

    res.status(201).json({ message: "File copied successfully", file: copiedFile });
  } catch (error) {
    console.error("Copy file error:", error);
    res.status(500).json({ message: "Failed to copy file", error: error.message || error });
  }
};

const deleteFile = async (req, res) => {
  try {
    const userId = req.user.id;
    const fileId = req.params.id;

    const file = await File.findOne({ _id: fileId, user: userId });
    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }

    // Delete physical file if exists
    if (file.url && fs.existsSync(file.url)) {
      fs.unlinkSync(file.url);
    }

    // Delete from DB
    await File.deleteOne({ _id: fileId });

    res.status(200).json({ message: "File deleted successfully" });
  } catch (error) {
    console.error("Delete file error:", error);
    res.status(500).json({ message: "Failed to delete file", error: error.message || error });
  }
};

module.exports = { uploadFile, toggleFavourite, renameFile, copyFile, deleteFile };
