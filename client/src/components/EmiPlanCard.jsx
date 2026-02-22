export default function EmiPlanCard({
  plan,
  selected,
  onSelect,
  isBestValue,
}) {
  const isZeroInterest = plan.interestRate === 0;

  return (
    <button
      onClick={() => onSelect(plan)}
      className={`group relative w-full text-left rounded-2xl p-4 transition-all duration-300 cursor-pointer ${
        selected
          ? "bg-gradient-to-r from-orange-50 to-amber-50 border-2 border-orange-400 shadow-md shadow-orange-100/50"
          : "bg-white border border-gray-100 hover:border-orange-200 hover:bg-orange-50/30 hover:shadow-sm"
      }`}
    >
      {/* Best value badge */}
      {isBestValue && (
        <span className="absolute top-2 right-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-md shadow-sm">
          Best Value
        </span>
      )}

      <div className="flex items-center justify-between">
        {/* Left: radio + details */}
        <div className="flex items-center gap-3">
          {/* Custom radio */}
          <span
            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
              selected
                ? "border-orange-500 bg-orange-500"
                : "border-gray-300 group-hover:border-orange-300"
            }`}
          >
            {selected && (
              <svg
                className="w-3 h-3 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            )}
          </span>

          <div>
            <p className="text-base font-bold text-gray-800">
              ₹{plan.monthlyAmount.toLocaleString("en-IN")}
              <span className="font-medium text-gray-400 text-sm ml-1.5">
                × {plan.tenure} months
              </span>
            </p>
            {plan.cashback > 0 && (
              <p className="text-xs text-orange-500 font-semibold mt-0.5 flex items-center gap-1">
                <svg
                  className="w-3 h-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
                  />
                </svg>
                ₹{plan.cashback.toLocaleString("en-IN")} cashback
              </p>
            )}
          </div>
        </div>

        {/* Right: interest badge */}
        <span
          className={`text-xs font-bold whitespace-nowrap px-3 py-1.5 rounded-lg ${
            isZeroInterest
              ? "bg-green-50 text-green-600 border border-green-100"
              : "bg-gray-50 text-gray-500 border border-gray-100"
          }`}
        >
          {isZeroInterest ? "0% interest" : `${plan.interestRate}%`}
        </span>
      </div>

      {/* Total cost (visible when selected) */}
      {selected && (
        <div className="mt-3 pt-3 border-t border-orange-200/50 flex items-center justify-between text-xs text-gray-500 animate-fade-in">
          <span>
            Total:{" "}
            <span className="font-bold text-gray-700">
              ₹
              {(plan.monthlyAmount * plan.tenure).toLocaleString("en-IN")}
            </span>
          </span>
          {plan.cashback > 0 && (
            <span>
              Effective:{" "}
              <span className="font-bold text-green-600">
                ₹
                {(
                  plan.monthlyAmount * plan.tenure -
                  plan.cashback
                ).toLocaleString("en-IN")}
              </span>
            </span>
          )}
        </div>
      )}
    </button>
  );
}
