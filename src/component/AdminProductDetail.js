import react from "react";

const AdminProductDetail = ({productID, productName, productPrice, availableQuantity, imageURL}) => {
    return (
        <>
            <div className="Product">
                <img src={imageURL} width="200px" />
                <h3>id      :{productID}</h3>
                <h3>Name    :{productName}</h3>
                <h3>Price   :{productPrice}</h3>
                <h3>Quantity:{availableQuantity}</h3>
            </div>
        </>
    );
}

export default AdminProductDetail