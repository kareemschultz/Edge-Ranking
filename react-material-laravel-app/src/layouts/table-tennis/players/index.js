// src/layouts/table-tennis/players/index.js
import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

// Material Dashboard React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";

// Material Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Import the PlayerForm component
import PlayerForm from "layouts/table-tennis/players/PlayerForm";

// Sample player data (replace with API call later)
import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";

function Players() {
  // State for controlling form visibility
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [players, setPlayers] = useState([]);

  // Sample function to fetch players (replace with real API call)
  const fetchPlayers = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // In a real implementation, this would be an API call
      // const response = await fetch('/api/players');
      // const data = await response.json();
      // setPlayers(data);
      
      // For now, we'll use sample data
      setTimeout(() => {
        setPlayers([
          {
            id: 1,
            name: "John Smith",
            photo: team1,
            email: "john@edge.com",
            category: "Senior Men",
            club: "Edge Club",
            points: 2500,
            rank: 1
          },
          {
            id: 2,
            name: "Sarah Johnson",
            photo: team2,
            email: "sarah@victory.com",
            category: "Senior Women",
            club: "Victory Sports",
            points: 2450,
            rank: 1
          },
          {
            id: 3,
            name: "Mike Williams",
            photo: team3,
            email: "mike@edge.com",
            category: "Senior Men",
            club: "Edge Club",
            points: 2400,
            rank: 2
          },
          {
            id: 4,
            name: "Emma Davis",
            photo: team4,
            email: "emma@champions.com",
            category: "Senior Women",
            club: "Champions Academy",
            points: 2380,
            rank: 2
          }
        ]);
        setIsLoading(false);
      }, 500);  // Simulate network delay
    } catch (err) {
      setError("Failed to load players");
      setIsLoading(false);
    }
  };

  // Load players on component mount
  useEffect(() => {
    fetchPlayers();
  }, []);

  // Function to handle form success
  const handleFormSuccess = () => {
    setShowForm(false);
    fetchPlayers(); // Refresh the player list
  };

  // Prepare data for DataTable
  const columns = [
    { Header: "player", accessor: "player", width: "30%", align: "left" },
    { Header: "category", accessor: "category", align: "left" },
    { Header: "club", accessor: "club", align: "center" },
    { Header: "points", accessor: "points", align: "center" },
    { Header: "rank", accessor: "rank", align: "center" },
    { Header: "actions", accessor: "actions", align: "center" }
  ];

  const rows = players.map(player => ({
    player: (
      <MDBox display="flex" alignItems="center" lineHeight={1}>
        <MDAvatar src={player.photo} name={player.name} size="sm" />
        <MDBox ml={2} lineHeight={1}>
          <MDTypography display="block" variant="button" fontWeight="medium">
            {player.name}
          </MDTypography>
          <MDTypography variant="caption">{player.email}</MDTypography>
        </MDBox>
      </MDBox>
    ),
    category: (
      <MDTypography variant="caption" color="text" fontWeight="medium">
        {player.category}
      </MDTypography>
    ),
    club: (
      <MDTypography variant="caption" color="text" fontWeight="medium">
        {player.club}
      </MDTypography>
    ),
    points: (
      <MDTypography variant="caption" color="text" fontWeight="medium">
        {player.points}
      </MDTypography>
    ),
    rank: (
      <MDBox ml={-1}>
        <MDBadge 
          badgeContent={player.rank} 
          color={player.rank <= 3 ? "success" : "primary"} 
          variant="gradient" 
          size="sm" 
        />
      </MDBox>
    ),
    actions: (
      <MDBox display="flex" alignItems="center">
        <MDTypography 
          component="a" 
          href="#" 
          variant="caption" 
          color="text" 
          fontWeight="medium"
          mr={2}
          onClick={(e) => {
            e.preventDefault();
            // Handle edit action
          }}
        >
          Edit
        </MDTypography>
        <MDTypography 
          component="a" 
          href="#" 
          variant="caption" 
          color="error" 
          fontWeight="medium"
          onClick={(e) => {
            e.preventDefault();
            // Handle delete action
          }}
        >
          Delete
        </MDTypography>
      </MDBox>
    )
  }));

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
                  Players Management
                </MDTypography>

                {/* Add button to toggle form visibility */}
                <MDButton 
                  variant="gradient" 
                  color="light"
                  onClick={() => setShowForm(!showForm)}
                >
                  <Icon>{showForm ? "close" : "add"}</Icon>
                  {showForm ? "Cancel" : "Add New Player"}
                </MDButton>
              </MDBox>
              
              {/* Conditionally render the form based on state */}
              {showForm ? (
                <MDBox p={3}>
                  <PlayerForm 
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
                        Loading players...
                      </MDTypography>
                    </MDBox>
                  ) : (
                    <DataTable
                      table={{ columns, rows }}
                      isSorted={true}
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

export default Players;