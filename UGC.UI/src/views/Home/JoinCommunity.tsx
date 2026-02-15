import { Box, Button, Typography, Grid, Card, Stack } from "@mui/material";
import { IconBuildingSkyscraper, IconPalette } from "@tabler/icons-react";
import SectionTitle from "../../ui-component/SectionTitle";

export const JoinCommunity: React.FC = () => {
  return (
    <Box
      sx={{
        pt: 8,
      }}
    >
      <Box sx={{ mb: 4 }}>
        <SectionTitle
          title="Присъединете се към"
          highlightedTitle="Общността"
          subtitle="Разгледайте възможностите, подходящи за вас."
        />
      </Box>

      <Grid container spacing={2} justifyContent="space-between">
        <Grid size={{ xs: 12, md: 6 }}>
          <Stack direction={{ xs: "column", md: "row" }} alignItems="center" spacing={4}>
            {/* Business Card */}
            <Card
              sx={{
                p: 4,
                borderRadius: 8,
                width: "100%",
                height: "300px",
                background: "linear-gradient(180deg, #e3f2fd 0%, #f5f9ff 100%)",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: "100%",
                  gap: 2,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    mb: 2,
                  }}
                >
                  <IconBuildingSkyscraper
                    size={48}
                    stroke={1.5}
                    style={{ color: "#5b84fa" }}
                  />
                </Box>

                <Box sx={{ textAlign: "center" }}>
                  <Typography variant="h3">
                    Открийте Бизнеси
                  </Typography>

                  <Typography
                    variant="body1"
                    sx={{
                      color: "#666",
                      mb: 3,
                    }}
                  >
                    Разширете мрежата си, намерете партньори.
                  </Typography>
                </Box>

                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  fullWidth
                  sx={{
                    borderRadius: 2,
                    py: 1.5,
                    fontWeight: 600,
                    textTransform: "none",
                  }}
                >
                  Към бизнеси
                </Button>
              </Box>
            </Card>

            {/* Creator Card */}
            <Card
              sx={{
                p: 4,
                borderRadius: 8,
                width: "100%",
                height: "300px",
                backgroundColor: "#fafafa",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: "100%",
                  gap: 2,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    mb: 2,
                  }}
                >
                  <IconPalette
                    size={48}
                    stroke={1.5}
                    style={{ color: "#5b84fa" }}
                  />
                </Box>

                <Box sx={{ textAlign: "center" }}>
                  <Typography variant="h3">
                    Открийте Създатели
                  </Typography>

                  <Typography
                    variant="body1"
                    sx={{
                      color: "#666",
                      mb: 3,
                    }}
                  >
                    Споделете таланта си, свържете се сега.
                  </Typography>
                </Box>

                <Box sx={{ flexGrow: 1 }} />

                <Button
                  variant="outlined"
                  size="large"
                  fullWidth
                  sx={{
                    borderRadius: 2,
                    py: 1.5,
                    fontWeight: 600,
                    textTransform: "none",
                  }}
                >
                  Към създатели
                </Button>
              </Box>
            </Card>
          </Stack>
        </Grid>


        <Grid
          size={{ xs: 12, md: 4 }}
          sx={{
            display: "flex",
            justifyContent: { xs: "center", md: "end" },
            height: "100%",
            width: "100%",
            margin: "auto",
          }}
        >
          <Box
            component="video"
            src="https://dynamic.heygen.ai/www/Home%20-%20Page%20-%20Rebrand/HEYGEN_Orb_home_ios.mp4?updatedAt=1761596026165"
            autoPlay
            loop
            muted
            sx={{
              width: "70%",
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default JoinCommunity;
