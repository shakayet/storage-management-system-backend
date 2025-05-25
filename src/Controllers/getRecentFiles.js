const File = require("../Models/File");

const getRecentFiles = async (req, res) => {
  try {
    const userId = req.user.id;

    // Get recent files for the logged-in user, sorted by updated time
    const recentFiles = await File.find({ user: userId })
      .sort({ updatedAt: -1 })
      .limit(10); // You can adjust the number of recent files to return

    res.status(200).json({ message: "Recent files fetched", files: recentFiles });
  } catch (error) {
    console.error("Get recent files error:", error);
    res.status(500).json({ message: "Failed to fetch recent files", error: error.message || error });
  }
};

module.exports = getRecentFiles;
