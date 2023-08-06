import React from "react";
import "./styles.css";
import { useCartContext } from "./contexts/CartContext";
import { Routes, Route, Link } from "react-router-dom";
import Cart from "./component/Cart";
import Catalog from "./pages/Catlog";
import Admin from "./component/Admin";
import UpdateProduct from "./pages/UpdateProduct";
import AddProducts from "./pages/AddProducts";
import DeleteProduct from "./pages/DeleteProducts";
import AdminLayout from "./layout/Admin";

export default function App() {
  const { cartProducts } = useCartContext();
  return (
    <div className="App">
      <h1>Shopping Cart</h1>
      <div className="navBar">
        <div>
        <Link to="/Admin">Admin</Link>
        </div>
        <div>
          <Link to="/">Home</Link>
        </div>
        <div>
          
          <h2>
            <Link to="/Cart">Cart</Link>{" "}
            {!!cartProducts.length && cartProducts.length}
          </h2>
        </div>

      </div>

      <Routes>
        <Route path="/" element={<Catalog />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/Admin" element={<AdminLayout />} >
          <Route index  element={<Admin />}  ></Route>
          <Route path="UpdateProduct" element={<UpdateProduct/>}></Route>
          <Route path="AddProduct" element={<AddProducts/>}></Route>
          <Route path="DeleteProduct" element={<DeleteProduct/>}></Route>
        </Route>
      </Routes>
    </div>
  );
}
