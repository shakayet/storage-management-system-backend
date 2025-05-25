const bcrypt = require("bcryptjs");
const User = require("../Models/User");
const { grantSecureAccess } = require("../Middlewares/verifySecureAccess");
const Folder = require("../Models/Folder");

const verifySecurePassword = async (req, res) => {
  try {
    const { password } = req.body;
    const userId = req.user.id;

    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }

    const user = await User.findById(userId).select("+securityPassword");

    if (!user || !user.securityPassword) {
      return res.status(403).json({ message: "No security password set" });
    }

    const isMatch = await bcrypt.compare(password, user.securityPassword);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid security password" });
    }

    grantSecureAccess(userId); //  Grant access for next secure-folder requests

    res.status(200).json({ message: "Access granted to secure folder" });
  } catch (error) {
    console.error("Secure folder access error:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// Get secure folder

const getSecureFolders = async (req, res) => {
  try {
    const userId = req.user.id;

    const secureFolders = await Folder.find({
      user: userId,  // Changed from 'owner' to 'user' to match your schema
      isSecure: true,
    });

    res.status(200).json({ folders: secureFolders });
  } catch (error) {
    console.error("Error fetching secure folders:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getSecureFolders,
  verifySecurePassword,
};
