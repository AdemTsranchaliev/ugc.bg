import { Box, Button, Typography, Container, Grid, Stack } from "@mui/material";
import { IconIrregularPolyhedron, IconOctahedron } from "@tabler/icons-react";

// project imports
import useConfig from "../../themes/context/useConfig";

export const JoinCommunity: React.FC = () => {
  const {
    state: { borderRadius },
  } = useConfig();

  return (
    <Box
      component="section"
      sx={{
        py: 8,
        background:
          "linear-gradient(135deg, rgba(63,81,181,0.04), rgba(0,188,212,0.02))",
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h4"
            component="h2"
            sx={{
              fontSize: "40px",
              fontWeight: 500,
              mb: 1,
            }}
          >
            Join the Community
          </Typography>
        </Box>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Stack
              spacing={2}
              direction="column"
              sx={{
                position: "relative",
                alignItems: "start",
                px: 2,
                justifyContent: "space-evenly",
                borderRadius,
                boxShadow: 8,
                minHeight: 200,
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: "4%",
                  right: "-10%",
                }}
              >
                <IconIrregularPolyhedron size={250} color="gray" />
              </Box>

              <Typography variant="h3" sx={{ fontWeight: 500, zIndex: 1 }}>
                Are you a creator looking to showcase your talents and connect?
              </Typography>

              <Button
                variant="outlined"
                color="primary"
                size="large"
                sx={{ px: 4 }}
              >
                Find Businesses
              </Button>
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Stack
              spacing={2}
              direction="column"
              sx={{
                position: "relative",
                alignItems: "start",
                px: 2,
                justifyContent: "space-evenly",
                borderRadius,
                boxShadow: 8,
                minHeight: 200,
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: "4%",
                  right: "-10%",
                }}
              >
                <IconOctahedron size={250} color="gray" />
              </Box>

              <Typography variant="h3" sx={{ fontWeight: 500, zIndex: 1 }}>
                Are you a business seeking creative solutions and
                collaborations?
              </Typography>

              <Button
                variant="contained"
                color="primary"
                size="large"
                sx={{ px: 4 }}
              >
                Become Creators
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default JoinCommunity;
