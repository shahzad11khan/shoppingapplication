// import { createContext, useContext, useReducer, useEffect } from "react";
// import reducer from "../reducer/cartReducer";

// const cartReducer = (state, action) => {
//   // ... Your existing reducer logic ...

//   if (action.type === "CONFIRM_ORDER") {
//     // Implement your logic for confirming the order
//     // For example, you might want to send the order data to a server
//     console.log("Order confirmed for item with id:", action.payload);
//     return state;
//   }


// const getLocalCartData = () => {
// const localCartData =
//   localStorage.getItem("e-com");
//   const parsedData = 
//       JSON.parse(localCartData);
//         if (!Array.isArray(parsedData))
//           return [];
//         return parsedData;

// };

// const initialState = {
//   // cart: [],
//   cart: getLocalCartData(),
//   total_item: "",
//   total_price: "",
//   shipping_fee: 50000,
// };
// const CartProvider = ({ children }) => {
//   const [cartState, dispatch] = useReducer(cartReducer, initialState);

//   const confirmOrder = (itemId) => {
//     dispatch({ type: "CONFIRM_ORDER", payload: itemId });
//   };

// const CartProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(reducer, initialState);

//   const addToCart = (id, color, amount, product) => {
//     dispatch({ type: "ADD_TO_CART", payload: { id, color, amount, product } });
//   };

//   // increment and decrement the product

//   const setDecrease = (id) => {
//     dispatch({ type: "SET_DECREMENT", payload: id });
//   };

//   const setIncrement = (id) => {
//     dispatch({ type: "SET_INCREMENT", payload: id });
//   };

//   // to remove the individual item from cart
//   const removeItem = (id) => {
//     dispatch({ type: "REMOVE_ITEM", payload: id });
//   };

//   // to clear the cart
//   const clearCart = () => {
//     dispatch({ type: "CLEAR_CART" });
//   };

//   // to add the data in localStorage
//   // get vs set

//   useEffect(() => {
//     // dispatch({ type: "CART_TOTAL_ITEM" });
//     // dispatch({ type: "CART_TOTAL_PRICE" });
//     dispatch({ type: "CART_ITEM_PRICE_TOTAL" });

//     localStorage.setItem("e-com", JSON.stringify(state.cart));
//   }, [state.cart]);

//   return (
    
//     <CartContext.Provider
//       value={{
//         ...state,
//         addToCart,
//         removeItem,
//         clearCart,
//         setDecrease,
//         setIncrement,
//         confirmOrder ,
//       }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// const useCartContext = () => {
//   const context = useContext(CartContext);
//   if (!context) {
//     throw new Error("useCartContext must be used within a CartProvider");
//   }
//   return context;
// };
//   return useContext(CartContext);
// };

// export { CartProvider, useCartContext };


import { createContext, useContext, useReducer, useEffect } from "react";
import reducer from "../reducer/cartReducer";

const getLocalCartData = () => {
  const localCartData = localStorage.getItem("e-com");
  const parsedData = JSON.parse(localCartData);
  if (!Array.isArray(parsedData)) return [];
  return parsedData;
};

const initialState = {
  cart: getLocalCartData(),
  total_item: "",
  total_price: "",
  shipping_fee: 500,
};

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const confirmOrder = (itemId) => {
    dispatch({ type: "CONFIRM_ORDER", payload: itemId });
  };

  const addToCart = (id, amount, product) => {
    console.log(id)
    console.log(amount)
    console.log(product.name)
    const name=product.name
    console.log(product.price)
    const price =product.price

    dispatch({ type: "ADD_TO_CART", payload: { id, amount, product } });
  };

  const setDecrease = (id) => {
    dispatch({ type: "SET_DECREMENT", payload: id });
  };

  const setIncrement = (id) => {
    dispatch({ type: "SET_INCREMENT", payload: id });
  };

  const removeItem = (id) => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
    // console.log(id)
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };
 

  useEffect(() => {
    dispatch({ type: "CART_ITEM_PRICE_TOTAL" });
    localStorage.setItem("e-com", JSON.stringify(state.cart));
  }, [state.cart]);

  return (
    <CartContext.Provider
      value={{
        ...state,
        addToCart,
        removeItem,
        clearCart,
        setDecrease,
        setIncrement,
        confirmOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext must be used within a CartProvider");
  }
  return context;
};

export { CartProvider, useCartContext };
