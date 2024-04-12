import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";

const AdminProductCardVariant = ({ variants }) => {
  const columns = [
    { field: "name", headerName: "Name" },
    {
      field: "price",
      headerName: "Price",
    },
    {
      field: "availableQuantity",
      headerName: "Quantity",
    },
  ];
  return (
    <Accordion
      sx={{
        boxShadow: "none",
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1-content"
        id="panel1-header"
      >
        Variants
      </AccordionSummary>
      <AccordionDetails>

        <Box sx={{ height: 400, width: "100%" }}>
          <DataGrid
            className="variant-data-grid"
            rows={variants}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5]}
          />
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default AdminProductCardVariant;
