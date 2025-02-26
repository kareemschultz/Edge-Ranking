// src/layouts/table-tennis/reports/index.js
import { useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";

// Material Dashboard React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";

// Material Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

function Reports() {
  const [reportType, setReportType] = useState('tournament');
  const [selectedEntity, setSelectedEntity] = useState('');
  const [dateRange, setDateRange] = useState({
    startDate: '',
    endDate: ''
  });
  const [selectedMetrics, setSelectedMetrics] = useState([]);
  const [generatedReports, setGeneratedReports] = useState([]);

  // Sample entity options based on report type
  const getEntityOptions = () => {
    switch(reportType) {
      case 'tournament':
        return [
          { id: 1, name: 'Edge National Championships' },
          { id: 2, name: 'Victory Open' },
          { id: 3, name: 'Regional Youth Cup' }
        ];
      case 'player':
        return [
          { id: 1, name: 'John Smith' },
          { id: 2, name: 'Sarah Johnson' },
          { id: 3, name: 'Mike Williams' }
        ];
      case 'club':
        return [
          { id: 1, name: 'Edge Club' },
          { id: 2, name: 'Victory Sports' },
          { id: 3, name: 'Champions Academy' }
        ];
      default:
        return [];
    }
  };

  // Get available metrics based on report type
  const getAvailableMetrics = () => {
    switch(reportType) {
      case 'tournament':
        return [
          { id: 'participation', name: 'Participation Statistics' },
          { id: 'matches', name: 'Match Statistics' },
          { id: 'duration', name: 'Match Duration Analysis' },
          { id: 'points', name: 'Points Distribution' },
          { id: 'clubs', name: 'Club Performance' }
        ];
      case 'player':
        return [
          { id: 'overall', name: 'Overall Performance' },
          { id: 'progression', name: 'Rating Progression' },
          { id: 'opponents', name: 'Performance by Opponent' },
          { id: 'tournaments', name: 'Tournament History' },
          { id: 'technique', name: 'Technical Analysis' }
        ];
      case 'club':
        return [
          { id: 'members', name: 'Membership Statistics' },
          { id: 'rankings', name: 'Ranking Distribution' },
          { id: 'tournaments', name: 'Tournament Performance' },
          { id: 'growth', name: 'Growth Metrics' },
          { id: 'comparison', name: 'Competitive Comparison' }
        ];
      default:
        return [];
    }
  };

  // Handle report type change
  const handleReportTypeChange = (event) => {
    setReportType(event.target.value);
    setSelectedEntity('');
    setSelectedMetrics([]);
  };

  // Handle entity selection
  const handleEntityChange = (event) => {
    setSelectedEntity(event.target.value);
  };

  // Handle date range changes
  const handleDateChange = (field, value) => {
    setDateRange({
      ...dateRange,
      [field]: value
    });
  };

  // Handle metric selection
  const handleMetricChange = (metricId) => {
    if (selectedMetrics.includes(metricId)) {
      setSelectedMetrics(selectedMetrics.filter(id => id !== metricId));
    } else {
      setSelectedMetrics([...selectedMetrics, metricId]);
    }
  };

  // Generate a report
  const handleGenerateReport = () => {
    if (!selectedEntity || selectedMetrics.length === 0) {
      return;
    }
    
    // In a real app, this would call an API to generate the report
    const newReport = {
      id: Date.now(),
      name: `${reportType.charAt(0).toUpperCase() + reportType.slice(1)} Report - ${
        getEntityOptions().find(e => e.id === selectedEntity)?.name
      }`,
      date: new Date().toISOString(),
      type: reportType,
      metrics: selectedMetrics.map(id => 
        getAvailableMetrics().find(m => m.id === id)?.name
      )
    };
    
    setGeneratedReports([newReport, ...generatedReports]);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={3}>
          {/* Report Generator */}
          <Grid item xs={12} lg={8}>
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
                  Generate Reports
                </MDTypography>
              </MDBox>
              
              <MDBox p={3}>
                <Grid container spacing={2}>
                  {/* Report Type */}
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <InputLabel id="report-type-label">Report Type</InputLabel>
                      <Select
                        labelId="report-type-label"
                        value={reportType}
                        onChange={handleReportTypeChange}
                        label="Report Type"
                      >
                        <MenuItem value="tournament">Tournament Report</MenuItem>
                        <MenuItem value="player">Player Report</MenuItem>
                        <MenuItem value="club">Club Report</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  
                  {/* Entity Selection */}
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <InputLabel id="entity-label">
                        {reportType.charAt(0).toUpperCase() + reportType.slice(1)}
                      </InputLabel>
                      <Select
                        labelId="entity-label"
                        value={selectedEntity}
                        onChange={handleEntityChange}
                        label={reportType.charAt(0).toUpperCase() + reportType.slice(1)}
                      >
                        {getEntityOptions().map(entity => (
                          <MenuItem key={entity.id} value={entity.id}>
                            {entity.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  
                  {/* Date Range */}
<Grid item xs={12} md={6}>
  <MDBox mb={2}>
    <MDInput
      type="date"
      label="Start Date"
      value={dateRange.startDate}
      onChange={(e) => handleDateChange('startDate', e.target.value)}
      fullWidth
      InputLabelProps={{ shrink: true }}
    />
  </MDBox>
</Grid>
                  
<Grid item xs={12} md={6}>
  <MDBox mb={2}>
    <MDInput
      type="date"
      label="End Date"
      value={dateRange.endDate}
      onChange={(e) => handleDateChange('endDate', e.target.value)}
      fullWidth
      InputLabelProps={{ shrink: true }}
    />
  </MDBox>
</Grid>
                  
{/* Metrics Selection */}
<Grid item xs={12}>
  <MDTypography variant="h6" fontWeight="medium" mb={2}>
    Select Metrics to Include
  </MDTypography>
  <Grid container spacing={2}>
    {getAvailableMetrics().map(metric => (
      <Grid item xs={12} md={6} key={metric.id}>
        <FormControlLabel
          control={
            <Checkbox
              checked={selectedMetrics.includes(metric.id)}
              onChange={() => handleMetricChange(metric.id)}
              color="info"
            />
          }
          label={metric.name}
        />
      </Grid>
    ))}
  </Grid>
</Grid>
                  
{/* Generate Button */}
<Grid item xs={12} mt={2}>
  <MDButton
    variant="gradient"
    color="info"
    fullWidth
    onClick={handleGenerateReport}
    disabled={!selectedEntity || selectedMetrics.length === 0}
  >
    Generate Report
  </MDButton>
</Grid>
</Grid>
</MDBox>
</Card>
</Grid>
          
{/* Recent Reports */}
<Grid item xs={12} lg={4}>
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
        Recent Reports
      </MDTypography>
    </MDBox>
              
    <MDBox p={2}>
      {generatedReports.length > 0 ? (
        <List>
          {generatedReports.map(report => (
            <ListItem key={report.id} divider>
              <ListItemIcon>
                <Icon color="info">description</Icon>
              </ListItemIcon>
              <ListItemText
                primary={report.name}
                secondary={new Date(report.date).toLocaleString()}
              />
              <MDButton
                variant="text"
                color="info"
                size="small"
                onClick={() => {
                  // In a real app, this would download the report
                  alert('Downloading report...');
                }}
              >
                <Icon fontSize="small">download</Icon>
              </MDButton>
            </ListItem>
          ))}
        </List>
      ) : (
        <MDBox textAlign="center" py={3}>
          <MDTypography variant="body2" color="text">
            No reports generated yet
          </MDTypography>
        </MDBox>
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

export default Reports;