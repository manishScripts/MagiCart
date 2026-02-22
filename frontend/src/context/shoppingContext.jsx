import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
import { authDataContext } from "./authContext";
import { userDataContext } from "./userContext";
import axios from "axios";
// eslint-disable-next-line react-refresh/only-export-components
export const ShoppingContext = createContext();
function ShoppingProvider({ children }) {
  let [products, setProducts] = useState([]);
  let [isSearchOpen, setIsSearchOpen] = useState(false);
  let [search, setSearch] = useState("");
  let [cartItems, setCartItems] = useState({}); // { productId: { size: quantity } }
  let [isCartInitialized, setIsCartInitialized] = useState(false);
  let { serverValue } = useContext(authDataContext);
  let { userdata } = useContext(userDataContext);
  let currency = "₹";
  let deliverFee = 50;

  const getProducts = useCallback(async () => {
    try {
      let result = await axios.get(serverValue + "/api/product/listproduct");
      console.log("Products fetched successfully :", result.data.products);
      setProducts(result.data.products);
    } catch (error) {
      console.error("Error fetching products: ", error);
    }
  }, [serverValue]);

  const addTocart = async (productId, size) => {
    const validSize = size != null && String(size).trim() !== '';
    if (!validSize) {
      alert("Please select a size before adding to cart.");
      return;
    }
    const trimmedSize = String(size).trim();
    let cartData = structuredClone(cartItems); // Deep copy to avoid direct state mutation
    if (cartData[productId]) {
      if (cartData[productId][trimmedSize]) {
        cartData[productId][trimmedSize] += 1;
      } else {
        cartData[productId][trimmedSize] = 1;
      }
    } else {
      cartData[productId] = { [trimmedSize]: 1 };
    }
    setCartItems(cartData);
    console.log("Cart updated:", cartData);

    try {
      await axios.post(
        serverValue + "/api/cart/add",
        { itemId: productId, size: trimmedSize },
        { withCredentials: true },
      );
      console.log("Item added to cart on server");
    } catch (error) {
      console.error("Error adding to cart on server:", error);
      // Show error message to user
      alert(error.response?.data?.message || "Failed to add item to cart");
    }
  };

  const getUserCart = useCallback(async () => {
    try {
      let result = await axios.get(
        serverValue + "/api/cart/get",
        { withCredentials: true },
      );
      // Backend returns cartData, not cart
      const cartFromServer = result.data.cartData ?? result.data.cart ?? {};
      console.log("User cart fetched:", cartFromServer);
      setCartItems(cartFromServer);
    } catch (error) {
      console.error("Error fetching user cart:", error);
    }
  }, [serverValue]);

  const updateQuantity = async (productId, size, quantity) => {
    let updatedCart = structuredClone(cartItems);
    updatedCart[productId][size] = quantity;
    setCartItems(updatedCart);

    if (userdata) {
      try {
        await axios.post(
          serverValue + "/api/cart/update",
          { itemId: productId, size, quantity },
          { withCredentials: true },
        );
        console.log("Cart updated on server");
      } catch (error) {
        console.error("Error updating cart on server:", error);
      }
    }
  };

  const getCartCount = () => {
    let count = 0;
    for (let productId in cartItems) {
      for (let size in cartItems[productId]) {
        try {
          if (cartItems[productId] && cartItems[productId][size]) {
            count += cartItems[productId][size];
          }
        } catch (error) {
          console.error("Error calculating cart count:", error);
        }
      }
    }
    return count;
  };

  const getCartTotal = () => {
    try {
      let total = 0;
      for (let productId in cartItems) {
        for (let size in cartItems[productId]) {
          const product = products.find(p => p._id === productId);
          if (product && product.price) {
            total += product.price * cartItems[productId][size];
          }
        }
      }
      return total;
    } catch (error) {
      console.error("Error calculating cart total:", error);
      return 0; 
    }
  }

  const removeFromCart = async (productId, size) => {
    let updatedCart = structuredClone(cartItems);
    if (updatedCart[productId]) {
      delete updatedCart[productId][size];
      if (Object.keys(updatedCart[productId]).length === 0) {
        delete updatedCart[productId];
      }
      setCartItems(updatedCart);

      if (userdata) {
        try {
          await axios.post(
            serverValue + "/api/cart/remove",
            { itemId: productId, size },
            { withCredentials: true },
          );
          console.log("Item removed from cart on server");
        } catch (error) {
          console.error("Error removing item from cart on server:", error);
        }
      }
    }
  };

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  // Fetch cart data from backend when user logs in, reset when they log out
  useEffect(() => {
    if (!userdata) {
      setCartItems({});
      setIsCartInitialized(false);
      return;
    }
    if (userdata && serverValue && !isCartInitialized) {
      getUserCart();
      setIsCartInitialized(true);
    }
  }, [userdata, serverValue, isCartInitialized, getUserCart]);
  let value = {
    products,
    currency,
    deliverFee,
    getProducts,
    isSearchOpen,
    setIsSearchOpen,
    search,
    setSearch,
    addTocart,
    cartItems,
    setCartItems,
    getCartCount,
    getCartTotal,
    updateQuantity,
    removeFromCart,
  };
  return (
    <div>
      <ShoppingContext.Provider value={value}>
        {children}
      </ShoppingContext.Provider>
    </div>
  );
}

export default ShoppingProvider;
