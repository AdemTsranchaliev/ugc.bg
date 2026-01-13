import { Box, Button, Typography, Container, Grid, Stack } from "@mui/material";

export const JoinCommunity: React.FC = () => {
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
            variant="h1"
            sx={{
              fontWeight: 500,
              mb: 1,
            }}
          >
            Присъединете се към
            <Box component="span" sx={{ ml: 1, color: "#5b84fa" }}>
              Общността
            </Box>
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
                  Открийте Бизнеси
                </Button>

                <Button
                  variant="outlined"
                  color="primary"
                  size="large"
                  sx={{ px: 4 }}
                >
                  Открийте Създатели
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
