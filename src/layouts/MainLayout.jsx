import { Outlet } from "react-router-dom";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import ScrollToTop from "../components/common/ScrollToTop";
import WhatsAppButton from "../components/ui/WhatsAppButton";

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />

      {/* 2. Component ko yahan render karein */}
      {/* Ye layout ke andar fixed rahega, isliye page change hone par bhi ye gayab nahi hoga */}
      <WhatsAppButton />
    </div>
  );
};

export default MainLayout;
