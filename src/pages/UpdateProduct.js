import react, { useState } from "react";
import { useProductDataContext } from "../contexts/ProductContext";
const UpdateProduct = () => {
    const [productID,setProductID] = useState();
    const {productsData,setProductsData} = useProductDataContext();
    const [targetProduct,setTargetProduct] = useState()

   
    const findProduct = ()=>{
        const target = productsData.find((p) => +p.productID === +productID);
        setTargetProduct(target);
        console.log("target product",target);

    }
    function submitHandler(e){
        e.preventDefault()
        const {productName,productPrice,availableQuantity,imageURL} = e.target;
        const productObj = {
            productID:targetProduct.productID,
            productName:productName.value,
            productPrice:productPrice.value,
            availableQuantity:availableQuantity.value,
            imageURL:imageURL.value
        }
        setProductsData(prev =>  prev.map((p) => {
            if(+p.productID=== targetProduct.productID){
                return(productObj)
            }
            else{
                return p;
            }
        }))

    }

    const changeHandler = (e) => {
        setTargetProduct(product => ({
            ...product,
            [e.target.name] : e.target.value
        }))
    }


    return (
        <>
        <h1> ON Update</h1>
        <label>Enter Id to search: <br/>
        <input type="text" name="productID" value={productID} onChange={(e)=>setProductID(e.target.value)} ></input>
        <button onClick={findProduct}>search</button>
        </label>
        {targetProduct && <div>
            <h2>Product Detail</h2>
            <form onSubmit={submitHandler} >
            <label>Name of Product  : <br/>
            <input type="text" name="productName" onChange={changeHandler} value={targetProduct.productName}></input>
            </label><br/>

            <label>Price of Product  : <br/>
            <input type="Number" name="productPrice" value={targetProduct.productPrice}></input>
            </label><br/>

            <label>Available Quantity: <br/>
            <input type="Number" name="availableQuantity" value={targetProduct.availableQuantity} ></input>
            </label><br/>

            <label>URL of ProductImage  : <br/>
            <input type="text" name="imageURL" value={targetProduct.imageURL}></input>
            </label><br/>

            <button type="submit" >Submit</button>


            

            </form>
        </div>} 

        </>
    )

}

export default UpdateProduct