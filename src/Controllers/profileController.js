// Controllers/profileController.js
const User = require("../Models/User");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");

// Update profile
const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name } = req.body;
    const profilePhoto = req.file ? req.file.path : null;

    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ message: "User not found" });

    // Delete old photo if exists
    if (profilePhoto && user.profilePhoto) {
      fs.unlink(user.profilePhoto, (err) => {
        if (err) console.error("Error deleting old photo:", err);
      });
    }

    user.name = name || user.name;
    if (profilePhoto) user.profilePhoto = profilePhoto;

    await user.save();

    res.status(200).json({
      message: "Profile updated",
      user: {
        name: user.name,
        email: user.email,
        profilePhoto: user.profilePhoto,
      },
    });
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({ message: "Profile update failed", error: error.message });
  }
};


// Set security password
const setSecurityPassword = async (req, res) => {
  try {
    const userId = req.user.id;
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { securityPassword: hashedPassword },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Security password set successfully!" });
  } catch (error) {
    console.error("Set password error:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

module.exports = {
  updateProfile,
  setSecurityPassword,
};
