import { Plus, List, CheckCircle, ShoppingCart, User, Upload } from 'lucide-react';
import { useState,useContext } from 'react';
import axios from 'axios';
import { authDataContext } from '../../context/AuthContext';
const Add = () => {
  let {serverValue} = useContext(authDataContext);

  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image1: null,
    image2: null,
    image3: null,
    image4: null,
    category: 'Men',
    subcategory: 'TopWear',
    bestseller: false,
    size: [],
    brand: ''
  });

  // const menuItems = [
  //   { id: 'add', label: 'Add Items', icon: Plus },
  //   { id: 'list', label: 'List Items', icon: List },
  //   { id: 'orders', label: 'View Orders', icon: CheckCircle }
  // ];

  const sizes = ['S', 'M', 'L', 'XL', 'XXL'];

  const handleImageUpload = (imageField) => (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        [imageField]: file
      }));
    }
  };

  const handleSizeToggle = (size) => {
    setFormData(prev => ({
      ...prev,
      size: prev.size.includes(size) 
        ? prev.size.filter(s => s !== size)
        : [...prev.size, size]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Create FormData for file upload
      const data = new FormData();
      
      // Append text fields
      data.append('name', formData.name);
      data.append('description', formData.description);
      data.append('price', formData.price);
      data.append('category', formData.category);
      data.append('subcategory', formData.subcategory);
      data.append('bestseller', formData.bestseller.toString());
      data.append('size', JSON.stringify(formData.size));
      data.append('brand', formData.brand);
      
      // Append image files
      if (formData.image1) data.append('image1', formData.image1);
      if (formData.image2) data.append('image2', formData.image2);
      if (formData.image3) data.append('image3', formData.image3);
      if (formData.image4) data.append('image4', formData.image4);
      
      console.log('Sending FormData to backend...');
      const result = await axios.post(serverValue + '/api/product/addproduct', data, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      if(result.data && result.data.success){
        setFormData({
          name: '',
          description: '',
          price: '',
          image1: null,
          image2: null,
          image3: null,
          image4: null,
          category: 'Men',
          subcategory: 'TopWear',
          bestseller: false,
          size: [],
          brand: ''
        });
        alert('Product added successfully!');
      }
    } catch (error) {
      console.error('Error adding product:', error.response?.data || error.message);
      alert('Failed to add product: ' + (error.response?.data?.message || error.message));
    }
  };
    return (
      <div className="h-full w-full bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 overflow-auto">
        <main className="h-full w-full p-6 md:p-8 lg:p-10">
          <div className="max-w-7xl mx-auto h-full flex flex-col">
            <h2 className="text-3xl font-bold text-white mb-6 md:mb-8">Add Product</h2>

            <form onSubmit={handleSubmit} className="space-y-6 w-full flex-1">
              {/* Upload Images */}
              <div>
                <label className="block text-white font-semibold mb-3">Upload Images</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {['image1', 'image2', 'image3', 'image4'].map((field) => (
                    <label key={field} className="relative block">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload(field)}
                        className="hidden"
                      />
                      <div className="bg-white rounded-lg p-0 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors h-28 w-full">
                       { !formData[field] ? (
                          <div className="flex flex-col items-center p-4">
                            <Upload className="w-8 h-8 text-cyan-500 mb-1" />
                            <span className="text-xs text-gray-600">Upload Image</span>
                          </div>
                        ) : (
                          <img src={URL.createObjectURL(formData[field])} alt="Preview" className="w-full h-full object-cover rounded-lg" />
                        )}
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Product Name */}
              <div>
                <label className="block text-white font-semibold mb-2">Product Name</label>
                <input
                  type="text"
                  placeholder="Type here"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 bg-slate-600 text-white rounded-lg border border-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              {/* Product Description */}
              <div>
                <label className="block text-white font-semibold mb-2">Product Description</label>
                <textarea
                  placeholder="Type here"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows="4"
                  className="w-full px-4 py-3 bg-slate-600 text-white rounded-lg border border-slate-500 focus:outline-none focus:border-cyan-500 resize-none"
                />
              </div>

              {/* Category and Sub-Category */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white font-semibold mb-2">Product Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-600 text-white rounded-lg border border-slate-500 focus:outline-none focus:border-cyan-500"
                  >
                    <option>Men</option>
                    <option>Women</option>
                    <option>Kids</option>
                  </select>
                </div>
                <div>
                  <label className="block text-white font-semibold mb-2">Sub-Category</label>
                  <select
                    value={formData.subcategory}
                    onChange={(e) => setFormData({...formData, subcategory: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-600 text-white rounded-lg border border-slate-500 focus:outline-none focus:border-cyan-500"
                  >
                    <option>TopWear</option>
                    <option>BottomWear</option>
                    <option>WinterWear</option>
                  </select>
                </div>
              </div>

              {/* Product Price */}
              <div>
                <label className="block text-white font-semibold mb-2">Product Price</label>
                <input
                  type="number"
                  placeholder="₹ 2000"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  className="w-full px-4 py-3 bg-slate-600 text-white rounded-lg border border-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              {/* Brand */}
              <div>
                <label className="block text-white font-semibold mb-2">Brand</label>
                <input
                  type="text"
                  placeholder="Enter brand name"
                  value={formData.brand}
                  onChange={(e) => setFormData({...formData, brand: e.target.value})}
                  className="w-full px-4 py-3 bg-slate-600 text-white rounded-lg border border-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              {/* Product Size */}
              <div>
                <label className="block text-white font-semibold mb-3">Product Size</label>
                <div className="flex gap-3">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => handleSizeToggle(size)}
                      className={`px-6 py-2 rounded-lg border-2 font-medium transition-all ${
                        formData.size.includes(size)
                          ? 'bg-cyan-500 border-cyan-500 text-white'
                          : 'bg-slate-600 border-slate-500 text-gray-300 hover:border-cyan-500'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Add to BestSeller */}
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="bestseller"
                  checked={formData.bestseller}
                  onChange={(e) => setFormData({...formData, bestseller: e.target.checked})}
                  className="w-5 h-5 accent-cyan-500 cursor-pointer"
                />
                <label htmlFor="bestseller" className="text-white font-semibold cursor-pointer">
                  Add to BestSeller
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="bg-cyan-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-cyan-600 transition-colors w-full md:w-auto"
              >
                Add Product
              </button>
            </form>
          </div>
        </main>
      </div>
    )       
}

export default Add;