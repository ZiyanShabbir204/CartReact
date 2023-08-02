import React, { useState } from "react";
import { useCartContext } from "../contexts/CartContext";
import data from "../data.json";

const CardDiv = ({ id, name, price, quantity }) => {
  const targetedAvailable = data.find((prev) => +prev.id === +id);

  const { setCartProducts } = useCartContext();

  const incrementQuantity = () => {
    setCartProducts((prev) =>
      prev.map((product) => {
        if (product.id === id) {
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
      setCartProducts((prev) => prev.filter((p) => p.id !== id));
    } else {
      setCartProducts((prev) =>
        prev.map((product) => {
          if (product.id === id) {
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
      <h2 className="width-set">{name}</h2>
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
      <h4 className="width-set">{price}</h4>
      <h2 className="width-set">{price * quantity}</h2>
    </div>
  );
};
export default CardDiv;
