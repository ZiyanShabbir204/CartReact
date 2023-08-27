import react, { useEffect, useState } from "react";
import { useProductDataContext } from "../contexts/ProductContext";

export default function AddProducts() {
  const [variants, setVariantData] = useState([]);

  const { productsData, setProductsData } = useProductDataContext();
  useEffect(() => {
    console.log("productdata", productsData);
  }, [productsData]);

  const SubmitHandler = (e) => {
    e.preventDefault();
    const { productName, productPrice, availableQuantity, imageURL } = e.target;
    const productData = {
      productID: Date.now(),
      productName: productName.value,
      productPrice: productPrice.value,
      imageURL: imageURL.value
    };

    if(variants.length===0){
        productData.availableQuantity= availableQuantity.value;
    }
    else{
      productData.variants = variants;
    }

    productName.value = "";
    productPrice.value = "";
    if(variants.length===0){
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
      availableQuantity:0
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
          <label>
            Name of Product : <br />
            <input type="text" name="productName"></input>
          </label>
          <br />

          <label>
            Price of Product : <br />
            <input type="Number" name="productPrice"></input>
          </label>
          <br />

          {variants.length === 0 && (
            <div>
              <label>
                Available Quantity: <br />
                <input type="Number" name="availableQuantity"></input>
              </label>
            </div>
          )}

          <label>
            URL of ProductImage : <br />
            <input type="text" name="imageURL"></input>
          </label>
          <br />
          <button type="button" onClick={() => addVariantHandler()}>
            {" "}
            Add Variant
          </button>

          {variants.map((variant) => (
            <div key={variant.id}>
              <input
                placeholder="variant data"
                value={variant.name}
                onChange={(e) =>
                  variantChangeHandler("name", variant.id, e.target.value)
                }
              />

              <input
                placeholder="price"
                value={variant.price}
                onChange={(e) =>
                  variantChangeHandler("price", variant.id, e.target.value)
                }
              />
              <input
                placeholder="available quantity"
                type="number"
                value={variant.availableQuantity}
                onChange={(e) =>
                  variantChangeHandler(
                    "availableQuantity",
                    variant.id,
                    e.target.value
                  )
                }
              />
              <button onClick={() => handleRemove(variant.id)}>Remove</button>
            </div>
          ))}

          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}
