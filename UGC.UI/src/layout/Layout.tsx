import { Outlet } from "react-router";

// material-ui
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

// project imports
import { Header } from "./Header";
import { Footer } from "./Footer";
import useConfig from "../themes/context/useConfig";

// ==============================|| MAIN LAYOUT ||============================== //

export default function Layout() {
  const {
    state: { container },
  } = useConfig();

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <Header />

      {/* Main Content */}
      <Container
        maxWidth={container}
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
