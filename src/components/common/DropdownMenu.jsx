import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ChevronRight,
  MapPin,
  Sparkles,
  Crown,
  Umbrella,
  Trees,
  Mountain,
  Building2,
  Palmtree,
  Compass,
  Globe,
  ArrowRight,
} from "lucide-react";

const DropdownMenu = ({ isOpen, onClose }) => {
  const destinations = [
    {
      name: "Rajasthan",
      path: "/destinations/rajasthan",
      icon: Crown,
      description: "Royal Palaces & Heritage",
      popular: true,
      color: "from-amber-500/10 to-amber-500/5",
      iconColor: "text-amber-500",
      bgColor: "bg-amber-50",
    },
    {
      name: "Goa",
      path: "/destinations/goa",
      icon: Umbrella,
      description: "Beaches & Luxury Resorts",
      popular: true,
      color: "from-blue-500/10 to-blue-500/5",
      iconColor: "text-blue-500",
      bgColor: "bg-blue-50",
    },
    {
      name: "Kerala",
      path: "/destinations/kerala",
      icon: Trees,
      description: "Backwaters & Traditions",
      popular: false,
      color: "from-green-500/10 to-green-500/5",
      iconColor: "text-green-500",
      bgColor: "bg-green-50",
    },
    {
      name: "Kashmir",
      path: "/destinations/kashmir",
      icon: Mountain,
      description: "Mountains & Serenity",
      popular: false,
      color: "from-blue-400/10 to-blue-400/5",
      iconColor: "text-blue-400",
      bgColor: "bg-blue-50",
    },
    {
      name: "Uttarakhand",
      path: "/destinations/uttarakhand",
      icon: Mountain,
      description: "Hills & Spirituality",
      popular: false,
      color: "from-emerald-500/10 to-emerald-500/5",
      iconColor: "text-emerald-500",
      bgColor: "bg-emerald-50",
    },
    {
      name: "Himachal Pradesh",
      path: "/destinations/himachal-pradesh",
      icon: Trees,
      description: "Scenic Beauty & Luxury",
      popular: false,
      color: "from-teal-500/10 to-teal-500/5",
      iconColor: "text-teal-500",
      bgColor: "bg-teal-50",
    },
    {
      name: "UAE",
      path: "/destinations/uae",
      icon: Building2,
      description: "Luxury & Modern",
      popular: false,
      color: "from-yellow-500/10 to-yellow-500/5",
      iconColor: "text-yellow-500",
      bgColor: "bg-yellow-50",
    },
    {
      name: "Bali",
      path: "/destinations/bali",
      icon: Palmtree,
      description: "Tropical Paradise",
      popular: false,
      color: "from-pink-500/10 to-pink-500/5",
      iconColor: "text-pink-500",
      bgColor: "bg-pink-50",
    },
  ];

  const popularDestinations = destinations.filter((d) => d.popular);
  const otherDestinations = destinations.filter((d) => !d.popular);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="absolute top-full left-0 mt-2 w-[680px] bg-white rounded-2xl shadow-2xl border border-gray-100/50 overflow-hidden z-50"
          onMouseLeave={onClose}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-pink-50 via-rose-50 to-pink-50 px-6 py-5 border-b border-pink-200/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl flex items-center justify-center shadow-lg shadow-pink-500/20">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <span className="font-semibold text-dark-900 text-lg">
                    Popular Destinations
                  </span>
                  <p className="text-xs text-gray-500">
                    Handpicked for your special day
                  </p>
                </div>
              </div>
              <Link
                to="/destinations"
                className="text-sm text-pink-500 hover:text-pink-600 font-medium flex items-center gap-1 group px-4 py-2 rounded-full hover:bg-pink-50 transition-all duration-300"
                onClick={onClose}
              >
                View All
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Content */}
          <div className="p-5">
            {/* Popular Destinations */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              {popularDestinations.map((dest, index) => {
                const IconComponent = dest.icon;
                return (
                  <motion.div
                    key={dest.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <Link
                      to={dest.path}
                      className="group flex items-center gap-4 p-3 rounded-xl hover:shadow-md transition-all duration-300 border border-transparent hover:border-pink-200/50 bg-white hover:bg-pink-50/30"
                      onClick={onClose}
                    >
                      <div
                        className={`w-12 h-12 rounded-xl ${dest.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm`}
                      >
                        <IconComponent
                          className={`w-6 h-6 ${dest.iconColor}`}
                          strokeWidth={1.5}
                        />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-dark-800 group-hover:text-pink-500 transition-colors">
                          {dest.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          {dest.description}
                        </div>
                      </div>
                      <motion.div
                        className="text-pink-400 opacity-0 group-hover:opacity-100 transition-opacity"
                        initial={{ x: -5 }}
                        whileHover={{ x: 0 }}
                      >
                        <ChevronRight className="w-4 h-4" />
                      </motion.div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            {/* Divider */}
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-4 bg-white text-xs font-medium text-gray-400 flex items-center gap-2">
                  <Compass className="w-3 h-3" />
                  Explore More Destinations
                </span>
              </div>
            </div>

            {/* Other Destinations */}
            <div className="grid grid-cols-4 gap-3">
              {otherDestinations.map((dest, index) => {
                const IconComponent = dest.icon;
                return (
                  <motion.div
                    key={dest.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 + index * 0.03 }}
                  >
                    <Link
                      to={dest.path}
                      className="group flex flex-col items-center p-4 rounded-xl hover:bg-gray-50 transition-all duration-300 hover:scale-105 hover:shadow-md border border-transparent hover:border-gray-200"
                      onClick={onClose}
                    >
                      <div
                        className={`w-12 h-12 rounded-xl ${dest.bgColor} flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300`}
                      >
                        <IconComponent
                          className={`w-6 h-6 ${dest.iconColor}`}
                          strokeWidth={1.5}
                        />
                      </div>
                      <div className="text-xs font-semibold text-dark-700 group-hover:text-pink-500 transition-colors text-center">
                        {dest.name}
                      </div>
                      <div className="text-[10px] text-gray-400 text-center line-clamp-1">
                        {dest.description}
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            {/* Bottom CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-5 p-4 bg-gradient-to-r from-pink-50/80 via-rose-50/80 to-pink-50/80 rounded-xl border border-pink-200/30"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center shadow-lg shadow-pink-500/20 animate-pulse">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-dark-700">
                      Need help choosing?
                    </span>
                    <p className="text-xs text-gray-500">
                      Our experts are here to help you plan the perfect
                      celebration.
                    </p>
                  </div>
                </div>
                <Link
                  to="/plan-your-celebration"
                  className="group px-5 py-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-sm font-semibold rounded-full hover:shadow-lg hover:shadow-pink-500/30 transition-all duration-300 flex items-center gap-2"
                  onClick={onClose}
                >
                  Get Started
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DropdownMenu;
