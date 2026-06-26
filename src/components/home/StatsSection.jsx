import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Award,
  Globe,
  MapPin,
  Users,
  Sparkles,
  Heart,
  Star,
  Calendar,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const statsData = [
  {
    number: 10,
    label: "Years of Experience",
    suffix: "+",
    icon: Award,
    color: "from-pink-400 to-rose-400",
    bgColor: "bg-pink-50",
    iconColor: "text-pink-500",
  },
  {
    number: 500,
    label: "Celebrations Worldwide",
    suffix: "+",
    icon: Globe,
    color: "from-blue-400 to-blue-600",
    bgColor: "bg-blue-50",
    iconColor: "text-blue-500",
  },
  {
    number: 20,
    label: "Iconic Destinations",
    suffix: "+",
    icon: MapPin,
    color: "from-purple-400 to-purple-600",
    bgColor: "bg-purple-50",
    iconColor: "text-purple-500",
  },
  {
    number: 100,
    label: "Client Satisfaction",
    suffix: "%",
    icon: Heart,
    color: "from-red-400 to-red-600",
    bgColor: "bg-red-50",
    iconColor: "text-red-500",
  },
];

const AnimatedCounter = ({ end, duration = 2000, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const counterRef = useRef(null);

  useEffect(() => {
    const el = counterRef.current;
    if (!el) return;

    let startTime;

    const animateCount = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const currentValue = progress * end;
      setCount(Math.floor(currentValue));

      if (progress < 1) {
        requestAnimationFrame(animateCount);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          requestAnimationFrame(animateCount);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [end, duration]);

  return (
    <span ref={counterRef}>
      {count}
      {suffix}
    </span>
  );
};

const StatsSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    gsap.to(sectionRef.current, {
      backgroundPosition: "50% 30%",
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 relative overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: 3 + Math.random() * 6,
              height: 3 + Math.random() * 6,
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
              background: `rgba(236, 72, 153, ${0.1 + Math.random() * 0.2})`,
              filter: "blur(3px)",
            }}
          />
        ))}
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-pink-500 font-semibold text-sm uppercase tracking-widest inline-flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            WHY CHOOSE US
            <Sparkles className="w-4 h-4" />
          </span>
          <h2 className="text-3xl md:text-5xl font-playfair font-bold text-dark-800 mt-2">
            Redefining Luxury Weddings
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-500 block">
              & Celebrations
            </span>
          </h2>
          <p className="text-dark-600 text-lg mt-4 max-w-2xl mx-auto">
            At Violin Events, we believe every celebration should be a
            masterpiece.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {statsData.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.05 }}
                className="group bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-pink-100/50 hover:border-pink-300 transition-all duration-500 shadow-lg hover:shadow-xl text-center"
              >
                {/* Icon Container */}
                <motion.div
                  whileHover={{ rotate: 15, scale: 1.1 }}
                  className={`w-16 h-16 mx-auto ${stat.bgColor} rounded-2xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:shadow-lg`}
                >
                  <IconComponent
                    className={`w-8 h-8 ${stat.iconColor} transition-all duration-300 group-hover:scale-110`}
                    strokeWidth={1.5}
                  />
                </motion.div>

                {/* Number */}
                <div className="text-3xl md:text-4xl font-bold text-dark-800 mb-1">
                  <AnimatedCounter end={stat.number} suffix={stat.suffix} />
                </div>

                {/* Label */}
                <div className="text-dark-600 text-sm font-medium">
                  {stat.label}
                </div>

                {/* Progress Bar */}
                <div className="mt-3 h-1 bg-pink-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${stat.color} rounded-full transition-all duration-1000`}
                    style={{ width: `${(stat.number / 550) * 100}%` }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
