# EMI Store

A full-stack e-commerce web app that lets users browse smartphones and view EMI (Equated Monthly Installment) plans. Built with React + Vite on the frontend and Express + MongoDB on the backend.

---

## Tech Stack

| Layer     | Technology                                        |
| --------- | ------------------------------------------------- |
| Frontend  | React 19, React Router 7, Tailwind CSS 4, Vite 6 |
| Backend   | Node.js, Express 4, Mongoose 8                    |
| Database  | MongoDB (Atlas or local)                          |
| Dev Tools | Nodemon, Vite Dev Server + Proxy                  |

---

## Project Structure

```
emi-store/
├── client/                 # React frontend (Vite)
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Route pages (Home, ProductPage)
│   │   ├── services/       # API service layer (productService.js)
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── .env                # VITE_API_URL (frontend env)
│   ├── vite.config.js
│   └── package.json
│
├── server/                 # Express backend
│   ├── src/
│   │   ├── config/         # db.js (MongoDB connection)
│   │   ├── controllers/    # productController.js
│   │   ├── models/         # productModel.js (Mongoose schemas)
│   │   ├── routes/         # productRoute.js
│   │   ├── seed.js         # Database seeder
│   │   └── index.js        # Express entry point
│   ├── .env                # PORT, MONGODB_URI, CLIENT_URL
│   └── package.json
│
└── README.md
```

---

## Setup & Run Instructions

### Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9
- **MongoDB** — either a local instance or a [MongoDB Atlas](https://www.mongodb.com/atlas) cluster

### 1. Clone the repo

```bash
git clone <your-repo-url>
cd emi-store
```

### 2. Backend setup

```bash
cd server
npm install
```

Create a `.env` file (or edit the existing one):

```env
PORT=5000
MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/emi-store
CLIENT_URL=http://localhost:5173
```

Seed the database with sample products:

```bash
npm run seed
```

Start the server:

```bash
# Development (auto-restart on changes)
npm run dev

# Production
npm start
```

The API will be available at `http://localhost:5000`.

### 3. Frontend setup

```bash
cd ../client
npm install
```

Create a `.env` file (or edit the existing one):

```env
VITE_API_URL=http://localhost:5000
```

> For local development with the Vite proxy you can leave `VITE_API_URL` empty — the proxy in `vite.config.js` forwards `/api` requests to the backend automatically.

Start the dev server:

```bash
npm run dev
```

Open `http://localhost:5173` in your browser.

### 4. Production build (frontend)

```bash
cd client
npm run build     # outputs to client/dist/
npm run preview   # preview the production build locally
```

---

## API Endpoints

Base URL: `http://localhost:5000`

### `GET /`

Health check.

**Response:**

```json
{ "message": "EMI Store API is running" }
```

---

### `GET /api/products/brands`

Returns a sorted list of unique brand names.

**Response:**

```json
["Apple", "Google", "OnePlus", "Samsung"]
```

---

### `GET /api/products`

Returns all products. Supports optional brand filter.

**Query params:**

| Param   | Type   | Description                      |
| ------- | ------ | -------------------------------- |
| `brand` | string | Filter by brand name (optional)  |

**Example:** `GET /api/products?brand=Apple`

**Response:**

```json
[
  {
    "_id": "...",
    "name": "iPhone 17 Pro",
    "slug": "iphone-17-pro",
    "brand": "Apple",
    "category": "Smartphones",
    "isNewProduct": true,
    "colors": [
      {
        "_id": "...",
        "name": "Natural Titanium",
        "hex": "#BFA48E",
        "image": "https://..."
      }
    ],
    "storageOptions": [
      {
        "_id": "...",
        "size": "256GB",
        "mrp": 134900,
        "price": 127400,
        "emiPlans": [
          {
            "_id": "...",
            "monthlyAmount": 42467,
            "tenure": 3,
            "interestRate": 0,
            "cashback": 7000
          }
        ]
      }
    ]
  }
]
```

---

### `GET /api/products/:slug`

Returns full details of a single product.

**Example:** `GET /api/products/iphone-17-pro`

**Response:**

```json
{
  "_id": "...",
  "name": "iPhone 17 Pro",
  "slug": "iphone-17-pro",
  "brand": "Apple",
  "category": "Smartphones",
  "isNewProduct": true,
  "colors": [ ... ],
  "storageOptions": [ ... ],
  "createdAt": "2025-01-20T...",
  "updatedAt": "2025-01-20T..."
}
```

**Error (404):**

```json
{ "error": "Product not found" }
```

---

## Database Schema

All schemas are defined in `server/src/models/productModel.js` using Mongoose.

### Product

| Field            | Type               | Required | Default        |
| ---------------- | ------------------ | -------- | -------------- |
| `name`           | String             | Yes      | —              |
| `slug`           | String (unique)    | Yes      | —              |
| `brand`          | String             | Yes      | —              |
| `category`       | String             | No       | "Smartphones"  |
| `isNewProduct`   | Boolean            | No       | false          |
| `colors`         | [Color]            | No       | []             |
| `storageOptions` | [StorageOption]    | No       | []             |
| `createdAt`      | Date (auto)        | —        | —              |
| `updatedAt`      | Date (auto)        | —        | —              |

### Color (sub-document)

| Field   | Type   | Required | Description                   |
| ------- | ------ | -------- | ----------------------------- |
| `name`  | String | Yes      | Color label, e.g. "Silver"    |
| `hex`   | String | Yes      | Hex code, e.g. "#BFA48E"      |
| `image` | String | Yes      | Product image URL for color   |

### StorageOption (sub-document)

| Field      | Type       | Required | Description              |
| ---------- | ---------- | -------- | ------------------------ |
| `size`     | String     | Yes      | e.g. "256GB"             |
| `mrp`      | Number     | Yes      | Maximum retail price     |
| `price`    | Number     | Yes      | Selling price            |
| `emiPlans` | [EmiPlan]  | No       | Available EMI plans      |

### EmiPlan (sub-document)

| Field           | Type   | Required | Default | Description           |
| --------------- | ------ | -------- | ------- | --------------------- |
| `monthlyAmount` | Number | Yes      | —       | Monthly EMI amount    |
| `tenure`        | Number | Yes      | —       | Duration in months    |
| `interestRate`  | Number | Yes      | —       | Interest rate (%)     |
| `cashback`      | Number | No       | 0       | Cashback amount (₹)   |

---

## Environment Variables

### Server (`server/.env`)

| Variable       | Description                            | Example                                     |
| -------------- | -------------------------------------- | ------------------------------------------- |
| `PORT`         | Server listen port                     | `5000`                                      |
| `MONGODB_URI`  | MongoDB connection string              | `mongodb+srv://user:pass@cluster/emi-store` |
| `CLIENT_URL`   | Allowed CORS origin (frontend URL)     | `http://localhost:5173`                     |

### Client (`client/.env`)

| Variable       | Description                            | Example                     |
| -------------- | -------------------------------------- | --------------------------- |
| `VITE_API_URL` | Backend API base URL                   | `http://localhost:5000`     |

---

## Deployment

| Component | Recommended Hosts                             |
| --------- | --------------------------------------------- |
| Frontend  | Vercel, Netlify, GitHub Pages, S3+CloudFront  |
| Backend   | Render, Heroku, DigitalOcean, AWS, Azure      |
| Database  | MongoDB Atlas (free tier available)            |

Set the environment variables on each host:
- **Frontend host:** `VITE_API_URL` → your deployed backend URL
- **Backend host:** `CLIENT_URL` → your deployed frontend URL

---

## License

MIT
