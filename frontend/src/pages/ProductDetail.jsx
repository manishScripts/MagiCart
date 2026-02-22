import  { useContext, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { ShoppingContext } from '../context/shoppingContext';
import { Star, StarHalf, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import DescriptionReviews from '../components/DescriptionAndReview';
import RelatedProducts from './RelatedPD';
const ProductDetail = () => {
    const { id: productId } = useParams();
    let {products,currency ,addTocart} = useContext(ShoppingContext);
    const productData = useMemo(() => products.find(p => p._id === productId) || null, [products, productId]);
    const [selectedImage, setSelectedImage] = useState(0);
    const [selectedSize, setSelectedSize] = useState('');



    const productImages = useMemo(() => [
        productData?.images1?.[0],
        productData?.images2?.[0],
        productData?.images3?.[0],
        productData?.images4?.[0],
    ].filter(Boolean), [productData]);

    const sizes = productData?.size || [];

   

  return productData ? (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50/30 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Side - Images */}
          <div className="space-y-6">
            {/* Main Image */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-200">
              <img
                src={productImages[selectedImage] || ''}
                alt="Product"
                className="w-full h-[500px] object-cover"
              />
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-4">
              {productImages.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`bg-white rounded-xl overflow-hidden border-2 transition-all duration-300 hover:shadow-md ${
                    selectedImage === index
                      ? 'border-blue-500 shadow-md'
                      : 'border-gray-200'
                  }`}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-24 object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right Side - Product Info */}
          <div className="space-y-6">
            {/* Product Title */}
            <div>
              <h1 className="text-3xl md:text-4xl font-light text-gray-800 mb-3 tracking-wide uppercase">
                {productData.name}
              </h1>
              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, index) => {
                    const rating = productData?.rating || 4.5;
                    if (index < Math.floor(rating)) {
                      return <Star key={index} className="w-5 h-5 fill-yellow-400 text-yellow-400" />;
                    } else if (index < rating) {
                      return <StarHalf key={index} className="w-5 h-5 fill-yellow-400 text-yellow-400" />;
                    } else {
                      return <Star key={index} className="w-5 h-5 text-gray-300" />;
                    }
                  })}
                </div>
                <span className="text-gray-600 text-sm">({productData.reviews || 124})</span>
              </div>

              {/* Price */}
              <div className="text-3xl font-semibold text-gray-800 mb-6">
                {currency} {productData.price}
              </div>

              {/* Description */}
              <p className="text-gray-600 text-base leading-relaxed">
                {productData.description || "Best formal looks, and best for party and Stylish, breathable cotton shirt with a modern slim fit. Easy to wash, super comfortable, and designed for effortless style."}
              </p>
            </div>

            {/* Size Selection - Required before adding to cart */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Select Size <span className="text-red-500">*</span>
              </h3>
              {sizes.length > 0 ? (
                <div className="flex gap-3 flex-wrap">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`px-6 py-3 rounded-lg border-2 font-medium transition-all duration-300 ${
                        selectedSize === size
                          ? 'border-blue-500 bg-blue-50 text-blue-600'
                          : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              ) : (
                <p className="text-amber-600 text-sm">No sizes available for this product.</p>
              )}
            </div>

            {/* Add to Cart Button - Disabled until size is selected */}
            <button
              type="button"
              onClick={()=> {
                const sizeToUse = selectedSize && String(selectedSize).trim();
                if (!sizeToUse) {
                  alert("Please select a size before adding to cart.");
                  return;
                }
                addTocart(productData._id, selectedSize);
              }}
              disabled={!selectedSize || sizes.length === 0}
              className={`w-full py-4 rounded-xl font-medium transition-all duration-300 shadow-md ${
                selectedSize && sizes.length > 0
                  ? 'bg-gradient-to-r from-gray-800 to-gray-900 text-white hover:from-gray-900 hover:to-black hover:shadow-xl transform hover:-translate-y-0.5 cursor-pointer'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed pointer-events-none'
              }`}
            >
              {!selectedSize ? 'Select a size to add to cart' : 'Add To Cart'}
            </button>

            {/* Product Features */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm space-y-3">
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <p className="text-gray-700 text-sm">100% Original Product.</p>
              </div>
              <div className="flex items-start gap-3">
                <Truck className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <p className="text-gray-700 text-sm">Cash on delivery is available on this product</p>
              </div>
              <div className="flex items-start gap-3">
                <RefreshCw className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <p className="text-gray-700 text-sm">Easy return and exchange policy within 7 days</p>
              </div>
            </div>
          </div>
        </div>
        <DescriptionReviews product={productData} />
        <RelatedProducts currentProductId={productData._id} category={productData.category} />
      </div>
    </div>) : (
    <div>Loading...</div>
  );
}

export default ProductDetail;