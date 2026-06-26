import HeroSection from "../components/home/HeroSection";
import DestinationsSection from "../components/home/DestinationsSection";
import PopularDestinations from "../components/home/PopularDestinations";
import ServicesSection from "../components/home/ServicesSection";
import StatsSection from "../components/home/StatsSection";
import FeaturedCelebrations from "../components/home/FeaturedCelebrations";

const Home = () => {
  return (
    <>
      <HeroSection />
      <DestinationsSection />
      {/* <PopularDestinations /> */}
      <ServicesSection />
      <FeaturedCelebrations />
      <StatsSection />
    </>
  );
};

export default Home;
