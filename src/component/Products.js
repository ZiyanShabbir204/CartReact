import React, { useEffect, useState } from "react";
import { useCartContext } from "../contexts/CartContext";
import data from "../data.json";
import { useProductDataContext } from "../contexts/ProductContext";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions, Stack } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import ListItemButton from "@mui/material/ListItemButton";
function Product({ productID, productName, productPrice, imageURL }) {
  const { cartProducts, setCartProducts } = useCartContext();
  const [activeBtn, setActiveBtn] = useState(false);
  const { productsData, setProductsData } = useProductDataContext();
  const [saveVariant, setSaveVariant] = useState(null);

  const targetedAvailable = productsData.find((prev) => {
    return +prev.productID === +productID;
  });

  {
    const targetedProduct = cartProducts.find(
      (product) => +product.productID === +productID
    );

    // useEffect(() => {
    //   console.log("cartProducts", cartProducts);
    // }, [cartProducts]);
    const HandleCart = () => {
      if (!targetedAvailable.variants) {
        setCartProducts((prev) => {
          return [
            ...prev,
            { productID, productName, productPrice, quantity: 1 },
          ];
        });
      } else {
        const targetedVariantProduct = cartProducts.find(
          (product) =>
            product.productID == productID &&
            product.variant.id == saveVariant.id
        );

        if (!targetedVariantProduct) {
          setCartProducts((prev) => {
            return [
              ...prev,
              {
                productID,
                productName,
                productPrice,
                quantity: 1,
                variant: saveVariant,
              },
            ];
          });
        } else {
          setCartProducts((prev) =>
            prev.map((product) => {
              if (
                product.productID === productID &&
                product.variant.id === saveVariant.id
              ) {
                return {
                  ...product,
                  quantity: +product.quantity + 1,
                };
              } else {
                return product;
              }
            })
          );
        }
      }
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
                quantity: p.quantity + 1,
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
        setCartProducts((prev) =>
          prev.filter((p) => p.productID !== productID)
        );
      } else {
        setCartProducts((prev) =>
          prev.map((p) => {
            if (p.productID === productID) {
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
    };

    return (
      <>
        {/* <div className="Product">
          <img src={imageURL} width="200px" />
          <h2>{productName}</h2>
          <h3>{productPrice}</h3>
          {!targetedAvailable.variants ? (
            !targetedProduct ? (
              <button className="add-button" onClick={HandleCart}>
                Add to cart
              </button>
            ) : (
              <div className="incri-decri">
                {" "}
                <button
                  onClick={decrementQuantity}
                  className="button-operation"
                >
                  <h3>-</h3>
                </button>
                <h2>{targetedProduct.quantity}</h2>{" "}
                <button
                  onClick={incrementQuantity}
                  className="button-operation"
                  disabled={
                    +targetedAvailable.availableQuantity ===
                    +targetedProduct?.quantity
                  }
                >
                  <h3>+</h3>
                </button>
              </div>
            )
          ) : (
            <div>
              {targetedAvailable.variants.map((variant) => (
                <div onClick={() => setSaveVariant(variant)}>
                  <h3>{variant.name}</h3>
                  <h4>{variant.price}</h4>
                </div>
              ))}

              <button className="add-button" onClick={HandleCart}>
                Add to Cart
              </button>
            </div>
          )}

          {+targetedAvailable.availableQuantity ===
            +targetedProduct?.quantity && (
            <h3 className="red-color">product is out of stock</h3>
          )}

        </div> */}

        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            component="img"
            width="50"
            image={imageURL}
            alt={productName}
          />

          <CardContent>
            <Stack
              justifyContent="space-between"
              alignItems="center"
              spacing={2}
              direction="row"
            >
              <Typography gutterBottom variant="h5" component="div">
                {productName}
              </Typography>
              <Typography variant="body1" fontWeight="bold">
                {productPrice}
              </Typography>
            </Stack>
            {targetedAvailable.variants && (
              <List
                component="nav"
                aria-label="secondary mailbox folder"
                sx={{
                  width: "100%",
                  maxWidth: 360,
                  bgcolor: "background.paper",
                }}
              >
                {targetedAvailable.variants.map((variant) => (
                  <ListItemButton
                    onClick={() => setSaveVariant(variant)}
                    selected={variant.id === saveVariant?.id}
                  >
                    <ListItemText primary={variant.name} />
                    <ListItemText primary={variant.price} />
                  </ListItemButton>
                ))}
              </List>
            )}
          </CardContent>
          <CardActions
            sx={{
              justifyContent: "center",
            }}
          >
            {(targetedAvailable.variants || !targetedProduct) && (
              <Button
                variant="outlined"
                color="primary"
                startIcon={<AddShoppingCartIcon />}
                onClick={HandleCart}
                disabled={!saveVariant && targetedAvailable.variants}
              >
                Add to cart
              </Button>
            )}

            {!targetedAvailable.variants && targetedProduct && (
              <Stack
                direction="row"
                alignItems="center"
                spacing={2}
                alignContent="center"
              >
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  onClick={incrementQuantity}
                >
                  +
                </Typography>
                <Typography variant="body1" fontWeight="bold">
                  {targetedProduct.quantity}
                </Typography>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  onClick={decrementQuantity}
                >
                  -
                </Typography>
              </Stack>
            )}
          </CardActions>
        </Card>
      </>
    );
  }
}
export default Product;
