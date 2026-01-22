import { useRouteError, isRouteErrorResponse, useNavigate } from "react-router";

import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import {
  ErrorOutline as ErrorOutlineIcon,
  Refresh as RefreshIcon,
  Home as HomeIcon,
} from "@mui/icons-material";
import { motion } from "framer-motion";

// assets
import imageBackground from '/assets/images/maintenance/img-error-bg.svg';
import imageOrbitals from '/assets/images/maintenance/error-orbital.png';
import imageCore from '/assets/images/maintenance/error-core.png';

export const AppErrorBoundary = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const routeError = useRouteError();

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
    window.location.reload();
  };

  const handleReload = () => {
    window.location.reload();
  };

  return (
    <Stack sx={{ gap: 2, alignItems: 'center', justifyContent: 'center', mt: 10 }}>
      <Box sx={{ maxWidth: { xs: 350, sm: 580, md: 720 }, margin: '0 auto', position: 'relative' }}>
        <CardMedia component="img" image={imageBackground} sx={{ width: '100%' }} />
        <motion.div
          style={{ position: 'absolute', top: 0, left: '20%', width: '90%' }}
          animate={{ y: [-20, 20, -20] }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        >
          <CardMedia component="img" image={imageCore} sx={{ width: '70%' }} />
        </motion.div>
        <motion.div
          style={{ position: 'absolute', top: 0, left: '20%', width: '90%' }}
          animate={{ y: [-20, 20, -20] }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        >
          <CardMedia component="img" image={imageOrbitals} sx={{ width: '70%' }} />
        </motion.div>
      </Box>
      <Stack sx={{ justifyContent: 'center', alignItems: 'center', p: 1.5, gap: 2 }}>
        {/* Description */}
        <Typography variant="h1">Опааа, нещо се обърка?</Typography>
        {/* Actions */}
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <Button
            variant="contained"
            startIcon={<RefreshIcon />}
            onClick={handleReload}
          >
            Презареди страница
          </Button>

          <Button
            variant="outlined"
            startIcon={<HomeIcon />}
            onClick={handleGoHome}
          >
            Начало
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );

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
                  <Typography
                    variant="subtitle2"
                    color="error"
                    fontWeight="bold"
                  >
                    Съобщение за грешка
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
                </Box>
              )}

              {/* Actions */}
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <Button
                  variant="contained"
                  startIcon={<RefreshIcon />}
                  onClick={handleReload}
                >
                  Презареди страница
                </Button>

                <Button
                  variant="outlined"
                  startIcon={<HomeIcon />}
                  onClick={handleGoHome}
                >
                  Начало
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
