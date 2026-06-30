import HeroSection from "../components/home/HeroSection";
import DestinationsSection from "../components/home/DestinationsSection";
import PopularDestinations from "../components/home/PopularDestinations";
import ServicesSection from "../components/home/ServicesSection";
import StatsSection from "../components/home/StatsSection";
import FeaturedCelebrations from "../components/home/FeaturedCelebrations";
import WelcomeSection from "../components/home/WelcomeSection";
import ProcessSection from "../components/home/ProcessSection";
import ExtraordinarySection from "../components/home/ExtraordinarySection";

const Home = () => {
  return (
    <>
      <HeroSection />
      <WelcomeSection />
      <DestinationsSection />
      <ProcessSection />
      <ServicesSection />
      <FeaturedCelebrations />
      <StatsSection />
      <ExtraordinarySection />
    </>
  );
};

export default Home;
