import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Destinations from "./pages/Destinations";
import Venues from "./pages/Venues";
import Services from "./pages/Services";
import Portfolio from "./pages/Portfolio";
import About from "./pages/About";
import Contact from "./pages/Contact";
import PlanYourCelebration from "./pages/PlanYourCelebration";
import Journal from "./pages/Journal";
import { useSmoothScroll } from "./hooks/useSmoothScroll";
import LuxuryCursorEffect from "./components/ui/LuxuryCursorEffect";

function App() {
  useSmoothScroll();
  return (
    <>
      <LuxuryCursorEffect />
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="destinations" element={<Destinations />} />
        <Route path="venues" element={<Venues />} />
        <Route path="services" element={<Services />} />
        <Route path="portfolio" element={<Portfolio />} />
        <Route path="plan-your-celebration" element={<PlanYourCelebration />} />
        <Route path="journal" element={<Journal />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
      </Route>
    </Routes>
    </>
  );
}

export default App;
