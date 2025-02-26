// src/layouts/table-tennis/tournament-analytics/index.js
import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

// Material Dashboard React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Material Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Charts
import { 
  BarChart, Bar, 
  LineChart, Line, 
  PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

function TournamentAnalytics() {
  const [selectedTournament, setSelectedTournament] = useState(null);
  const [tournaments, setTournaments] = useState([]);
  const [tournamentMenu, setTournamentMenu] = useState(null);

  // Sample tournament data
  const participationData = [
    { category: 'Senior Men', count: 24 },
    { category: 'Senior Women', count: 18 },
    { category: 'U21 Men', count: 16 },
    { category: 'U21 Women', count: 12 },
    { category: 'U18', count: 20 }
  ];

  // Match duration data
  const durationData = [
    { duration: '0-15 min', count: 5 },
    { duration: '15-30 min', count: 38 },
    { duration: '30-45 min', count: 52 },
    { duration: '45-60 min', count: 20 },
    { duration: '60+ min', count: 11 }
  ];

  // Points distribution
  const pointsData = [
    { score: '11-0 to 11-3', count: 22 },
    { score: '11-4 to 11-7', count: 48 },
    { score: '11-8 to 11-10', count: 35 },
    { score: 'Overtime', count: 21 }
  ];

  // Club performance
  const clubPerformanceData = [
    { name: 'Edge Club', wins: 45, matches: 62 },
    { name: 'Victory Sports', wins: 38, matches: 55 },
    { name: 'Champions Academy', wins: 41, matches: 58 },
    { name: 'Star Club', wins: 22, matches: 35 },
    { name: 'Metro TT', wins: 18, matches: 31 }
  ];

  // Load sample tournaments
  useEffect(() => {
    setTournaments([
      { id: 1, name: 'Edge National Championships' },
      { id: 2, name: 'Victory Open' },
      { id: 3, name: 'Regional Youth Cup' },
      { id: 4, name: 'Summer League Final' }
    ]);
    
    // Default selected tournament
    setSelectedTournament({ id: 1, name: 'Edge National Championships' });
  }, []);

  // Handle opening the tournament selection menu
  const openTournamentMenu = (event) => {
    setTournamentMenu(event.currentTarget);
  };

  // Handle closing the tournament selection menu
  const closeTournamentMenu = () => {
    setTournamentMenu(null);
  };

  // Handle tournament selection
  const handleTournamentSelect = (tournament) => {
    setSelectedTournament(tournament);
    closeTournamentMenu();
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={3}>
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
                  Tournament Analytics
                </MDTypography>
                
                {/* Tournament selector */}
                <MDButton 
                  variant="gradient" 
                  color="light"
                  onClick={openTournamentMenu}
                >
                  {selectedTournament ? selectedTournament.name : 'Select Tournament'}
                  <Icon sx={{ ml: 1 }}>arrow_drop_down</Icon>
                </MDButton>
                <Menu
                  anchorEl={tournamentMenu}
                  open={Boolean(tournamentMenu)}
                  onClose={closeTournamentMenu}
                >
                  {tournaments.map(tournament => (
                    <MenuItem 
                      key={tournament.id} 
                      onClick={() => handleTournamentSelect(tournament)}
                      selected={selectedTournament && selectedTournament.id === tournament.id}
                    >
                      {tournament.name}
                    </MenuItem>
                  ))}
                </Menu>
              </MDBox>
              
              <MDBox p={3}>
                {selectedTournament && (
                  <Grid container spacing={3}>
                    {/* Participants by category */}
                    <Grid item xs={12} md={6}>
                      <Card>
                        <MDBox p={2}>
                          <MDTypography variant="h6" fontWeight="medium" mb={2}>
                            Participants by Category
                          </MDTypography>
                          <MDBox height="300px">
                            <ResponsiveContainer width="100%" height="100%">
                              <BarChart data={participationData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="category" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="count" fill="#8884d8" name="Participants" />
                              </BarChart>
                            </ResponsiveContainer>
                          </MDBox>
                        </MDBox>
                      </Card>
                    </Grid>
                    
                    {/* Match duration */}
                    <Grid item xs={12} md={6}>
                      <Card>
                        <MDBox p={2}>
                          <MDTypography variant="h6" fontWeight="medium" mb={2}>
                            Match Duration Distribution
                          </MDTypography>
                          <MDBox height="300px">
                            <ResponsiveContainer width="100%" height="100%">
                              <PieChart>
                                <Pie
                                  data={durationData}
                                  cx="50%"
                                  cy="50%"
                                  labelLine={false}
                                  outerRadius={80}
                                  fill="#8884d8"
                                  dataKey="count"
                                  label={({ duration, percent }) => `${duration}: ${(percent * 100).toFixed(0)}%`}
                                >
                                  {durationData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                  ))}
                                </Pie>
                                <Tooltip />
                              </PieChart>
                            </ResponsiveContainer>
                          </MDBox>
                        </MDBox>
                      </Card>
                    </Grid>
                    
                    {/* Points distribution */}
                    <Grid item xs={12} md={6}>
                      <Card>
                        <MDBox p={2}>
                          <MDTypography variant="h6" fontWeight="medium" mb={2}>
                            Points Distribution
                          </MDTypography>
                          <MDBox height="300px">
                            <ResponsiveContainer width="100%" height="100%">
                              <BarChart data={pointsData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="score" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="count" fill="#82ca9d" name="Matches" />
                              </BarChart>
                            </ResponsiveContainer>
                          </MDBox>
                        </MDBox>
                      </Card>
                    </Grid>
                    
                    {/* Club performance */}
                    <Grid item xs={12} md={6}>
                      <Card>
                        <MDBox p={2}>
                          <MDTypography variant="h6" fontWeight="medium" mb={2}>
                            Club Performance
                          </MDTypography>
                          <MDBox height="300px">
                            <ResponsiveContainer width="100%" height="100%">
                              <BarChart data={clubPerformanceData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="matches" fill="#8884d8" name="Total Matches" />
                                <Bar dataKey="wins" fill="#82ca9d" name="Wins" />
                              </BarChart>
                            </ResponsiveContainer>
                          </MDBox>
                        </MDBox>
                      </Card>
                    </Grid>
                  </Grid>
                )}
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default TournamentAnalytics;