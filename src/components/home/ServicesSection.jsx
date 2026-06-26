import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Calendar,
  Palette,
  Users,
  Music,
  Truck,
  Sparkles,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import SectionTitle from "../ui/SectionTitle";
import Button from "../ui/Button";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: 1,
    icon: Calendar,
    title: "PLANNING & MANAGEMENT",
    description:
      "End-to-end wedding planning with meticulous attention to every detail",
    color: "from-pink-500/10",
    iconColor: "text-pink-500",
  },
  {
    id: 2,
    icon: Palette,
    title: "DESIGN & DECOR",
    description:
      "Stunning decor that transforms venues into dream wedding settings",
    color: "from-rose-500/10",
    iconColor: "text-rose-500",
  },
  {
    id: 3,
    icon: Users,
    title: "HOSPITALITY & GUEST EXPERIENCE",
    description:
      "Impeccable hospitality ensuring your guests feel truly special",
    color: "from-purple-500/10",
    iconColor: "text-purple-500",
  },
  {
    id: 4,
    icon: Music,
    title: "ENTERTAINMENT & PRODUCTION",
    description:
      "Curated entertainment and production that captivates your audience",
    color: "from-blue-500/10",
    iconColor: "text-blue-500",
  },
  {
    id: 5,
    icon: Truck,
    title: "LOGISTICS & TRANSPORT",
    description:
      "Seamless logistics and transport management for stress-free celebrations",
    color: "from-green-500/10",
    iconColor: "text-green-500",
  },
  {
    id: 6,
    icon: Sparkles,
    title: "BEYOND SERVICES & CONCERNS",
    description:
      "Going above and beyond to address every concern and expectation",
    color: "from-orange-500/10",
    iconColor: "text-orange-500",
  },
];

const ServicesSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const cards = document.querySelectorAll(".service-card");
    cards.forEach((card) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 bg-white relative overflow-hidden"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-pink-200 to-transparent" />

      <div className="container-custom relative z-10">
        <SectionTitle
          subtitle="END-TO-END WEDDING SOLUTIONS"
          title="Comprehensive Services For Your Perfect Day"
          description="From planning to execution, we offer everything you need for a flawless celebration"
          subtitleColor="text-pink-500"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {services.map((service) => (
            <motion.div
              key={service.id}
              className="service-card group relative bg-gradient-to-br from-pink-50 to-rose-50 p-8 rounded-2xl border-2 border-pink-100/50 hover:border-pink-300 transition-all duration-500 cursor-pointer hover:shadow-xl"
              whileHover={{ y: -8 }}
            >
              <div className="absolute inset-0 rounded-2xl bg-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <motion.div
                whileHover={{ rotate: 15, scale: 1.15 }}
                className="relative z-10 w-16 h-16 rounded-2xl bg-white shadow-lg flex items-center justify-center mb-4 group-hover:shadow-pink-500/20 transition-shadow duration-300"
              >
                <service.icon
                  className={`w-8 h-8 ${service.iconColor} group-hover:scale-110 transition-transform duration-300`}
                />
              </motion.div>

              <div className="relative z-10">
                <h3 className="text-base font-bold text-dark-800 mb-2 group-hover:text-pink-500 transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-dark-600 text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>

              <div className="relative z-10 mt-4 flex items-center text-pink-500 font-semibold text-sm group/link">
                <span className="mr-2">Learn More</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
              </div>

              <div className="absolute top-4 right-6 text-5xl font-bold text-pink-100/50 group-hover:text-pink-100/30 transition-colors duration-500">
                {String(service.id).padStart(2, "0")}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
