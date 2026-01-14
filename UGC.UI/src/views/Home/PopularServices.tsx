import { Link } from "react-router";
import { motion } from "framer-motion";
import {
  Box,
  CardMedia,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { IconArrowNarrowRight } from "@tabler/icons-react";

// project imports
import useConfig from "../../themes/context/useConfig";
import SquareDotted from "/assets/images/landing/dotted-square-grid.svg";

const _popularServices = [
  {
    id: 1,
    name: "Web Design",
    description: "Professional web design services",
    imgUrl:
      "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_188,dpr_2.0/v1/attachments/generic_asset/asset/798403f5b92b1b5af997acc704a3d21c-1702465156494/video-editing.png",
  },
  {
    id: 2,
    name: "Content Writing",
    description: "Engaging content creation",
    imgUrl:
      "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_188,dpr_2.0/v1/attachments/generic_asset/asset/6dab2e43183c2c233eb78f62f9975d7e-1762279009299/book_publishing.png",
  },
  {
    id: 3,
    name: "Video Editing",
    description: "High-quality video editing",
    imgUrl:
      "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_188,dpr_2.0/v1/attachments/generic_asset/asset/798403f5b92b1b5af997acc704a3d21c-1702465156476/software-development.png",
  },
  {
    id: 4,
    name: "Web Design",
    description: "Professional web design services",
    imgUrl:
      "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_188,dpr_2.0/v1/attachments/generic_asset/asset/798403f5b92b1b5af997acc704a3d21c-1702465156494/video-editing.png",
  },
  {
    id: 5,
    name: "Content Writing",
    description: "Engaging content creation",
    imgUrl:
      "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_188,dpr_2.0/v1/attachments/generic_asset/asset/6dab2e43183c2c233eb78f62f9975d7e-1762279009299/book_publishing.png",
  },
  {
    id: 6,
    name: "Video Editing",
    description: "High-quality video editing",
    imgUrl:
      "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_188,dpr_2.0/v1/attachments/generic_asset/asset/798403f5b92b1b5af997acc704a3d21c-1702465156476/software-development.png",
  },
];

export const PopularServices = () => {
  const {
    state: { borderRadius },
  } = useConfig();

  return (
    <Box component="section" sx={{ pt: 8, position: "relative" }}>
      <Box
        sx={{
          position: "absolute",
          top: "20%",
          left: "42%",
          width: "160px",
          height: "50px",
          zIndex: -1,
          opacity: "0.3",
        }}
      >
        <CardMedia component="img" image={SquareDotted} alt="Layer" />
      </Box>
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
              Популярни
              <Box component="span" sx={{ ml: 1, color: "#5b84fa" }}>
                Обяви
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
              Виж още
              <IconArrowNarrowRight size={40} stroke={1} />
            </Stack>
          </Stack>

          <Grid container spacing={2}>
            {_popularServices.map((service, index) => (
              <Grid size={{ xs: 12, md: 2 }} key={index}>
                <Stack
                  direction="column"
                  spacing={1}
                  component={motion.div}
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  sx={{
                    p: 1,
                    borderRadius: `${borderRadius}px`,
                    backgroundColor: "#5c7d66",
                    boxShadow: 8,
                    "&:hover": {
                      cursor: "pointer",
                    },
                  }}
                >
                  <Typography variant="h4" sx={{ color: "#fff" }}>
                    {service.name}
                  </Typography>
                  <Box
                    component={motion.img}
                    src={service.imgUrl}
                    alt="Service Image"
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    sx={{
                      borderRadius: `${borderRadius}px`,
                      width: "100%",
                    }}
                  />
                </Stack>
              </Grid>
            ))}
          </Grid>
        </Stack>
      </Container>
    </Box>
  );
};

export default PopularServices;
