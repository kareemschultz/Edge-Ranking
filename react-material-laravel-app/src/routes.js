/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// Material Dashboard 2 React layouts
import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Billing from "layouts/billing";
import RTL from "layouts/rtl";
import Notifications from "layouts/notifications";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";

import UserProfile from "layouts/user-profile";
import UserManagement from "layouts/user-management";

import Login from "auth/login";
import Register from "auth/register";
import ForgotPassword from "auth/forgot-password";
import ResetPassword from "auth/reset-password";

// Table Tennis layouts
import TableTennisDashboard from "layouts/table-tennis/dashboard";
import LiveMatches from "layouts/table-tennis/live-matches";
import Tournaments from "layouts/table-tennis/tournaments";
import Rankings from "layouts/table-tennis/rankings";
import Players from "layouts/table-tennis/players";

// New analytics and reports components
import PlayerAnalytics from "layouts/table-tennis/player-analytics";
import TournamentAnalytics from "layouts/table-tennis/tournament-analytics";
import Reports from "layouts/table-tennis/reports";

// @mui icons
import Icon from "@mui/material/Icon";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  // Table Tennis Section
  {
    type: "title",
    title: "EDGE Sports Management",
    key: "edge-sports-title",
  },
  // Individual Table Tennis routes instead of nested menu
  {
    type: "collapse",
    name: "TT Overview",
    key: "tt-dashboard",
    icon: <Icon fontSize="small">sports_tennis</Icon>,
    route: "/table-tennis/dashboard",
    component: <TableTennisDashboard />,
  },
  {
    type: "collapse",
    name: "Live Matches",
    key: "live-matches",
    icon: <Icon fontSize="small">timer</Icon>,
    route: "/table-tennis/live-matches",
    component: <LiveMatches />,
  },
  {
    type: "collapse",
    name: "Tournaments",
    key: "tournaments",
    icon: <Icon fontSize="small">emoji_events</Icon>,
    route: "/table-tennis/tournaments",
    component: <Tournaments />,
  },
  {
    type: "collapse",
    name: "Rankings",
    key: "rankings",
    icon: <Icon fontSize="small">leaderboard</Icon>,
    route: "/table-tennis/rankings",
    component: <Rankings />,
  },
  {
    type: "collapse",
    name: "Players",
    key: "players",
    icon: <Icon fontSize="small">people</Icon>,
    route: "/table-tennis/players",
    component: <Players />,
  },
  // New Analytics and Reports Section
  {
    type: "collapse",
    name: "Player Analytics",
    key: "player-analytics",
    icon: <Icon fontSize="small">analytics</Icon>,
    route: "/table-tennis/player-analytics",
    component: <PlayerAnalytics />,
  },
  {
    type: "collapse",
    name: "Tournament Analytics",
    key: "tournament-analytics",
    icon: <Icon fontSize="small">insert_chart</Icon>,
    route: "/table-tennis/tournament-analytics",
    component: <TournamentAnalytics />,
  },
  {
    type: "collapse",
    name: "Reports",
    key: "reports",
    icon: <Icon fontSize="small">description</Icon>,
    route: "/table-tennis/reports",
    component: <Reports />,
  },
  // Original Section
  {
    type: "title",
    title: "Sample Pages",
    key: "sample-pages",
  },
  {
    type: "collapse",
    name: "Tables",
    key: "tables",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/tables",
    component: <Tables />,
  },
  {
    type: "collapse",
    name: "Billing",
    key: "billing",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/billing",
    component: <Billing />,
  },
  {
    type: "collapse",
    name: "RTL",
    key: "rtl",
    icon: <Icon fontSize="small">format_textdirection_r_to_l</Icon>,
    route: "/rtl",
    component: <RTL />,
  },
  {
    type: "collapse",
    name: "Notifications",
    key: "notifications",
    icon: <Icon fontSize="small">notifications</Icon>,
    route: "/notifications",
    component: <Notifications />,
  },
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/profile",
    component: <Profile />,
  },
  {
    type: "divider",
    key: "divider-1",
  },
  {
    type: "title",
    title: "Account Pages",
    key: "account-pages",
  },
  {
    type: "collapse",
    name: "Sign In",
    key: "sign-in",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/authentication/sign-in",
    component: <SignIn />,
  },
  {
    type: "examples",
    name: "User Profile",
    key: "user-profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/user-profile",
    component: <UserProfile />,
  },
  {
    type: "examples",
    name: "User Management",
    key: "user-management",
    icon: <Icon fontSize="small">list</Icon>,
    route: "/user-management",
    component: <UserManagement />,
  },
  {
    type: "collapse",
    name: "Sign Up",
    key: "sign-up",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/authentication/sign-up",
    component: <SignUp />,
  },
  {
    type: "auth",
    name: "Login",
    key: "login",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/auth/login",
    component: <Login />,
  },
  {
    type: "auth",
    name: "Register",
    key: "register",
    icon: <Icon fontSize="small">reigster</Icon>,
    route: "/auth/register",
    component: <Register />,
  },
  {
    type: "auth",
    name: "Forgot Password",
    key: "forgot-password",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/auth/forgot-password",
    component: <ForgotPassword />,
  },
  {
    type: "auth",
    name: "Reset Password",
    key: "reset-password",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/auth/reset-password",
    component: <ResetPassword />,
  },
];

export default routes;