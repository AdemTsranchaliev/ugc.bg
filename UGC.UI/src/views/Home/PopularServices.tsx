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
import type { ComponentType } from "react";

// project imports
import SquareDotted from "/assets/images/landing/dotted-square-grid.svg";

type TalentCardProps = {
  name: string;
  title: string;
  rate: string;
  ratingValue: number;
  ratingCountText: string;
  experienceText: string;
  finishedProjectsText: string;
  description: string;
  imageUrl: string;
  avatarUrl: string;
  onFavoriteClick?: () => void;
};

type PopularServicesProps = {
  TalentCard: ComponentType<TalentCardProps>;
  _popularServices: any[];
};

export const PopularServices = ({
  TalentCard,
  _popularServices
}: PopularServicesProps) => {
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
            direction={{ xs: "column", md: "row" }}
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
            {_popularServices.length > 0 && _popularServices.map((service: any, index: number) => (
              <Grid size={{ xs: 12, md: 3 }} key={index}>
                <TalentCard
                  name={service.sellerName}
                  title={service.serviceType}
                  rate={service.price.toString()}
                  ratingValue={service.rating}
                  ratingCountText={service.reviewCount.toString()}
                  experienceText={service.finishedProjects.toString()}
                  finishedProjectsText={service.finishedProjects.toString()}
                  description={service.sellerDescription}
                  imageUrl={service.personImages[0]}
                  avatarUrl={service.personImages[0]}
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
