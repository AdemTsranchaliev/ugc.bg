import { useState } from "react";

// material-ui
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { Button, Stack } from "@mui/material";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

import { SearchSection } from "../../layout/Header";
import useConfig from "../../themes/context/useConfig";

// ==============================|| LANDING COMPONENT ||============================== //

export const Landing = () => {
  const {
    state: { borderRadius },
  } = useConfig();
  const [searchType, setSearchType] = useState<"find" | "browse">("find");

  const handleSearchTypeChange = (
    _event: React.MouseEvent<HTMLElement>,
    newType: "find" | "browse" | null
  ) => {
    if (newType !== null) {
      setSearchType(newType);
    }
  };

  return (
    <Box
      maxWidth="xl"
      sx={{
        position: "relative",
        minHeight: { xs: 0, md: "calc(100vh - 200px)" },
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        borderRadius,
        boxShadow: 8,
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url("https://fastly.picsum.photos/id/4/5000/3333.jpg?hmac=ghf06FdmgiD0-G4c9DdNM8RnBIN7BO0-ZGEw47khHP4")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
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
          zIndex: 2,
          py: { xs: 6, md: 8 }
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
              lineHeight: 1.2,
              color: "common.white",
              textAlign: "left",
            }}
          >
            Свързване на бизнеса с творци,
          </Typography>
          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem", lg: "3.5rem" },
              fontWeight: 280,
              lineHeight: 1.2,
              color: "common.white",
              textAlign: "left",
            }}
          >
            които доставят съдържания
          </Typography>

          {/* Search Container */}
          <Box
            sx={{
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
                Намери създател
              </ToggleButton>
              <ToggleButton value="browse" aria-label="browse jobs">
                Търси съдържание
              </ToggleButton>
            </ToggleButtonGroup>

            {/* Search Bar */}
            <SearchSection />

            {/* Popular Searches - Example placeholder section */}
            <Stack
              direction="row"
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
              {[
                "UGC",
                "Instagram",
                "Facebook",
                "TikTok",
                "Shorts",
                "YouTube",
              ].map((item, index) => (
                <Button
                  key={index}
                  variant="outlined"
                  endIcon={<ArrowRightAltIcon />}
                  sx={(theme) => ({
                    color: theme.palette.common.white,
                    borderColor: theme.palette.common.white,
                    "&:hover": {
                      borderColor: theme.palette.common.white,
                      backgroundColor: theme.palette.action.hover,
                    },
                  })}
                >
                  {item}
                </Button>
              ))}
            </Stack>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Landing;
