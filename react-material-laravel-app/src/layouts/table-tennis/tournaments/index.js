// src/layouts/table-tennis/tournaments/index.js
import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Chip from "@mui/material/Chip";

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

// Import the TournamentForm component
import TournamentForm from "layouts/table-tennis/tournaments/TournamentForm";

function Tournaments() {
  // State for controlling form visibility
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [tournaments, setTournaments] = useState([]);

  // Sample function to fetch tournaments (replace with real API call)
  const fetchTournaments = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // In a real implementation, this would be an API call
      // const response = await fetch('/api/tournaments');
      // const data = await response.json();
      // setTournaments(data);
      
      // For now, we'll use sample data
      setTimeout(() => {
        setTournaments([
          {
            id: 1,
            name: "Edge National Championships",
            date: "2024-11-15",
            location: "Edge Club Main Hall",
            categories: ["Senior Men", "Senior Women", "U21"],
            participants: 64,
            matches: 126,
            status: "Upcoming",
            registrationDeadline: "2024-10-25"
          },
          {
            id: 2,
            name: "Victory Open",
            date: "2024-10-01",
            location: "Victory Sports Center",
            categories: ["Senior Men", "Senior Women"],
            participants: 48,
            matches: 94,
            status: "Upcoming",
            registrationDeadline: "2024-09-15"
          },
          {
            id: 3,
            name: "Regional Youth Cup",
            date: "2024-12-03",
            location: "Champions Academy",
            categories: ["U21", "U18"],
            participants: 32,
            matches: 62,
            status: "Upcoming",
            registrationDeadline: "2024-11-20"
          },
          {
            id: 4,
            name: "Summer League Final",
            date: "2024-08-15",
            location: "Central Sports Hall",
            categories: ["Senior Men", "Senior Women"],
            participants: 16,
            matches: 30,
            status: "Completed",
            registrationDeadline: "2024-07-25"
          }
        ]);
        setIsLoading(false);
      }, 500);  // Simulate network delay
    } catch (err) {
      setError("Failed to load tournaments");
      setIsLoading(false);
    }
  };

  // Load tournaments on component mount
  useEffect(() => {
    fetchTournaments();
  }, []);

  // Function to handle form success
  const handleFormSuccess = () => {
    setShowForm(false);
    fetchTournaments(); // Refresh the tournament list
  };

  // Status badge color mapping
  const getStatusColor = (status) => {
    switch (status) {
      case "Ongoing": return "info";
      case "Completed": return "success";
      case "Upcoming": return "warning";
      default: return "dark";
    }
  };

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Prepare data for DataTable
  const columns = [
    { Header: "tournament", accessor: "tournament", width: "30%", align: "left" },
    { Header: "date", accessor: "date", align: "left" },
    { Header: "categories", accessor: "categories", align: "center" },
    { Header: "participants", accessor: "participants", align: "center" },
    { Header: "status", accessor: "status", align: "center" },
    { Header: "actions", accessor: "actions", align: "center" }
  ];

  const rows = tournaments.map(tournament => ({
    tournament: (
      <MDBox display="flex" alignItems="center" lineHeight={1}>
        <Icon fontSize="small" sx={{ mr: 1 }}>emoji_events</Icon>
        <MDBox lineHeight={1}>
          <MDTypography display="block" variant="button" fontWeight="medium">
            {tournament.name}
          </MDTypography>
          <MDTypography variant="caption">{tournament.location}</MDTypography>
        </MDBox>
      </MDBox>
    ),
    date: (
      <MDTypography variant="caption" color="text" fontWeight="medium">
        {formatDate(tournament.date)}
      </MDTypography>
    ),
    categories: (
      <MDBox>
        {tournament.categories.map((category, index) => (
          <Chip 
            key={index}
            label={category}
            size="small"
            sx={{ margin: 0.2 }}
          />
        ))}
      </MDBox>
    ),
    participants: (
      <MDTypography variant="caption" color="text" fontWeight="medium">
        {tournament.participants} players / {tournament.matches} matches
      </MDTypography>
    ),
    status: (
      <MDBox ml={-1}>
        <MDBadge 
          badgeContent={tournament.status} 
          color={getStatusColor(tournament.status)} 
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
            // Handle view action
          }}
        >
          View
        </MDTypography>
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
                  Tournaments Management
                </MDTypography>

                {/* Add button to toggle form visibility */}
                <MDButton 
                  variant="gradient" 
                  color="light"
                  onClick={() => setShowForm(!showForm)}
                >
                  <Icon>{showForm ? "close" : "add"}</Icon>
                  {showForm ? "Cancel" : "Add Tournament"}
                </MDButton>
              </MDBox>
              
              {/* Conditionally render the form based on state */}
              {showForm ? (
                <MDBox p={3}>
                  <TournamentForm 
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
                        Loading tournaments...
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

export default Tournaments;