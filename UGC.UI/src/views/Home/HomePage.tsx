import Landing from "./Landing";
import JoinCommunity from "./JoinCommunity";
import PopularServices from "./PopularServices";
import PopularCategories from "./PopularCategories";
import PeopleSection from "./PeopleSection";
import HowWorksSection from "./HowWorksSection";
import CreatorsServices from "./CreatorsServices";

import TalentCard1 from "./TalentCard1";
import TalentCard2 from "./TalentCard2";
import { Stack } from "@mui/material";
import TalentCard3 from "./TalentCard3";

export const HomePage = () => {
  return (
    <>
      <Landing />
      <PopularCategories />

      <Stack direction="row" spacing={2} sx={{ mt: 8 }}>
        <TalentCard1 />
        <TalentCard2 />
        <TalentCard3 />
      </Stack>

      {/* <PopularServices /> */}
      <CreatorsServices />
      <HowWorksSection />
      <PeopleSection />
      <JoinCommunity />
    </>
  );
};

export default HomePage;
