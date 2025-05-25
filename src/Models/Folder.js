// models/folder.model.js
const mongoose = require("mongoose");

const folderSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", // assuming you have a User model
            required: true,
        },
        isSecure: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Folder", folderSchema);
