import {
  Box,
  Grid,
  Stack,
} from "@mui/material";
import type { ComponentType } from "react";

// project imports
import SquareDotted from "/assets/images/landing/dotted-square-grid.svg";
import { DecorativeImage } from "../../ui-component/DecorativeImage";
import SectionTitle from "../../ui-component/SectionTitle";

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
    <Box sx={{ pt: 8, position: "relative" }}>
      <DecorativeImage
        image={SquareDotted}
        top="20%"
        left="42%"
        width="160px"
        height="50px"
        zIndex={-1}
        opacity="0.3"
        alt="Layer"
      />
      <Stack direction="column" spacing={2}>
        <SectionTitle
          title="Популярни"
          highlightedTitle="Обяви"
          hasLink={true}
        />
        <Grid
          container
          spacing={2}
          justifyContent={{ xs: "center", md: "space-between" }}
        >
          {_popularServices.length > 0 && _popularServices.map((service: any, index: number) => (
            <Grid size={{ sm: 12, md: 3 }} key={index}>
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
    </Box>
  );
};

export default PopularServices;
