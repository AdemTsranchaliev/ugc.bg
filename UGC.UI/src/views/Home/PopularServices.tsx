import { Link } from "react-router";
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
import { ProductCard } from "../../ui-component/cards/ProductCard";

const _popularServices = [
  {
    id: 1,
    title: "Design & Redesign",
    serviceName: "WIX",
    serviceType: "Website",
    sellerName: "Abir",
    sellerLevel: "Level 2",
    sellerDescription:
      "I will do wix website design, wix website redesign or wix studio website...",
    rating: 4.9,
    reviewCount: 212,
    price: 77,
    bgColor: "#FFD700", // Yellow
    buttonText: "INBOX NOW",
    buttonColor: "#5b84fa", // Blue
    personImage:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop",
    heartColor: "#fff",
  },
  {
    id: 2,
    title: "Design/Redesign",
    serviceName: "WIX",
    serviceType: "WEBSITE",
    sellerName: "Rizvi Ahmed",
    sellerLevel: "Top Rated",
    sellerDescription:
      "I will be wix expert, wix developer for wix design, wix website or wix online...",
    rating: 4.9,
    reviewCount: 86,
    price: 82,
    bgColor: "#FF6B35", // Orange
    buttonText: "DM For Expert Guidance",
    buttonColor: "#6c757d", // Grey
    personImage:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop",
    heartColor: "#8B4513", // Brown
  },
  {
    id: 3,
    title: "Design & Development",
    serviceName: "REACT",
    serviceType: "Application",
    sellerName: "Sarah Johnson",
    sellerLevel: "Level 1",
    sellerDescription:
      "I will create modern react applications with best practices and clean code...",
    rating: 4.8,
    reviewCount: 145,
    price: 95,
    bgColor: "#4ECDC4", // Teal
    buttonText: "INBOX NOW",
    buttonColor: "#5b84fa",
    personImage:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop",
    heartColor: "#fff",
  },
  {
    id: 4,
    title: "Content Creation",
    serviceName: "BLOG",
    serviceType: "Writing",
    sellerName: "Michael Chen",
    sellerLevel: "Top Rated",
    sellerDescription:
      "I will write engaging blog posts and articles for your website or business...",
    rating: 4.7,
    reviewCount: 98,
    price: 65,
    bgColor: "#FFB6C1", // Pink
    buttonText: "DM For Expert Guidance",
    buttonColor: "#6c757d",
    personImage:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=500&fit=crop",
    heartColor: "#8B4513",
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
              <Grid size={{ xs: 12, md: 3 }} key={index}>
                <ProductCard
                  id={service.id}
                  name={service.title}
                  image={service.personImage}
                  description={service.sellerDescription}
                  offerPrice={service.price}
                  salePrice={service.price}
                  rating={service.rating}
                />
              </Grid>
            ))}
          </Grid>
        </Stack>
      </Container>
    </Box>
  );
};

export default PopularServices;
