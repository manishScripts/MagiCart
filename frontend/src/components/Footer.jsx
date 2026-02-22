import { ShoppingCart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full bg-gradient-to-br from-cyan-50 via-blue-50 to-cyan-50 border-t border-gray-200">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-2 rounded-lg">
                <ShoppingCart className="w-6 h-6 text-white" strokeWidth={2} />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800">MagiCart</h3>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed max-w-sm">
              MagiCart is your all-in-one online shopping destination, offering top-quality products, unbeatable deals, and fast delivery—all backed by trusted service designed to make your life easier every day.
            </p>
          </div>

          {/* Company Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-800 mb-4 tracking-wide">COMPANY</h4>
            <ul className="space-y-3">
              <li>
                <a href="/" className="text-gray-600 hover:text-blue-600 transition-colors duration-300 text-sm">
                  Home
                </a>
              </li>
              <li>
                <a href="/about" className="text-gray-600 hover:text-blue-600 transition-colors duration-300 text-sm">
                  About us
                </a>
              </li>
              <li>
                <a href="/delivery" className="text-gray-600 hover:text-blue-600 transition-colors duration-300 text-sm">
                  Delivery
                </a>
              </li>
              <li>
                <a href="/privacy" className="text-gray-600 hover:text-blue-600 transition-colors duration-300 text-sm">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Get In Touch */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-800 mb-4 tracking-wide">GET IN TOUCH</h4>
            <ul className="space-y-3">
              <li>
                <a href="tel:+918750694989" className="text-gray-600 hover:text-blue-600 transition-colors duration-300 text-sm">
                  +91-8750694989
                </a>
              </li>
              <li>
                <a href="mailto:252005ms@gmail.com" className="text-gray-600 hover:text-blue-600 transition-colors duration-300 text-sm">
                  contact@magicart.com
                </a>
              </li>
              <li>
                <a href="tel:+11234567890" className="text-gray-600 hover:text-blue-600 transition-colors duration-300 text-sm">
                  +1-123-456-7890
                </a>
              </li>
              <li>
                <a href="mailto:admin@magicart.com" className="text-gray-600 hover:text-blue-600 transition-colors duration-300 text-sm">
                  admin@magicart.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-gray-200 bg-gradient-to-r from-cyan-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-center text-gray-600 text-sm">
            Copyright 2025 @onecart.com - All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;