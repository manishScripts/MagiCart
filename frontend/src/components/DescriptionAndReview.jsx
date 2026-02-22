import React, { useState } from 'react';
const DescriptionReviews = ({ product }) => {
  const [activeTab, setActiveTab] = useState('description');

  return (
    <div className="mt-16">
      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          onClick={() => setActiveTab('description')}
          className={`px-8 py-4 font-medium transition-all duration-300 relative ${
            activeTab === 'description'
              ? 'text-gray-800 border-b-2 border-blue-500'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Description
        </button>
        <button
          onClick={() => setActiveTab('reviews')}
          className={`px-8 py-4 font-medium transition-all duration-300 relative ${
            activeTab === 'reviews'
              ? 'text-gray-800 border-b-2 border-blue-500'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Reviews ({product.reviews || 124})
        </button>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm">
        {activeTab === 'description' ? (
          <div className="prose max-w-none">
            <p className="text-gray-700 text-base leading-relaxed">
              {product.longDescription || 
                "Upgrade your wardrobe with this stylish slim-fit cotton shirt, available now on OneCart. Crafted from breathable, high-quality fabric, it offers all-day comfort and effortless style. Easy to maintain and perfect for any setting, this shirt is a must-have essential for those who value both fashion and function."}
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            <p className="text-gray-600 text-sm">Customer reviews coming soon...</p>
            {/* Add your review component here */}
          </div>
        )}
      </div>
    </div>
  );
};

export default DescriptionReviews;