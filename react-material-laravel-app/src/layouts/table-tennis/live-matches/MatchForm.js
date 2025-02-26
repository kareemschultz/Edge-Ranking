// src/layouts/table-tennis/live-matches/MatchForm.js
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

function MatchForm({ onSuccess, onError, setLoading }) {
  const [matchData, setMatchData] = useState({
    player1: "",
    player2: "",
    tournament: "",
    table: "",
    startTime: "",
    round: ""
  });

  // Sample player and tournament lists (replace with API data)
  const players = [
    { id: 1, name: "John Smith" },
    { id: 2, name: "Sarah Johnson" },
    { id: 3, name: "Mike Williams" },
    { id: 4, name: "Emma Davis" }
  ];

  const tournaments = [
    { id: 1, name: "Edge National Championships" },
    { id: 2, name: "Victory Open" },
    { id: 3, name: "Regional Youth Cup" }
  ];

  const rounds = [
    "Round of 64", "Round of 32", "Round of 16", 
    "Quarter-Final", "Semi-Final", "Final"
  ];

  const handleChange = (e) => {
    setMatchData({
      ...matchData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (setLoading) setLoading(true);
    
    try {
      // In a real implementation, this would be an API call
      // const response = await fetch('/api/matches', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(matchData)
      // });
      
      // Simulate successful submission
      setTimeout(() => {
        if (setLoading) setLoading(false);
        if (onSuccess) onSuccess();
      }, 1000);
    } catch (error) {
      if (setLoading) setLoading(false);
      if (onError) onError("Failed to create match");
      console.error(error);
    }
  };

  return (
    <Card>
      <MDBox p={3}>
        <MDTypography variant="h5" fontWeight="medium" mb={3}>
          Schedule New Match
        </MDTypography>
        <MDBox component="form" role="form" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <MDBox mb={2}>
                <FormControl fullWidth>
                  <InputLabel id="player1-label">Player 1</InputLabel>
                  <Select
                    labelId="player1-label"
                    value={matchData.player1}
                    onChange={handleChange}
                    name="player1"
                    required
                  >
                    {players.map(player => (
                      <MenuItem key={player.id} value={player.id}>
                        {player.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6}>
              <MDBox mb={2}>
                <FormControl fullWidth>
                  <InputLabel id="player2-label">Player 2</InputLabel>
                  <Select
                    labelId="player2-label"
                    value={matchData.player2}
                    onChange={handleChange}
                    name="player2"
                    required
                  >
                    {players.map(player => (
                      <MenuItem key={player.id} value={player.id}>
                        {player.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6}>
              <MDBox mb={2}>
                <FormControl fullWidth>
                  <InputLabel id="tournament-label">Tournament</InputLabel>
                  <Select
                    labelId="tournament-label"
                    value={matchData.tournament}
                    onChange={handleChange}
                    name="tournament"
                    required
                  >
                    {tournaments.map(tournament => (
                      <MenuItem key={tournament.id} value={tournament.id}>
                        {tournament.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6}>
              <MDBox mb={2}>
                <FormControl fullWidth>
                  <InputLabel id="round-label">Round</InputLabel>
                  <Select
                    labelId="round-label"
                    value={matchData.round}
                    onChange={handleChange}
                    name="round"
                    required
                  >
                    {rounds.map((round, index) => (
                      <MenuItem key={index} value={round}>
                        {round}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6}>
              <MDBox mb={2}>
                <MDInput
                  type="text"
                  label="Table Number"
                  name="table"
                  value={matchData.table}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6}>
              <MDBox mb={2}>
                <MDInput
                  type="time"
                  label="Start Time"
                  name="startTime"
                  value={matchData.startTime}
                  onChange={handleChange}
                  fullWidth
                  required
                  InputLabelProps={{ shrink: true }}
                />
              </MDBox>
            </Grid>
          </Grid>
          <MDBox mt={3}>
            <MDButton variant="gradient" color="info" type="submit" fullWidth>
              Schedule Match
            </MDButton>
          </MDBox>
        </MDBox>
      </MDBox>
    </Card>
  );
}

export default MatchForm;