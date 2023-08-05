import React from "react";
import "./styles.css";
import { useCartContext } from "./contexts/CartContext";
import { Routes, Route, Link } from "react-router-dom";
import Cart from "./component/Cart";
import Catalog from "./pages/Catlog";
import Admin from "./component/Admin";

export default function App() {
  const { cartProducts } = useCartContext();
  return (
    <div className="App">
      <h1>Shopping Cart</h1>
      <h2>
        <Link to="/Cart">Cart</Link>{" "}
        {!!cartProducts.length && cartProducts.length}
      </h2>
      <Link to="/">Home</Link>{" "}
      <Link to="/Admin">Admin</Link>
      <Routes>
        <Route path="/" element={<Catalog />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/Admin" element={<Admin />}/>
      </Routes>
    </div>
  );
}
