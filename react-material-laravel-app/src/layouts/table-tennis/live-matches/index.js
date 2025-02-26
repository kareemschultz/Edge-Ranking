// src/layouts/table-tennis/live-matches/index.js
import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import SportsIcon from "@mui/icons-material/SportsTennis";

// Material Dashboard React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDBadge from "components/MDBadge";

// Material Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Import the MatchForm component
import MatchForm from "layouts/table-tennis/live-matches/MatchForm";

function LiveMatches() {
  // State for controlling form visibility
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [matches, setMatches] = useState([]);
  const [featuredMatch, setFeaturedMatch] = useState(null);

  // Sample function to fetch matches (replace with real API call)
  const fetchMatches = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // In a real implementation, this would be an API call
      // const response = await fetch('/api/live-matches');
      // const data = await response.json();
      // setMatches(data);
      
      // For now, we'll use sample data
      setTimeout(() => {
        const sampleMatches = [
          {
            id: 1,
            player1: { id: 1, name: "John Smith" },
            player2: { id: 3, name: "Mike Williams" },
            score: { sets: [{ player1: 11, player2: 9 }, { player1: 9, player2: 11 }, { player1: 11, player2: 7 }], current: { player1: 0, player2: 0 } },
            status: "In Progress",
            table: "Table 1",
            tournament: "Edge National Championships",
            round: "Semi-Final",
            yellowCards: 0,
            redCards: 0,
            startTime: "14:30"
          },
          {
            id: 2,
            player1: { id: 2, name: "Sarah Johnson" },
            player2: { id: 4, name: "Emma Davis" },
            score: { sets: [{ player1: 11, player2: 8 }, { player1: 11, player2: 6 }], current: { player1: 5, player2: 3 } },
            status: "In Progress",
            table: "Table 2",
            tournament: "Edge National Championships",
            round: "Final",
            yellowCards: 1,
            redCards: 0,
            startTime: "15:00"
          },
          {
            id: 3,
            player1: { id: 5, name: "David Brown" },
            player2: { id: 6, name: "Lisa Chen" },
            score: { sets: [{ player1: 11, player2: 7 }, { player1: 11, player2: 9 }, { player1: 8, player2: 11 }, { player1: 11, player2: 6 }], current: { player1: 0, player2: 0 } },
            status: "Completed",
            table: "Table 3",
            tournament: "Regional Youth Cup",
            round: "Quarter-Final",
            yellowCards: 0,
            redCards: 0,
            startTime: "13:00"
          },
          {
            id: 4,
            player1: { id: 7, name: "James Wilson" },
            player2: { id: 8, name: "Maria Garcia" },
            score: { sets: [], current: { player1: 0, player2: 0 } },
            status: "Upcoming",
            table: "Table 4",
            tournament: "Regional Youth Cup",
            round: "Quarter-Final",
            yellowCards: 0,
            redCards: 0,
            startTime: "16:00"
          }
        ];
        
        setMatches(sampleMatches);
        setFeaturedMatch(sampleMatches[0]);
        setIsLoading(false);
      }, 500);  // Simulate network delay
    } catch (err) {
      setError("Failed to load matches");
      setIsLoading(false);
    }
  };

  // Load matches on component mount
  useEffect(() => {
    fetchMatches();
  }, []);

  // Function to handle form success
  const handleFormSuccess = () => {
    setShowForm(false);
    fetchMatches(); // Refresh the match list
  };

  // Function to format score
  const formatScore = (score) => {
    return score.sets.map(set => `${set.player1}-${set.player2}`).join(', ');
  };

  // Status badge color mapping
  const getStatusColor = (status) => {
    switch (status) {
      case "In Progress": return "info";
      case "Completed": return "success";
      case "Upcoming": return "warning";
      default: return "dark";
    }
  };

  // Score controls for featured match
  const updateScore = (player, increment) => {
    if (!featuredMatch) return;
    
    // Deep clone to avoid direct state mutation
    const updatedMatch = JSON.parse(JSON.stringify(featuredMatch));
    const currentSet = updatedMatch.score.current;
    
    if (player === 'player1') {
      currentSet.player1 += increment ? 1 : -1;
      if (currentSet.player1 < 0) currentSet.player1 = 0;
    } else {
      currentSet.player2 += increment ? 1 : -1;
      if (currentSet.player2 < 0) currentSet.player2 = 0;
    }
    
    setFeaturedMatch(updatedMatch);
    
    // In a real app, you would send this update to the server
    // fetch('/api/matches/${featuredMatch.id}/score', { method: 'PATCH', body: JSON.stringify(currentSet) })
  };

  // Finalize set
  const finalizeSet = () => {
    if (!featuredMatch) return;
    
    // Deep clone to avoid direct state mutation
    const updatedMatch = JSON.parse(JSON.stringify(featuredMatch));
    const current = updatedMatch.score.current;
    
    // Only finalize if someone has at least 11 points and leads by 2
    if ((current.player1 >= 11 || current.player2 >= 11) && 
        Math.abs(current.player1 - current.player2) >= 2) {
      
      // Add current set to sets array
      updatedMatch.score.sets.push({
        player1: current.player1,
        player2: current.player2
      });
      
      // Reset current score
      updatedMatch.score.current = { player1: 0, player2: 0 };
      
      setFeaturedMatch(updatedMatch);
      
      // In a real app, you would send this update to the server
      // fetch('/api/matches/${featuredMatch.id}/finalize-set', { method: 'POST', body: JSON.stringify({ sets: updatedMatch.score.sets }) })
    } else {
      setError("Cannot finalize set: Score must be at least 11 and lead by 2 points");
      setTimeout(() => setError(null), 3000);
    }
  };

  // Card management
  const issueCard = (type) => {
    if (!featuredMatch) return;
    
    // Deep clone to avoid direct state mutation
    const updatedMatch = JSON.parse(JSON.stringify(featuredMatch));
    
    if (type === 'yellow') {
      updatedMatch.yellowCards += 1;
    } else if (type === 'red') {
      updatedMatch.redCards += 1;
    }
    
    setFeaturedMatch(updatedMatch);
    
    // In a real app, you would send this update to the server
    // fetch('/api/matches/${featuredMatch.id}/card', { method: 'POST', body: JSON.stringify({ type }) })
  };

  // Select featured match
  const selectFeaturedMatch = (match) => {
    setFeaturedMatch(match);
  };

  // Prepare data for DataTable
  const columns = [
    { Header: "match", accessor: "match", width: "30%", align: "left" },
    { Header: "score", accessor: "score", align: "center" },
    { Header: "status", accessor: "status", align: "center" },
    { Header: "table", accessor: "table", align: "center" },
    { Header: "actions", accessor: "actions", align: "center" }
  ];

  const rows = matches.map(match => ({
    match: (
      <MDBox display="flex" alignItems="center" lineHeight={1}>
        <SportsIcon fontSize="small" sx={{ mr: 1 }} />
        <MDBox lineHeight={1}>
          <MDTypography display="block" variant="button" fontWeight="medium">
            {match.player1.name} vs {match.player2.name}
          </MDTypography>
          <MDTypography variant="caption">{match.tournament} - {match.round}</MDTypography>
        </MDBox>
      </MDBox>
    ),
    score: (
      <MDTypography variant="caption" color="text" fontWeight="medium">
        {match.score.sets.length > 0 ? formatScore(match.score) : "-"}
      </MDTypography>
    ),
    status: (
      <MDBox ml={-1}>
        <MDBadge 
          badgeContent={match.status} 
          color={getStatusColor(match.status)} 
          variant="gradient" 
          size="sm" 
        />
      </MDBox>
    ),
    table: (
      <MDTypography variant="caption" color="text" fontWeight="medium">
        {match.table}
      </MDTypography>
    ),
    actions: (
      <MDBox display="flex" alignItems="center">
        <MDButton 
          variant="text" 
          color="info" 
          size="small"
          onClick={() => selectFeaturedMatch(match)}
        >
          Control
        </MDButton>
      </MDBox>
    )
  }));
  
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={3}>
          {/* Featured Match Scorekeeper */}
          {featuredMatch && (
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
                >
                  <MDTypography variant="h6" color="white">
                    Live Match Control
                  </MDTypography>
                </MDBox>
                <MDBox p={3}>
                  <Grid container spacing={2}>
                    {/* Match Info */}
                    <Grid item xs={12}>
                      <MDBox display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                        <MDTypography variant="h5" fontWeight="medium">
                          {featuredMatch.player1.name} vs {featuredMatch.player2.name}
                        </MDTypography>
                        <MDBadge 
                          badgeContent={featuredMatch.status} 
                          color={getStatusColor(featuredMatch.status)} 
                          variant="gradient" 
                        />
                      </MDBox>
                      <MDTypography variant="body2" color="text">
                        {featuredMatch.tournament} - {featuredMatch.round} - {featuredMatch.table}
                      </MDTypography>
                    </Grid>
                    
                    {/* Score Display */}
                    <Grid item xs={12} md={8}>
                      <Card>
                        <MDBox p={2}>
                          <MDTypography variant="h6" fontWeight="medium" mb={2}>
                            Score
                          </MDTypography>
                          
                          {/* Previous Sets */}
                          {featuredMatch.score.sets.length > 0 && (
                            <MDBox mb={2}>
                              <MDTypography variant="button" fontWeight="medium">
                                Completed Sets:
                              </MDTypography>
                              <MDBox display="flex" flexWrap="wrap" gap={1} mt={1}>
                                {featuredMatch.score.sets.map((set, index) => (
                                  <MDBox 
                                    key={index} 
                                    p={1} 
                                    borderRadius="lg" 
                                    bgcolor="light.main"
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                    minWidth="80px"
                                  >
                                    <MDTypography variant="button">
                                      {set.player1} - {set.player2}
                                    </MDTypography>
                                  </MDBox>
                                ))}
                              </MDBox>
                            </MDBox>
                          )}
                          
                          {/* Current Score */}
                          <MDBox>
                            <MDTypography variant="button" fontWeight="medium" mb={1}>
                              Current Set:
                            </MDTypography>
                            <Grid container spacing={2} alignItems="center">
                              {/* Player 1 Score */}
                              <Grid item xs={5}>
                                <MDBox display="flex" alignItems="center" justifyContent="center">
                                  <IconButton onClick={() => updateScore('player1', false)}>
                                    <RemoveIcon />
                                  </IconButton>
                                  <MDBox
                                    mx={2}
                                    p={2}
                                    borderRadius="lg"
                                    bgcolor="info.main"
                                    color="white"
                                    minWidth="60px"
                                    textAlign="center"
                                  >
                                    <MDTypography variant="h4" color="white">
                                      {featuredMatch.score.current.player1}
                                    </MDTypography>
                                  </MDBox>
                                  <IconButton onClick={() => updateScore('player1', true)}>
                                    <AddIcon />
                                  </IconButton>
                                </MDBox>
                                <MDBox textAlign="center" mt={1}>
                                  <MDTypography variant="button">{featuredMatch.player1.name}</MDTypography>
                                </MDBox>
                              </Grid>
                              
                              {/* Divider */}
                              <Grid item xs={2} textAlign="center">
                                <MDTypography variant="h4">-</MDTypography>
                              </Grid>
                              
                              {/* Player 2 Score */}
                              <Grid item xs={5}>
                                <MDBox display="flex" alignItems="center" justifyContent="center">
                                  <IconButton onClick={() => updateScore('player2', false)}>
                                    <RemoveIcon />
                                  </IconButton>
                                  <MDBox
                                    mx={2}
                                    p={2}
                                    borderRadius="lg"
                                    bgcolor="info.main"
                                    color="white"
                                    minWidth="60px"
                                    textAlign="center"
                                  >
                                    <MDTypography variant="h4" color="white">
                                      {featuredMatch.score.current.player2}
                                    </MDTypography>
                                  </MDBox>
                                  <IconButton onClick={() => updateScore('player2', true)}>
                                    <AddIcon />
                                  </IconButton>
                                </MDBox>
                                <MDBox textAlign="center" mt={1}>
                                  <MDTypography variant="button">{featuredMatch.player2.name}</MDTypography>
                                </MDBox>
                              </Grid>
                            </Grid>
                          </MDBox>
                          
                          {/* Finalize Set Button */}
                          <MDBox mt={3} display="flex" justifyContent="center">
                            <MDButton 
                              variant="gradient" 
                              color="success" 
                              onClick={finalizeSet}
                            >
                              Finalize Set
                            </MDButton>
                          </MDBox>
                        </MDBox>
                      </Card>
                    </Grid>
                    
                    {/* Match Controls */}
                    <Grid item xs={12} md={4}>
                      <Card>
                        <MDBox p={2}>
                          <MDTypography variant="h6" fontWeight="medium" mb={2}>
                            Match Controls
                          </MDTypography>
                          
                          {/* Cards Section */}
                          <MDBox mb={3}>
                            <MDTypography variant="button" fontWeight="medium" mb={1}>
                              Cards:
                            </MDTypography>
                            <MDBox display="flex" gap={2} mt={1}>
                              <MDButton
                                variant="contained"
                                color="warning"
                                onClick={() => issueCard('yellow')}
                              >
                                Issue Yellow Card ({featuredMatch.yellowCards})
                              </MDButton>
                              <MDButton
                                variant="contained"
                                color="error"
                                onClick={() => issueCard('red')}
                              >
                                Issue Red Card ({featuredMatch.redCards})
                              </MDButton>
                            </MDBox>
                          </MDBox>
                          
                          {/* Match Status Controls */}
                          <MDBox>
                            <MDTypography variant="button" fontWeight="medium" mb={1}>
                              Match Status:
                            </MDTypography>
                            <MDBox display="flex" flexDirection="column" gap={1} mt={1}>
                              <MDButton
                                variant="gradient"
                                color="info"
                                disabled={featuredMatch.status === "In Progress"}
                              >
                                Start Match
                              </MDButton>
                              <MDButton
                                variant="gradient"
                                color="warning"
                                disabled={featuredMatch.status === "Paused"}
                              >
                                Pause Match
                              </MDButton>
                              <MDButton
                                variant="gradient"
                                color="success"
                                disabled={featuredMatch.status === "Completed"}
                              >
                                Complete Match
                              </MDButton>
                            </MDBox>
                          </MDBox>
                        </MDBox>
                      </Card>
                    </Grid>
                  </Grid>
                </MDBox>
              </Card>
            </Grid>
          )}
          
          {/* All Matches Table */}
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
                  Live Matches
                </MDTypography>
  
                {/* Add button to toggle form visibility */}
                <MDButton 
                  variant="gradient" 
                  color="light"
                  onClick={() => setShowForm(!showForm)}
                >
                  <Icon>{showForm ? "close" : "add"}</Icon>
                  {showForm ? "Cancel" : "Schedule Match"}
                </MDButton>
              </MDBox>
              
              {/* Conditionally render the form based on state */}
              {showForm ? (
                <MDBox p={3}>
                  <MatchForm 
                    onSuccess={handleFormSuccess} 
                    onError={setError}
                    setLoading={setIsLoading} 
                  />
                </MDBox>
              ) : (
                <MDBox p={3}>
                  {error && (
                    <MDBox mb={2} p={1} bgcolor="error.main" borderRadius="lg">
                      <MDTypography variant="body2" color="white">
                        {error}
                      </MDTypography>
                    </MDBox>
                  )}
                  
                  {isLoading ? (
                    <MDBox display="flex" justifyContent="center" p={3}>
                      <MDTypography variant="body2" color="text">
                        Loading matches...
                      </MDTypography>
                    </MDBox>
                  ) : (
                    <DataTable
                      table={{ columns, rows }}
                      isSorted={false}
                      entriesPerPage={true}
                      showTotalEntries={true}
                      noEndBorder
                    />
                  )}
                </MDBox>
              )}
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
  }
  
  export default LiveMatches;