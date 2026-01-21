// material-ui
import { Masonry } from "@mui/lab";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { useMediaQuery, useTheme } from "@mui/material";

// project imports
import { cards } from "./CardData";
import PeopleCard from "./PeopleCard";
import SquareDotted from "/assets/images/landing/dotted-square-grid.svg";
import DecorativeImage from "../../ui-component/DecorativeImage";
import SectionTitle from "../../ui-component/SectionTitle";

// =============================|| LANDING - FEATURE PAGE ||============================= //

export const PeopleSection = () => {
  const theme = useTheme();
  const downSM = useMediaQuery(theme.breakpoints.down("sm"));
  let cardResult = <></>;

  if (cards && cards.length > 0) {
    cardResult = cards.map((card, index) => (
      <Grid key={index}>
        <PeopleCard
          id={card.id}
          image={card.image ? card.image : ""}
          name={card.name}
          tag={card.tag}
          content={card.content}
          view={card.view}
        />
      </Grid>
    ));
  }

  return (
    <Box sx={{ pt: 8, position: "relative" }}>
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
      <Grid container spacing={7.5} sx={{ justifyContent: "center" }}>
        <Grid sx={{ textAlign: "center" }} size={12}>
          <SectionTitle
            title="Kакво казват"
            highlightedTitle="Нашите Kлиенти"
          />
        </Grid>

        <Grid size={12}>
          <Stack sx={{ alignItems: "center", gap: 2 }}>
            <Masonry columns={{ xs: 1, sm: 2, md: 3, xl: 4 }} spacing={2}>
              {cardResult}
            </Masonry>
          </Stack>
        </Grid>
      </Grid>
    </Box >
  );
};

export default PeopleSection;
