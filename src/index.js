import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import CartProvider from "./contexts/CartContext";
import ProductProvider from "./contexts/ProductContext"
import App from "./App";
import { BrowserRouter } from "react-router-dom";


const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <ProductProvider>
    <CartProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CartProvider>
    </ProductProvider>
  </StrictMode>
);
