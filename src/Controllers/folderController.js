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


const setFolderSecure = async (req, res) => {
    try {
        const userId = req.user.id; // No need to create ObjectId here
        const folderId = req.params.folderId;
        const { isSecure } = req.body;

        console.log("Raw Folder ID:", folderId);
        console.log("Raw User ID:", userId);

        const folder = await Folder.findOne({
            _id: folderId,
            user: userId
        });

        if (!folder) {
            console.log("Actual query performed:", {
                _id: folderId,
                user: userId
            });
            return res.status(404).json({ message: "Folder not found" });
        }

        folder.isSecure = Boolean(isSecure);
        await folder.save();

        res.status(200).json({
            message: `Folder ${folder.isSecure ? "secured" : "unsecured"} successfully`,
            folder
        });
    } catch (error) {
        console.error("Set folder secure error:", error);
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
};



module.exports = {
    createFolder,
    setFolderSecure
};
