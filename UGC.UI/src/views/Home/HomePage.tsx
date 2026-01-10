import Landing from "./Landing";
import JoinCommunity from "./JoinCommunity";
import PopularServices from "./PopularServices";
import PopularCategories from "./PopularCategories";
import UnderConstruction from "./UnderConstruction";

export const HomePage = () => {
  return (
    <>
      <Landing />
      <PopularCategories />
      <PopularServices />
      <JoinCommunity />
      <UnderConstruction />
    </>
  );
};

export default HomePage;
