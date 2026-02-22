import { React, useEffect } from 'react';
import { useState, useContext } from 'react';
import { ShoppingContext } from '../context/shoppingContext';
import { authDataContext } from '../context/authContext';
import axios from 'axios';
import Title from '../components/Title';
const Order = () => {
    const [orderData, setOrderData] = useState([]);
    const [loading, setLoading] = useState(false);
    const {serverValue} = useContext(authDataContext);

    const loadOrderData = async () => {
        setLoading(true);
        try{
            const response = await axios.get(serverValue + "/api/order/userorders", {
                withCredentials: true
            });
            if(response.data && response.data.orders){
                let orderItem = [];
                response.data.orders.forEach(order => {
                    order.items.forEach(item => {
                        orderItem.push({
                            ...item,
                            status: order.status,
                            amount: order.amount,
                            address: order.address,
                            paymentMethod: order.paymentMethod,
                            date: order.date,
                            _orderId: order._id
                        });
                    });
                });
                setOrderData(orderItem.reverse());
            }
        }
        catch(error){
            console.error("Error loading order data:", error);
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if(serverValue) {
            loadOrderData();
        }
    },[serverValue]);
    return (   
        <div className="min-h-screen bg-gray-50 py-12 px-6 lg:px-20">
      
      {/* Page Title */}
      <div className="text-2xl font-semibold mb-10 flex items-center gap-2">
        <Title text1={"My"} text2={"Orders"}/>
      </div>

      {/* Orders List */}
      <div className="flex flex-col gap-4">
        {loading ? (
          <div className="text-center py-20 bg-white rounded-xl border border-gray-200">
            <p className="text-gray-500 font-medium">Loading your orders...</p>
          </div>
        ) : orderData.length > 0 ? (
          orderData.map((item, index) => (
            <div 
              key={index} 
              className="bg-white border border-gray-100 p-4 md:p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              {/* Product Info Section */}
              <div className="flex items-start gap-6">
                <img 
                  className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-lg bg-gray-50 border border-gray-100" 
                  src={item.image?.[0] || 'https://via.placeholder.com/100'} 
                  alt={item.name} 
                  onError={(e) => e.target.src = 'https://via.placeholder.com/100'}
                />
                <div className="flex flex-col gap-1">
                  <h3 className="text-lg font-bold text-gray-800">{item.name}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                    <p className="font-semibold text-blue-600">₹ {item.price}</p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Size: <span className="bg-gray-100 px-2 py-0.5 rounded text-xs font-bold uppercase">{item.size}</span></p>
                  </div>
                  <p className="text-xs text-gray-400 mt-2">
                    Date: <span className="text-gray-500 font-medium">{new Date(item.date).toDateString()}</span>
                  </p>
                  <p className="text-xs text-gray-400">
                    Payment Method: <span className="text-gray-500 font-medium uppercase">{item.paymentMethod}</span>
                  </p>
                </div>
              </div>

              {/* Status & Action Section */}
              <div className="flex flex-col md:flex-row items-center justify-between md:w-1/2 gap-4">
                
                {/* Status Indicator */}
                <div className="flex items-center gap-2">
                  <p className="min-w-2 h-2 rounded-full bg-green-500 animate-pulse"></p>
                  <p className="text-sm md:text-base font-medium text-gray-700">{item.status}</p>
                </div>

                {/* Track Button */}
                <button 
                  onClick={loadOrderData}
                  disabled={loading}
                  className="w-full md:w-auto px-6 py-2.5 bg-[#2D3436] hover:bg-blue-600 text-white text-sm font-bold rounded-lg transition-all active:scale-95 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Loading...' : 'Refresh'}
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
            <p className="text-gray-400">No orders placed yet.</p>
          </div>
        )}
      </div>
    </div>
    )
}

export default Order