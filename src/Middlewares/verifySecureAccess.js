const accessMap = new Map();

const verifySecureAccess = (req, res, next) => {
  const userId = req.user.id;

  const accessGranted = accessMap.get(userId);

  if (!accessGranted) {
    return res.status(403).json({ message: "Access to secure folder denied. Please verify your password first." });
  }

  next();
};

// Temporary function to grant access (called after successful password verification)
const grantSecureAccess = (userId) => {
  accessMap.set(userId, true);

  // Optional: auto-expire access after 10 minutes
  setTimeout(() => {
    accessMap.delete(userId);
  }, 10 * 60 * 1000); // 10 minutes
};

module.exports = {
  verifySecureAccess,
  grantSecureAccess,
};
