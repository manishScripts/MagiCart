import {useContext} from 'react';
import { ShoppingContext } from '../context/shoppingContext';
import { useNavigate } from 'react-router-dom';
const Card = ({ image, title, price, id }) => {
  
    let {currency} = useContext(ShoppingContext);
    const Navigate = useNavigate();
  return (
    <div onClick={() => Navigate(`/productdetail/${id}`)} className="group relative bg-white rounded-xl overflow-hidden w-85 shadow-sm hover:shadow-2xl transition-all duration-500 max-w-sm border border-gray-100">
      {/* Image Container */}
      <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-t-xl overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-72 object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        {/* {badge && (
          <span className="absolute top-4 right-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs font-medium px-4 py-1.5 rounded-full shadow-lg backdrop-blur-sm">
            {badge}
          </span>
        )} */}
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
      
      {/* Content */}
      <div className="p-5 bg-gray-900 relative">
        <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-gray-700 to-transparent" />
        <h3 className="text-white text-base font-medium mb-2 tracking-wide">
          {title}
        </h3>
        <p className="text-white text-lg font-semibold">
          {currency} {price}
        </p>
      </div>
    </div>
  );
};

export default Card;