import react, { useContext, useEffect } from "react";
import { useProductDataContext } from "../contexts/ProductContext";
import { Route, Routes, Link, Outlet } from "react-router-dom";
import AddProducts from "../pages/AddProducts";
import UpdateProduct from "../pages/UpdateProduct";
import AdminProductCard from "./AdminProductDetail";
import Grid from "@mui/material/Grid";

export default function Admin() {
  const { productsData, setProductsData } = useProductDataContext();
  // columnSpacing={{ xs: 1, sm: 2, md: 3 }}
  return (
    <Grid
      container
      justifyContent='center'
      alignItems="flex-start"
      direction="row"
      columnSpacing={2.5}
      rowSpacing={1.5}
    >
      {productsData.map((d) => (
        <Grid key={d.productID} item xs={12}  md={6} lg={3}>
          <AdminProductCard {...d} />
        </Grid>
      ))}
    </Grid>
  );
}
