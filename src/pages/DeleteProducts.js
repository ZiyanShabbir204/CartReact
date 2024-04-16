import react, { useState } from "react";
import { useProductDataContext } from "../contexts/ProductContext";
import { useCartContext } from "../contexts/CartContext";
import { Stack } from "@mui/material";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

import IconButton from "@mui/material/IconButton";
export default function DeleteProduct() {
  const [productId, setProductID] = useState();
  const [targetedProduct, setTargetProduct] = useState();
  const { productsData, setProductsData } = useProductDataContext();
  const { cartProducts, setCartProducts } = useCartContext();

  const findProduct = () => {
  
    const targetProduct = productsData.find((p) => +p.productID === +productId);
    setTargetProduct(targetProduct);
  };

  const deleteHandler = () => {
    console.log("deleteId", productId);

    if (targetedProduct) {
      setProductsData((prev) =>
        prev.filter((p) => +p.productID !== +productId)
      );
      setCartProducts((prev) =>
        prev.filter((p) => +p.productID !== +productId)
      );
      console.log("cart product", cartProducts);
      alert("produt is deleted");
      setTargetProduct();
    } else {
      alert("id is not valid");
    }
  };
  return (
    <>
      <h1>On Delete</h1>
      <Stack justifyContent="center" alignItems="center" gap={2}>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          gap={2}
        >
          <TextField
            id="search-product"
            size="small"
            name="productID"
            label="Product ID"
            variant="outlined"
            value={productId}
            onChange={(e) => setProductID(e.target.value)}
            // margin="normal"
          />
          <Button
            variant="contained"
            color="success"
            onClick={findProduct}
            size="small"
            startIcon={<SearchOutlinedIcon />}
          >
            Search
          </Button>
        </Stack>
        {targetedProduct && (
          <Stack justifyContent="center" alignItems="center" gap={2}>
            <h2>Product Detail</h2>
            <TextField
              id="product-name"
              name="productName"
              label="Product Name"
              variant="outlined"
              value={targetedProduct.productName}
              InputProps={{
                readOnly: true,
              }}
              // margin="normal"
            />
            {!targetedProduct.variants && (
              <TextField
                id="product-price"
                label="Product Price"
                type="number"
                name="productPrice"
                value={targetedProduct.productPrice}
                InputProps={{
                  readOnly: true,
                }}
                // margin="normal"
              />
            )}

            <TextField
              id="image-url"
              name="imageURL"
              label="Product Image URL"
              variant="outlined"
              // margin="normal"
              value={targetedProduct.imageURL}
              InputProps={{
                readOnly: true,
              }}
            />
            <Button
              sx={{ mb: 2 }}
              variant="contained"
              color="error"
              onClick={deleteHandler}
              size="small"
              startIcon={<DeleteIcon />}
            >
              Delete
            </Button>
          </Stack>
        )}
      </Stack>

      {/* <label>
        Input Id : <br />
        <input
          type="text"
          name="productID"
          value={productId}
          onChange={(e) => setProductID(e.target.value)}
        ></input>
      </label>
      <br />
      <button onClick={deleteHandler}>Delete</button> */}
    </>
  );
}
