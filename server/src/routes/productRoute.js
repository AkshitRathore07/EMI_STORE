import express from "express";
import * as productController from "../controllers/productController.js";

const router = express.Router();

// GET /api/products/brands
router.get("/brands", productController.getBrands);

// GET /api/products
router.get("/", productController.getProducts);

// GET /api/products/:slug
router.get("/:slug", productController.getProductBySlug);

export default router;
