import { useState, useEffect, useMemo, useContext } from "react";

// react-router components
import { Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import Sidenav from "examples/Sidenav";
import Configurator from "examples/Configurator";

// Material Dashboard 2 React themes
import theme from "assets/theme";
import themeRTL from "assets/theme/theme-rtl";

// Material Dashboard 2 React Dark Mode themes
import themeDark from "assets/theme-dark";
import themeDarkRTL from "assets/theme-dark/theme-rtl";

// RTL plugins
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

// Material Dashboard 2 React routes
import routes from "routes";

// Material Dashboard 2 React contexts
import { useMaterialUIController, setMiniSidenav, setOpenConfigurator } from "context";

// Images
import brandWhite from "assets/images/logo-ct.png";
import brandDark from "assets/images/logo-ct-dark.png";

import { setupAxiosInterceptors } from "./services/interceptor";
import ProtectedRoute from "examples/ProtectedRoute";
import ForgotPassword from "auth/forgot-password";
import ResetPassword from "auth/reset-password";
import Login from "auth/login";
import Register from "auth/register";
import { AuthContext } from "context";
import UserProfile from "layouts/user-profile";
import UserManagement from "layouts/user-management";
import { Helmet } from "react-helmet";

// Table Tennis components
import TableTennisDashboard from "layouts/table-tennis/dashboard";
import LiveMatches from "layouts/table-tennis/live-matches";
import Tournaments from "layouts/table-tennis/tournaments";
import Rankings from "layouts/table-tennis/rankings";
import Players from "layouts/table-tennis/players";

export default function App() {
  const authContext = useContext(AuthContext);

  const [controller, dispatch] = useMaterialUIController();
  const {
    miniSidenav,
    direction,
    layout,
    openConfigurator,
    sidenavColor,
    transparentSidenav,
    whiteSidenav,
    darkMode,
  } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const [rtlCache, setRtlCache] = useState(null);
  const { pathname } = useLocation();

  // Cache for the rtl
  useMemo(() => {
    const cacheRtl = createCache({
      key: "rtl",
      stylisPlugins: [rtlPlugin],
    });

    setRtlCache(cacheRtl);
  }, []);

  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  // Change the openConfigurator state
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);

  // if the token expired or other errors it logs out and goes to the login page
  const navigate = useNavigate();
  setupAxiosInterceptors(() => {
    authContext.logout();
    navigate("/auth/login");
  });

  const [isDemo, setIsDemo] = useState(false);

  useEffect(() => {
    setIsDemo(process.env.REACT_APP_IS_DEMO === "true");
  }, []);

  // Setting the dir attribute for the body element
  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route && route.type !== "auth") {
        return (
          <Route
            exact
            path={route.route}
            element={
              <ProtectedRoute isAuthenticated={authContext.isAuthenticated}>
                {route.component}
              </ProtectedRoute>
            }
            key={route.key}
          />
        );
      }
      return null;
    });

  const configsButton = (
    <MDBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="3.25rem"
      height="3.25rem"
      bgColor="white"
      shadow="sm"
      borderRadius="50%"
      position="fixed"
      right="2rem"
      bottom="2rem"
      zIndex={99}
      color="dark"
      sx={{ cursor: "pointer" }}
      onClick={handleConfiguratorOpen}
    >
      <Icon fontSize="small" color="inherit">
        settings
      </Icon>
    </MDBox>
  );

  return (
    <>
      {isDemo && (
        <Helmet>
          <meta
            name="keywords"
            content="creative tim, updivision, material, laravel json:api, html dashboard, laravel, react, api admin, react laravel, html css dashboard laravel, material dashboard laravel, laravel api, react material dashboard, material admin, react dashboard, react admin, web dashboard, bootstrap 5 dashboard laravel, bootstrap 5, css3 dashboard, bootstrap 5 admin laravel, material dashboard bootstrap 5 laravel, frontend, api dashboard, responsive bootstrap 5 dashboard, api, material dashboard, material laravel bootstrap 5 dashboard, json:api"
          />
          <meta
            name="description"
            content="A free full stack app powered by MUI component library, React and Laravel, featuring dozens of handcrafted UI elements"
          />
          <meta
            itemProp="name"
            content="React Material Dashboard Laravel by Creative Tim & UPDIVISION"
          />
          <meta
            itemProp="description"
            content="A free full stack app powered by MUI component library, React and Laravel, featuring dozens of handcrafted UI elements"
          />
          <meta
            itemProp="image"
            content="https://s3.amazonaws.com/creativetim_bucket/products/686/original/react-material-dashboard-laravel.jpg?1664783836"
          />
          <meta name="twitter:card" content="product" />
          <meta name="twitter:site" content="@creativetim" />
          <meta
            name="twitter:title"
            content="React Material Dashboard Laravel by Creative Tim & UPDIVISION"
          />
          <meta
            name="twitter:description"
            content="A free full stack app powered by MUI component library, React and Laravel, featuring dozens of handcrafted UI elements"
          />
          <meta name="twitter:creator" content="@creativetim" />
          <meta
            name="twitter:image"
            content="https://s3.amazonaws.com/creativetim_bucket/products/686/original/react-material-dashboard-laravel.jpg?1664783836"
          />
          <meta property="fb:app_id" content="655968634437471" />
          <meta
            property="og:title"
            content="React Material Dashboard Laravel by Creative Tim & UPDIVISION"
          />
          <meta property="og:type" content="article" />
          <meta
            property="og:url"
            content="https://www.creative-tim.com/live/material-dashboard-react-laravel/"
          />
          <meta
            property="og:image"
            content="https://s3.amazonaws.com/creativetim_bucket/products/686/original/react-material-dashboard-laravel.jpg?1664783836"
          />
          <meta
            property="og:description"
            content="A free full stack app powered by MUI component library, React and Laravel, featuring dozens of handcrafted UI elements"
          />
          <meta property="og:site_name" content="Creative Tim" />
        </Helmet>
      )}
      {direction === "rtl" ? (
        <CacheProvider value={rtlCache}>
          <ThemeProvider theme={darkMode ? themeDarkRTL : themeRTL}>
            <CssBaseline />
            {layout === "dashboard" && (
              <>
                <Sidenav
                  color={sidenavColor}
                  brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
                  brandName="Material Dashboard 2"
                  routes={routes}
                  onMouseEnter={handleOnMouseEnter}
                  onMouseLeave={handleOnMouseLeave}
                />
                <Configurator />
                {configsButton}
              </>
            )}
            {layout === "vr" && <Configurator />}
            <Routes>
              <Route path="login" element={<Navigate to="/auth/login" />} />
              <Route path="register" element={<Navigate to="/auth/register" />} />
              <Route path="forgot-password" element={<Navigate to="/auth/forgot-password" />} />
              {getRoutes(routes)}
              <Route path="*" element={<Navigate to="/dashboard" />} />
            </Routes>
          </ThemeProvider>
        </CacheProvider>
      ) : (
        <ThemeProvider theme={darkMode ? themeDark : theme}>
          <CssBaseline />
          {layout === "dashboard" && (
            <>
              <Sidenav
                color={sidenavColor}
                brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
                brandName="Material Dashboard 2"
                routes={routes}
                onMouseEnter={handleOnMouseEnter}
                onMouseLeave={handleOnMouseLeave}
              />
              <Configurator />
              {configsButton}
            </>
          )}
          {layout === "vr" && <Configurator />}
          <Routes>
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/register" element={<Register />} />
            <Route path="/auth/forgot-password" element={<ForgotPassword />} />
            <Route path="/auth/reset-password" element={<ResetPassword />} />
            
            {/* User management routes */}
            <Route
              exact
              path="user-profile"
              element={
                <ProtectedRoute isAuthenticated={authContext.isAuthenticated}>
                  <UserProfile />
                </ProtectedRoute>
              }
              key="user-profile"
            />
            <Route
              exact
              path="user-management"
              element={
                <ProtectedRoute isAuthenticated={authContext.isAuthenticated}>
                  <UserManagement />
                </ProtectedRoute>
              }
              key="user-management"
            />

            {/* Table Tennis routes */}
            <Route
              exact
              path="/table-tennis/dashboard"
              element={
                <ProtectedRoute isAuthenticated={authContext.isAuthenticated}>
                  <TableTennisDashboard />
                </ProtectedRoute>
              }
              key="tt-dashboard"
            />
            <Route
              exact
              path="/table-tennis/live-matches"
              element={
                <ProtectedRoute isAuthenticated={authContext.isAuthenticated}>
                  <LiveMatches />
                </ProtectedRoute>
              }
              key="live-matches"
            />
            <Route
              exact
              path="/table-tennis/tournaments"
              element={
                <ProtectedRoute isAuthenticated={authContext.isAuthenticated}>
                  <Tournaments />
                </ProtectedRoute>
              }
              key="tournaments"
            />
            <Route
              exact
              path="/table-tennis/rankings"
              element={
                <ProtectedRoute isAuthenticated={authContext.isAuthenticated}>
                  <Rankings />
                </ProtectedRoute>
              }
              key="rankings"
            />
            <Route
              exact
              path="/table-tennis/players"
              element={
                <ProtectedRoute isAuthenticated={authContext.isAuthenticated}>
                  <Players />
                </ProtectedRoute>
              }
              key="players"
            />
            
            {getRoutes(routes)}
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </Routes>
        </ThemeProvider>
      )}
    </>
  );
}