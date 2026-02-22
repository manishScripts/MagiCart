import React, { useContext, useEffect, useState } from "react";
import { Trash2, Package, Loader2 } from 'lucide-react';
import axios from "axios";
import { authDataContext } from "../../context/AuthContext";
const List = () => {
  const [List, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  let { serverValue } = useContext(authDataContext);
  const fetchData = async () => {
    try {
      const result = await axios.get(serverValue + "/api/product/listproduct", { withCredentials: true });
      setList(result.data.products);
      console.log("Product List:", result.data);
    } catch (error) {
      console.error("Error fetching product list:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (productId) => {
    try {
      if (!window.confirm("Are you sure you want to delete this product?")) {
        return;
      }
      const result = await axios.post(serverValue + `/api/product/remove/${productId}`, {}, { withCredentials: true });
      console.log("Delete Result:", result.data);
      if(result.data.message || result.data.success){
        setList(List.filter(product => product._id !== productId));
      }else{
        console.error("Failed to delete product:", result.data.message);
      }
    } catch (error) {
      console.error("Error deleting product:", error);  
    }
  }

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="h-full w-full bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 overflow-auto">
      <main className="h-full w-full p-6 md:p-8 lg:p-10">
        <div className="max-w-7xl mx-auto h-full flex flex-col">
          <h2 className="text-3xl font-bold text-white mb-6 md:mb-8">
            List Product
          </h2>
          {List.length === 0 ? (
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-12 text-center">
            <Package className="w-16 h-16 text-slate-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-300 mb-2">
              No Products Listed
            </h3>
            <p className="text-slate-500">
              Start by adding your first product to the inventory.
            </p>
          </div>
        ) : (
          <div className="space-y-4 md:space-y-6">
            {List.map((product) => (
              <div
                key={product.id}
                className="bg-gradient-to-br from-slate-800/80 to-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-xl p-5 hover:border-slate-600/50 transition-all duration-300 shadow-lg hover:shadow-xl group"
              >
                <div className="flex items-center gap-5">
                  {/* Product Image */}
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 rounded-lg overflow-hidden bg-slate-700/50 border border-slate-600/50">
                      {product.images1 || product.imageUrl ? (
                        <img
                          src={product.images1 || product.imageUrl}
                          alt={"Image Not Available"}
                          className="w-full h-full object-cover text-white"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Package className="w-8 h-8 text-slate-600" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-slate-100 mb-1 truncate">
                      {product.name || product.title}
                    </h3>
                    <p className="text-sm text-slate-400 mb-2">
                      {product.category || 'Uncategorized'}
                    </p>
                    <p className="text-xl font-bold text-emerald-400">
                      ₹{product.price?.toLocaleString() || '0'}
                    </p>
                  </div>

                  {/* Delete Button */}
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="flex-shrink-0 w-12 h-12 bg-red-500/20 hover:bg-red-500/30 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110 border border-red-500/30"
                    aria-label="Delete product"
                  >
                    <Trash2 className="w-5 h-5 text-red-400" />
                  </button>
                </div>

                {/* Optional: Additional Info */}
                {(product.description || product.stock !== undefined) && (
                  <div className="mt-4 pt-4 border-t border-slate-700/50">
                    {product.description && (
                      <p className="text-sm text-slate-400 mb-2 line-clamp-2">
                        {product.description}
                      </p>
                    )}
                    {product.stock !== undefined && (
                      <p className="text-sm text-slate-500">
                        Stock: <span className="text-slate-400 font-medium">{product.stock}</span>
                      </p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        </div>
      </main>
    </div>
  );
};


export default List;
