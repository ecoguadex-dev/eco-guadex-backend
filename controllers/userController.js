import User from "../models/User.js";

// GET LOGGED-IN USER PROFILE
export const getUserProfile = async (req, res) => {
  try {
    // req.user is attached by the protect middleware
    const user = req.user;

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  } catch (error) {
    console.error("Profile Error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};