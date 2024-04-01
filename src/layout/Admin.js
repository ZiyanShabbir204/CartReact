// import { useProductDataContext } from "../contexts/ProductContext"
// import { Route, Routes, Link, Outlet } from "react-router-dom";

// export default function AdminLayout() {
//     const { productsData, setProductsData } = useProductDataContext();

//     return (
//         <>

//             <h1>Welcome To Admin Pannel</h1>
//             <div className="navBar">
//             <Link to="./" relative='route'>View</Link>
//                 <Link to="./AddProduct" relative='route'>Add</Link>
//                 <Link to="./UpdateProduct" relative="route">Update</Link>
//                 <Link to="./DeleteProduct" relative="route">Delete</Link>
//             </div>
//             <Outlet />

//         </>

//     );
// }

import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Unstable_Grid2";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    // <Box sx={{ width: '100%' }}>
    //   <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
    //     <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
    //       <Tab label="View" component={Link} to="./" />
    //       <Tab label="Add" component={Link} to="./AddProduct" />
    //       <Tab label="Update" component={Link} to="./UpdateProduct" />
    //       <Tab label="Delete" component={Link} to="./DeleteProduct" />
    //     </Tabs>
    //   </Box>

    <Grid container spacing={3} sx={{
        width: "100%"
    }} >
      <Grid xs={2}>
      <Tabs
            orientation="vertical"
            value={value}
            onChange={handleChange}
            sx={{ borderRight: 1, borderColor: "divider", height: "100%", minHeight: "calc(100vh - 111.9px - 50px)" }}
            centered
          >
            <Tab label="View" component={Link} to="./" />
            <Tab label="Add" component={Link} to="./AddProduct" />
            <Tab label="Update" component={Link} to="./UpdateProduct" />
            <Tab label="Delete" component={Link} to="./DeleteProduct" />
          </Tabs>
      </Grid>
      <Grid xs={10}>
        <Box sx={{
            overflowY: "auto",
            maxHeight:  "calc(100vh - 111.9px - 50px)"
        }}>
        <Outlet />

        </Box>
      </Grid>
    </Grid>
  );
}
