// src/layouts/table-tennis/tournaments/TournamentForm.js
import { useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

function TournamentForm({ onSuccess, onError, setLoading }) {
  const [tournamentData, setTournamentData] = useState({
    name: "",
    date: "",
    location: "",
    categories: [],
    registrationDeadline: "",
    status: "Upcoming"
  });

  const handleChange = (e) => {
    setTournamentData({
      ...tournamentData,
      [e.target.name]: e.target.value
    });
  };

  const handleCategoriesChange = (e) => {
    setTournamentData({
      ...tournamentData,
      categories: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (setLoading) setLoading(true);
    
    try {
      // In a real implementation, this would be an API call
      // const response = await fetch('/api/tournaments', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(tournamentData)
      // });
      
      // Simulate successful submission
      setTimeout(() => {
        if (setLoading) setLoading(false);
        if (onSuccess) onSuccess();
      }, 1000);
    } catch (error) {
      if (setLoading) setLoading(false);
      if (onError) onError("Failed to create tournament");
      console.error(error);
    }
  };

  return (
    <Card>
      <MDBox p={3}>
        <MDTypography variant="h5" fontWeight="medium" mb={3}>
          Add New Tournament
        </MDTypography>
        <MDBox component="form" role="form" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <MDBox mb={2}>
                <MDInput
                  type="text"
                  label="Tournament Name"
                  name="name"
                  value={tournamentData.name}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6}>
              <MDBox mb={2}>
                <MDInput
                  type="date"
                  label="Date"
                  name="date"
                  value={tournamentData.date}
                  onChange={handleChange}
                  fullWidth
                  required
                  InputLabelProps={{ shrink: true }}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6}>
              <MDBox mb={2}>
                <MDInput
                  type="text"
                  label="Location"
                  name="location"
                  value={tournamentData.location}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6}>
              <MDBox mb={2}>
                <MDInput
                  type="date"
                  label="Registration Deadline"
                  name="registrationDeadline"
                  value={tournamentData.registrationDeadline}
                  onChange={handleChange}
                  fullWidth
                  required
                  InputLabelProps={{ shrink: true }}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6}>
              <MDBox mb={2}>
                <FormControl fullWidth>
                  <InputLabel id="categories-label">Categories</InputLabel>
                  <Select
                    labelId="categories-label"
                    multiple
                    value={tournamentData.categories}
                    onChange={handleCategoriesChange}
                    name="categories"
                    required
                  >
                    <MenuItem value="Senior Men">Senior Men</MenuItem>
                    <MenuItem value="Senior Women">Senior Women</MenuItem>
                    <MenuItem value="U21 Men">U21 Men</MenuItem>
                    <MenuItem value="U21 Women">U21 Women</MenuItem>
                    <MenuItem value="U18">U18</MenuItem>
                  </Select>
                </FormControl>
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6}>
              <MDBox mb={2}>
                <FormControl fullWidth>
                  <InputLabel id="status-label">Status</InputLabel>
                  <Select
                    labelId="status-label"
                    value={tournamentData.status}
                    onChange={handleChange}
                    name="status"
                    required
                  >
                    <MenuItem value="Upcoming">Upcoming</MenuItem>
                    <MenuItem value="Ongoing">Ongoing</MenuItem>
                    <MenuItem value="Completed">Completed</MenuItem>
                  </Select>
                </FormControl>
              </MDBox>
            </Grid>
          </Grid>
          <MDBox mt={3}>
            <MDButton variant="gradient" color="info" type="submit" fullWidth>
              Create Tournament
            </MDButton>
          </MDBox>
        </MDBox>
      </MDBox>
    </Card>
  );
}

export default TournamentForm;