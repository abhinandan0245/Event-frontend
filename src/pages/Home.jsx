import HeroSection from "../components/home/HeroSection";
import DestinationsSection from "../components/home/DestinationsSection";
import ServicesSection from "../components/home/ServicesSection";
import StatsSection from "../components/home/StatsSection";
import FeaturedCelebrations from "../components/home/FeaturedCelebrations";
import WelcomeSection from "../components/home/WelcomeSection";
import ProcessSection from "../components/home/ProcessSection";
import ExtraordinarySection from "../components/home/ExtraordinarySection";
import SignatureExperiences from "../components/home/SignatureExperiences";
import VenueCollection from "../components/home/VenueCollection";
import PortfolioGallery from "../components/home/PortfolioGallery";
import TrustedClients from "../components/home/TrustedClients";
import TestimonialSection from "../components/home/TestimonialSection";
import BlogSection from "../components/home/BlogSection";
import FAQSection from "../components/home/FAQSection";

/**
 * Home Component
 * Houses the foundational structural timeline of the Violin Events landing layout.
 * Runs on the warm alabaster paper canvas theme with continuous scroll triggers.
 */
const Home = () => {
  return (
    <div className="home-page-container w-full overflow-hidden">
      <HeroSection />
      <WelcomeSection />
      <DestinationsSection />
      <SignatureExperiences />
      <ProcessSection />
      <VenueCollection />
      <PortfolioGallery />
      <TrustedClients />
      <TestimonialSection />
      <BlogSection />
      <FAQSection />
      <ExtraordinarySection />
    </div>
  );
};

export default Home;
