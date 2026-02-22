import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "glass border-b border-white/20 shadow-lg shadow-black/5"
          : "bg-white/90 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-1.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow-md shadow-orange-200 group-hover:shadow-orange-300 transition-shadow duration-300">
              <span className="text-white font-black text-sm tracking-tight">
                E
              </span>
            </div>
            <div className="flex items-baseline">
              <span className="text-xl font-extrabold gradient-text">EMI</span>
              <span className="text-xl font-extrabold text-gray-800 ml-0.5">
                Store
              </span>
            </div>
          </Link>

          {/* Tagline + Nav links */}
          <div className="flex items-center gap-6">
            <p className="text-sm text-gray-400 hidden md:block font-medium">
              Smart EMIs backed by Mutual Funds
            </p>
            <div className="flex items-center gap-2">
              <Link
                to="/"
                className="text-sm font-medium text-gray-600 hover:text-orange-500 transition-colors duration-200 px-3 py-1.5 rounded-lg hover:bg-orange-50"
              >
                Products
              </Link>
              <button className="relative p-2 rounded-xl text-gray-500 hover:text-orange-500 hover:bg-orange-50 transition-all duration-200">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.8}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-orange-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  0
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
