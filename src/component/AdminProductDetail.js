import react, { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Stack } from "@mui/material";

const AdminProductDetail = ({
  productID,
  productName,
  productPrice,
  availableQuantity,
  imageURL,
  variants,
}) => {
  const [variantQuantity,setVariantQuantity] = useState(variants?.[0].availableQuantity)
  // const updateQuantity =(quantity)=>{
  //   setVariantQuantity()

  // }
  return (
    <>
      <Card sx={{ maxWidth: 345 }}>
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
          <Typography gutterBottom variant="h4" component="div">
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
          <Stack direction="row" justifyContent="space-between">
            <h3>available Quantity</h3>
            <h3>
              {variants ? variantQuantity : availableQuantity}
            </h3>
          </Stack>

          {variants && (
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                Variants
              </AccordionSummary>
              <AccordionDetails>
                {variants.map((variant) => (
                  <Stack direction="row" justifyContent="space-between" onClick={()=> setVariantQuantity(variant.availableQuantity)}>
                    <h3>{variant.name} </h3>
                    <h3>{variant.price}</h3>
                  </Stack>
                ))}
              </AccordionDetails>
            </Accordion>
          )}

          {/* <Typography gutterBottom variant="h5" component="div">
          variants {variants[0].name}
        </Typography> */}
        </CardContent>
      </Card>

      {/* <div className="Product">
        <img src={imageURL} width="200px" />
        <h3>id :{productID}</h3>
        <h3>Name :{productName}</h3>
        <h3>Price :{productPrice}</h3>
        <h3>Quantity:{availableQuantity}</h3>
      </div> */}
    </>
  );
};

export default AdminProductDetail;
