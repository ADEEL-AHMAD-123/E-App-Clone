const express = require("express");
const router = express.Router();
const {
    createShop,
    activateUser,
    loginShop,
    getSeller,
    logoutSeller,
    getShopInfo,
    updateShopAvatar,
    updateSellerInfo, 
    getAllSellers, 
    deleteSeller, 
    updatePaymentMethods,
    deleteWithdrawMethods
} = require("../controller/shop");
const { isAuthenticated, isSeller, isAdmin } = require("../middleware/auth");

// Create Shop
router.post("/create-shop", createShop);

// Activate User
router.post("/activation", activateUser);

// Login Shop
router.post("/login-shop", loginShop);

// Load Shop
router.get("/getSeller", isSeller, getSeller);

// Logout Shop
router.get("/logout", logoutSeller);

// Get Shop Info
router.get("/get-shop-info/:id", getShopInfo);

// Update Shop Profile Picture
router.put("/update-shop-avatar", isSeller, updateShopAvatar);

// Update Seller Info
router.put("/update-seller-info", isSeller, updateSellerInfo);

// Get All Sellers (Admin)
router.get("/admin-all-sellers", isAuthenticated, isAdmin("Admin"), getAllSellers);

// Delete Seller (Admin)
router.delete("/delete-seller/:id", isAuthenticated, isAdmin("Admin"), deleteSeller);

// Update Payment Methods
router.put("/update-payment-methods", isSeller, updatePaymentMethods);

// Delete Withdraw Methods
router.delete("/delete-withdraw-method", isSeller, deleteWithdrawMethods);

module.exports = router;
