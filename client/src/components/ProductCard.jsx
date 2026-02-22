import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  const firstColor = product.colors?.[0];
  const firstStorage = product.storageOptions?.[0];
  if (!firstColor || !firstStorage) return null;

  const lastPlan = firstStorage.emiPlans?.[firstStorage.emiPlans?.length - 1];
  const discount = Math.round(
    ((firstStorage.mrp - firstStorage.price) / firstStorage.mrp) * 100
  );

  return (
    <Link
      to={`/products/${product.slug}`}
      className="group relative bg-white rounded-2xl overflow-hidden flex flex-col card-hover border border-gray-100"
    >
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
        {product.isNewProduct && (
          <span className="bg-gradient-to-r from-orange-500 to-orange-600 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md shadow-md shadow-orange-200/50">
            New
          </span>
        )}
        {discount > 0 && (
          <span className="bg-green-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-md shadow-md shadow-green-200/50">
            {discount}% OFF
          </span>
        )}
      </div>

      {/* Image */}
      <div className="relative flex items-center justify-center p-6 bg-gradient-to-b from-gray-50 to-white h-56 overflow-hidden">
        <img
          src={firstColor.image}
          alt={product.name}
          className="max-h-full object-contain img-transition group-hover:scale-110"
          onError={(e) => {
            e.target.src =
              "https://placehold.co/300x300/f1f5f9/94a3b8?text=No+Image";
          }}
        />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Info */}
      <div className="p-5 flex flex-col gap-2 flex-1 border-t border-gray-50">
        {/* Brand */}
        <p className="text-xs font-semibold text-orange-500 uppercase tracking-wider">
          {product.brand}
        </p>

        <h3 className="text-base font-bold text-gray-900 leading-snug group-hover:text-orange-600 transition-colors duration-200">
          {product.name}
        </h3>

        <p className="text-xs text-gray-400 font-medium">
          {firstColor.name} · {firstStorage.size}
        </p>

        {/* Price */}
        <div className="flex items-baseline gap-2 mt-auto pt-2">
          <span className="text-xl font-extrabold text-gray-900">
            ₹{firstStorage.price.toLocaleString("en-IN")}
          </span>
          <span className="text-sm line-through text-gray-300 font-medium">
            ₹{firstStorage.mrp.toLocaleString("en-IN")}
          </span>
        </div>

        {/* Colors row */}
        <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-50">
          <div className="flex gap-1">
            {product.colors.map((c, i) => (
              <span
                key={i}
                className="w-3.5 h-3.5 rounded-full border border-gray-200 shadow-inner"
                style={{ backgroundColor: c.hex }}
                title={c.name}
              />
            ))}
            <span className="text-[10px] text-gray-400 ml-1.5 self-center font-medium">
              +{product.storageOptions.length} sizes
            </span>
          </div>

          {lastPlan && (
            <span className="text-[11px] text-orange-600 font-semibold bg-orange-50 px-2 py-0.5 rounded-md">
              ₹{lastPlan.monthlyAmount.toLocaleString("en-IN")}/mo
            </span>
          )}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="px-5 py-3 bg-gray-50/50 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-400 font-medium">
            View EMI plans →
          </span>
          <span className="w-7 h-7 rounded-full bg-orange-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0 shadow-md shadow-orange-200">
            <svg
              className="w-3.5 h-3.5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}
