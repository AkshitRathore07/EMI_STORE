import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoute.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
// Allow CORS from configured frontend origin (set CLIENT_URL in production)
const corsOrigin = process.env.CLIENT_URL || '*';
app.use(cors({ origin: corsOrigin , credentials: true }));
app.use(express.json());

// Routes
app.use("/api/products", productRoutes);

// Health check
app.get("/", (req, res) => res.json({ message: "EMI Store API is running" }));

// Start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
