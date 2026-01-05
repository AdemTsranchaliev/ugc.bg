import { Outlet } from "react-router";

// material-ui
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";

// project imports
// import Footer from "./Footer";
import { Header } from "./Header";
// import Sidebar from "./Sidebar";
import HorizontalBar from "./navigation/HorizontalBar";
// import Customization from "../Customization";
// import Loader from "../ui-component/Loader";
import Breadcrumbs from "../ui-component/extended/Breadcrumbs";

import useConfig from "../themes/context/useConfig";

// ==============================|| MAIN LAYOUT ||============================== //

export default function Layout() {
  const {
    state: { container },
  } = useConfig();

  const isHorizontal = true;

  // if (menuMasterLoading) return <Loader />;

  return (
    <Box sx={{ display: "flex" }}>
      {/* header */}
      <AppBar
        enableColorOnDark
        position="fixed"
        color="inherit"
        elevation={0}
        sx={{ bgcolor: "background.default" }}
      >
        <Toolbar sx={{ p: isHorizontal ? 1.25 : 2 }}>
          <Header />
        </Toolbar>
      </AppBar>

      {/* menu / drawer */}
      <HorizontalBar />

      {/* main content */}
      {/* <MainContentStyled {...{ borderRadius, open: drawerOpen }}> */}
      <Container
        maxWidth={container ? "lg" : false}
        sx={{
          ...(!container && { px: { xs: 0 } }),
          minHeight: "calc(100vh - 128px)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* breadcrumb */}
        <Breadcrumbs />
        <Outlet />
        {/* <Footer /> */}
      </Container>
      {/* </MainContentStyled> */}
      {/* <Customization /> */}
    </Box>
  );
}
