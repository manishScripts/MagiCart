import { useState, useContext, useEffect } from 'react';
import { ShoppingContext } from '../context/shoppingContext';
import Card from '../components/Card.jsx';
import { Menu, X, ChevronDown } from 'lucide-react';

const Collection = () => {
  const { products,search, setIsSearchOpen} = useContext(ShoppingContext);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('relevant');
  
  // Filter states
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);

  const categories = ['Men', 'Women', 'Kids'];
  const subCategories = ['TopWear', 'BottomWear', 'WinterWear'];

  useEffect(() => {
    let filtered = [...products];

    if(search && setIsSearchOpen){
      filtered = filtered.filter(products => 
        products.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    // Apply category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(product => 
        selectedCategories.includes(product.category)
      );
    }

    // Apply sub-category filter
    if (selectedSubCategories.length > 0) {
      filtered = filtered.filter(product => 
        selectedSubCategories.includes(product.subCategory)
      );
    }

    // Apply sorting
    switch (sortBy) {
      case 'low-high':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'high-low':
        filtered.sort((a, b) => b.price - a.price);
        break;
      default:
        // relevant - keep original order
        break;
    }

    setFilteredProducts(filtered);
  }, [products, selectedCategories, selectedSubCategories, sortBy,search, setIsSearchOpen]);

  const toggleCategory = (category) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const toggleSubCategory = (subCategory) => {
    setSelectedSubCategories(prev =>
      prev.includes(subCategory)
        ? prev.filter(sc => sc !== subCategory)
        : [...prev, subCategory]
    );
  };

  const FilterSection = () => (
    <div className="space-y-6">
      {/* Categories */}
      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
        <h3 className="text-gray-800 text-lg font-semibold mb-4 tracking-wide">CATEGORIES</h3>
        <div className="space-y-3">
          {categories.map((category) => (
            <label
              key={category}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={selectedCategories.includes(category)}
                onChange={() => toggleCategory(category)}
                className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
              />
              <span className="text-gray-700 group-hover:text-blue-600 transition-colors">
                {category}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Sub-Categories */}
      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
        <h3 className="text-gray-800 text-lg font-semibold mb-4 tracking-wide">SUB-CATEGORIES</h3>
        <div className="space-y-3">
          {subCategories.map((subCategory) => (
            <label
              key={subCategory}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={selectedSubCategories.includes(subCategory)}
                onChange={() => toggleSubCategory(subCategory)}
                className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
              />
              <span className="text-gray-700 group-hover:text-blue-600 transition-colors">
                {subCategory}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
          {/* Title */}
          <div className="flex items-center gap-4">
            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden p-2.5 rounded-lg bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
              aria-label="Toggle filters"
            >
              {showFilters ? <X size={24} /> : <Menu size={24} />}
            </button>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light text-gray-800 tracking-wide">
              ALL COLLECTIONS
            </h1>
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-white border border-gray-200 text-gray-700 px-6 py-3 pr-12 rounded-lg cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm font-medium shadow-sm"
            >
              <option value="relevant">Sort By: Relevant</option>
              <option value="low-high">Price: Low to High</option>
              <option value="high-low">Price: High to Low</option>
            </select>
            <ChevronDown 
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" 
              size={20} 
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-6 xl:gap-10">
          {/* Sidebar Filters - Desktop */}
          <aside className="hidden lg:block w-56 xl:w-64 flex-shrink-0">
            <div className="sticky top-8">
              <h2 className="text-xl xl:text-2xl font-semibold text-gray-800 mb-6 tracking-wide">FILTERS</h2>
              <FilterSection />
            </div>
          </aside>

          {/* Mobile Filters Overlay */}
          {showFilters && (
            <>
              {/* Backdrop */}
              <div 
                className="lg:hidden fixed inset-0 bg-black/50 z-40"
                onClick={() => setShowFilters(false)}
              />
              {/* Filter Panel */}
              <div className="lg:hidden fixed inset-0 bg-white z-50 overflow-y-auto">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 tracking-wide">FILTERS</h2>
                    <button
                      onClick={() => setShowFilters(false)}
                      className="p-2.5 rounded-lg bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
                    >
                      <X size={24} />
                    </button>
                  </div>
                  <FilterSection />
                </div>
              </div>
            </>
          )}

          {/* Products Grid */}
          <main className="flex-1 min-w-0 overflow-hidden">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 xl:gap-8">
                {filteredProducts.map((product, index) => (
                  <div
                    key={product._id}
                    className="animate-fadeIn w-full max-w-sm mx-auto"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <Card
                      id={product._id}
                      image={product.images1}
                      title={product.name}
                      price={product.price}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-gray-500 text-lg">No products found matching your filters.</p>
              </div>
            )}
          </main>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default Collection;