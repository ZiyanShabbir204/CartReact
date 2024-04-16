import React from "react";
import Grid from "@mui/material/Grid";


import data from "../data.json";
import Product from "../component/Products";
import { useProductDataContext } from "../contexts/ProductContext";
const Catalog = () => {
  const {productsData} = useProductDataContext();
  return (
    <>
     <Grid
      container
      justifyContent='flex-start'
      alignItems="flex-start"
      direction="row"
      columnSpacing={2.5}
      rowSpacing={1.5}
      marginLeft={3}
    >
      {productsData.map((d) => (
        <Grid key={d.productID} item xs={12}  md={6} lg={3}>
          <Product {...d} />
        </Grid>
      ))}
    </Grid>
      
      {/* {productsData.map((d) => (
        <Product key={d.productID} {...d} />
      ))} */}
    </>
  );
};

export default Catalog;
