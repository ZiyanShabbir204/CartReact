import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Unstable_Grid2";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";


export default function BasicTabs() {
  const [value, setValue] = React.useState(0);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Grid
      direction={{
        md: "row",
        xs: "column",
      }}
      container
      spacing={3}
      sx={{
        width: "100%",
        margin: 0,
        // marginRight: isSmallScreen ? 0 : "10px"
      }}
    >
      <Grid xs={12} md={2}>
        <Tabs
          orientation={isSmallScreen ? "horizontal" : "vertical"}
          value={value}
          onChange={handleChange}  
          sx={{
            borderRight: isSmallScreen? 0 : 1,
            borderColor: "divider",
            height: "100%",
            minHeight: isSmallScreen ? "auto": "calc(100vh - 111.9px - 50px)",
          }}
          centered
        >
          <Tab label="View" component={Link} to="./" />
          <Tab label="Add" component={Link} to="./AddProduct" />
          <Tab label="Update" component={Link} to="./UpdateProduct" />
          <Tab label="Delete" component={Link} to="./DeleteProduct" />
        </Tabs>
      </Grid>
      <Grid xs={12} md={10} justifyContent="flex-start">
        <Box
          sx={{
            overflowY: "auto",
            maxHeight: isSmallScreen ? "calc(100vh - 111.9px - 84px)" : "calc(100vh - 111.9px - 50px)",
          }}
        >
          <Outlet />
        </Box>
      </Grid>
    </Grid>
  );
}
