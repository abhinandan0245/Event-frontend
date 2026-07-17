import HeroSection from "../components/home/HeroSection";
import DestinationsSection from "../components/home/DestinationsSection";
import ServicesSection from "../components/home/ServicesSection";
import StatsSection from "../components/home/StatsSection";
import FeaturedCelebrations from "../components/home/FeaturedCelebrations";
import WelcomeSection from "../components/home/WelcomeSection";
import ProcessSection from "../components/home/ProcessSection";
import ExtraordinarySection from "../components/home/ExtraordinarySection";

/**
 * Home Component
 * Houses the foundational structural timeline of the Violin Events landing layout.
 * Runs on the warm alabaster paper canvas theme with continuous scroll triggers.
 */
const Home = () => {
  return (
    <>
      {/* 1. Introductory Cinematic Screen Hook with Custom Trailing Ribbon */}
      <HeroSection />

      {/* 2. Editorial Philosophy Statement Block */}
      <WelcomeSection />

      {/* 3. Global Asymmetric Grid Flanked by Real 3D Rotational Earth */}
      <DestinationsSection />

      {/* 4. Fine-Art Workflow Stepper Timelines */}
      <ProcessSection />

      {/* 5. Interactive Service Category Presentation Decks */}
      <ServicesSection />

      {/* 6. Asymmetric Mosaic Portfolio Puzzle Layout with Generative WebGL Sparks */}
      <FeaturedCelebrations />

      {/* 7. High-End Numerical Metrics Analytics Block */}
      <StatsSection />

      {/* 8. Final Call-to-Action Closing Layout Container */}
      <ExtraordinarySection />
    </>
  );
};

export default Home;
