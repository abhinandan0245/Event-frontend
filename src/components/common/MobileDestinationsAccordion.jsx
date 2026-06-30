import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronRight } from "lucide-react";
import { destinationData } from "./DropdownMenu";

const MobileDestinationsAccordion = ({ onNavigate }) => {
  const [openCountry, setOpenCountry] = useState(null);
  const [openState, setOpenState] = useState(null);

  const toggleCountry = (name) => {
    setOpenCountry(openCountry === name ? null : name);
    setOpenState(null);
  };

  const toggleState = (name) => {
    setOpenState(openState === name ? null : name);
  };

  return (
    <div className="pl-2">
      {Object.entries(destinationData).map(([country, data]) => {
        const CountryIcon = data.icon;
        const isCountryOpen = openCountry === country;
        return (
          <div key={country} className="border-b border-white/5 last:border-0">
            {/* Country row */}
            <button
              onClick={() => toggleCountry(country)}
              className="w-full flex items-center justify-between gap-2 px-4 py-2.5 text-sm font-medium text-white hover:text-gold-400"
            >
              <span className="flex items-center gap-2">
                <CountryIcon className="w-4 h-4 text-gold-400" strokeWidth={1.5} />
                {country}
              </span>
              <motion.span animate={{ rotate: isCountryOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                <ChevronDown className="w-4 h-4" />
              </motion.span>
            </button>

            {/* States */}
            <AnimatePresence>
              {isCountryOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden pl-4"
                >
                  {data.states.map((state) => {
                    const isStateOpen = openState === state.name;
                    return (
                      <div key={state.name}>
                        <button
                          onClick={() => toggleState(state.name)}
                          className="w-full flex items-center justify-between gap-2 px-4 py-2 text-[13px] font-medium text-gray-300 hover:text-gold-400"
                        >
                          <Link
                            to={state.path}
                            onClick={onNavigate}
                            className="flex-1 text-left"
                          >
                            {state.name}
                          </Link>
                          {state.cities?.length > 0 && (
                            <motion.span
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleState(state.name);
                              }}
                              animate={{ rotate: isStateOpen ? 90 : 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              <ChevronRight className="w-3.5 h-3.5" />
                            </motion.span>
                          )}
                        </button>

                        {/* Cities */}
                        <AnimatePresence>
                          {isStateOpen && state.cities?.length > 0 && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden pl-6"
                            >
                              {state.cities.map((city) => (
                                <Link
                                  key={city.name}
                                  to={city.path}
                                  onClick={onNavigate}
                                  className="block px-4 py-1.5 text-xs text-gray-400 hover:text-gold-400"
                                >
                                  {city.name}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};

export default MobileDestinationsAccordion;
