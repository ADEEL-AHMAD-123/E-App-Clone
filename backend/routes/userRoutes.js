const express = require("express");
const {
  createUser,
  activateUser,
  loginUser,
  getUser,
  logoutUser,
  updateUserInfo,
  updateAvatar,
  updateUserAddresses,
  deleteUserAddress,
  updateUserPassword,
  getUserInfo,
  adminGetAllUsers,
  adminDeleteUser
} = require("../controller/user");
const { isAuthenticated, isAdmin } = require("../middleware/auth");

const router = express.Router();

// Create user
router.post("/create-user", createUser);

// Activate user
router.post("/activation", activateUser);

// Login user
router.post("/login-user", loginUser);

// Load user
router.get("/getuser", isAuthenticated, getUser);

// Log out user
router.get("/logout", logoutUser);

// Update user info
router.put("/update-user-info", isAuthenticated, updateUserInfo);

// Update user avatar
router.put("/update-avatar", isAuthenticated, updateAvatar);

// Update user addresses
router.put("/update-user-addresses", isAuthenticated, updateUserAddresses);

// Delete user address
router.delete("/delete-user-address/:id", isAuthenticated, deleteUserAddress);

// Update user password
router.put("/update-user-password", isAuthenticated, updateUserPassword);

// Find user information with the userId
router.get("/user-info/:id", getUserInfo);

// All users --- for admin
router.get("/admin-all-users", isAuthenticated, isAdmin("Admin"), adminGetAllUsers);

// Delete users --- admin
router.delete("/delete-user/:id", isAuthenticated, isAdmin("Admin"), adminDeleteUser);

module.exports = router;
