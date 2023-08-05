import React from "react";

import data from "../data.json";
import Product from "../component/Products";
import { useProductDataContext } from "../contexts/ProductContext";
const Catalog = () => {
  const {productsData} = useProductDataContext();
  return (
    <>
      {/* {data.map((d) => (
        <Product key={d.id} {...d} />
      ))} */}
      {productsData.map((d) => (
        <Product key={d.productID} {...d} />
      ))}
    </>
  );
};

export default Catalog;
