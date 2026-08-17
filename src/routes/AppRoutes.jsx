import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

// MainLayout ko normal import karenge kyunki ye har page pe turant chahiye hota hai
import MainLayout from "../layouts/MainLayout";
import PremiumLoaderV3 from "../components/ui/PremiumLoaderV3";

// Pages ko lazy loading ke sath import karna
// Note: Apne folder structure ke hisaab se '../pages/...' wale paths ko adjust kar lijiye agar zarurat ho
const Home = lazy(() => import("../pages/Home"));
const Destinations = lazy(() => import("../pages/Destinations"));
const DestinationDetails = lazy(() => import("../pages/DestinationDetails"));
const Venues = lazy(() => import("../pages/Venues"));
const Services = lazy(() => import("../pages/Services"));
const Portfolio = lazy(() => import("../pages/Portfolio"));
const PlanYourCelebration = lazy(() => import("../pages/PlanYourCelebration"));
const Journal = lazy(() => import("../pages/Journal"));
const About = lazy(() => import("../pages/About"));
const Contact = lazy(() => import("../pages/Contact"));
        // Add these imports
const ArtistCategories = React.lazy(() => import("../pages/ArtistCategories"));
const ArtistsByCategory = React.lazy(() => import("../pages/ArtistsByCategory"));
const AllArtists = React.lazy(() => import("../pages/AllArtists"));
const ArtistDetail = React.lazy(() => import("../pages/ArtistDetail"));

const AppRoutes = () => {
  return (
    // Suspense routes ko wrap karta hai taaki loading state handle ho sake
    <Suspense fallback={<PremiumLoaderV3 />}>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="destinations" element={<Destinations />} />
          <Route path="/destination/:id" element={<DestinationDetails />} />
          <Route path="venues" element={<Venues />} />
          <Route path="services" element={<Services />} />
          <Route path="portfolio" element={<Portfolio />} />
          <Route
            path="plan-your-celebration"
            element={<PlanYourCelebration />}
          />
          <Route path="journal" element={<Journal />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="artist-categories" element={<ArtistCategories />} />
          <Route path="artists" element={<AllArtists />} />
          <Route
            path="artists/category/:categoryId"
            element={<ArtistsByCategory />}
          />
          <Route path="artists/:id" element={<ArtistDetail />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;

