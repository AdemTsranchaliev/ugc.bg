import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import {
  IconBasketCode,
  IconAd2,
  IconLanguage,
  IconVideoMinus,
  IconDeviceSpeaker,
  IconBrandStackshare,
} from "@tabler/icons-react";
import { motion } from "framer-motion";

// project imports
import useConfig from "../../themes/context/useConfig";

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
    name: "Writing & Translation",
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
    name: "Programming & Tech",
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
    name: "Data Science & Analytics",
    icon: <IconLanguage size={40} stroke={1} />,
  },
];

export const PopularCategories = () => {
  const {
    state: { borderRadius },
  } = useConfig();

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
              variant="h4"
              component="h2"
              sx={{
                fontSize: "40px",
                fontWeight: 500,
                mb: 1,
              }}
            >
              Popular Categories
            </Typography>
            <Button variant="text" sx={{ ml: "auto" }}>
              Explore All Categories
            </Button>
          </Stack>

          <Grid container spacing={2} sx={{ justifyContent: "space-between" }}>
            {_popularCategories.map((category, index) => (
              <Grid size={{ xs: 12, md: 1.3 }} key={index}>
                <Stack
                  component={motion.div}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.25 }}
                  direction="column"
                  spacing={2}
                  sx={{
                    position: "relative",
                    height: "100%",
                    p: 1,
                    borderRadius: `${borderRadius}px`,
                    boxShadow: 8,
                    cursor: "pointer",
                    overflow: "hidden",
                  }}
                >
                  {category.icon}
                  <Typography variant="h4" sx={{ pb: 1 }}>
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
