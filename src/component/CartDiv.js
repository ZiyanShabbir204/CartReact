import React, { useState } from "react";
import { useCartContext } from "../contexts/CartContext";
import data from "../data.json";
import { useProductDataContext } from "../contexts/ProductContext";

const CardDiv = ({
  productID,
  productName,
  productPrice,
  quantity,
  variant,
}) => {
  const { productsData } = useProductDataContext();

  const targetedAvailable = productsData.find(
    (prev) => +prev.productID === +productID
  );

  const { setCartProducts, cartProducts } = useCartContext();

  const incrementQuantity = () => {
    if (!targetedAvailable.variants) {
      setCartProducts((prev) =>
        prev.map((product) => {
          if (product.productID === productID) {
            return {
              ...product,
              quantity: product.quantity + 1,
            };
          } else {
            return product;
          }
        })
      );
    } else {
      setCartProducts((prev) =>
        prev.map((p) => {
          if (p.productID === productID && p.variant.id === variant.id) {
            return {
              ...p,
              quantity: p.quantity + 1,
            };
          } else {
            return p;
          }
        })
      );
    }
  };

  const decrementQuantity = () => {
    if (!targetedAvailable.variants) {
      if (quantity === 1) {
        setCartProducts((prev) =>
          prev.filter((p) => p.productID !== productID)
        );
      } else {
        setCartProducts((prev) =>
          prev.map((product) => {
            if (product.productID === productID) {
              return {
                ...product,
                quantity: product.quantity - 1,
              };
            } else {
              return product;
            }
          })
        );
      }
    } else {
      if (quantity === 1) {
        console.log("product", productID, variant);
        console.log("cart", cartProducts);
        setCartProducts((prev) =>
          prev.filter(
            (p) => p.productID !== productID || variant.id !== p.variant.id
          )
        );
      } else {
        setCartProducts((prev) =>
          prev.map((p) => {
            if (p.productID === productID && p.variant.id === variant.id) {
              return {
                ...p,
                quantity: p.quantity - 1,
              };
            } else {
              return p;
            }
          })
        );
      }
    }
  };

  return (
    <div className="flex-div">
      {!targetedAvailable.variants ? (
        <h2 className="width-set">{productName}</h2>
      ) : (
        <h2 className="width-set">
          {productName}-{variant.name}
        </h2>
      )}

      <div className="incri-decri">
        {" "}
        <button onClick={decrementQuantity} className="button-operation">
          <h3>-</h3>
        </button>
        <h3>{quantity}</h3>{" "}
        <button
          onClick={incrementQuantity}
          className="button-operation"
          // disabled={+targetedAvailable.availableQuantity === +quantity}

          disabled={
            !targetedAvailable.variants
              ? +targetedAvailable.availableQuantity === +quantity
              : +variant.availableQuantity === +quantity
          }
        >
          <h3>+</h3>
        </button>
      </div>
      {/* <h4 className="width-set">{quantity}</h4> */}
      {!targetedAvailable.variants ? (
        <div>
          <h4 className="width-set">{productPrice}</h4>
          <h2 className="width-set">{productPrice * quantity}</h2>
        </div>
      ) : (
        <div>
          {" "}
          <h4 className="width-set">{+productPrice + +variant.price}</h4>
          <h2 className="width-set">
            {(+productPrice + +variant.price) * quantity}
          </h2>
        </div>
      )}
    </div>
  );
};
export default CardDiv;
