import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { userDataContext } from '../context/UserContext';
import { ShoppingContext } from '../context/shoppingContext';
import { authDataContext } from '../context/authContext';
import Title from '../components/Title';
import OrderSum from '../components/OrderSum';

const PlaceOrder = () => {
  const { userdata } = useContext(userDataContext);
  const { cartItems, getCartTotal, currency, deliverFee, setCartItems } = useContext(ShoppingContext);
  const { serverValue } = useContext(authDataContext);
  const navigate = useNavigate();

  const [method, setMethod] = useState('cod');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    firstName: userdata?.name?.split(' ')[0] || '',
    lastName: userdata?.name?.split(' ')[1] || '',
    email: userdata?.email || '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

    const handleOrderPlacement = async () => {
    if (!validateForm()) {
      return;
    }

    if (Object.keys(cartItems).length === 0) {
      alert('Your cart is empty');
      return;
    }

    setLoading(true);
    try {
      const orderData = {
        items: cartItems,
        amount: getCartTotal() + deliverFee,
        address: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          street: formData.street,
          city: formData.city,
          state: formData.state,
          zipcode: formData.zipcode,
          country: formData.country,
          phone: formData.phone,
        },
        paymentMethod: method,
      };

      const response = await axios.post(
        `${serverValue}/api/order/placeorder`,
        orderData,
        { withCredentials: true }
      );

      if (response.status === 201 || response.status === 200) {
        alert('Order placed successfully!');
        // Clear cart
        setCartItems({});
        // Reset form
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          street: '',
          city: '',
          state: '',
          zipcode: '',
          country: '',
          phone: '',
        });
        // Navigate to orders page
        navigate('/order');
      }
    } catch (error) {
      console.error('Error placing order:', error);
      alert(error.response?.data?.message || 'Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
}

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.street.trim()) newErrors.street = 'Street is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.zipcode.trim()) newErrors.zipcode = 'Zipcode is required';
    if (!formData.country.trim()) newErrors.country = 'Country is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!/^\d{10}/.test(formData.phone.replace(/\D/g, ''))) newErrors.phone = 'Phone must be at least 10 digits';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    if (Object.keys(cartItems).length === 0) {
      alert('Your cart is empty');
      return;
    }

    setLoading(true);
    try {
      const orderData = {
        items: cartItems,
        amount: getCartTotal() + deliverFee,
        address: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          street: formData.street,
          city: formData.city,
          state: formData.state,
          zipcode: formData.zipcode,
          country: formData.country,
          phone: formData.phone,
        },
        paymentMethod: method,
      };

      const response = await axios.post(
        `${serverValue}/api/order/placeorder`,
        orderData,
        { withCredentials: true }
      );

      if (response.status === 201) {
        alert('Order placed successfully!');
        // Reset form
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          street: '',
          city: '',
          state: '',
          zipcode: '',
          country: '',
          phone: '',
        });
        // Redirect to orders page or home
        navigate('/');
      }
    } catch (error) {
      console.error('Error placing order:', error);
      alert(error.response?.data?.message || 'Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handlePlaceOrder} className="flex flex-col lg:flex-row justify-between gap-12 pt-10 px-6 lg:px-20 min-h-screen bg-gray-50 pb-20">
      
      {/* Left Side: Delivery Information */}
      <div className="flex flex-col gap-6 w-full lg:max-w-[500px]">
        <div className="text-2xl font-semibold my-3 flex items-center gap-2">
          <Title text1={"Delivery"} text2={"Information"} />
        </div>
        
        <div className="flex gap-3">
          <div className="w-full">
            <input 
              className={`border ${errors.firstName ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300'} rounded-lg py-2.5 px-4 w-full bg-white outline-none focus:ring-2 focus:ring-blue-500`}
              type="text" 
              name="firstName"
              placeholder="First name" 
              value={formData.firstName}
              onChange={handleInputChange}
            />
            {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
          </div>
          <div className="w-full">
            <input 
              className={`border ${errors.lastName ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300'} rounded-lg py-2.5 px-4 w-full bg-white outline-none focus:ring-2 focus:ring-blue-500`}
              type="text" 
              name="lastName"
              placeholder="Last name" 
              value={formData.lastName}
              onChange={handleInputChange}
            />
            {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
          </div>
        </div>
        
        <div>
          <input 
            className={`border ${errors.email ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300'} rounded-lg py-2.5 px-4 w-full bg-white outline-none focus:ring-2 focus:ring-blue-500`}
            type="email" 
            name="email"
            placeholder="Email address" 
            value={formData.email}
            onChange={handleInputChange}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        <div>
          <input 
            className={`border ${errors.street ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300'} rounded-lg py-2.5 px-4 w-full bg-white outline-none focus:ring-2 focus:ring-blue-500`}
            type="text" 
            name="street"
            placeholder="Street" 
            value={formData.street}
            onChange={handleInputChange}
          />
          {errors.street && <p className="text-red-500 text-sm mt-1">{errors.street}</p>}
        </div>
        
        <div className="flex gap-3">
          <div className="w-full">
            <input 
              className={`border ${errors.city ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300'} rounded-lg py-2.5 px-4 w-full bg-white outline-none focus:ring-2 focus:ring-blue-500`}
              type="text" 
              name="city"
              placeholder="City" 
              value={formData.city}
              onChange={handleInputChange}
            />
            {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
          </div>
          <div className="w-full">
            <input 
              className={`border ${errors.state ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300'} rounded-lg py-2.5 px-4 w-full bg-white outline-none focus:ring-2 focus:ring-blue-500`}
              type="text" 
              name="state"
              placeholder="State" 
              value={formData.state}
              onChange={handleInputChange}
            />
            {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
          </div>
        </div>
        
        <div className="flex gap-3">
          <div className="w-full">
            <input 
              className={`border ${errors.zipcode ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300'} rounded-lg py-2.5 px-4 w-full bg-white outline-none focus:ring-2 focus:ring-blue-500`}
              type="text" 
              name="zipcode"
              placeholder="Zipcode" 
              value={formData.zipcode}
              onChange={handleInputChange}
            />
            {errors.zipcode && <p className="text-red-500 text-sm mt-1">{errors.zipcode}</p>}
          </div>
          <div className="w-full">
            <input 
              className={`border ${errors.country ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300'} rounded-lg py-2.5 px-4 w-full bg-white outline-none focus:ring-2 focus:ring-blue-500`}
              type="text" 
              name="country"
              placeholder="Country" 
              value={formData.country}
              onChange={handleInputChange}
            />
            {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country}</p>}
          </div>
        </div>
        
        <div>
          <input 
            className={`border ${errors.phone ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300'} rounded-lg py-2.5 px-4 w-full bg-white outline-none focus:ring-2 focus:ring-blue-500`}
            type="tel" 
            name="phone"
            placeholder="Phone" 
            value={formData.phone}
            onChange={handleInputChange}
          />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
        </div>
      </div>

      {/* Right Side: Order Summary & Payment */}
      <div className="w-full lg:max-w-[450px]">
        
        {/* Cart Totals */}
        <OrderSum cartItems={cartItems} getCartTotal={getCartTotal} deliverFee={deliverFee} currency={currency}/>

        {/* Payment Methods */}
        <div className="mt-12">
          <div className="text-xl font-semibold mb-6 uppercase tracking-wider">
             Payment <span className="text-gray-400 font-normal">Method</span>
          </div>
          <div className="flex gap-4 flex-col lg:flex-row">
            
            <div 
              onClick={() => setMethod('razorpay')} 
              className={`flex items-center gap-3 border p-3 px-4 rounded-lg cursor-pointer transition-all bg-white ${method === 'razorpay' ? 'border-blue-500 ring-1 ring-blue-500 shadow-md' : 'border-gray-200'}`}
            >
              <input 
                type="radio" 
                name="payment-method" 
                value="razorpay" 
                checked={method === 'razorpay'}
                onChange={(e) => setMethod(e.target.value)}
                className="w-4 h-4"
              />
              <img className="h-5 mx-2" src="https://upload.wikimedia.org/wikipedia/commons/8/89/Razorpay_logo.svg" alt="Razorpay" />
            </div>

            <div 
              onClick={() => setMethod('cod')} 
              className={`flex items-center gap-3 border p-3 px-4 rounded-lg cursor-pointer transition-all bg-white ${method === 'cod' ? 'border-blue-500 ring-1 ring-blue-500 shadow-md' : 'border-gray-200'}`}
            >
              <input 
                type="radio" 
                name="payment-method" 
                value="cod" 
                checked={method === 'cod'}
                onChange={(e) => setMethod(e.target.value)}
                className="w-4 h-4"
              />
              <p className="text-gray-500 text-sm font-bold uppercase whitespace-nowrap">Cash on Delivery</p>
            </div>

          </div>

          <div className="w-full text-end mt-10">
            <button 
              type="button"
              disabled={loading || Object.keys(cartItems).length === 0}
              className={`px-16 py-3 rounded-lg font-bold text-sm uppercase tracking-widest transition-all shadow-lg ${
                loading || Object.keys(cartItems).length === 0
                  ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                  : 'bg-[#2D3436] hover:bg-blue-600 text-white active:scale-95'
              }`}

              onClick={handleOrderPlacement}

              >
                {console.log("Cart Items at PlaceOrder:", cartItems)}
              {loading ? 'Processing...' : 'Place Order'}
            </button>
          </div>
        </div>

      </div>
    </form>
  );
};

export default PlaceOrder;