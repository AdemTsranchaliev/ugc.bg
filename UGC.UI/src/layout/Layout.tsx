import { Outlet } from "react-router";

// material-ui
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";

// project imports
import { Header } from "./Header";
import HorizontalBar from "./Navigation/HorizontalBar";
import { Footer } from "./Footer";
// import Loader from "../ui-component/Loader";
import useConfig from "../themes/context/useConfig";

// ==============================|| MAIN LAYOUT ||============================== //

export default function Layout() {
  const {
    state: { container },
  } = useConfig();

  const isHorizontal = true;

  // if (true) return <Loader />;

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      {/* header */}
      <AppBar
        position="fixed"
        color="inherit"
        elevation={0}
        enableColorOnDark
        sx={{ bgcolor: "background.default" }}
      >
        <Toolbar sx={{ p: isHorizontal ? 1.25 : 2 }}>
          <Header />
        </Toolbar>
      </AppBar>

      {/* menu */}
      <HorizontalBar />

      {/* main content */}
      <Container
        maxWidth={container ? "xl" : false}
        sx={{
          ...(!container && { px: { xs: 0 } }),
          minHeight: "calc(100vh - 128px)",
          display: "flex",
          flexDirection: "column",
          pt: { xs: "70px", md: "150px" },
        }}
      >
        <Outlet />
        <Footer />
      </Container>
    </Box>
  );
}
