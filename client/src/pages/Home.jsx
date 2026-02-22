import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { fetchBrands, fetchProducts } from "../services/productService";

function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
      <div className="h-56 skeleton" />
      <div className="p-5 space-y-3">
        <div className="h-5 w-3/4 skeleton" />
        <div className="h-4 w-1/2 skeleton" />
        <div className="h-6 w-2/3 skeleton mt-2" />
        <div className="flex gap-1.5 mt-2">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="w-4 h-4 rounded-full skeleton" />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [activeBrand, setActiveBrand] = useState("All");
  const [loading, setLoading] = useState(true);

  // Fetch brand list once on mount (with abort support)
  useEffect(() => {
    const ac = new AbortController();
    fetchBrands(ac.signal)
      .then((data) => setBrands(data))
      .catch((err) => {
        if (err.name !== "AbortError") console.error(err);
      });
    return () => ac.abort();
  }, []);

  // Fetch products whenever activeBrand changes
  useEffect(() => {
    const ac = new AbortController();
    setLoading(true);
    fetchProducts(activeBrand, ac.signal)
      .then((data) => setProducts(data))
      .catch((err) => {
        if (err.name !== "AbortError") console.error(err);
      })
      .finally(() => setLoading(false));
    return () => ac.abort();
  }, [activeBrand]);

  return (
    <>
      {/* ── Hero Section ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-white to-amber-50">
        {/* Decorative blobs */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-orange-200/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-amber-200/20 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="text-center max-w-3xl mx-auto">
            <div className="animate-fade-in">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-100/80 text-orange-700 text-sm font-semibold mb-6 border border-orange-200/50">
                <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                Powered by Mutual Funds
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight tracking-tight animate-fade-in-up">
              Buy Smartphones on
              <span className="block gradient-text mt-1">Easy EMIs</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-gray-500 leading-relaxed max-w-2xl mx-auto animate-fade-in-up delay-200">
              0% interest EMI plans backed by mutual funds. Get your dream phone
              today with flexible payment options.
            </p>

            {/* Trust badges */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400 animate-fade-in-up delay-400">
              {[
                {
                  icon: (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  ),
                  text: "Secure Payments",
                },
                {
                  icon: (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  ),
                  text: "0% Interest",
                },
                {
                  icon: (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  ),
                  text: "Instant Approval",
                },
              ].map((badge) => (
                <div
                  key={badge.text}
                  className="flex items-center gap-2 text-gray-500"
                >
                  <svg
                    className="w-5 h-5 text-orange-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {badge.icon}
                  </svg>
                  <span className="font-medium">{badge.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Curved bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" className="w-full text-gray-50 fill-current">
            <path d="M0,60 L0,20 Q720,80 1440,20 L1440,60 Z" />
          </svg>
        </div>
      </section>

      {/* ── Product Grid ── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8 animate-fade-in">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Featured Products
            </h2>
            <p className="text-gray-400 mt-1 text-sm">
              {loading
                ? "Loading products..."
                : `${products.length} product${products.length !== 1 ? "s" : ""} ${
                    activeBrand !== "All" ? `by ${activeBrand}` : "available"
                  }`}
            </p>
          </div>

          {/* Brand Filters (from API) */}
          <div className="flex flex-wrap items-center gap-2">
            {["All", ...brands].map((brand) => (
              <button
                key={brand}
                onClick={() => setActiveBrand(brand)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${
                  activeBrand === brand
                    ? "bg-gray-900 text-white shadow-md"
                    : "bg-white text-gray-500 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                {brand}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product, i) => (
              <div
                key={product._id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </main>
    </>
  );
}
