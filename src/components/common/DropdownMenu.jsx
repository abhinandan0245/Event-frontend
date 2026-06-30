import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ChevronRight,
  Crown,
  Umbrella,
  Trees,
  Mountain,
  Building2,
  Palmtree,
  Globe,
  ArrowRight,
  Users,
} from "lucide-react";

// ---------------- DATA STRUCTURE ----------------
// country -> { icon, states: [ { name, path, description, icon, cities: [{name, path}] } ] }
const destinationData = {
  India: {
    icon: Globe,
    states: [
      {
        name: "Rajasthan",
        path: "/destinations/rajasthan",
        description: "Royal Palaces & Heritage",
        icon: Crown,
        cities: [
          { name: "Jaipur", path: "/destinations/rajasthan/jaipur" },
          { name: "Udaipur", path: "/destinations/rajasthan/udaipur" },
          { name: "Jodhpur", path: "/destinations/rajasthan/jodhpur" },
          { name: "Jaisalmer", path: "/destinations/rajasthan/jaisalmer" },
          { name: "Ranthambore", path: "/destinations/rajasthan/ranthambore" },
        ],
      },
      {
        name: "Goa",
        path: "/destinations/goa",
        description: "Beaches & Luxury Resorts",
        icon: Umbrella,
        cities: [
          { name: "North Goa", path: "/destinations/goa/north-goa" },
          { name: "South Goa", path: "/destinations/goa/south-goa" },
        ],
      },
      {
        name: "Kerala",
        path: "/destinations/kerala",
        description: "Backwaters & Traditions",
        icon: Trees,
        cities: [
          { name: "Kochi", path: "/destinations/kerala/kochi" },
          { name: "Alleppey", path: "/destinations/kerala/alleppey" },
          { name: "Munnar", path: "/destinations/kerala/munnar" },
        ],
      },
      {
        name: "Kashmir",
        path: "/destinations/kashmir",
        description: "Mountains & Serenity",
        icon: Mountain,
        cities: [
          { name: "Srinagar", path: "/destinations/kashmir/srinagar" },
          { name: "Gulmarg", path: "/destinations/kashmir/gulmarg" },
        ],
      },
      {
        name: "Uttarakhand",
        path: "/destinations/uttarakhand",
        description: "Hills & Spirituality",
        icon: Mountain,
        cities: [
          { name: "Rishikesh", path: "/destinations/uttarakhand/rishikesh" },
          { name: "Nainital", path: "/destinations/uttarakhand/nainital" },
        ],
      },
      {
        name: "Himachal Pradesh",
        path: "/destinations/himachal-pradesh",
        description: "Scenic Beauty & Luxury",
        icon: Trees,
        cities: [
          { name: "Shimla", path: "/destinations/himachal-pradesh/shimla" },
          { name: "Manali", path: "/destinations/himachal-pradesh/manali" },
        ],
      },
    ],
  },
  UAE: {
    icon: Building2,
    states: [
      {
        name: "Dubai",
        path: "/destinations/uae/dubai",
        description: "Luxury & Modern",
        icon: Building2,
        cities: [
          { name: "Downtown Dubai", path: "/destinations/uae/dubai/downtown" },
          { name: "Palm Jumeirah", path: "/destinations/uae/dubai/palm-jumeirah" },
        ],
      },
      {
        name: "Abu Dhabi",
        path: "/destinations/uae/abu-dhabi",
        description: "Royal Elegance",
        icon: Building2,
        cities: [{ name: "Yas Island", path: "/destinations/uae/abu-dhabi/yas-island" }],
      },
    ],
  },
  Bali: {
    icon: Palmtree,
    states: [
      {
        name: "South Bali",
        path: "/destinations/bali/south",
        description: "Tropical Paradise",
        icon: Palmtree,
        cities: [
          { name: "Seminyak", path: "/destinations/bali/seminyak" },
          { name: "Uluwatu", path: "/destinations/bali/uluwatu" },
        ],
      },
      {
        name: "Ubud",
        path: "/destinations/bali/ubud",
        description: "Culture & Nature",
        icon: Trees,
        cities: [{ name: "Ubud Center", path: "/destinations/bali/ubud-center" }],
      },
    ],
  },
};

const countryNames = Object.keys(destinationData);

