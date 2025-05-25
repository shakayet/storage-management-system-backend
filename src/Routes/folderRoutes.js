const express = require("express");
const { createFolder } = require("../Controllers/folderController");
const { verifyToken } = require("../Middlewares/authMiddleware");

const router = express.Router();

router.post("/", verifyToken, createFolder);

module.exports = router;
