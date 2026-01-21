import { Box, CardMedia, Stack, Typography, useTheme, useMediaQuery } from "@mui/material";
import { Star } from "@mui/icons-material";
import { IconArrowUpRight } from "@tabler/icons-react";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import useConfig from "../../themes/context/useConfig";
import SquareDotted from "/assets/images/landing/dotted-square-grid.svg";
import { DecorativeImage } from "../../ui-component/DecorativeImage";
import SectionTitle from "../../ui-component/SectionTitle";

// Sample data for random services
const creatorsServices = [
  {
    id: 1,
    name: "Blake Star",
    title: "COO, blackstar.com",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop",
    bgColor: "#FF6B35",
  },
  {
    id: 2,
    name: "David Gilmore",
    title: "CTO, darkside.ai",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop",
    bgColor: "#FFD23F",
  },
  {
    id: 3,
    name: "Gerard White",
    title: "COO, exo4emo.ai",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop",
    bgColor: "#E8D5B7",
  },
  {
    id: 4,
    name: "Azuny",
    title: "COO, fi",
    rating: 3,
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=500&fit=crop",
    bgColor: "#F5F5F5",
  },
  {
    id: 5,
    name: "Sarah Johnson",
    title: "CEO, techstart.io",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=500&fit=crop",
    bgColor: "#A8E6CF",
  },
  {
    id: 6,
    name: "Michael Chen",
    title: "CTO, innovatelabs.com",
    rating: 4,
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=500&fit=crop",
    bgColor: "#FFB6C1",
  },
];

export const CreatorsServices = () => {
  const theme = useTheme();
  const downSM = useMediaQuery(theme.breakpoints.down("sm"));
  const {
    state: { borderRadius },
  } = useConfig();

  const settings = {
    dots: false,
    infinite: true,
    speed: 2000,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Box sx={{ pt: 8, pb: 4, position: "relative" }}>
      <DecorativeImage
        image={SquareDotted}
        top="15%"
        left={downSM ? "0%" : "70%"}
        width="200px"
        height="50px"
        zIndex={-1}
        opacity="0.3"
        alt="Layer"
      />
      <Stack direction="column" spacing={4}>
        <SectionTitle
          title="Създатели с най-висок"
          highlightedTitle="Рейтинг"
        />

        <Box sx={{ width: "100%" }}>
          <Slider {...settings}>
            {creatorsServices.map((service) => (
              <Box key={service.id} sx={{ px: 1.5 }}>
                <Box
                  sx={{
                    position: "relative",
                    borderRadius: borderRadius,
                    overflow: "hidden",
                    boxShadow: 3,
                    "&:hover": {
                      boxShadow: 6,
                    },
                  }}
                >
                  {/* Top-right arrow icon */}
                  <Box
                    sx={{
                      position: "absolute",
                      top: 12,
                      right: 12,
                      zIndex: 2,
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      backgroundColor: "rgba(255, 255, 255, 0.4)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: 2,
                    }}
                  >
                    <IconArrowUpRight
                      size={18}
                      style={{ color: "#424242", cursor: "pointer" }}
                    />
                  </Box>

                  {/* Portrait Image Section */}
                  <Box
                    sx={{
                      width: "100%",
                      height: 400,
                      backgroundColor: service.bgColor,
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={service.image}
                      alt={service.name}
                      sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </Box>

                  {/* Bottom Info Overlay */}
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      width: "100%",
                      p: 2.5,
                      background: "rgba(32, 32, 32, 0.4)",
                      backdropFilter: "blur(4px)",
                      borderTop: "2px solid rgba(255, 255, 255, 0.1)",
                    }}
                  >
                    {/* Star Rating */}
                    <Stack direction="row" spacing={0.5} sx={{ mb: 1.5 }}>
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Star
                          key={index}
                          sx={{
                            fontSize: 18,
                            color:
                              index < service.rating
                                ? "#FFD700"
                                : "rgba(255, 255, 255, 0.3)",
                          }}
                        />
                      ))}
                    </Stack>

                    {/* Name */}
                    <Typography
                      variant="h5"
                      sx={{
                        color: "#fff",
                        fontWeight: 600,
                        mb: 0.5,
                        fontSize: "1.1rem",
                      }}
                    >
                      {service.name}
                    </Typography>

                    {/* Title/Company */}
                    <Typography
                      variant="body2"
                      sx={{
                        color: "rgba(255, 255, 255, 0.9)",
                        fontSize: "0.875rem",
                      }}
                    >
                      {service.title}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            ))}
          </Slider>
        </Box>
      </Stack>
    </Box>
  );
};

export default CreatorsServices;
