// Lightweight service layer for product-related API calls
// Centralizes fetch logic so components call these helpers instead of calling fetch directly.
// Base API URL comes from Vite env `VITE_API_URL`; fallback to '' for same-origin
const API = (import.meta.env.VITE_API_URL ?? "").replace(/\/$/, "");
async function handleResponse(res) {
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`API error ${res.status}: ${text}`);
  }
  return res.json();
}

export async function fetchBrands(signal) {
  const res = await fetch(`${API}/api/products/brands`, { signal });
  return handleResponse(res);
}

export async function fetchProducts(brand = "All", signal) {
  const url = brand && brand !== "All" ? `${API}/api/products?brand=${encodeURIComponent(brand)}` : `${API}/api/products`;
  const res = await fetch(url, { signal });
  return handleResponse(res);
}

export async function fetchProductBySlug(slug, signal) {
  const res = await fetch(`${API}/api/products/${encodeURIComponent(slug)}`, { signal });
  return handleResponse(res);
}

export default {
  fetchBrands,
  fetchProducts,
  fetchProductBySlug,
};
