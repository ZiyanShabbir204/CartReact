import react, { useContext, useEffect } from "react";
import { useProductDataContext } from "../contexts/ProductContext"
import { Route, Routes, Link, Outlet } from "react-router-dom";
import AddProducts from "../pages/AddProducts";
import UpdateProduct from "../pages/UpdateProduct";
import AdminProductDetail from "./AdminProductDetail";

export default function Admin() {
    const { productsData, setProductsData } = useProductDataContext();

    return (
        <>

            <div>
                {productsData.map((d) => (
                    <AdminProductDetail key={d.productID} {...d} />))}
            </div>

        </>

    );
}