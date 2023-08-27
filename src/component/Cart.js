import React from "react";
import { useCartContext } from "../contexts/CartContext";
import CartDiv from "./CartDiv";
export default function Cart() {
  console.log("in Cart");

  const { cartProducts, setCartProducts } = useCartContext();
  const totalPrice = cartProducts.reduce((acc, currentValue) => {
    acc += currentValue.productPrice * currentValue.quantity;
    
    if(currentValue.variant){
      acc += currentValue.variant.price * currentValue.quantity
    }

    return acc


  }, 0);

  return (
    <>
      <div className="flex-div">
        <h2 className="width-set">Name</h2>
        <h4 className="width-set">quantity</h4>
        <h4 className="width-set">Price</h4>
        <h2 className="width-set">Total Price</h2>
      </div>
      {cartProducts.map((product) => (
        <CartDiv key={product.productID} {...product} />
      ))}

      <div className="total-bill">
        <h2>Total bill</h2>
        <h2>{totalPrice}</h2>
      </div>
    </>
  );
}
