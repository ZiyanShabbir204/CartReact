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
import IconButton from "@mui/material/IconButton";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import ListItemButton from "@mui/material/ListItemButton";
import Chip from "@mui/material/Chip";
function Product({ productID, productName, productPrice, imageURL }) {
  const { cartProducts, setCartProducts } = useCartContext();
  const [activeBtn, setActiveBtn] = useState(false);
  const { productsData, setProductsData } = useProductDataContext();
  const [saveVariant, setSaveVariant] = useState(null);

  const targetedAvailable = productsData.find((prev) => {
    return +prev.productID === +productID;
  });
  const [price, setPrice] = useState(
    targetedAvailable.variants
      ? targetedAvailable.variants[0].price
      : productPrice
  );
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
    const handleVariant = (variant) => {
      setSaveVariant(variant);
      setPrice(variant.price);
    };

    return (
      <>
        <Card sx={{ maxWidth: 500, width: "100%", margin: "auto" }}>
          <CardMedia
            component="img"
            sx={{
              height: 250,
              backgroundPosition: "center",
              backgroundSize: "contain",
              objectFit: "contain",
            }}
            // width="50"
            image={imageURL}
            alt={productName}
          />

          <CardContent>
            <Typography gutterBottom variant="h3" component="div">
              {productName}
            </Typography>

            <Stack direction="row" justifyContent="space-between">
              <h3>Price</h3>
              <h3>{price}</h3>
            </Stack>

            {targetedAvailable.variants && (
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                gap={2}
              >
                {" "}
                {targetedAvailable.variants.map((variant) => (
                  <Chip
                    label={variant.name}
                    onClick={() => handleVariant(variant)}
                    selected={variant.id === saveVariant?.id}
                    size="medium"
                    sx={{
                      fontSize: "18px",
                    }}
                    color="success"
                  />
                ))}
              </Stack>
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
                <IconButton aria-label="delete" size="medium" color="error">
                  <RemoveIcon onClick={decrementQuantity} />
                </IconButton>
                <Typography variant="h6">{targetedProduct.quantity}</Typography>
                <IconButton
                  aria-label="delete"
                  size="medium"
                  color="primary"
                  // disabled={
                  //   !targetedAvailable.variants
                  //     ? +targetedAvailable.availableQuantity === +quantity
                  //     : +variant.availableQuantity === +quantity
                  // }
                >
                  <AddIcon onClick={incrementQuantity} />
                </IconButton>
              </Stack>
            )}
          </CardActions>
        </Card>
      </>
    );
  }
}
export default Product;
