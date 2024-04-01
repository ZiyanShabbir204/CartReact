import react, { useEffect, useState } from "react";
import { useProductDataContext } from "../contexts/ProductContext";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import { red } from "@mui/material/colors";
import { Stack } from "@mui/material";
import IconButton from "@mui/material/IconButton";

export default function AddProducts() {
  const [variants, setVariantData] = useState([]);

  const { productsData, setProductsData } = useProductDataContext();
  useEffect(() => {
    console.log("productdata", productsData);
  }, [productsData]);

  const SubmitHandler = (e) => {
    e.preventDefault();
    const { productName, productPrice, availableQuantity, imageURL } = e.target;
    debugger;
    const productData = {
      productID: Date.now(),
      productName: productName.value,
      productPrice: productPrice.value,
      imageURL: imageURL.value,
    };

    if (variants.length === 0) {
      productData.availableQuantity = availableQuantity.value;
    } else {
      productData.variants = variants;
    }

    productName.value = "";
    productPrice.value = "";
    if (variants.length === 0) {
      availableQuantity.value = "";
    }

    imageURL.value = "";
    setVariantData([]);

    setProductsData((prev) => [...prev, productData]);
  };

  const addVariantHandler = () => {
    const newVariant = {
      name: "",
      price: 0,
      id: Math.ceil(Math.random() * 1000000000),
      availableQuantity: 0,
    };
    setVariantData((prev) => [...prev, newVariant]);
  };

  const variantChangeHandler = (property, id, value) => {
    setVariantData((prev) =>
      prev.map((varaint) => {
        if (varaint.id === id) {
          return {
            ...varaint,
            [property]: value,
          };
        }
        return varaint;
      })
    );
  };

  const handleRemove = (id) => {
    setVariantData((prev) => prev.filter((variant) => variant.id !== id));
  };

  return (
    <>
      <div>
        <h2>Product Detail</h2>
        <form onSubmit={SubmitHandler}>
          <Stack justifyContent="center" alignItems="center" gap={2}>
            <TextField
              id="product-name"
              name="productName"
              label="Product Name"
              variant="outlined"
              // margin="normal"
            />

            <TextField
              id="product-price"
              label="Product Price"
              type="number"
              name="productPrice"
              // margin="normal"
            />

            {variants.length === 0 && (
              <TextField
                id="available-quantity"
                label="Available Quantity"
                type="number"
                name="availableQuantity"
                // margin="normal"
              />
            )}

            <TextField
              id="image-url"
              name="imageURL"
              label="Product Image URL"
              variant="outlined"
              // margin="normal"
            />

            <Stack direction={variants.length > 0 ? 'column' : 'row'} alignItems='center' gap={1} >
              <Button
                variant="contained"
                color="success"
                onClick={() => addVariantHandler()}
                size="small"
              >
                Add Variant
              </Button>

              {variants.map((variant) => (
                <Stack
                  key={variant.id}
                  direction="row"
                  alignItems="center"
                  justifyContent="center"
                  gap={1}
                >
                  <TextField
                    id="variant-data"
                    label="Variant Data"
                    margin="normal"
                    size="small"
                    onChange={(e) =>
                      variantChangeHandler("name", variant.id, e.target.value)
                    }
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />

                  <TextField
                    id="price"
                    label="Price"
                    margin="normal"
                    value={variant.price}
                    size="small"
                    onChange={(e) =>
                      variantChangeHandler("price", variant.id, e.target.value)
                    }
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  <TextField
                    id="available-quantity"
                    label="Available Quantity"
                    size="small"
                    margin="normal"
                    value={variant.availableQuantity}
                    onChange={(e) =>
                      variantChangeHandler(
                        "availableQuantity",
                        variant.id,
                        e.target.value
                      )
                    }
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  <IconButton aria-label="delete" size="large" color="error" >
                    <DeleteIcon onClick={() => handleRemove(variant.id)} />
                  </IconButton>
                </Stack>
              ))}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="small"
              >
                Submit
              </Button>
            </Stack>
          </Stack>
        </form>
      </div>
    </>
  );
}
