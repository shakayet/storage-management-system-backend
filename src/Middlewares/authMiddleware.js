const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized access" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Debugging logs
    console.log("Decoded token:", decoded);
    
    // Properly attach user information
    req.user = {
      id: decoded._id,    // Your token uses _id
      _id: decoded._id,   // Duplicate for compatibility
      email: decoded.email,
      role: decoded.role,
      rawToken: decoded   // For debugging
    };
    
    console.log("Attached user:", req.user);

    next();
  } catch (err) {
    console.error("Token verification error:", err);
    return res.status(403).json({ 
      message: "Invalid token",
      error: err.message 
    });
  }
};

module.exports = { verifyToken };