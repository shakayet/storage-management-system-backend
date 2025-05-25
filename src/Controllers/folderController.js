const Folder = require("../Models/Folder");
const mongoose = require('mongoose');

const createFolder = async (req, res) => {
    try {

        const { name } = req.body;
        const folder = new Folder({
            name,
            user: new mongoose.Types.ObjectId(req.user.id),
        });

        await folder.save();

        res.status(201).json({
            message: "Folder created successfully",
            folder,
        });
    } catch (error) {
        console.error("Create folder error:", error);
        res.status(500).json({
            message: "Failed to create folderrrr",
            error: error.message || error,
        });
    }
};

module.exports = { createFolder };
