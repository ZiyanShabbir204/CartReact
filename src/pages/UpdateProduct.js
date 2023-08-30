import react, { useEffect, useState } from "react";
import { useProductDataContext } from "../contexts/ProductContext";
import { useCartContext } from "../contexts/CartContext";
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
    console.log("e",e.target.name , e.target.value);
    console.log("targetProduct",targetProduct)

    const tempVariants = targetProduct.variants.map(variant => {
        if (+variant.id === +variantID) {
          return ({
            ...variant,
            [e.target.name] : e.target.value,
          });
        } else {
          return variant;
        }
    })
    const productObj= {
        productID : targetProduct.productID,
        productName: targetProduct.productName,
        productPrice : targetProduct.productPrice,
        imageURL : targetProduct.imageURL,
        variants : tempVariants

    }
    setTargetProduct(productObj)
 
  };
  useEffect(()=>{
    console.log("targettt product",targetProduct)
  },[targetProduct])

  const addVariantHandler = (productID) =>{
    const newVariant = {
      name: "",
      price: 0,
      id: Math.ceil(Math.random() * 1000000000),
      availableQuantity:0
    };
   
    if(!targetProduct.variants){
      // targetProduct.variants=newVariant;
      setTargetProduct((prev)=>{
        return(
          {
            ...prev,
            variants:[newVariant]
          }
        )
      })
    }
    else{
      const variantList = targetProduct.variants;
      variantList.push(newVariant);
      setTargetProduct((prev)=>{
        return(
          {
            ...prev,
            variants:variantList
          }
        )
      })
    }

  }

  return (
    <>
      <h1> ON Update</h1>
      <label>
        Enter Id to search: <br />
        <input
          type="text"
          name="productID"
          value={productID}
          onChange={(e) => setProductID(e.target.value)}
        ></input>
        <button onClick={findProduct}>search</button>
      </label>
      {targetProduct && (
        <div>
          <h2>Product Detail</h2>
          <form onSubmit={submitHandler}>
            <label>
              Name of Product : <br />
              <input
                type="text"
                name="productName"
                onChange={changeHandler}
                value={targetProduct.productName}
              ></input>
            </label>
            <br />

            <label>
              Price of Product : <br />
              <input
                type="Number"
                name="productPrice"
                onChange={changeHandler}
                value={targetProduct.productPrice}
              ></input>
            </label>
            <br />

            <label>
              URL of ProductImage : <br />
              <input
                type="text"
                name="imageURL"
                onChange={changeHandler}
                value={targetProduct.imageURL}
              ></input>
            </label>
            <br />
            {!targetProduct.variants ? (
              <div>
                <label>
                  Available Quantity: <br />
                  <input
                    type="Number"
                    name="availableQuantity"
                    onChange={changeHandler}
                    value={targetProduct.availableQuantity}
                  ></input>
                </label>
                <br />
              </div>
            ) : (
              targetProduct.variants.map((variant) => (
                <div>
                  {" "}
                  <label>
                    {" "}
                    name:{" "}
                    <input
                      type="text"
                      value={variant.name}
                      name="name"
                      onChange={(e) => changeVariantHandler(e, variant.id)}
                    />{" "}
                  </label>{" "}
                  <label>
                    {" "}
                    price:{" "}
                    <input
                      type="number"
                      value={variant.price}
                      name="price"
                      onChange={(e) => changeVariantHandler(e, variant.id)}
                    />
                  </label>
                  <label>
                    {" "}
                    Available:{" "}
                    <input
                      type="number"
                      value={variant.availableQuantity}
                      name="availableQuantity"
                      onChange={(e) => changeVariantHandler(e, variant.id)}
                    />
                  </label>
                </div>
              ))
            )}

            <button type="button" onClick={()=>addVariantHandler(targetProduct.productID)}>Add variant</button>
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
    </>
  );
};

export default UpdateProduct;
