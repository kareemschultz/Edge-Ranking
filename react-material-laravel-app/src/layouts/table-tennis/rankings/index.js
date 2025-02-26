// src/layouts/table-tennis/rankings/index.js
import { useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

// Material Dashboard React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Data
import rankingsData from "layouts/table-tennis/data/rankingsData";

function Rankings() {
  const { columns, rows } = rankingsData();
  const [category, setCategory] = useState("All Categories");
  const [menu, setMenu] = useState(null);

  const openMenu = ({ currentTarget }) => setMenu(currentTarget);
  const closeMenu = () => setMenu(null);

  const categories = ["All Categories", "Senior Men", "Senior Women", "U21 Men", "U21 Women"];

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    closeMenu();
    // Here you would filter the data based on the selected category
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <MDTypography variant="h6" color="white">
                  Player Rankings
                </MDTypography>
                <MDBox>
                  <MDTypography variant="button" color="white" fontWeight="medium" onClick={openMenu}>
                    {category} <Icon>keyboard_arrow_down</Icon>
                  </MDTypography>
                  <Menu
                    anchorEl={menu}
                    open={Boolean(menu)}
                    onClose={closeMenu}
                    keepMounted
                  >
                    {categories.map((cat) => (
                      <MenuItem key={cat} onClick={() => handleCategoryChange(cat)}>
                        {cat}
                      </MenuItem>
                    ))}
                  </Menu>
                </MDBox>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows }}
                  isSorted={true}
                  entriesPerPage={true}
                  showTotalEntries={true}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Rankings;