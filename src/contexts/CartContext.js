import React, { createContext, useContext, useState } from "react";

const CartContext = createContext([]);

export default function CartProvider({ children }) {
  const [cartProducts, setCartProducts] = useState([]);

  return (
    <CartContext.Provider
      value={{
        cartProducts,
        setCartProducts
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCartContext = () => useContext(CartContext);
