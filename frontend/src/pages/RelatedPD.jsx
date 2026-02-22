import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingContext } from '../context/shoppingContext';   
const RelatedProducts = ({ currentProductId, category }) => {
  const { products } = useContext(ShoppingContext);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    // Filter products by same category, exclude current product
    const filtered = products
      .filter(p => p.category === category && p._id !== currentProductId)
      .slice(0, 4); // Show only 4 related products
    setRelatedProducts(filtered);
  }, [products, category, currentProductId]);

  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <div className="mt-16">
      <h2 className="text-3xl md:text-4xl font-light text-gray-800 mb-8 tracking-wide">
        RELATED PRODUCTS
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedProducts.map((product, index) => (
          <Link
            key={product._id}
            to={`/productdetail/${product._id}`}
            className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Product Image */}
            <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
              <img
                src={product.images1?.[0] || product.images1 || ''}
                alt={product.name}
                className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            {/* Product Info */}
            <div className="p-5 bg-gray-900 relative">
              <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-gray-700 to-transparent" />
              <h3 className="text-white text-base font-medium mb-2 tracking-wide line-clamp-1">
                {product.name}
              </h3>
              <p className="text-white text-lg font-semibold">
                ₹ {product.price}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;