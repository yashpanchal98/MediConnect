import jwt from "jsonwebtoken";

const authDoctor = async (req, res, next) => {
  try {

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer")) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: No token provided"
      });
    }

    const token = authHeader.split(" ")[1];

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded || !decoded.id) {
      return res.status(401).json({
        success: false,
        message: "Invalid token"
      });
    }

    // Attach doctor ID to request
    req.doctorId = decoded.id;
    // console.log("Decoded doctor:", decoded);

    next();

  } catch (error) {
    console.error("Doctor Auth Error:", error);

    return res.status(401).json({
      success: false,
      message: "Authentication failed"
    });
  }
};

export default authDoctor;