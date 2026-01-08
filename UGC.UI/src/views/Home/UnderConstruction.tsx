import { useState, useEffect } from "react";

// material-ui
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import { keyframes } from "@mui/system";
import CoffeeIcon from "@mui/icons-material/Coffee";
import CodeIcon from "@mui/icons-material/Code";

// ==============================|| UNDER CONSTRUCTION COMPONENT ||============================== //

const pulse = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
`;

const humorousMessages = [
  "We're building something amazing! 🚀",
  "Our code monkeys are hard at work 🐵",
  "Give us a moment, we're refueling on coffee ☕",
  "Under construction, but our enthusiasm is built! 💪",
  "Breaking things to make them better... 🔨",
  "Almost there! (said no developer ever) 😅",
];

export const UnderConstruction = () => {
  const [currentMessage, setCurrentMessage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % humorousMessages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      sx={{
        py: { xs: 6, md: 10 },
        backgroundColor: "background.default",
        position: "relative",
        overflow: "hidden",
        border: "1px solid  blue",
        borderWidth: 5,
        borderRadius: 6,
        my: 4,
      }}
    >
      <Container maxWidth="md">
        <Stack spacing={4} alignItems="center" textAlign="center">
          {/* Main Heading */}
          <Typography
            variant="h2"
            component="h2"
            sx={{
              fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
              fontWeight: 700,
              color: "text.primary",
            }}
          >
            Under Construction
          </Typography>

          {/* Rotating Humorous Messages */}
          <Box
            sx={{
              minHeight: 60,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              key={currentMessage}
              variant="h5"
              component="p"
              sx={{
                fontSize: { xs: "1.1rem", sm: "1.3rem", md: "1.5rem" },
                color: "text.secondary",
                fontWeight: 400,
                animation: `${pulse} 0.5s ease-in-out`,
              }}
            >
              {humorousMessages[currentMessage]}
            </Typography>
          </Box>

          {/* Fun Stats/Info */}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={3}
            sx={{ mt: 2, width: "100%" }}
          >
            <Box
              sx={{
                flex: 1,
                p: 2,
                borderRadius: 3,
                backgroundColor: "action.hover",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 1,
              }}
            >
              <CoffeeIcon sx={{ fontSize: 40, color: "primary.main" }} />
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                ∞
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Cups of Coffee
              </Typography>
            </Box>

            <Box
              sx={{
                flex: 1,
                p: 2,
                borderRadius: 3,
                backgroundColor: "action.hover",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 1,
              }}
            >
              <CodeIcon sx={{ fontSize: 40, color: "secondary.main" }} />
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                42
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lines of Code
              </Typography>
            </Box>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default UnderConstruction;
