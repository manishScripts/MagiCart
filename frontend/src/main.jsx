import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthContext } from './context/authContext.jsx';
// import User from '../../backend/models/userSchema.js';
import UserContext from './context/UserContext.jsx';
import  ShoppingProvider  from './context/shoppingContext.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <AuthContext>
    <UserContext>
      <ShoppingProvider>
        <App />
      </ShoppingProvider>
    </UserContext>
  </AuthContext>
  </BrowserRouter>

  
)
