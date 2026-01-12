import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import { Link } from "react-router";
import {
  IconBasketCode,
  IconAd2,
  IconLanguage,
  IconVideoMinus,
  IconDeviceSpeaker,
  IconBrandStackshare,
  IconArrowNarrowRight,
} from "@tabler/icons-react";

const _popularCategories = [
  {
    id: 1,
    name: "Design & Creative",
    icon: <IconBasketCode size={40} stroke={1} />,
  },
  {
    id: 2,
    name: "Digital Marketing",
    icon: <IconAd2 size={40} stroke={1} />,
  },
  {
    id: 3,
    name: "Translation",
    icon: <IconLanguage size={40} stroke={1} />,
  },
  {
    id: 4,
    name: "Video & Animation",
    icon: <IconVideoMinus size={40} stroke={1} />,
  },
  {
    id: 5,
    name: "Music & Audio",
    icon: <IconDeviceSpeaker size={40} stroke={1} />,
  },
  {
    id: 6,
    name: "Programming",
    icon: <IconBrandStackshare size={40} stroke={1} />,
  },
  {
    id: 7,
    name: "Business",
    icon: <IconBasketCode size={40} stroke={1} />,
  },
  {
    id: 8,
    name: "Lifestyle",
    icon: <IconAd2 size={40} stroke={1} />,
  },
  {
    id: 9,
    name: "Data Science",
    icon: <IconLanguage size={40} stroke={1} />,
  },
];

export const PopularCategories = () => {
  return (
    <Box component="section" sx={{ pt: 8 }}>
      <Container maxWidth="xl">
        <Stack direction="column" spacing={2}>
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography
              variant="h1"
              sx={{
                fontWeight: 500,
                mb: 1,
              }}
            >
              Popular
              <Box component="span" sx={{ ml: 1, color: "#5b84fa" }}>
                Categories
              </Box>
            </Typography>
            <Stack
              direction="row"
              justifyContent={"space-evenly"}
              alignItems="center"
              component={Link}
              to="#"
              sx={{
                fontSize: 20,
                textDecoration: "none",
                color: "#000",
                "&:hover": {
                  color: "#5b84fa",
                },
              }}
            >
              Explore All
              <IconArrowNarrowRight size={40} stroke={1} />
            </Stack>
          </Stack>

          <Grid container spacing={2} sx={{ justifyContent: "center" }}>
            {_popularCategories.map((category, index) => (
              <Grid size={{ xs: 12, md: 1.3 }} key={index}>
                <Stack
                  direction="column"
                  spacing={2}
                  sx={{
                    position: "relative",
                    height: "100%",
                    textAlign: "center",
                    p: 1,
                    cursor: "pointer",
                    borderBottom: "2px solid #fff",
                    "&:hover": {
                      backgroundColor: "#e9f4fe",
                      borderBottom: "2px solid #5b84fa",
                    },
                    "& .icon-scale": {
                      transition: "transform 0.25s cubic-bezier(.4,2,.6,1.0)",
                    },
                    "&:hover .icon-scale": {
                      transform: "scale(1.1)",
                    },
                  }}
                >
                  <Stack direction="row" justifyContent="center">
                    <span className="icon-scale">{category.icon}</span>
                  </Stack>
                  <Typography variant="h5" sx={{ pb: 1 }}>
                    {category.name}
                  </Typography>
                </Stack>
              </Grid>
            ))}
          </Grid>
        </Stack>
      </Container>
    </Box>
  );
};

export default PopularCategories;
