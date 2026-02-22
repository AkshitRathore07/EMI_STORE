import Product from "../models/productModel.js";

// GET /api/products/brands
export async function getBrands(req, res) {
  try {
    const brands = await Product.distinct("brand");
    res.json(brands.sort());
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// GET /api/products  (supports optional ?brand=)
export async function getProducts(req, res) {
  try {
    const filter = {};
    if (req.query.brand) filter.brand = req.query.brand;

    const products = await Product.find(filter).select(
      "name slug brand category isNewProduct colors storageOptions.size storageOptions.mrp storageOptions.price storageOptions.emiPlans"
    );
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// GET /api/products/:slug
export async function getProductBySlug(req, res) {
  try {
    const product = await Product.findOne({ slug: req.params.slug });
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export default {
  getBrands,
  getProducts,
  getProductBySlug,
};
