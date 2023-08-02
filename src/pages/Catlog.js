import React from "react";

import data from "../data.json";
import Product from "../component/Products";
const Catalog = () => {
  return (
    <>
      {data.map((d) => (
        <Product key={d.id} {...d} />
      ))}
    </>
  );
};

export default Catalog;
