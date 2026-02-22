import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 mt-auto">
      {/* Gradient divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-orange-500/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-1.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
                <span className="text-white font-black text-xs">E</span>
              </div>
              <span className="text-lg font-extrabold text-white">
                EMI<span className="text-orange-400">Store</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed max-w-sm">
              Buy your favorite products on easy EMIs backed by mutual funds.
              0% interest plans available on select products.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {["All Products", "How it Works", "EMI Calculator", "FAQs"].map(
                (item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-sm hover:text-orange-400 transition-colors duration-200"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Support
            </h4>
            <ul className="space-y-2.5">
              {[
                "Contact Us",
                "Privacy Policy",
                "Terms of Service",
                "Return Policy",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-sm hover:text-orange-400 transition-colors duration-200"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs">
            © {new Date().getFullYear()} EMI Store. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {/* Social icons */}
            {[
              {
                label: "Twitter",
                path: "M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z",
              },
              {
                label: "Instagram",
                path: "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z",
              },
            ].map((icon) => (
              <a
                key={icon.label}
                href="#"
                className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-orange-500/20 hover:text-orange-400 transition-all duration-200"
                aria-label={icon.label}
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d={icon.path}
                  />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
