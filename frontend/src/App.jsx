import { Routes, Route, Navigate ,useLocation, useParams } from "react-router-dom";
import Registration from "./pages/Registration";

function ProductRedirect() {
  const { id } = useParams();
  return <Navigate to={`/productdetail/${id}`} replace />;
}
import Login from "./pages/Login";
import Home from "./pages/Home";
import About from "./pages/About.jsx";
import Products from "./pages/Product";
import Collections from "./pages/Collection";
import ProductDetail from "./pages/ProductDetail";
import Contact from "./pages/Contact";
import { React, useContext } from "react";
import { userDataContext } from "./context/UserContext.jsx";
import Nav from "./components/Nav.jsx";
import Order from "./pages/Order.jsx";
import Cart from "./pages/Cart.jsx";
import PlaceOrder from "./pages/PlaceOrder.jsx";
function App() {
  let { userdata } = useContext(userDataContext);
  let location = useLocation();
  return (
    <>
    {userdata && <Nav/>}
      <Routes>
        <Route
          path="/login"
          element={
            userdata ? <Navigate to={location.state?.from || "/"} /> : <Login />
          }
        />

        <Route
          path="/registration"
          element={
            userdata ? (
              <Navigate to={location.state?.from || "/"} />
            ) : (
              <Registration />
            )
          }
        />

        <Route
          path="/"
          element={
            userdata ? (
              <Home />
            ) : (
              <Navigate to="/login" state={{ from: location.pathname }} />
            )
          }
        />
        <Route
          path="/contact"
          element={
            userdata ? (
              <Contact />
            ) : (
              <Navigate to="/login" state={{ from: location.pathname }} />
            )
          }
        />
        <Route
          path="/about"
          element={
            userdata ? (
              <About />
            ) : (
              <Navigate to="/login" state={{ from: location.pathname }} />
            )
          }
        />
        <Route
          path="/products"
          element={
            userdata ? (
              <Products />
            ) : (
              <Navigate to="/login" state={{ from: location.pathname }} />
            )
          }
        />
        <Route
          path="/collections"
          element={
            userdata ? (
              <Collections />
            ) : (
              <Navigate to="/login" state={{ from: location.pathname }} />
            )
          }
        />
        <Route
          path="/productdetail/:id"
          element={
            userdata ? (
              <ProductDetail />
            ) : (
              <Navigate to="/login" state={{ from: location.pathname }} />
            )
          }
        />
        <Route
          path="/product/:id"
          element={
            userdata ? (
              <ProductRedirect />
            ) : (
              <Navigate to="/login" state={{ from: location.pathname }} />
            )
          }
        />

        <Route
          path="/cart"
          element={
            userdata ? (
              <Cart />
            ) : (
              <Navigate to="/login" state={{ from: location.pathname }} />
            )
          }
        />
        <Route
          path="/placeorder"
          element={
            userdata ? (
              <PlaceOrder />
            ) : (
              <Navigate to="/login" state={{ from: location.pathname }} />
            )
          }
        />
        <Route
          path="/order"
          element={
            userdata ? (
              <Order />
            ) : (
              <Navigate to="/login" state={{ from: location.pathname }} />
            )
          }
        />
        {/* <Route path = "cart" element={<Cart />} /> */}
      </Routes>
    </>
  );
}

export default App;
