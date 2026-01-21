import {
  Box,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import {
  IconBasketCode,
  IconAd2,
  IconLanguage,
  IconVideoMinus,
  IconDeviceSpeaker,
  IconBrandStackshare,
} from "@tabler/icons-react";

import SquareDotted from "/assets/images/landing/dotted-square-grid.svg";
import { DecorativeImage } from "../../ui-component/DecorativeImage";
import { SectionTitle } from "../../ui-component/SectionTitle";

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
    <Box sx={{ pt: 8, position: "relative" }}>
      <DecorativeImage
        image={SquareDotted}
        top="13%"
        left="19%"
        width="120px"
        height="50px"
        zIndex={-1}
        opacity="0.3"
        alt="Layer"
      />
      <Stack direction="column" spacing={2}>
        <SectionTitle
          title="Популярни"
          highlightedTitle="Категории"
          hasLink={true}
        />

        <Grid container spacing={2} sx={{ justifyContent: "center" }}>
          {_popularCategories.map((category, index) => (
            <Grid size={{ xs: 6, md: 1.3 }} key={index}>
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
    </Box>
  );
};

export default PopularCategories;
