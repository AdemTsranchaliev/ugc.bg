import Landing from "./Landing";
import JoinCommunity from "./JoinCommunity";
import PopularServices from "./PopularServices";
import PopularCategories from "./PopularCategories";
import PeopleSection from "./PeopleSection";
import HowWorksSection from "./HowWorksSection";
import CreatorsServices from "./CreatorsServices";
import TalentCard1 from "./TalentCard1";
import TalentCard2 from "./TalentCard2";

export const HomePage = () => {
  return (
    <>
      <Landing />
      <PopularCategories />
      <TalentCard1 />
      <TalentCard2 />
      <PopularServices />
      <CreatorsServices />
      <HowWorksSection />
      <PeopleSection />
      <JoinCommunity />
    </>
  );
};

export default HomePage;
