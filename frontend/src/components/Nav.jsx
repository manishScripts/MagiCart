import  { useState ,useContext } from 'react';
import { Search, ShoppingCart, User, X } from 'lucide-react';
import { userDataContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { authDataContext } from '../context/authContext';
import axios from 'axios';
import { ShoppingContext } from '../context/shoppingContext';
// import { set } from 'mongoose';
const Navbar = () => {
  const {isSearchOpen, setIsSearchOpen} = useContext(ShoppingContext);
  const {search,setSearch,getCartCount} = useContext(ShoppingContext);
  const [isUserOpen, setIsUserOpen] = useState(false);
  const {userdata} = useContext(userDataContext);
  const {serverValue} = useContext(authDataContext);
  const navigate = useNavigate();
  const handleLogout = async() => {
    try{
      await axios.get(`${serverValue}/api/auth/logout`,{withCredentials:true});
      console.log("logged out successfully");
      navigate('/login');
    }catch(err){
      console.log("error in logout", err);
    }
  }

  return (
    <nav className="w-full bg-white font-sans sticky top-0 z-50">
      {/* Main Navbar Row */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
        
        {/* Left: Logo */}
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="bg-blue-600 p-1.5 rounded-lg text-white">
            <ShoppingCart size={20} />
          </div>
          <span className="text-xl font-bold text-gray-800 tracking-tight">MagiCart</span>
        </div>

        {/* Center: Navigation Links */}
        <div className="hidden md:flex items-center gap-3">
          {['HOME', 'COLLECTIONS', 'ABOUT', 'CONTACT'].map((item) => (
            <button 
              key={item}
              className="cursor-pointer px-5 py-2 rounded-full bg-[#2D3436] text-white text-xs font-bold hover:bg-gray-700 transition-colors tracking-widest"
              onClick={() => {
                if(item === 'HOME') navigate('/');
                else if(item === 'COLLECTIONS') navigate('/collections');
                else if(item === 'ABOUT') navigate('/about');
                else if(item === 'CONTACT') navigate('/contact');
              }}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Right: Icons */}
        <div className="flex items-center gap-5 text-gray-700">
          {/* Search Toggle */}
          <button 
            onClick={() => {
              setIsSearchOpen(!isSearchOpen);
              navigate('/collections');
            }}
            className="cursor-pointer hover:text-blue-600 transition-colors"
          >
            {isSearchOpen ? <X size={24} /> : <Search size={24} />}
          </button>
          
          <button className="cursor-pointer hover:text-blue-600 transition-colors"
            onClick={() => setIsUserOpen(!isUserOpen)} >
            {isUserOpen ? <User size={24} /> : <User size={24} />}
          </button>
          
          <div className="relative cursor-pointer hover:text-blue-600 transition-colors" onClick={() => navigate('/cart')}>
            <ShoppingCart size={24} />
            <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-white">
              {getCartCount() || 0}
            </span>
          </div>
        </div>
      </div>

      {/* Expandable Search Bar Area */}
      {isSearchOpen && (
        <div className="w-full bg-[#7AB2B2] opacity-90 py-8 px-4 flex justify-center animate-in fade-in slide-in-from-top duration-300 z-1000 fixed">
          <div className="relative w-full max-w-3xl">
            <input 
              type="text"
              placeholder="Search Here"
              autoFocus
              className="w-full py-4 px-8 rounded-full bg-[#1F292E] text-white placeholder-gray-400 outline-none shadow-inner"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button 
               onClick={() => setIsSearchOpen(false)}
               className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
            >
              <Search size={20} />
            </button>
          </div>
        </div>
      )}

  {isUserOpen && (
    <div className="absolute top-[70px] right-10 w-[200px] bg-white border border-gray-100 rounded-xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-300">
      <ul className="flex flex-col text-[15px] text-gray-700 font-medium">
        
        {/* Links */}
        <li className="flex items-center gap-3 px-4 py-3 hover:bg-blue-50 hover:text-blue-600 cursor-pointer transition-colors group" 
         onClick={() =>{ 
          userdata ? navigate('/profile') : navigate('/login')}}> <span className="w-1.5 h-1.5 rounded-full bg-transparent group-hover:bg-blue-600"></span>
          Profile
        </li>
        
        <li className="flex items-center gap-3 px-4 py-3 hover:bg-blue-50 hover:text-blue-600 cursor-pointer transition-colors group"
        onClick={() =>{ 
          userdata ? navigate('/order') : navigate('/login')}}>
          <span className="w-1.5 h-1.5 rounded-full bg-transparent group-hover:bg-blue-600"></span>
          Orders
        </li>

        <div className="border-t border-gray-100 my-1"></div>

        {/* Conditional Login/Logout */}
        {userdata ? (
          <li 
            onClick={handleLogout}
            className="px-4 py-3 text-red-500 hover:bg-red-50 cursor-pointer transition-colors font-semibold"
          >
            Logout
          </li>
        ) : (
          <li onClick={() => {
            navigate('/login');
            setIsUserOpen(false);
          }}
          className="px-4 py-3 text-blue-600 hover:bg-blue-50 cursor-pointer transition-colors font-semibold">
            Login
          </li>
        )}
      </ul>
    </div>
  )}

</nav>
  );
};

export default Navbar;