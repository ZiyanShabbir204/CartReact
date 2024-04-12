import { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/material";
import AdminProductCardVariant from "./AdminProductCardVariant";

const AdminProductCard = ({
  productID,
  productName,
  productPrice,
  availableQuantity,
  imageURL,
  variants,
}) => {
  const [variantQuantity, setVariantQuantity] = useState(
    variants?.[0].availableQuantity
  );

  return (
    <>
      <Card sx={{ maxWidth: 500, width: "100%", margin: "auto" }}>
        <CardMedia
          sx={{
            height: 250,
            backgroundPosition: "center",
            backgroundSize: "contain",
          }}
          image={imageURL}
          title="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h3" component="div">
            {productName}
          </Typography>

          <Stack direction="row" justifyContent="space-between">
            <Typography>ID</Typography>
            <Typography>{productID}</Typography>
          </Stack>

          <Stack direction="row" justifyContent="space-between">
            <h3>Price</h3>
            <h3>{productPrice}</h3>
          </Stack>

          {variants ? (
            <AdminProductCardVariant variants={variants} />
          ) : (
            <Stack direction="row" justifyContent="space-between">
              <h3>available Quantity</h3>
              <h3>{availableQuantity}</h3>
            </Stack>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default AdminProductCard;
