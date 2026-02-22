import React, { useState, useContext, useEffect } from "react";
import { ShoppingContext } from "../context/shoppingContext";
import { Trash2, Minus, Plus } from "lucide-react";
import CartTotal from "../components/CartTotal";

const Cart = () => {
    const { products, currency, cartItems, updateQuantity, removeFromCart } = useContext(ShoppingContext);
    const [cartData, setCartData] = useState([]);

    useEffect(() => {
        const tempData = [];
        for(const productId in cartItems) {
            for(const size in cartItems[productId]) {
                if(cartItems[productId][size] > 0) {
                    tempData.push({
                        _id: productId,
                        product: products.find(p => p._id === productId),
                        size,
                        quantity: cartItems[productId][size]
                    });
                }
            }
        }
        setCartData(tempData);
    }, [cartItems, products]);

    const handleUpdateQuantity = (productId, size, quantity) => {
        if (quantity <= 0) return;
        updateQuantity(productId, size, quantity);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50/30 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-light text-gray-800 tracking-wide mb-2">
            YOUR CART
          </h1>
          <p className="text-gray-600 text-base">
            {cartData.length} {cartData.length === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>

        {cartData.length === 0 ? (
          /* Empty Cart State */
          <div className="text-center py-20">
            <div className="bg-white rounded-2xl p-12 shadow-sm border border-gray-200 max-w-md mx-auto">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <h2 className="text-2xl font-light text-gray-800 mb-3">Your cart is empty</h2>
              <p className="text-gray-600 mb-6">Add some products to get started!</p>
              <a
                href="/collections"
                className="inline-block bg-gradient-to-r from-gray-800 to-gray-900 text-white px-8 py-3 rounded-xl font-medium hover:from-gray-900 hover:to-black transition-all duration-300 shadow-md hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Continue Shopping
              </a>
            </div>
          </div>
        ) : (
          /* Cart Items Grid */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items List */}
            <div className="lg:col-span-2 space-y-4">
              {cartData.map((item, index) => (
                <div
                  key={`${item._id}-${item.size}`}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex gap-6">
                    {/* Product Image */}
                    <div className="flex-shrink-0">
                      <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gray-100 rounded-xl overflow-hidden">
                        <img
                          src={item.product?.image}
                          alt={item.product?.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1 min-w-0 pr-4">
                          <h3 className="text-lg font-semibold text-gray-800 mb-1 truncate">
                            {item.product?.name}
                          </h3>
                          <div className="flex items-center gap-3 text-sm text-gray-600">
                            <span>Size: <span className="font-medium text-gray-800">{item.size}</span></span>
                          </div>
                        </div>
                        
                        {/* Remove Button */}
                        <button
                          onClick={() => removeFromCart(item._id, item.size)}
                          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-300"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>

                      {/* Price and Quantity */}
                      <div className="flex items-center justify-between">
                        <div className="text-xl font-semibold text-gray-800">
                          {currency} {item.product?.price}
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-1">
                          <button
                            onClick={() => handleUpdateQuantity(item._id, item.size, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className="p-2 text-gray-600 hover:text-gray-800 hover:bg-white rounded-md transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          
                          <span className="w-10 text-center font-medium text-gray-800">
                            {item.quantity}
                          </span>
                          
                          <button
                            onClick={() => handleUpdateQuantity(item._id, item.size, item.quantity + 1)}
                            className="p-2 text-gray-600 hover:text-gray-800 hover:bg-white rounded-md transition-all duration-300"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Item Total */}
                      <div className="mt-3 pt-3 border-t border-gray-100">
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-600">Item Total:</span>
                          <span className="font-semibold text-gray-800">{currency} {(item.product?.price * item.quantity).toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart Total Component */}
            <div className="lg:col-span-1">
              <CartTotal cartItems={cartData} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
