import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { authDataContext } from '../../context/AuthContext';
import { Package, ChevronDown } from 'lucide-react';
import Title from '../components/Title';

const Orders = () => {
  const { serverValue } = useContext(authDataContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all orders for the admin view
  const fetchAllOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${serverValue}/api/order/allorders`, { withCredentials: true });
      console.log("Orders response:", response.data);
      if (response.data && response.data.orders && Array.isArray(response.data.orders)) {
        setOrders(response.data.orders.reverse());
      } else {
        setOrders([]);
      }
    } catch (error) {
      console.error("Error fetching admin orders:", error);
      setError("Failed to load orders. Please try again.");
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  // Function to update order status (e.g., from 'Order Placed' to 'Shipped')
  const statusHandler = async (event, orderId) => {
    if (!orderId) {
      alert("Order ID is missing");
      return;
    }
    
    try {
      const newStatus = event.target.value;
      const response = await axios.post(
        `${serverValue}/api/order/status/${orderId}`, 
        { status: newStatus }, 
        { withCredentials: true }
      );
      console.log("Status update response:", response.data);
      if (response.data && (response.data.order || response.data.success)) {
        alert("Order status updated successfully!");
        await fetchAllOrders();
      }
    } catch (error) {
      console.error("Status update failed:", error);
      alert("Failed to update status: " + (error.response?.data?.message || error.message));
    }
  };

  useEffect(() => {
    if (serverValue) {
      fetchAllOrders();
    }
  }, [serverValue]);

  if (!serverValue) {
    return (
      <div className="flex min-h-screen bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 items-center justify-center">
        <p className="text-slate-400">Initializing...</p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 overflow-auto p-8">
      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto">
        <Title text1={"All"} text2={"Orders"} />

        {loading && (
          <div className="text-center py-10">
            <p className="text-slate-300 font-medium">Loading orders...</p>
          </div>
        )}
        
        {error && (
          <div className="text-center py-10 bg-red-900/30 rounded-lg border border-red-700/50">
            <p className="text-red-300 font-medium">{error}</p>
          </div>
        )}

        {!loading && orders.length === 0 && !error && (
          <div className="text-center py-20 bg-slate-700/40 rounded-xl border border-dashed border-slate-500/50">
            <p className="text-slate-400">No orders found.</p>
          </div>
        )}

        {!loading && orders.length > 0 && (
          <div className="flex flex-col gap-6 ">
            {orders.map((order) => (
              <div 
                key={order._id || Math.random()} 
                className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-4 items-start bg-gradient-to-br from-slate-700/60 to-slate-800/60 backdrop-blur-sm border border-slate-600/50 p-6 rounded-xl shadow-lg hover:shadow-xl hover:border-slate-500/70 transition-all duration-300"
              >
                {/* Icon */}
                <div className="bg-blue-600/20 border border-blue-500/30 p-4 rounded-lg flex items-center justify-center text-blue-400">
                  <Package size={40} />
                </div>

                {/* Order Details & Address */}
                <div className="text-sm">
                  <div className="font-bold text-blue-100 mb-2">
                    {Array.isArray(order.items) && order.items.length > 0 ? (
                      order.items.map((item, i) => (
                        <p key={i}>
                          {item.name || "Unknown"} x {item.quantity || 1} <span>({item.size || "N/A"})</span>
                          {i !== order.items.length - 1 && ", "}
                        </p>
                      ))
                    ) : (
                      <p>No items</p>
                    )}
                  </div>
                  
                  {order.address && (
                    <>
                      <p className="font-semibold text-slate-200 mt-3">
                        {(order.address.firstName || "") + " " + (order.address.lastName || "")}
                      </p>
                      <div className="text-slate-400 leading-relaxed">
                        <p>{(order.address.street || "") + ","}</p>
                        <p>
                          {(order.address.city || "") + ", " + (order.address.state || "") + ", " + (order.address.country || "") + ", " + (order.address.zipcode || "")}
                        </p>
                      </div>
                      <p className="mt-2 font-medium text-slate-300">{order.address.phone || "N/A"}</p>
                    </>
                  )}
                </div>

                {/* Summary Stats */}
                <div className="text-sm text-slate-300">
                  <p className="mb-1">Items: <span className="font-bold text-blue-200">{order.items?.length || 0}</span></p>
                  <p className="mb-1">Method: <span className="uppercase font-bold text-blue-200">{order.paymentMethod || "N/A"}</span></p>
                  <p className="mb-1">Payment: <span className={order.payment ? "text-green-400" : "text-yellow-400"}>{order.payment ? "Done" : "Pending"}</span></p>
                  <p>Date: <span className="font-medium text-slate-300">{order.date ? new Date(order.date).toLocaleDateString() : "N/A"}</span></p>
                </div>

                {/* Price */}
                <div className="text-lg font-bold text-blue-300 self-center">
                  ₹ {order.amount || 0}
                </div>

                {/* Status Selector */}
                <div className="relative self-center w-full">
                  <select 
                    onChange={(event) => statusHandler(event, order._id)}
                    value={order.status || "Order Placed"}
                    className="appearance-none w-full bg-slate-600/50 border border-slate-500/70 text-slate-100 py-3 px-4 pr-10 rounded-lg font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-400 cursor-pointer transition-all hover:border-slate-400/70"
                  >
                    <option value="Order Placed">Order Placed</option>
                    <option value="Packing">Packing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Out for delivery">Out for delivery</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-400">
                    <ChevronDown size={18} />
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Orders;