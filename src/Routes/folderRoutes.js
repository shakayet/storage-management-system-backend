const express = require("express");
const { createFolder } = require("../Controllers/folderController");
const { verifyToken } = require("../Middlewares/authMiddleware");
const { setFolderSecure } = require("../Controllers/folderController");

const router = express.Router();

router.post("/", verifyToken, createFolder);
router.patch('/:folderId/secure', verifyToken, setFolderSecure);

module.exports = router;
