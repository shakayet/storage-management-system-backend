const User = require('../Models/User');
const mongoose = require('mongoose');

exports.deleteAccount = async (req, res) => {
  try {
    console.log("Complete request user object:", req.user);
    
    // If req.user is completely empty
    if (!req.user || Object.keys(req.user).length === 0) {
      return res.status(401).json({
        message: "Middleware failed - No user object attached",
        requiredAction: "Check your auth middleware implementation",
        receivedHeaders: {
          authorization: req.headers.authorization,
          contentType: req.headers['content-type']
        }
      });
    }

    const userId = req.user._id || req.user.id;
    
    if (!userId) {
      return res.status(401).json({
        message: "No user ID found",
        userObjectReceived: req.user,
        possibleSolutions: [
          "Verify your token includes _id field",
          "Check middleware user attachment"
        ]
      });
    }

    // Force conversion to ObjectId
    const userIdObj = new mongoose.Types.ObjectId(userId);
    const deletedUser = await User.findByIdAndDelete(userIdObj);

    if (!deletedUser) {
      return res.status(404).json({
        message: "User not found",
        attemptedId: userId,
        databaseCheck: "Verify this ID exists in your Users collection"
      });
    }

    return res.status(200).json({
      message: "Account deleted successfully",
      deletedId: deletedUser._id
    });

  } catch (error) {
    console.error("Delete Account Error:", {
      error: error.message,
      stack: error.stack,
      timestamp: new Date()
    });
    
    return res.status(500).json({
      message: "Deletion failed",
      technicalError: error.message,
      actionRequired: "Check server logs for complete error details"
    });
  }
};