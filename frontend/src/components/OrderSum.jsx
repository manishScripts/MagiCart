import React from 'react';
import { ShoppingBag, Truck, Tag } from 'lucide-react';

const OrderSum = ({ cartItems, getCartTotal, deliverFee, currency = '₹' }) => {
  // Use data from context for consistency
  const subtotal = getCartTotal ? getCartTotal() : 0;
  const shippingFee = deliverFee !== undefined ? deliverFee : 0;
  const discount = 0;
  const total = subtotal + shippingFee - discount;


  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-white/10 p-2 rounded-lg">
            <ShoppingBag className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-xl font-semibold text-white">Order Summary</h2>
        </div>
      </div>

      {/* Order Details */}
      <div className="p-6 space-y-5">
        {/* Subtotal */}
        <div className="flex justify-between items-center pb-3 border-b border-gray-100">
          <span className="text-gray-600 text-sm">Subtotal</span>
          <span className="text-gray-800 font-semibold">{currency} {subtotal.toFixed(2)}</span>
        </div>

        {/* Shipping Fee */}
        <div className="flex justify-between items-center pb-3 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <Truck className="w-4 h-4 text-gray-500" />
            <span className="text-gray-600 text-sm">Shipping Fee</span>
          </div>
          <span className="text-gray-800 font-semibold">{currency} {shippingFee.toFixed(2)}</span>
        </div>

        {/* Discount (if applicable) */}
        {discount > 0 && (
          <div className="flex justify-between items-center pb-3 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4 text-green-500" />
              <span className="text-gray-600 text-sm">Discount</span>
            </div>
            <span className="text-green-600 font-semibold">- {currency} {discount.toFixed(2)}</span>
          </div>
        )}

        {/* Total */}
        <div className="flex justify-between items-center pt-2">
          <span className="text-lg font-semibold text-gray-800">Total</span>
          <span className="text-2xl font-bold text-gray-900">{currency} {total.toFixed(2)}</span>
        </div>
      </div>

      {/* Additional Info */}
      <div className="bg-blue-50 p-6 space-y-3">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 mt-0.5">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <p className="text-sm text-gray-700 font-medium">Secure Checkout</p>
            <p className="text-xs text-gray-600 mt-0.5">Your payment information is encrypted</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 mt-0.5">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div>
            <p className="text-sm text-gray-700 font-medium">Free Returns</p>
            <p className="text-xs text-gray-600 mt-0.5">Easy returns within 7 days</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSum;