// src/layouts/table-tennis/dashboard/index.js
import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Material Dashboard React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";

function TableTennisDashboard() {
  // Sample stats - replace with real data from your API
  const stats = {
    matches: 124,
    players: 45,
    tournaments: 8,
    completionRate: 92
  };
  
  // Sample chart data - replace with real data
  const recentMatchesChart = {
    labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"],
    datasets: { label: "Matches", data: [50, 40, 60, 70, 65, 75, 80] },
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="sports_tennis"
                title="Matches"
                count={stats.matches}
                percentage={{
                  color: "success",
                  amount: "+15%",
                  label: "vs last month",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="people"
                title="Players"
                count={stats.players}
                percentage={{
                  color: "success",
                  amount: "+3%",
                  label: "vs last month",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="emoji_events"
                title="Tournaments"
                count={stats.tournaments}
                percentage={{
                  color: "success",
                  amount: "+1",
                  label: "new event added",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="leaderboard"
                title="Completion Rate"
                count={`${stats.completionRate}%`}
                percentage={{
                  color: "success",
                  amount: "+5%",
                  label: "vs last tournament",
                }}
              />
            </MDBox>
          </Grid>
        </Grid>
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={8}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="info"
                  title="Recent Matches"
                  description="Number of matches per month"
                  date="updated 1 day ago"
                  chart={recentMatchesChart}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <Card>
                  <MDBox pt={3} px={3}>
                    <MDTypography variant="h6" fontWeight="medium">
                      Upcoming Tournaments
                    </MDTypography>
                  </MDBox>
                  <MDBox p={2}>
                    {/* List upcoming tournaments here */}
                    <MDTypography variant="button" display="block" color="text" fontWeight="medium">
                      Edge National Championships - Nov 15, 2024
                    </MDTypography>
                    <MDTypography variant="button" display="block" color="text" fontWeight="medium">
                      Regional Youth Cup - Dec 3, 2024
                    </MDTypography>
                  </MDBox>
                </Card>
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default TableTennisDashboard;