const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ["note", "image", "pdf"], required: true },
  size: { type: Number, required: true },
  folder: { type: mongoose.Schema.Types.ObjectId, ref: "Folder" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  url: { type: String, required: true },
  isFavorite: { type: Boolean, default: false },
  isPrivate: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model("File", fileSchema);
