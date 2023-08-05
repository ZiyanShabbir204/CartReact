import react, { createContext, useContext, useState } from "react";

const ProductContext = createContext([]);

export default function ProductProvider({ children }) {
    const [productsData, setProductsData] = useState([])
    return (
        <ProductContext.Provider value={{ productsData, setProductsData }}>
            {children}


        </ProductContext.Provider>
    )

}

export const useProductDataContext = ()=> useContext(ProductContext);