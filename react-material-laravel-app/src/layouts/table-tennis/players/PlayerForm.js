// src/layouts/table-tennis/players/PlayerForm.js
import { useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";

function PlayerForm() {
  const [playerData, setPlayerData] = useState({
    name: "",
    category: "",
    club: "",
    email: ""
  });

  const handleChange = (e) => {
    setPlayerData({
      ...playerData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Submit to your Laravel API
      const response = await fetch('/api/players', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(playerData)
      });
      
      // Handle response
      if (response.ok) {
        // Success notification
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card>
      <MDBox p={3}>
        <MDTypography variant="h5" fontWeight="medium">
          Add New Player
        </MDTypography>
        <MDBox component="form" role="form" onSubmit={handleSubmit}>
          <MDBox mb={2}>
            <MDInput
              type="text"
              label="Player Name"
              name="name"
              value={playerData.name}
              onChange={handleChange}
              fullWidth
              required
            />
          </MDBox>
          <MDBox mb={2}>
            <MDInput
              type="text"
              label="Category"
              name="category"
              value={playerData.category}
              onChange={handleChange}
              fullWidth
              required
            />
          </MDBox>
          <MDBox mb={2}>
            <MDInput
              type="text"
              label="Club"
              name="club"
              value={playerData.club}
              onChange={handleChange}
              fullWidth
              required
            />
          </MDBox>
          <MDBox mb={2}>
            <MDInput
              type="email"
              label="Email"
              name="email"
              value={playerData.email}
              onChange={handleChange}
              fullWidth
              required
            />
          </MDBox>
          <MDBox mt={3}>
            <MDButton variant="gradient" color="info" type="submit" fullWidth>
              Add Player
            </MDButton>
          </MDBox>
        </MDBox>
      </MDBox>
    </Card>
  );
}

export default PlayerForm;