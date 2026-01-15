import Landing from "./Landing";
import JoinCommunity from "./JoinCommunity";
import PopularServices from "./PopularServices";
import PopularCategories from "./PopularCategories";
import PeopleSection from "./PeopleSection";
import HowWorksSection from "./HowWorksSection";
import CreatorsServices from "./CreatorsServices";

export const HomePage = () => {
  return (
    <>
      <Landing />
      <PopularCategories />
      <PopularServices />
      <CreatorsServices />
      <HowWorksSection />
      <PeopleSection />
      <JoinCommunity />
    </>
  );
};

export default HomePage;
