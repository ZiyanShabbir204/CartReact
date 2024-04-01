import react, { useEffect, useState } from "react";
import { useProductDataContext } from "../contexts/ProductContext";
import { useCartContext } from "../contexts/CartContext";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import { Stack } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
const UpdateProduct = () => {
  const [productID, setProductID] = useState();
  const { productsData, setProductsData } = useProductDataContext();
  const { cartProducts, setCartProducts } = useCartContext();

  const [targetProduct, setTargetProduct] = useState();

  useEffect(() => {
    console.log("update", productsData);
  }, [productsData]);

  const findProduct = () => {
    const target = productsData.find((p) => +p.productID === +productID);
    setTargetProduct(target);
    console.log("target product", target);
  };
  function submitHandler(e) {
    e.preventDefault();
    const { productName, productPrice, availableQuantity, imageURL } = e.target;
    const productObj = {
      productID: targetProduct.productID,
      productName: productName.value,
      productPrice: productPrice.value,
      imageURL: imageURL.value,
    };
    {
      !targetProduct.variants
        ? (productObj.availableQuantity = availableQuantity.value)
        : (productObj.variants = targetProduct.variants);
    }
    setProductsData((prev) =>
      prev.map((p) => {
        if (+p.productID === targetProduct.productID) {
          return productObj;
        } else {
          return p;
        }
      })
    );

    setCartProducts((prev) =>
      prev.map((p) => {
        if (p.productID === targetProduct.productID) {
          return {
            ...p,
            productName: productName.value,
            productPrice: productPrice.value,
          };
        } else {
          return p;
        }
      })
    );

    setTargetProduct(null);
  }

  const changeHandler = (e) => {
    setTargetProduct((product) => ({
      ...product,
      [e.target.name]: e.target.value,
    }));
  };

  const changeVariantHandler = (e, variantID) => {
    console.log("e", e.target.name, e.target.value);
    console.log("targetProduct", targetProduct);

    const tempVariants = targetProduct.variants.map((variant) => {
      if (+variant.id === +variantID) {
        return {
          ...variant,
          [e.target.name]: e.target.value,
        };
      } else {
        return variant;
      }
    });
    const productObj = {
      productID: targetProduct.productID,
      productName: targetProduct.productName,
      productPrice: targetProduct.productPrice,
      imageURL: targetProduct.imageURL,
      variants: tempVariants,
    };
    setTargetProduct(productObj);
  };
  useEffect(() => {
    console.log("targettt product", targetProduct);
  }, [targetProduct]);

  const addVariantHandler = (productID) => {
    const newVariant = {
      name: "",
      price: 0,
      id: Math.ceil(Math.random() * 1000000000),
      availableQuantity: 0,
    };

    if (!targetProduct.variants) {
      // targetProduct.variants=newVariant;
      setTargetProduct((prev) => {
        return {
          ...prev,
          variants: [newVariant],
        };
      });
    } else {
      const variantList = targetProduct.variants;
      variantList.push(newVariant);
      setTargetProduct((prev) => {
        return {
          ...prev,
          variants: variantList,
        };
      });
    }
  };

  const handleRemove = (productID) => {
    const tempVariant =  targetProduct.variants.filter((variant) => variant.id != productID)
    setTargetProduct((prev)=>{
      if (tempVariant){
        return{
          ...prev,
          variants:tempVariant
        }
      }
      else{
        return{
          ...prev
        }
      }
    })


    // targetProduct.variants.filter()

  };

  return (
    <>
      <h1> ON Update</h1>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        gap={1}
      >
        <TextField
          id="search-product"
          size="small"
          name="productID"
          label="Product ID"
          variant="outlined"
          value={productID}
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

      {targetProduct && (
        <Stack>
          <h2>Product Detail</h2>
          <form onSubmit={submitHandler}>
            <Stack justifyContent="center" alignItems="center" gap={2}>
              <TextField
                id="product-name"
                name="productName"
                label="Product Name"
                variant="outlined"
                onChange={changeHandler}
                value={targetProduct.productName}
                // margin="normal"
              />

              <TextField
                id="product-price"
                label="Product Price"
                type="number"
                name="productPrice"
                onChange={changeHandler}
                value={targetProduct.productPrice}
                // margin="normal"
              />
              <TextField
                id="image-url"
                name="imageURL"
                label="Product Image URL"
                variant="outlined"
                // margin="normal"
                onChange={changeHandler}
                value={targetProduct.imageURL}
              />
              {!targetProduct.variants ? (
                <TextField
                  id="available-quantity"
                  name="availableQuantity"
                  label="Available Quantity"
                  variant="outlined"
                  // margin="normal"
                  onChange={changeHandler}
                  value={targetProduct.availableQuantity}
                />
              ) : (
                targetProduct.variants.map((variant) => (
                  <Stack
                    key={variant.id}
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                    gap={1}
                  >
                    <TextField
                      id="variant-data"
                      label="Variant Name"
                      value={variant.name}
                      name="name"
                      margin="normal"
                      size="small"
                      onChange={(e) => changeVariantHandler(e, variant.id)}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />

                    <TextField
                      id="price"
                      label="Price"
                      margin="normal"
                      value={variant.price}
                      name="price"
                      onChange={(e) => changeVariantHandler(e, variant.id)}
                      size="small"
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
                      name="availableQuantity"
                      onChange={(e) => changeVariantHandler(e, variant.id)}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                    <IconButton aria-label="delete" size="large" color="error">
                      <DeleteIcon onClick={() => handleRemove(variant.id)} />
                    </IconButton>
                  </Stack>
                ))
              )}
              <Stack direction="row" gap={2} sx={{ mb: 2 }}>
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => addVariantHandler(targetProduct.productID)}
                  size="small"
                >
                  Add Variant
                </Button>
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
        </Stack>
      )}
    </>
  );
};

export default UpdateProduct;
