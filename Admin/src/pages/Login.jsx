import React, { useState,useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { authDataContext } from '../../context/AuthContext.jsx';
import { userDataContext } from '../../context/UserContext.jsx';


const Login = () => {
    const navigate = useNavigate();
    let [email , setEmail] = useState("");
    let [password , setPassword] = useState("");
    let {serverValue} = useContext(authDataContext);
    let {getAdmin,userData,setUserData} = useContext(userDataContext);
    const handleLogin = async (e) =>{
        e.preventDefault();
        try{
            let result = await axios.post(`${serverValue}/api/auth/adminLogin`,{
                email,
                password},{withCredentials:true});
                console.log("admin login result", result.data);
                await getAdmin();
                navigate('/adminHome');
        }
        catch(error){
            console.error("Error during admin login", error);
            alert(error.response?.data?.message || "Login failed");
        }
    }

  return (    
  <>
  {/* {setUserData && userData ? (console.log("Admin is logged in"), navigate('/adminHome')) :  null} */}
  <div className="min-h-screen flex flex-col items-center justify-start bg-gray-50 font-sans">
     <header className="w-full p-2">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
              {/* Simple Cart Icon Placeholder */}
              <div className="bg-blue-600 p-2 rounded-lg text-white shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
              </div>
              <h1 className="text-2xl font-bold text-gray-800 tracking-tight">MagiCart</h1>
          </div>
      </header>
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg border border-gray-100">

              {/* Header Section */}
              <div className="text-center">

                  <h2 className="text-3xl font-semibold text-gray-900 mt-4">AdminLogin</h2>
                  <p className="text-gray-500 mt-2">Welcome to MagiCart, Manage your order</p>
              </div>

              {/* Divider */}
              <div className="relative flex items-center py-2">
                  <div className="flex-grow border-t border-gray-200"></div>
                  <div className="flex-grow border-t border-gray-200"></div>
              </div>

              {/* Form Inputs */}
              <form className="space-y-4">
                  <div>
                      <input
                          type="email"
                          placeholder="Email" onChange={(e) => setEmail(e.target.value)} value={email}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder-gray-400 bg-gray-50" />
                  </div>
                  <div>
                      <input
                          type="password"
                          placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password}
                          className="w-full px-4 py-3 rounded-lg border relative border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder-gray-400 bg-gray-50" />
                      {/* <FaEye className='absolute right-3 top-3 w-[18px] h-[18px]' /> */}
                  </div>

                  <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition-all transform active:scale-[0.98] mt-4" onClick={handleLogin}>
                      Login
                  </button>
              </form>
          </div>
    </div>
  </>
  )
}

export default Login