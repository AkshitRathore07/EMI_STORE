import dotenv from "dotenv";
import mongoose from "mongoose";
import Product from "./models/productModel.js";
import connectDB from "./config/db.js";

dotenv.config();

// Helper: generate EMI plans for a given price
function generateEmiPlans(price) {
  const cashback = Math.round(price * 0.055 / 500) * 500; // ~5.5% rounded
  return [
    { monthlyAmount: Math.round(price / 3), tenure: 3, interestRate: 0, cashback },
    { monthlyAmount: Math.round(price / 6), tenure: 6, interestRate: 0, cashback },
    { monthlyAmount: Math.round(price / 12), tenure: 12, interestRate: 0, cashback },
    { monthlyAmount: Math.round(price / 24), tenure: 24, interestRate: 0, cashback },
    { monthlyAmount: Math.round(price * 0.0338), tenure: 36, interestRate: 10.5, cashback },
    { monthlyAmount: Math.round(price * 0.0266), tenure: 48, interestRate: 10.5, cashback },
    { monthlyAmount: Math.round(price * 0.0223), tenure: 60, interestRate: 10.5, cashback },
  ];
}

const products = [
  // ─── Product 1: iPhone 17 Pro ────────────────────────────────
  {
    name: "iPhone 17 Pro",
    slug: "iphone-17-pro",
    brand: "Apple",
    category: "Smartphones",
    isNewProduct: true,
    colors: [
      {
        name: "Natural Titanium",
        hex: "#BFA48E",
        image: "https://media-ik.croma.com/prod/https://media.tatacroma.com/Croma%20Assets/Communication/Mobiles/Images/309747_0_aerxf2.png?tr=w-600",
      },
      {
        name: "Black Titanium",
        hex: "#3B3B3D",
        image: "https://media.tatacroma.com/Croma%20Assets/Communication/Mobiles/Images/309729_0_mnt0xu.png",
      },
      {
        name: "White Titanium",
        hex: "#F2F1EB",
        image: "https://media.tatacroma.com/Croma%20Assets/Communication/Mobiles/Images/309730_0_zf9qar.png",
      },
      {
        name: "Desert Titanium",
        hex: "#C4A882",
        image: "https://media-ik.croma.com/prod/https://media.tatacroma.com/Croma%20Assets/Communication/Mobiles/Images/309746_0_itb0g6.png",
      },
    ],
    storageOptions: [
      { size: "256GB", mrp: 134900, price: 127400, emiPlans: generateEmiPlans(127400) },
      { size: "512GB", mrp: 154900, price: 147400, emiPlans: generateEmiPlans(147400) },
      { size: "1TB",   mrp: 174900, price: 167400, emiPlans: generateEmiPlans(167400) },
    ],
  },

  // ─── Product 2: Samsung Galaxy S24 Ultra ─────────────────────
  {
    name: "Samsung Galaxy S24 Ultra",
    slug: "samsung-s24-ultra",
    brand: "Samsung",
    category: "Smartphones",
    isNewProduct: false,
    colors: [
      {
        name: "Titanium Gray",
        hex: "#7A7A7A",
        image: "https://media.tatacroma.com/Croma%20Assets/Communication/Mobiles/Images/303840_rlonbq.png",
      },
      {
        name: "Titanium Violet",
        hex: "#9B7DB8",
        image: "https://media.tatacroma.com/Croma%20Assets/Communication/Mobiles/Images/303817_4_wgxzg1.png",
      },
      {
        name: "Titanium Yellow",
        hex: "#E8D44D",
        image: "https://media-ik.croma.com/prod/https://media.tatacroma.com/Croma%20Assets/Communication/Mobiles/Images/303809_kwm8bv.png",
      },
      {
        name: "Titanium Black",
        hex: "#2B2B2B",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6cny5S7MiRdveF4NQi8aE77EnfiFt4pZg2A&s",
      },
    ],
    storageOptions: [
      { size: "256GB", mrp: 134999, price: 121999, emiPlans: generateEmiPlans(121999) },
      { size: "512GB", mrp: 144999, price: 131999, emiPlans: generateEmiPlans(131999) },
      { size: "1TB",   mrp: 164999, price: 151999, emiPlans: generateEmiPlans(151999) },
    ],
  },

  // ─── Product 3: OnePlus 13 ───────────────────────────────────
  {
    name: "OnePlus 13",
    slug: "oneplus-13",
    brand: "OnePlus",
    category: "Smartphones",
    isNewProduct: true,
    colors: [
      {
        name: "Midnight Ocean",
        hex: "#1B3A5C",
        image: "https://media-ik.croma.com/prod/https://media.tatacroma.com/Croma%20Assets/Communication/Mobiles/Images/312534_0_bcgauh.png",
      },
      {
        name: "Arctic Dawn",
        hex: "#F5F0E8",
        image: "https://media-ik.croma.com/prod/https://media.tatacroma.com/Croma%20Assets/Communication/Mobiles/Images/312536_0_ymiz2z.png?tr=w-600",
      },
      {
        name: "Black Eclipse",
        hex: "#1A1A1A",
        image: "https://media.tatacroma.com/Croma%20Assets/Communication/Mobiles/Images/312540_0_uzcjlb.png",
      },
    ],
    storageOptions: [
      { size: "256GB", mrp: 69999,  price: 65999,  emiPlans: generateEmiPlans(65999)  },
      { size: "512GB", mrp: 79999,  price: 75999,  emiPlans: generateEmiPlans(75999)  },
      { size: "1TB",   mrp: 89999,  price: 85999,  emiPlans: generateEmiPlans(85999)  },
    ],
  },

  // ─── Product 4: Google Pixel 9 Pro ───────────────────────────
  {
    name: "Google Pixel 9 Pro",
    slug: "google-pixel-9-pro",
    brand: "Google",
    category: "Smartphones",
    isNewProduct: true,
    colors: [
      {
        name: "Obsidian",
        hex: "#2C2C2C",
        image: "https://media.tatacroma.com/Croma%20Assets/Communication/Mobiles/Images/309165_0_gvylu0.png",
      },
      {
        name: "Porcelain",
        hex: "#F2EDE3",
        image: "https://media.tatacroma.com/Croma%20Assets/Communication/Mobiles/Images/309145_0_liywir.png",
      },
      {
        name: "Hazel",
        hex: "#8B7B6B",
        image: "https://media-ik.croma.com/prod/https://media.tatacroma.com/Croma%20Assets/Communication/Mobiles/Images/309163_0_s395j3.png",
      },
    ],
    storageOptions: [
      { size: "256GB", mrp: 109999, price: 99999,  emiPlans: generateEmiPlans(99999)  },
      { size: "512GB", mrp: 124999, price: 114999, emiPlans: generateEmiPlans(114999) },
      { size: "1TB",   mrp: 144999, price: 134999, emiPlans: generateEmiPlans(134999) },
    ],
  },
];

const seedDB = async () => {
  await connectDB();
  await Product.deleteMany({});
  console.log("Cleared existing products");

  await Product.insertMany(products);
  console.log(`Seeded ${products.length} products`);

  process.exit(0);
};

seedDB().catch((err) => {
  console.error(err);
  process.exit(1);
});
