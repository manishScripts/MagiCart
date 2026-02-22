import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext , useState } from 'react';
import { authDataContext } from '../context/authContext.jsx';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../utils/Firebase.js';
import { userDataContext } from '../context/userContext.jsx';
import axios from 'axios';
import Home from './Home.jsx';
const Login = () => {
 const navigate = useNavigate();
 let {serverValue} = useContext(authDataContext);
 let {getcurrentUser} = useContext(userDataContext);
 let [email , setEmail] = useState("");
 let [password , setPassword] = useState("");

 let handleLogin = async(e) => {
    e.preventDefault();
    try{
      let result = await axios.post(`${serverValue}` + '/api/auth/login',{
        email,password
      },{withCredentials: true});
      console.log("login result", result.data);
        getcurrentUser();
        navigate('/');
    } catch (error) {
      console.log("error in login", error);
    }
 }

 let googleLogin = async () => {
    // Handle Google Login Logic Here
    try {
      let response = await signInWithPopup(auth, provider);
      let user = response.user;
      let name = user.displayName;
      let email = user.email;

      let result = await axios.post(`${serverValue}` + '/api/auth/googleSignUp',{
        name,email
      },{withCredentials: true});
      console.log("google login result", result.data);
      getcurrentUser();
      navigate('/');
    } catch (error) {
      console.log("error in google login", error);
    }
 }
 
  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gray-50 font-sans">
     <header className="w-full p-2">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
          {/* Simple Cart Icon Placeholder */}
          <div className="bg-blue-600 p-2 rounded-lg text-white shadow-sm" >
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
          
          <h2 className="text-3xl font-semibold text-gray-900 mt-4">Login</h2>
          <p className="text-gray-500 mt-2">Welcome to MagiCart, Place your order</p>
        </div>

        {/* Google Auth Button */}
        <button className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200 font-medium" onClick={googleLogin}>
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
            Login with Google
        </button>

        {/* Divider */}
        <div className="relative flex items-center py-2">
          <div className="flex-grow border-t border-gray-200"></div>
          <span className="flex-shrink mx-4 text-gray-400 text-sm font-medium">OR</span>
          <div className="flex-grow border-t border-gray-200"></div>
        </div>

        {/* Form Inputs */}
        <form className="space-y-4">
          <div>
            <input 
              type="email" 
              placeholder="Email" onChange={(e)=> setEmail(e.target.value)} value = {email}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder-gray-400 bg-gray-50"
            />
          </div>
          <div>
            <input 
              type="password" 
              placeholder="Password" onChange={(e)=> setPassword(e.target.value)} value = {password}
              className="w-full px-4 py-3 rounded-lg border relative border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder-gray-400 bg-gray-50"
            />
            {/* <FaEye className='absolute right-3 top-3 w-[18px] h-[18px]' /> */}
          </div>

          <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition-all transform active:scale-[0.98] mt-4" onClick={handleLogin}>
            Login
          </button>
        </form>

        {/* Footer Link */}
        <p className="text-center text-gray-600 mt-6 cursor-pointer" onClick={() => navigate('/registration')}>
         Existing User?{' '}
          <span className='text-indigo-600 font-semibold hover:underline' >SignUp</span>
        </p>
      </div>
    </div>
  );
}

export default Login;