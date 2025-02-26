// src/layouts/table-tennis/data/liveMatchesData.js
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";

export default function data() {
  const Status = ({ status }) => {
    let color = "info";
    if (status === "Completed") color = "success";
    if (status === "Upcoming") color = "dark";
    
    return (
      <MDBox ml={-1}>
        <MDBadge 
          badgeContent={status} 
          color={color} 
          variant="gradient" 
          size="sm" 
        />
      </MDBox>
    );
  };

  return {
    columns: [
      { Header: "players", accessor: "players", width: "45%", align: "left" },
      { Header: "score", accessor: "score", align: "left" },
      { Header: "table", accessor: "table", align: "center" },
      { Header: "status", accessor: "status", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ],

    rows: [
      {
        players: (
          <MDBox display="flex" alignItems="center" lineHeight={1}>
            <MDTypography display="block" variant="button" fontWeight="medium">
              John Smith vs. Mike Williams
            </MDTypography>
          </MDBox>
        ),
        score: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            11-9, 9-11, 11-7
          </MDTypography>
        ),
        table: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            Table 1
          </MDTypography>
        ),
        status: <Status status="In Progress" />,
        action: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            View
          </MDTypography>
        ),
      },
      {
        players: (
          <MDBox display="flex" alignItems="center" lineHeight={1}>
            <MDTypography display="block" variant="button" fontWeight="medium">
              Sarah Johnson vs. Emma Davis
            </MDTypography>
          </MDBox>
        ),
        score: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            11-8, 11-6
          </MDTypography>
        ),
        table: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            Table 2
          </MDTypography>
        ),
        status: <Status status="In Progress" />,
        action: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            View
          </MDTypography>
        ),
      },
      {
        players: (
          <MDBox display="flex" alignItems="center" lineHeight={1}>
            <MDTypography display="block" variant="button" fontWeight="medium">
              David Brown vs. Lisa Chen
            </MDTypography>
          </MDBox>
        ),
        score: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            11-7, 11-9, 8-11, 11-6
          </MDTypography>
        ),
        table: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            Table 3
          </MDTypography>
        ),
        status: <Status status="Completed" />,
        action: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            View
          </MDTypography>
        ),
      },
      {
        players: (
          <MDBox display="flex" alignItems="center" lineHeight={1}>
            <MDTypography display="block" variant="button" fontWeight="medium">
              James Wilson vs. Maria Garcia
            </MDTypography>
          </MDBox>
        ),
        score: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            -
          </MDTypography>
        ),
        table: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            Table 4
          </MDTypography>
        ),
        status: <Status status="Upcoming" />,
        action: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            View
          </MDTypography>
        ),
      },
    ],
  };
}