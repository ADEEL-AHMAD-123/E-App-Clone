const express = require("express");
const { isSeller, isAuthenticated, isAdmin } = require("../middleware/auth");
const {
  createProduct,
  getAllProductsOfShop,
  deleteProductOfShop,
  getAllProducts,
  createNewReview,
  adminGetAllProducts,
} = require("../controller/product");

const router = express.Router();

// Create product
router.post("/create-product", isSeller, createProduct);

// Get all products of a shop
router.get("/get-all-products-shop/:id", getAllProductsOfShop);

// Delete product of a shop
router.delete("/delete-shop-product/:id", isSeller, deleteProductOfShop);

// Get all products
router.get("/get-all-products", getAllProducts);

// Create new review
router.put("/create-new-review", isAuthenticated, createNewReview);

// Get all products for admin
router.get("/admin-all-products", isAuthenticated, isAdmin("Admin"), adminGetAllProducts);

module.exports = router;
