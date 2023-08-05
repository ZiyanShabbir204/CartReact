import React, { useEffect, useState } from "react";
import { useCartContext } from "../contexts/CartContext";
import data from "../data.json";
import {useProductDataContext} from "../contexts/ProductContext"

function Product({ productID, productName, productPrice, imageURL}) {
  const { cartProducts, setCartProducts } = useCartContext();
  const [activeBtn, setActiveBtn] = useState(false);
  const {productsData,setProductsData} = useProductDataContext();

  // useEffect(() => {
  //   console.log("cartProducts", cartProducts);
  // }, [cartProducts]);
  const HandleCart = () => {
    setCartProducts((prev) => {
      return [...prev, { productID, productName, productPrice, quantity: 1 }];
    });
  };

  const incrementQuantity = () => {
    if (targetedAvailable.availableQuantity <= targetedProduct.quantity) {
      setActiveBtn(true);
      return;
    } else {
      setCartProducts((prev) =>
        prev.map((p) => {
          if (p.productID === productID) {
            return {
              ...p,
              quantity: p.quantity + 1
            };
          }
          return p;
        })
      );
    }
  };

  const decrementQuantity = () => {
    setActiveBtn(false);
    if (targetedProduct.quantity === 1) {
      setCartProducts((prev) => prev.filter((p) => p.productID !== productID));
    } else {
      setCartProducts((prev) =>
        prev.map((p) => {
          if (p.productID === productID) {
            return {
              ...p,
              quantity: p.quantity - 1
            };
          } else {
            return p;
          }
        })
      );
    }
  };

  const targetedAvailable = productsData.find((prev) => {
    return +prev.productID === +productID;
  });
  const targetedProduct = cartProducts.find((product) => +product.productID === +productID);
  console.log(
    "targetedAvailable.quantity",
    targetedAvailable.availableQuantity
  );
  console.log("targetedProduct.quantity", targetedProduct?.quantity);

  return (
    <div className="Product">
      <img src={imageURL} width="200px" />
      <h2>{productName}</h2>
      <h3>{productPrice}</h3>
      {!targetedProduct ? (
        <button className="add-button" onClick={HandleCart}>
          Add to cart
        </button>
      ) : (
        <div className="incri-decri">
          {" "}
          <button onClick={decrementQuantity} className="button-operation">
            <h3>-</h3>
          </button>
          <h2>{targetedProduct.quantity}</h2>{" "}
          <button
            onClick={incrementQuantity}
            className="button-operation"
            disabled={
              targetedAvailable.availableQuantity === targetedProduct.quantity
            }
          >
            <h3>+</h3>
          </button>
        </div>
      )}
      {targetedAvailable.availableQuantity === targetedProduct?.quantity && (
        <h3 className="red-color">product is out of stock</h3>
      )}
    </div>
  );
}
export default Product;
