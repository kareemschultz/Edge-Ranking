// src/layouts/table-tennis/player-analytics/index.js
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
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, RadarChart, Radar,
         XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
         PolarGrid, PolarAngleAxis, PolarRadiusAxis, Cell } from 'recharts';

function PlayerAnalytics() {
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [players, setPlayers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [timeRange, setTimeRange] = useState('1y');
  const [playerMenu, setPlayerMenu] = useState(null);

  // Sample performance data
  const performanceData = [
    { month: 'Jan', rating: 1200, winRate: 65, matches: 12 },
    { month: 'Feb', rating: 1250, winRate: 70, matches: 15 },
    { month: 'Mar', rating: 1225, winRate: 62, matches: 10 },
    { month: 'Apr', rating: 1300, winRate: 75, matches: 18 },
    { month: 'May', rating: 1350, winRate: 80, matches: 14 },
    { month: 'Jun', rating: 1380, winRate: 78, matches: 12 },
    { month: 'Jul', rating: 1410, winRate: 82, matches: 16 },
    { month: 'Aug', rating: 1390, winRate: 75, matches: 10 },
    { month: 'Sep', rating: 1420, winRate: 82, matches: 14 },
    { month: 'Oct', rating: 1450, winRate: 85, matches: 18 },
    { month: 'Nov', rating: 1475, winRate: 87, matches: 16 },
    { month: 'Dec', rating: 1500, winRate: 88, matches: 12 }
  ];

  // Sample radar data for strengths
  const radarData = [
    { attribute: 'Serves', value: 85 },
    { attribute: 'Forehand', value: 92 },
    { attribute: 'Backhand', value: 78 },
    { attribute: 'Footwork', value: 88 },
    { attribute: 'Consistency', value: 90 },
    { attribute: 'Match IQ', value: 75 }
  ];

  // Match win distribution by opponent ranking
  const matchDistribution = [
    { name: 'vs. Higher Ranked', value: 12 },
    { name: 'vs. Similar Ranked', value: 25 },
    { name: 'vs. Lower Ranked', value: 18 }
  ];

  // Game time performance
  const timePerformance = [
    { time: 'Morning', winRate: 72 },
    { time: 'Afternoon', winRate: 85 },
    { time: 'Evening', winRate: 78 }
  ];

  // Load sample players
  useEffect(() => {
    setPlayers([
      { id: 1, name: 'John Smith' },
      { id: 2, name: 'Sarah Johnson' },
      { id: 3, name: 'Mike Williams' },
      { id: 4, name: 'Emma Davis' }
    ]);
    
    // Default selected player
    setSelectedPlayer({ id: 1, name: 'John Smith' });
  }, []);

  // Handle opening the player selection menu
  const openPlayerMenu = (event) => {
    setPlayerMenu(event.currentTarget);
  };

  // Handle closing the player selection menu
  const closePlayerMenu = () => {
    setPlayerMenu(null);
  };

  // Handle player selection
  const handlePlayerSelect = (player) => {
    setSelectedPlayer(player);
    closePlayerMenu();
  };

  // Handle time range change
  const handleTimeRangeChange = (range) => {
    setTimeRange(range);
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

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
                  Player Analytics Dashboard
                </MDTypography>
                
                <MDBox display="flex" alignItems="center">
                  {/* Time range selector */}
                  <MDBox mr={2}>
                    <MDButton 
                      variant={timeRange === '3m' ? 'contained' : 'outlined'} 
                      color="white"
                      size="small"
                      onClick={() => handleTimeRangeChange('3m')}
                    >
                      3M
                    </MDButton>
                    <MDButton 
                      variant={timeRange === '6m' ? 'contained' : 'outlined'} 
                      color="white"
                      size="small"
                      sx={{ mx: 1 }}
                      onClick={() => handleTimeRangeChange('6m')}
                    >
                      6M
                    </MDButton>
                    <MDButton 
                      variant={timeRange === '1y' ? 'contained' : 'outlined'} 
                      color="white"
                      size="small"
                      onClick={() => handleTimeRangeChange('1y')}
                    >
                      1Y
                    </MDButton>
                  </MDBox>
                
                  {/* Player selector */}
                  <MDButton 
                    variant="gradient" 
                    color="light"
                    onClick={openPlayerMenu}
                  >
                    {selectedPlayer ? selectedPlayer.name : 'Select Player'}
                    <Icon sx={{ ml: 1 }}>arrow_drop_down</Icon>
                  </MDButton>
                  <Menu
                    anchorEl={playerMenu}
                    open={Boolean(playerMenu)}
                    onClose={closePlayerMenu}
                  >
                    {players.map(player => (
                      <MenuItem 
                        key={player.id} 
                        onClick={() => handlePlayerSelect(player)}
                        selected={selectedPlayer && selectedPlayer.id === player.id}
                      >
                        {player.name}
                      </MenuItem>
                    ))}
                  </Menu>
                </MDBox>
              </MDBox>
              
              <MDBox p={3}>
                {/* Player Stats Summary */}
                {selectedPlayer && (
                  <Grid container spacing={3}>
                    {/* Performance over time chart */}
                    <Grid item xs={12} lg={8}>
                      <Card>
                        <MDBox p={2}>
                          <MDTypography variant="h6" fontWeight="medium" mb={2}>
                            Rating and Win Rate Progression
                          </MDTypography>
                          <MDBox height="400px">
                            <ResponsiveContainer width="100%" height="100%">
                              <LineChart data={performanceData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis yAxisId="left" domain={[1000, 1600]} />
                                <YAxis yAxisId="right" orientation="right" domain={[0, 100]} />
                                <Tooltip />
                                <Legend />
                                <Line
                                  yAxisId="left"
                                  type="monotone"
                                  dataKey="rating"
                                  stroke="#8884d8"
                                  activeDot={{ r: 8 }}
                                  name="Rating"
                                />
                                <Line 
                                  yAxisId="right"
                                  type="monotone" 
                                  dataKey="winRate" 
                                  stroke="#82ca9d" 
                                  name="Win Rate (%)"
                                />
                              </LineChart>
                            </ResponsiveContainer>
                          </MDBox>
                        </MDBox>
                      </Card>
                    </Grid>
                    
                    {/* Strength radar chart */}
                    <Grid item xs={12} md={6} lg={4}>
                      <Card>
                        <MDBox p={2}>
                          <MDTypography variant="h6" fontWeight="medium" mb={2}>
                            Player Strengths
                          </MDTypography>
                          <MDBox height="300px">
                            <ResponsiveContainer width="100%" height="100%">
                              <RadarChart data={radarData}>
                                <PolarGrid />
                                <PolarAngleAxis dataKey="attribute" />
                                <PolarRadiusAxis domain={[0, 100]} />
                                <Radar 
                                  name="Skills" 
                                  dataKey="value" 
                                  stroke="#8884d8" 
                                  fill="#8884d8" 
                                  fillOpacity={0.6} 
                                />
                                <Tooltip />
                              </RadarChart>
                            </ResponsiveContainer>
                          </MDBox>
                        </MDBox>
                      </Card>
                    </Grid>
                    
                    {/* Match distribution */}
                    <Grid item xs={12} md={6} lg={4}>
                      <Card>
                        <MDBox p={2}>
                          <MDTypography variant="h6" fontWeight="medium" mb={2}>
                            Match Distribution
                          </MDTypography>
                          <MDBox height="300px">
                            <ResponsiveContainer width="100%" height="100%">
                              <PieChart>
                                <Pie
                                  data={matchDistribution}
                                  cx="50%"
                                  cy="50%"
                                  labelLine={false}
                                  outerRadius={80}
                                  fill="#8884d8"
                                  dataKey="value"
                                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                >
                                  {matchDistribution.map((entry, index) => (
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
                    
                    {/* Time of day performance */}
                    <Grid item xs={12} md={6} lg={4}>
                      <Card>
                        <MDBox p={2}>
                          <MDTypography variant="h6" fontWeight="medium" mb={2}>
                            Performance by Time of Day
                          </MDTypography>
                          <MDBox height="300px">
                            <ResponsiveContainer width="100%" height="100%">
                              <BarChart data={timePerformance}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="time" />
                                <YAxis domain={[0, 100]} />
                                <Tooltip />
                                <Bar dataKey="winRate" fill="#8884d8" name="Win Rate (%)" />
                              </BarChart>
                            </ResponsiveContainer>
                          </MDBox>
                        </MDBox>
                      </Card>
                    </Grid>
                    
                    {/* Match activity */}
                    <Grid item xs={12} md={6} lg={4}>
                      <Card>
                        <MDBox p={2}>
                          <MDTypography variant="h6" fontWeight="medium" mb={2}>
                            Match Activity
                          </MDTypography>
                          <MDBox height="300px">
                            <ResponsiveContainer width="100%" height="100%">
                              <AreaChart data={performanceData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Area 
                                  type="monotone" 
                                  dataKey="matches" 
                                  stroke="#8884d8" 
                                  fill="#8884d8" 
                                  name="Matches Played"
                                />
                              </AreaChart>
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

export default PlayerAnalytics;