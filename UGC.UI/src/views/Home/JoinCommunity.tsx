import { Box, Button, Typography, Container, Grid, Stack } from "@mui/material";

// project imports
// import useConfig from "../../themes/context/useConfig";

export const JoinCommunity: React.FC = () => {
  // const {
  //   state: { borderRadius },
  // } = useConfig();

  return (
    <Box
      component="section"
      sx={{
        pt: 8,
      }}
    >
      <Container maxWidth="xl">
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

        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 4 }}>
            <Stack
              spacing={2}
              direction="column"
              sx={{
                position: "relative",
                alignItems: "start",
                px: 2,
                justifyContent: "space-evenly",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Box
                  component="video"
                  src="https://dynamic.heygen.ai/www/Home%20-%20Page%20-%20Rebrand/avatar_iv.mp4?updatedAt=1757984236000"
                  autoPlay
                  loop
                  muted
                  sx={{
                    width: "100%",
                  }}
                />
              </Box>

              <Stack
                direction="row"
                spacing={2}
                justifyContent={"space-between"}
                sx={{
                  width: "100%",
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  sx={{ px: 4 }}
                >
                  Discover Businesses
                </Button>

                <Button
                  variant="outlined"
                  color="primary"
                  size="large"
                  sx={{ px: 4 }}
                >
                  Discover Creators
                </Button>
              </Stack>
            </Stack>
          </Grid>

          <Grid
            size={{ xs: 12, sm: 8 }}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              component="video"
              src="https://dynamic.heygen.ai/www/Home%20-%20Page%20-%20Rebrand/HEYGEN_Orb_home_ios.mp4?updatedAt=1761596026165"
              autoPlay
              loop
              muted
              sx={{
                width: "50%",
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default JoinCommunity;
