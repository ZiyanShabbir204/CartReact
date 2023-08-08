import react, { useState } from "react";
import { useProductDataContext } from "../contexts/ProductContext";
import { useCartContext } from "../contexts/CartContext";
export default function DeleteProduct(){
    const [productId,setProductID] = useState();
    const {productsData,setProductsData}= useProductDataContext();
    const {cartProducts,setCartProducts} = useCartContext();

    const deleteHandler = ()=>{
        console.log("deleteId",productId)
        const tragetedProduct =  productsData.some((p) => +p.productID === + productId);
        if(tragetedProduct){
            setProductsData((prev)=> prev.filter((p) => +p.productID !== +productId)
            )
            setCartProducts((prev) =>  prev.filter((p)=> +p.productID !== +productId))
            console.log("cart product", cartProducts);
            alert("produt is deleted")
        }
        else{
            alert("id is not valid")
           
        }
       
    }
    return(
        <>
        <h1>On Delete</h1>
        <label>Input Id : <br/>
            <input type="text" name="productID" value={productId} onChange={(e) => setProductID(e.target.value)} ></input>
        </label><br/>
        <button onClick={deleteHandler}>Delete</button>

        </>
    );
}