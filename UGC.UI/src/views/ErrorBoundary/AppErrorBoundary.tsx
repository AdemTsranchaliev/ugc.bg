import { useRouteError, isRouteErrorResponse, useNavigate } from "react-router";

import {
  Box,
  Button,
  CardMedia,
  Stack,
  Typography,
} from "@mui/material";
import {
  Refresh as RefreshIcon,
  Home as HomeIcon,
} from "@mui/icons-material";
import { motion } from "framer-motion";

// assets
import imageBackground from '/assets/images/maintenance/img-error-bg.svg';
import imageOrbitals from '/assets/images/maintenance/error-orbital.png';
import imageCore from '/assets/images/maintenance/error-core.png';

// import imageOrbitals from '/assets/images/maintenance/rocket-orbital.png';
// import imageCore from '/assets/images/maintenance/exploding-rocket.png';

export const AppErrorBoundary = () => {
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
          // style={{ position: 'absolute', top: '-5%', left: '25%', width: '75%' }}
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
          // style={{ position: 'absolute', top: '30%', left: '41%', width: '24%' }}
          // initial={{ rotate: 333 }}
          animate={{ y: [-20, 20, -20] }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        >
          <CardMedia component="img" image={imageOrbitals} sx={{ width: '70%' }} />
        </motion.div>
        {/* <motion.div
          style={{ position: 'absolute', top: '35%', left: '41%', width: '22%' }}
          initial={{ rotate: 333 }}
          animate={{ y: [-20, 20, -20] }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        >
          <CardMedia component="img" image={imageOrbitals} sx={{ width: '70%' }} />
        </motion.div> */}
        {/* <motion.div
          style={{ position: 'absolute', top: '40%', left: '41%', width: '20%' }}
          initial={{ rotate: 333 }}
          animate={{ y: [-20, 20, -20] }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        >
          <CardMedia component="img" image={imageOrbitals} sx={{ width: '70%' }} />
        </motion.div> */}
      </Box>
      <Stack sx={{ justifyContent: 'center', alignItems: 'center', p: 1.5, gap: 2 }}>
        {/* Description */}
        <Typography
          variant="h1"
          sx={{
            background: "linear-gradient(90deg, #000 0%, #5b84fa 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            color: "transparent",
            fontWeight: 500,
          }}
        >
          Опааа, нещо се обърка!?
        </Typography>
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
};

export default AppErrorBoundary;
