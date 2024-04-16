import React from "react";
import { useCartContext } from "../contexts/CartContext";
import CartDiv from "./CartDiv";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
export default function Cart() {
  console.log("in Cart");

  const { cartProducts, setCartProducts } = useCartContext();
  console.log("cartproduct",cartProducts)
  const totalPrice = cartProducts.reduce((acc, currentValue) => {
    // acc += currentValue.productPrice * currentValue.quantity;

    if (currentValue.variant) {
      acc += currentValue.variant.price * currentValue.quantity;
    }
    else{
      acc += currentValue.productPrice * currentValue.quantity;

    }

    return acc;
  }, 0);

  return (
    <>
      <Stack direction="row" justifyContent="space-around" alignItems="center">
        <Typography variant="h5" component="h2" fontWeight="bold" width="25%">
          Name
        </Typography>
        <Typography variant="h5" component="h2" fontWeight="bold" width="25%">
          Quantity
        </Typography>
        <Typography variant="h5" component="h2" fontWeight="bold" width="25%">
          Price
        </Typography>
        <Typography variant="h5" component="h2" fontWeight="bold" width="25%">
          Total Price
        </Typography>
      </Stack>

      {cartProducts.map((product) => (
        <CartDiv key={product.productID} {...product} />
      ))}
      <Stack direction="row" justifyContent="space-around" alignItems="center" marginTop={7}>
        <Typography variant="h5" component="h2" fontWeight="bold" width="25%" color="primary">
          Total bill
        </Typography>
        <Typography
          variant="h5"
          component="h2"
          fontWeight="bold"
          width="25%"
        ></Typography>
        <Typography
          variant="h5"
          component="h2"
          fontWeight="bold"
          width="25%"
        ></Typography>
        <Typography variant="h5" component="h2" fontWeight="bold" width="25%" color="error">
          {totalPrice}
        </Typography>
      </Stack>

  
    </>
  );
}
