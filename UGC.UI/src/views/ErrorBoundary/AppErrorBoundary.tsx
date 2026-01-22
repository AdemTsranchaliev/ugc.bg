import { useRouteError, isRouteErrorResponse, useNavigate } from "react-router";

import {
  Box,
  Button,
  Card,
  CardContent,
  Collapse,
  Container,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import {
  ErrorOutline as ErrorOutlineIcon,
  Refresh as RefreshIcon,
  Home as HomeIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  BugReport as BugReportIcon,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import { useState } from "react";

export const AppErrorBoundary = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const routeError = useRouteError();

  const [showDetails, setShowDetails] = useState(false);

  // Normalize error
  let error: Error | null = null;

  if (isRouteErrorResponse(routeError)) {
    error = new Error(
      `${routeError.status} ${routeError.statusText}`
    );
  } else if (routeError instanceof Error) {
    error = routeError;
  }

  const handleGoHome = () => {
    navigate("/");
  };

  const handleReload = () => {
    window.location.reload();
  };

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card
          sx={{
            boxShadow: theme.shadows[8],
            borderRadius: 2,
            overflow: "hidden",
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Stack spacing={3} alignItems="center" textAlign="center">
              {/* Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                  delay: 0.2,
                }}
              >
                <Box
                  sx={{
                    width: 120,
                    height: 120,
                    borderRadius: "50%",
                    bgcolor: "error.light",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 2,
                  }}
                >
                  <ErrorOutlineIcon
                    sx={{ fontSize: 64, color: "error.main" }}
                  />
                </Box>
              </motion.div>

              <Typography variant="h3" fontWeight="bold">
                Oops! Something went wrong
              </Typography>

              <Typography color="text.secondary" sx={{ maxWidth: 500 }}>
                We're sorry, but something unexpected happened.
              </Typography>

              {/* Details */}
              {error && (
                <Box sx={{ width: "100%", mt: 2 }}>
                  <Button
                    startIcon={<BugReportIcon />}
                    endIcon={showDetails ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    onClick={() => setShowDetails((v) => !v)}
                    variant="outlined"
                    color="inherit"
                  >
                    {showDetails ? "Hide" : "Show"} Error Details
                  </Button>

                  <Collapse in={showDetails}>
                    <Card variant="outlined" sx={{ mt: 2 }}>
                      <CardContent>
                        <Typography
                          variant="subtitle2"
                          color="error"
                          fontWeight="bold"
                        >
                          Error Message
                        </Typography>

                        <Typography
                          component="pre"
                          sx={{
                            fontFamily: "monospace",
                            bgcolor: "action.hover",
                            p: 2,
                            borderRadius: 1,
                            mt: 1,
                            whiteSpace: "pre-wrap",
                          }}
                        >
                          {error.message}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Collapse>
                </Box>
              )}

              {/* Actions */}
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <Button
                  variant="contained"
                  startIcon={<RefreshIcon />}
                  onClick={handleReload}
                >
                  Reload Page
                </Button>

                <Button
                  variant="outlined"
                  startIcon={<HomeIcon />}
                  onClick={handleGoHome}
                >
                  Go Home
                </Button>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      </motion.div>
    </Container>
  );
};

export default AppErrorBoundary;
