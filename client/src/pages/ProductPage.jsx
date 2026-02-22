import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import EmiPlanCard from "../components/EmiPlanCard";
import { fetchProductBySlug } from "../services/productService";

function SkeletonProductPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="h-4 w-48 skeleton mb-8" />
      <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="p-8 flex flex-col items-center gap-4">
            <div className="w-64 h-64 skeleton rounded-2xl" />
            <div className="flex gap-3 mt-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-10 h-10 rounded-full skeleton" />
              ))}
            </div>
          </div>
          <div className="p-8 space-y-4">
            <div className="h-6 w-3/4 skeleton" />
            <div className="h-10 w-1/2 skeleton" />
            <div className="h-4 w-full skeleton" />
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-16 skeleton" />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

export default function ProductPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const [selectedStorageIdx, setSelectedStorageIdx] = useState(0);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [imageVisible, setImageVisible] = useState(true);
  const [displayedColorIdx, setDisplayedColorIdx] = useState(0);

  useEffect(() => {
    const ac = new AbortController();
    let mounted = true;
    setLoading(true);
    fetchProductBySlug(slug, ac.signal)
      .then((data) => {
        if (!mounted) return;
        setProduct(data);
        setSelectedColorIdx(0);
        setSelectedStorageIdx(0);
        setSelectedPlan(null);
      })
      .catch((err) => {
        if (err.name !== "AbortError") console.error(err);
        if (mounted) setProduct(null);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
      ac.abort();
    };
  }, [slug]);

  if (loading) return <SkeletonProductPage />;

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center">
          <svg
            className="w-8 h-8 text-gray-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <p className="text-gray-400 text-lg font-medium">Product not found</p>
        <Link
          to="/"
          className="text-sm text-orange-500 hover:text-orange-600 font-semibold"
        >
          ← Back to products
        </Link>
      </div>
    );
  }

  const color = product.colors[selectedColorIdx];
  const displayedColor = product.colors[displayedColorIdx];
  const storage = product.storageOptions[selectedStorageIdx];
  const discount = Math.round(
    ((storage.mrp - storage.price) / storage.mrp) * 100
  );

  const handleColorChange = (i) => {
    if (i === selectedColorIdx) return;
    setSelectedColorIdx(i);
    setSelectedPlan(null);
    // Fade out current image, swap source, then fade back in
    setImageVisible(false);
    setTimeout(() => {
      setDisplayedColorIdx(i);
      setImageVisible(true);
    }, 300);
  };

  const handleStorageChange = (i) => {
    setSelectedStorageIdx(i);
    setSelectedPlan(null);
  };

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm mb-6 animate-fade-in">
        <Link
          to="/"
          className="text-gray-400 hover:text-orange-500 transition-colors font-medium"
        >
          Home
        </Link>
        <svg
          className="w-3.5 h-3.5 text-gray-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
        <Link
          to="/"
          className="text-gray-400 hover:text-orange-500 transition-colors font-medium"
        >
          Products
        </Link>
        <svg
          className="w-3.5 h-3.5 text-gray-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
        <span className="text-gray-700 font-semibold truncate">
          {product.name}
        </span>
      </nav>

      {/* Product card */}
      <div className="bg-white rounded-3xl overflow-hidden shadow-xl shadow-gray-200/50 border border-gray-100 animate-scale-in">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {/* ── Left: Image & selectors ── */}
          <div className="relative flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-50 p-8 md:p-10">
            {/* Badges */}
            <div className="absolute top-6 left-6 flex flex-col gap-2 z-10">
              {product.isNewProduct && (
                <span className="bg-gradient-to-r from-orange-500 to-orange-600 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-lg shadow-md shadow-orange-200/50">
                  New
                </span>
              )}
              {discount > 0 && (
                <span className="bg-green-500 text-white text-[10px] font-bold px-3 py-1 rounded-lg shadow-md shadow-green-200/50">
                  {discount}% OFF
                </span>
              )}
            </div>

            {/* Product title (mobile) */}
            <div className="w-full mb-4 md:mb-6 text-center">
              <p className="text-xs font-bold text-orange-500 uppercase tracking-wider mb-1">
                {product.brand}
              </p>
              <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
                {product.name}
              </h1>
            </div>

            {/* Image with smooth crossfade transition */}
            <div className="relative w-full flex items-center justify-center mb-6">
              <div className="absolute inset-0 bg-gradient-radial from-orange-50/50 to-transparent rounded-3xl" />
              <img
                src={displayedColor.image}
                alt={`${product.name} ${displayedColor.name}`}
                className={`relative w-56 h-56 md:w-64 md:h-64 object-contain img-crossfade ${
                  imageVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
                }`}
                onError={(e) => {
                  e.target.src =
                    "https://placehold.co/300x300/f1f5f9/94a3b8?text=No+Image";
                }}
              />
            </div>

            {/* Color selector */}
            <div className="flex flex-col items-center gap-3">
              <div className="flex gap-3">
                {product.colors.map((c, i) => (
                  <button
                    key={i}
                    onClick={() => handleColorChange(i)}
                    className={`group/color relative w-10 h-10 rounded-full transition-all duration-300 cursor-pointer ${
                      i === selectedColorIdx
                        ? "ring-2 ring-offset-2 ring-orange-500 scale-110"
                        : "ring-1 ring-gray-200 hover:ring-gray-300 hover:scale-105"
                    }`}
                    style={{ backgroundColor: c.hex }}
                    title={c.name}
                  >
                    {i === selectedColorIdx && (
                      <span className="absolute inset-0 rounded-full animate-ping bg-orange-400/20" />
                    )}
                  </button>
                ))}
              </div>
              <span className="text-sm font-semibold text-gray-600">
                {color.name}
              </span>
            </div>

            {/* Storage selector */}
            <div className="flex gap-2 mt-6">
              {product.storageOptions.map((s, i) => (
                <button
                  key={i}
                  onClick={() => handleStorageChange(i)}
                  className={`px-5 py-2.5 rounded-xl text-sm font-semibold border-2 transition-all duration-300 cursor-pointer ${
                    i === selectedStorageIdx
                      ? "border-orange-500 bg-orange-50 text-orange-700 shadow-md shadow-orange-100"
                      : "border-gray-200 bg-white text-gray-500 hover:border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {s.size}
                </button>
              ))}
            </div>
          </div>

          {/* ── Right: Price + EMI plans ── */}
          <div className="p-8 md:p-10 flex flex-col border-l border-gray-100">
            {/* Price block */}
            <div className="mb-6 pb-6 border-b border-gray-100 animate-fade-in">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-bold text-green-600 bg-green-50 px-2.5 py-1 rounded-md uppercase tracking-wider">
                  {discount}% off
                </span>
                <span className="text-xs text-gray-400 font-medium">
                  Limited time offer
                </span>
              </div>
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-extrabold text-gray-900 tracking-tight">
                  ₹{storage.price.toLocaleString("en-IN")}
                </span>
                <span className="text-lg line-through text-gray-300 font-medium">
                  ₹{storage.mrp.toLocaleString("en-IN")}
                </span>
              </div>
              <p className="text-sm text-gray-400 mt-2 flex items-center gap-1.5">
                <svg
                  className="w-4 h-4 text-orange-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
                EMI plans backed by mutual funds
              </p>
            </div>

            {/* EMI Section Header */}
            <div className="flex items-center justify-between mb-4 animate-fade-in delay-100">
              <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider">
                Choose EMI Plan
              </h3>
              <span className="text-xs text-gray-400 font-medium">
                {storage.emiPlans.length} plans available
              </span>
            </div>

            {/* EMI Plans */}
            <div className="flex flex-col gap-2.5 flex-1 overflow-y-auto max-h-[380px] pr-1 scrollbar-thin">
              {storage.emiPlans.map((plan, i) => (
                <div
                  key={`${selectedStorageIdx}-${i}`}
                  className="animate-fade-in"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <EmiPlanCard
                    plan={plan}
                    selected={selectedPlan === plan}
                    onSelect={setSelectedPlan}
                    isBestValue={plan.interestRate === 0 && plan.tenure <= 6}
                  />
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="mt-6 pt-6 border-t border-gray-100 animate-fade-in delay-300">
              {selectedPlan && (
                <div className="flex items-center justify-between mb-3 text-sm">
                  <span className="text-gray-400">Selected plan</span>
                  <span className="font-bold text-gray-700">
                    ₹{selectedPlan.monthlyAmount.toLocaleString("en-IN")}/mo ×{" "}
                    {selectedPlan.tenure} months
                  </span>
                </div>
              )}
              <button
                disabled={!selectedPlan}
                onClick={() =>
                  alert(
                    `Proceeding with ₹${selectedPlan.monthlyAmount.toLocaleString(
                      "en-IN"
                    )}/mo x ${selectedPlan.tenure} months plan for ${product.name} ${color.name} ${storage.size}`
                  )
                }
                className={`w-full py-3.5 rounded-2xl text-base font-bold transition-all duration-300 cursor-pointer ${
                  selectedPlan
                    ? "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg shadow-orange-200/50 hover:shadow-xl hover:shadow-orange-300/50 active:scale-[0.98]"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                }`}
              >
                {selectedPlan ? (
                  <span className="flex items-center justify-center gap-2">
                    Proceed with EMI Plan
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </span>
                ) : (
                  "Select an EMI Plan"
                )}
              </button>
              <p className="text-center text-[11px] text-gray-300 mt-3">
                Secure checkout · No hidden charges
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
