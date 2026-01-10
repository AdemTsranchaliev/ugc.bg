import { useState } from "react";
// import { useNavigate } from "react-router";

// material-ui
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { SearchSection } from "../../layout/Header";

// ==============================|| LANDING COMPONENT ||============================== //

export const Landing = () => {
  // const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState<"find" | "browse">("find");
  // const navigate = useNavigate();

  const handleSearchTypeChange = (
    _event: React.MouseEvent<HTMLElement>,
    newType: "find" | "browse" | null
  ) => {
    if (newType !== null) {
      setSearchType(newType);
    }
  };

  // const handleSearch = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (searchQuery.trim()) {
  //     if (searchType === "find") {
  //       navigate(
  //         `/explore?q=${encodeURIComponent(searchQuery.trim())}&type=creator`
  //       );
  //     } else {
  //       navigate(`/explore?q=${encodeURIComponent(searchQuery.trim())}`);
  //     }
  //   }
  // };

  return (
    <Box
      maxWidth="xl"
      sx={{
        position: "relative",
        minHeight: { xs: 0, md: "calc(100vh - 200px)" },
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        borderRadius: 8,
        boxShadow: 8,
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          // backgroundImage: `url("https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop")`,
          backgroundImage: `url("https://fastly.picsum.photos/id/4/5000/3333.jpg?hmac=ghf06FdmgiD0-G4c9DdNM8RnBIN7BO0-ZGEw47khHP4")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          // filter: "blur(4px) brightness(0.4)",
          filter: "blur(4px) brightness(0.8)",
          transform: "scale(1.1)",
          zIndex: 0,
        },
        "&::after": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 1,
        },
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          position: "relative",
          zIndex: 2,
          py: { xs: 6, md: 8 },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
          }}
        >
          {/* Headline */}
          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem", lg: "3.5rem" },
              fontWeight: 280,
              // mb: 3,
              lineHeight: 1.2,
              color: "common.white",
              textAlign: "left",
            }}
          >
            Connecting businesses in need
          </Typography>
          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem", lg: "3.5rem" },
              fontWeight: 280,
              // mb: 3,
              lineHeight: 1.2,
              color: "common.white",
              textAlign: "left",
            }}
          >
            to creators who deliver
          </Typography>

          {/* Search Container */}
          <Box
            sx={{
              // background: "linear-gradient(25deg, #101011 0%, #514747 100%)",
              // p: 2.5,
              borderRadius: 6,
              mt: 4,
            }}
          >
            {/* Toggle Buttons */}
            <ToggleButtonGroup
              value={searchType}
              exclusive
              onChange={handleSearchTypeChange}
              aria-label="search type"
              sx={{
                width: "100%",
                mb: 2,
                "& .MuiToggleButton-root": {
                  color: "grey.400",
                  borderColor: "transparent",
                  px: 3,
                  py: 1,
                  fontSize: "0.95rem",
                  fontWeight: 500,
                  textTransform: "none",
                  borderRadius: 6,
                  "&.Mui-selected": {
                    color: "common.white",
                    backgroundColor: "transparent",
                    borderBottom: "2px solid",
                    borderColor: "common.white",
                    borderRadius: 6,
                  },
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                  },
                },
              }}
            >
              <ToggleButton value="find" aria-label="find talent">
                Find a creator
              </ToggleButton>
              <ToggleButton value="browse" aria-label="browse jobs">
                Browse content
              </ToggleButton>
            </ToggleButtonGroup>

            {/* Search Bar */}
            <SearchSection />

            {/* Popular Searches - Example placeholder section */}
            <Box
              sx={{
                mt: 3,
                pt: 3,
                borderTop: "1px solid",
                borderColor: "grey.700",
                display: { xs: "none", md: "flex" },
                alignItems: "center",
                gap: 3,
                flexWrap: "wrap",
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  // color: "grey.500",
                  color: "white",
                  fontSize: "0.85rem",
                }}
              >
                Popular searches:
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  gap: 3,
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                {[
                  "UGC",
                  "Instagram",
                  "Facebook",
                  "TikTok",
                  "Shorts",
                  "YouTube",
                ].map((search) => (
                  <Typography
                    key={search}
                    variant="body2"
                    sx={{
                      color: "grey.300",
                      fontSize: "0.9rem",
                      fontWeight: 500,
                      opacity: 0.8,
                      cursor: "pointer",
                      transition: "color 0.2s",
                      "&:hover": {
                        color: "common.white",
                        textDecoration: "underline",
                      },
                    }}
                  >
                    {search}
                  </Typography>
                ))}
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Landing;
