const express = require("express");
const router = express.Router();
const { registerUser, loginUser,refreshAccessToken,logoutUser, getMe } = require("../controllers/userController");
const { createUserByAdmin } = require("../controllers/userController");
const { protect, isAdmin } = require("../middleware/authMiddleware");

// router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/refresh-token", refreshAccessToken);
router.post("/logout", logoutUser);
router.post("/create", protect, isAdmin, createUserByAdmin);
router.get("/me", protect, getMe);


module.exports = router;
