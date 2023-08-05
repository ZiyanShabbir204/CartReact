import react, { useContext, useEffect } from "react";
import {useProductDataContext} from "../contexts/ProductContext"

export default function Admin(){
    const {productsData,setProductsData}= useProductDataContext();
    useEffect(()=> {
        console.log("productdata",productsData)

},[productsData])

    const SubmitHandler = (e)=>{
        e.preventDefault()
        const {productName,productPrice,availableQuantity,imageURL }=e.target
        const productData = {
            productID : Date.now(),
            productName:productName.value,
            productPrice:productPrice.value,
            availableQuantity:availableQuantity.value,
            imageURL:imageURL.value
        }
        productName.value = ""
        productPrice.value= "";
        availableQuantity.value = ""
        imageURL.value = ""
        setProductsData((prev)=> (
               [ ...prev,
                productData]
            )
        )
      
        
    }

    return(
        <>
        <h1>Welcome To Admin Pannel</h1>
        <div>
            <h2>Product Detail</h2>
            <form onSubmit={SubmitHandler}>
            <label>Name of Product  : <br/>
            <input type="text" name="productName"></input>
            </label><br/>

            <label>Price of Product  : <br/>
            <input type="Number" name="productPrice"></input>
            </label><br/>

            <label>Available Quantity: <br/>
            <input type="Number" name="availableQuantity" ></input>
            </label><br/>

            <label>URL of ProductImage  : <br/>
            <input type="text" name="imageURL"></input>
            </label><br/>

            <button type="submit" >Submit</button>


            

            </form>
        </div>
        </>

    );
}