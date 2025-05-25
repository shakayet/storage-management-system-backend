const express = require("express");
const router = express.Router();
const { verifySecurePassword, getSecureFolders } = require("../Controllers/secureFolderController");
const { verifyToken } = require("../Middlewares/authMiddleware");
const { verifySecureAccess } = require("../Middlewares/verifySecureAccess");

router.get("/secure", verifyToken, verifySecureAccess, getSecureFolders);
router.post("/access", verifyToken, verifySecurePassword);

module.exports = router;
