// material-ui
import { Masonry } from "@mui/lab";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

// project imports
import { cards } from "./CardData";
import PeopleCard from "./PeopleCard";

// =============================|| LANDING - FEATURE PAGE ||============================= //

export const PeopleSection = () => {
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
    <Box component="section" sx={{ pt: 8 }}>
      <Container maxWidth="xl">
        <Grid container spacing={7.5} sx={{ justifyContent: "center" }}>
          <Grid sx={{ textAlign: "center" }} size={12}>
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
                Kакво казват
                <Box component="span" sx={{ ml: 1, color: "#5b84fa" }}>
                  Нашите Kлиенти
                </Box>
              </Typography>
            </Stack>
          </Grid>

          <Grid size={12}>
            <Stack sx={{ alignItems: "center", gap: 2 }}>
              <Masonry columns={{ xs: 1, sm: 2, md: 3, xl: 4 }} spacing={2}>
                {cardResult}
              </Masonry>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default PeopleSection;