const DropdownMenu = ({ isOpen, onClose }) => {
  const [activeCountry, setActiveCountry] = useState(countryNames[0]);
  const [activeState, setActiveState] = useState(
    destinationData[countryNames[0]].states[0]
  );

  const handleCountryHover = (country) => {
    setActiveCountry(country);
    setActiveState(destinationData[country].states[0]);
  };

  const handleStateHover = (state) => {
    setActiveState(state);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.97 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[800px] bg-white rounded-2xl shadow-2xl border border-gray-100/50 overflow-hidden z-50 flex"
          onMouseLeave={onClose}
        >
          {/* COLUMN 1 — COUNTRIES */}
          <div className="w-[220px] bg-gradient-to-b from-gray-900 to-gray-800 py-6 px-3 flex flex-col">
            <span className="px-3 text-xs font-semibold tracking-widest text-pink-400 mb-3">
              DESTINATIONS
            </span>
            <div className="flex-1 space-y-1">
              {countryNames.map((country) => {
                const CountryIcon = destinationData[country].icon;
                const isActive = activeCountry === country;
                return (
                  <button
                    key={country}
                    onMouseEnter={() => handleCountryHover(country)}
                    className={`w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                      isActive
                        ? "bg-white/10 text-white"
                        : "text-gray-300 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <span className="flex items-center gap-2.5">
                      <CountryIcon
                        className={`w-4 h-4 ${
                          isActive ? "text-pink-400" : "text-gray-400"
                        }`}
                        strokeWidth={1.5}
                      />
                      {country}
                    </span>
                    <ChevronRight
                      className={`w-3.5 h-3.5 transition-opacity ${
                        isActive ? "opacity-100 text-pink-400" : "opacity-30"
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            <div className="mt-4 mx-1 p-3 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-2 mb-1">
                <Users className="w-4 h-4 text-pink-400" />
                <span className="text-xs font-semibold text-white">
                  Need help choosing?
                </span>
              </div>
              <p className="text-[11px] text-gray-400 mb-2 leading-snug">
                Our experts help you plan the perfect celebration.
              </p>
              <Link
                to="/plan-your-celebration"
                onClick={onClose}
                className="text-[11px] font-semibold text-pink-400 hover:text-pink-300 flex items-center gap-1"
              >
                Schedule Consultation <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          {/* COLUMN 2 — STATES */}
          <div className="w-[260px] bg-[#faf7f2] py-6 px-4 border-r border-gray-200/70">
            <span className="text-xs font-semibold tracking-widest text-amber-700 mb-3 block">
              {activeCountry.toUpperCase()}
            </span>
            <div className="space-y-0.5">
              {destinationData[activeCountry].states.map((state) => {
                const StateIcon = state.icon;
                const isActive = activeState?.name === state.name;
                return (
                  <Link
                    key={state.name}
                    to={state.path}
                    onClick={onClose}
                    onMouseEnter={() => handleStateHover(state)}
                    className={`w-full flex items-center gap-3 px-2 py-2.5 rounded-lg transition-all duration-200 ${
                      isActive ? "bg-white shadow-sm" : "hover:bg-white/60"
                    }`}
                  >
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                        isActive ? "bg-amber-100" : "bg-amber-50"
                      }`}
                    >
                      <StateIcon
                        className="w-4.5 h-4.5 text-amber-700"
                        strokeWidth={1.5}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-gray-800 truncate">
                        {state.name}
                      </div>
                      <div className="text-[11px] text-gray-500 truncate">
                        {state.description}
                      </div>
                    </div>
                    <ChevronRight
                      className={`w-3.5 h-3.5 shrink-0 ${
                        isActive ? "text-amber-600" : "text-gray-300"
                      }`}
                    />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* COLUMN 3 — CITIES */}
          <div className="flex-1 py-6 px-5">
            {activeState && (
              <>
                <span className="text-xs font-semibold tracking-widest text-pink-500 mb-3 block">
                  POPULAR IN {activeState.name.toUpperCase()}
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {activeState.cities.map((city) => (
                    <Link
                      key={city.name}
                      to={city.path}
                      onClick={onClose}
                      className="group flex items-center gap-2 px-3 py-2.5 rounded-lg hover:bg-pink-50/60 transition-colors duration-200"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-pink-400 group-hover:scale-125 transition-transform" />
                      <span className="text-sm text-gray-700 group-hover:text-pink-600 font-medium">
                        {city.name}
                      </span>
                    </Link>
                  ))}
                </div>

                <Link
                  to={activeState.path}
                  onClick={onClose}
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-pink-500 hover:text-pink-600"
                >
                  Explore {activeState.name}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export { destinationData };
export default DropdownMenu;
