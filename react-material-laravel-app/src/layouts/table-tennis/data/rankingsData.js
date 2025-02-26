// src/layouts/table-tennis/data/rankingsData.js
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";

// Images - you can replace these with your own player images
import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";

export default function data() {
  return {
    columns: [
      { Header: "player", accessor: "player", width: "30%", align: "left" },
      { Header: "category", accessor: "category", align: "left" },
      { Header: "club", accessor: "club", align: "center" },
      { Header: "points", accessor: "points", align: "center" },
      { Header: "rank", accessor: "rank", align: "center" },
    ],

    rows: [
      {
        player: (
          <MDBox display="flex" alignItems="center" lineHeight={1}>
            <MDAvatar src={team1} name="John Smith" size="sm" />
            <MDBox ml={2} lineHeight={1}>
              <MDTypography display="block" variant="button" fontWeight="medium">
                John Smith
              </MDTypography>
              <MDTypography variant="caption">john@edge.com</MDTypography>
            </MDBox>
          </MDBox>
        ),
        category: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            Senior Men
          </MDTypography>
        ),
        club: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            Edge Club
          </MDTypography>
        ),
        points: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            2500
          </MDTypography>
        ),
        rank: (
          <MDBox ml={-1}>
            <MDBadge badgeContent="1" color="success" variant="gradient" size="sm" />
          </MDBox>
        ),
      },
      {
        player: (
          <MDBox display="flex" alignItems="center" lineHeight={1}>
            <MDAvatar src={team2} name="Sarah Johnson" size="sm" />
            <MDBox ml={2} lineHeight={1}>
              <MDTypography display="block" variant="button" fontWeight="medium">
                Sarah Johnson
              </MDTypography>
              <MDTypography variant="caption">sarah@victory.com</MDTypography>
            </MDBox>
          </MDBox>
        ),
        category: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            Senior Women
          </MDTypography>
        ),
        club: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            Victory Sports
          </MDTypography>
        ),
        points: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            2450
          </MDTypography>
        ),
        rank: (
          <MDBox ml={-1}>
            <MDBadge badgeContent="1" color="success" variant="gradient" size="sm" />
          </MDBox>
        ),
      },
      {
        player: (
          <MDBox display="flex" alignItems="center" lineHeight={1}>
            <MDAvatar src={team3} name="Mike Williams" size="sm" />
            <MDBox ml={2} lineHeight={1}>
              <MDTypography display="block" variant="button" fontWeight="medium">
                Mike Williams
              </MDTypography>
              <MDTypography variant="caption">mike@edge.com</MDTypography>
            </MDBox>
          </MDBox>
        ),
        category: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            Senior Men
          </MDTypography>
        ),
        club: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            Edge Club
          </MDTypography>
        ),
        points: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            2400
          </MDTypography>
        ),
        rank: (
          <MDBox ml={-1}>
            <MDBadge badgeContent="2" color="primary" variant="gradient" size="sm" />
          </MDBox>
        ),
      },
      {
        player: (
          <MDBox display="flex" alignItems="center" lineHeight={1}>
            <MDAvatar src={team4} name="Emma Davis" size="sm" />
            <MDBox ml={2} lineHeight={1}>
              <MDTypography display="block" variant="button" fontWeight="medium">
                Emma Davis
              </MDTypography>
              <MDTypography variant="caption">emma@champions.com</MDTypography>
            </MDBox>
          </MDBox>
        ),
        category: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            Senior Women
          </MDTypography>
        ),
        club: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            Champions Academy
          </MDTypography>
        ),
        points: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            2380
          </MDTypography>
        ),
        rank: (
          <MDBox ml={-1}>
            <MDBadge badgeContent="2" color="primary" variant="gradient" size="sm" />
          </MDBox>
        ),
      },
    ],
  };
}