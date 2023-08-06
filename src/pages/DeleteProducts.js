import react, { useState } from "react";
import { useProductDataContext } from "../contexts/ProductContext";

export default function DeleteProduct(){
    const [productId,setProductID] = useState();
    const {productsData,setProductsData}= useProductDataContext();

    const deleteHandler = ()=>{
        console.log("deleteId",productId)
        setProductsData((prev)=> prev.filter((p) => +p.productID !== +productId)
        )

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