import Landing from "./Landing";
import JoinCommunity from "./JoinCommunity";
import PopularServices from "./PopularServices";
import PopularCategories from "./PopularCategories";
import PeopleSection from "./PeopleSection";
import UnderConstruction from "./UnderConstruction";
import HowWorksSection from "./HowWorksSection";

export const HomePage = () => {
  return (
    <>
      <Landing />
      <PopularCategories />
      <PopularServices />
      <HowWorksSection />
      <PeopleSection />
      <JoinCommunity />
      <UnderConstruction />
    </>
  );
};

export default HomePage;
