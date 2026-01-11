import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import { motion } from "framer-motion";

// project imports
import useConfig from "../../themes/context/useConfig";

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
              Popular Services
            </Typography>
            <Button variant="contained" sx={{ ml: "auto" }}>
              Explore All Services
            </Button>
          </Stack>

          <Grid container spacing={2}>
            {_popularServices.map((service, index) => (
              <Grid size={{ xs: 12, md: 2 }} key={index}>
                <Stack
                  direction="column"
                  spacing={2}
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
                  <Typography variant="h4" sx={{ color: "#fff", pb: 1 }}>
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
                      willChange: "transform",
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
