import { useProductDataContext } from "../contexts/ProductContext"
import { Route, Routes, Link, Outlet } from "react-router-dom";

export default function AdminLayout() {
    const { productsData, setProductsData } = useProductDataContext();

    return (
        <>

            <h1>Welcome To Admin Pannel</h1>
            <div className="navBar">
            <Link to="./" relative='route'>View</Link>
                <Link to="./AddProduct" relative='route'>Add</Link>
                <Link to="./UpdateProduct" relative="route">Update</Link>
                <Link to="./DeleteProduct" relative="route">Delete</Link>
            </div>
            <Outlet />




        </>

    );
}