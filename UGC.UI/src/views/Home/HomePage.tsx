import Landing from "./Landing";
import JoinCommunity from "./JoinCommunity";
import PopularServices from "./PopularServices";
import PopularCategories from "./PopularCategories";
import PeopleSection from "./PeopleSection";
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
    </>
  );
};

export default HomePage;
