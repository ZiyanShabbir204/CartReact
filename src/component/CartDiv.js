import React, { useState } from "react";
import { useCartContext } from "../contexts/CartContext";
import data from "../data.json";
import { useProductDataContext } from "../contexts/ProductContext";

const CardDiv = ({ productID, productName, productPrice, quantity }) => {

  const {productsData} =  useProductDataContext();

  const targetedAvailable = productsData.find((prev) => +prev.productID === +productID);

  const { setCartProducts } = useCartContext();

  const incrementQuantity = () => {
    setCartProducts((prev) =>
      prev.map((product) => {
        if (product.productID === productID) {
          // console.log("zzzzzaaaazz")
          return {
            ...product,
            quantity: product.quantity + 1
          };
        } else {
          // console.log("zzzzzzz")
          return product;
        }
      })
    );
  };

  const decrementQuantity = () => {
    if (quantity === 1) {
      setCartProducts((prev) => prev.filter((p) => p.productID !== productID));
    } else {
      setCartProducts((prev) =>
        prev.map((product) => {
          if (product.productID === productID) {
            return {
              ...product,
              quantity: product.quantity - 1
            };
          } else {
            return product;
          }
        })
      );
    }
  };

  return (
    <div className="flex-div">
      <h2 className="width-set">{productName}</h2>
      <div className="incri-decri">
        {" "}
        <button onClick={decrementQuantity} className="button-operation">
          <h3>-</h3>
        </button>
        <h3>{quantity}</h3>{" "}
        <button
          onClick={incrementQuantity}
          className="button-operation"
          disabled={targetedAvailable.availableQuantity === quantity}
        >
          <h3>+</h3>
        </button>
      </div>
      {/* <h4 className="width-set">{quantity}</h4> */}
      <h4 className="width-set">{productPrice}</h4>
      <h2 className="width-set">{productPrice * quantity}</h2>
    </div>
  );
};
export default CardDiv;
