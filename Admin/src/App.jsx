import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import List from "./pages/List.jsx";
import Add from "./pages/Add.jsx";
import Orders from "./pages/Orders.jsx";  
import { useContext } from "react";
import { userDataContext } from "../context/UserContext.jsx";
const App = () => {
    let {userData} = useContext(userDataContext);
return (
    <Routes>
      <Route path="/" element={!userData ? <Login /> : <Home />} />
      <Route path="/adminHome" element={<Home />} />
      <Route path="/adminAdd" element={<Add />} />
      <Route path="/adminList" element={<List />} />
      <Route path="/adminOrder" element={<Orders />} />
    </Routes>
)
}

export default App;