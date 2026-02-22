import {React, useState, useContext} from "react";
import {useNavigate} from "react-router-dom";
import { userDataContext } from "../context/UserContext";
import {  ShoppingCart, User} from 'lucide-react';

import { authDataContext } from "../context/AuthContext";
import axios from "axios";
const Nav = () => {
    let {serverValue} = useContext(authDataContext);
    let {userdata,setUserdata} = useContext(userDataContext);
    const navigate = useNavigate();
    const [isUserOpen, setIsUserOpen] = useState(false);

    const handleLogout = async () => {
        try{
            let result = await axios.get(`${serverValue}/api/auth/logout`,{withCredentials:true});
            console.log("Logout successful", result.data);
            setUserdata(null);
            navigate('/adminLogin');    
        }catch(error){
            console.error("Error during logout", error);
        }
    }
  return (
    <nav className="w-full bg-white font-sans sticky top-0 z-50">
      {/* Main Navbar Row */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
        
        {/* Left: Logo */}
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="bg-blue-600 p-1.5 rounded-lg text-white">
            <ShoppingCart size={20} />
          </div>
          <span className="text-xl font-bold text-gray-800 tracking-tight">MagiCart</span>
        </div>


        {/* Right: Icons */}
        <div className="flex items-center gap-5 text-gray-700">
          <button className="cursor-pointer hover:text-blue-600 transition-colors"
            onClick={() => setIsUserOpen(!isUserOpen)} >
            {isUserOpen ? <User size={24} /> : <User size={24} />}
          </button>
        </div>
      </div>


  {isUserOpen && (
    <div className="absolute top-[70px] right-10 w-[200px] bg-white border border-gray-100 rounded-xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-300">
      <ul className="flex flex-col text-[15px] text-gray-700 font-medium">
        
        {/* Links */}
        <li className="flex items-center gap-3 px-4 py-3 hover:bg-blue-50 hover:text-blue-600 cursor-pointer transition-colors group" 
         onClick={() =>{ 
          userdata ? navigate('/adminProfile') : navigate('/login')}}> <span className="w-1.5 h-1.5 rounded-full bg-transparent group-hover:bg-blue-600"></span>
          Profile
        </li>
        
        <li className="flex items-center gap-3 px-4 py-3 hover:bg-blue-50 hover:text-blue-600 cursor-pointer transition-colors group"
        onClick={() =>{ 
          userdata ? navigate('/adminOrder') : navigate('/login')}}>
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
            navigate('/adminlogin');
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
  )
}
export default Nav;