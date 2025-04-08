const jwt = require("jsonwebtoken");
const JWT_SECRET = "your_jwt_secret"; // Same as in auth.js

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

const managerOnly = (req, res, next) => {
  if (req.user.role !== "manager") {
    return res.status(403).json({ message: "Access denied: Managers only" });
  }
  next();
};

module.exports = { authMiddleware, managerOnly };
