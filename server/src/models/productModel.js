import mongoose from "mongoose";

const emiPlanSchema = new mongoose.Schema({
  monthlyAmount: { type: Number, required: true },
  tenure: { type: Number, required: true }, // months
  interestRate: { type: Number, required: true }, // percentage
  cashback: { type: Number, default: 0 }, // cashback amount
});

const colorSchema = new mongoose.Schema({
  name: { type: String, required: true }, // e.g. "Silver"
  hex: { type: String, required: true },
  image: { type: String, required: true }, // unique image per color
});

const storageOptionSchema = new mongoose.Schema({
  size: { type: String, required: true }, // e.g. "256GB"
  mrp: { type: Number, required: true },
  price: { type: Number, required: true },
  emiPlans: [emiPlanSchema],
});

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    brand: { type: String, required: true },
    category: { type: String, default: "Smartphones" },
    isNewProduct: { type: Boolean, default: false },
    colors: [colorSchema],
    storageOptions: [storageOptionSchema],
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
