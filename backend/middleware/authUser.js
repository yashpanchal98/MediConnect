// middleware/authUser.js
import jwt from "jsonwebtoken";

const authUser = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ success: false, message: "Unauthorized user" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id; // ✅ attach userId directly
    next();
  } catch (error) {
    console.error("Auth error:", error);
    res.status(401).json({ success: false, message: "Invalid token" });
  }
};

export default authUser;