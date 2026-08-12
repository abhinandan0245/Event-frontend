// import { useState } from "react";
// import { Link } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import { ChevronDown, ChevronRight } from "lucide-react";
// import { destinationData } from "./DropdownMenu";

// const MobileDestinationsAccordion = ({ onNavigate }) => {
//   const [openCountry, setOpenCountry] = useState(null);
//   const [openState, setOpenState] = useState(null);

//   const toggleCountry = (name) => {
//     setOpenCountry(openCountry === name ? null : name);
//     setOpenState(null);
//   };

//   const toggleState = (name) => {
//     setOpenState(openState === name ? null : name);
//   };

//   return (
//     <div className="pl-2">
//       {Object.entries(destinationData).map(([country, data]) => {
//         const CountryIcon = data.icon;
//         const isCountryOpen = openCountry === country;
//         return (
//           <div key={country} className="border-b border-white/5 last:border-0">
//             {/* Country row */}
//             <button
//               onClick={() => toggleCountry(country)}
//               className="w-full flex items-center justify-between gap-2 px-4 py-2.5 text-sm font-medium text-white hover:text-gold-400"
//             >
//               <span className="flex items-center gap-2">
//                 <CountryIcon className="w-4 h-4 text-gold-400" strokeWidth={1.5} />
//                 {country}
//               </span>
//               <motion.span animate={{ rotate: isCountryOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
//                 <ChevronDown className="w-4 h-4" />
//               </motion.span>
//             </button>

//             {/* States */}
//             <AnimatePresence>
//               {isCountryOpen && (
//                 <motion.div
//                   initial={{ height: 0, opacity: 0 }}
//                   animate={{ height: "auto", opacity: 1 }}
//                   exit={{ height: 0, opacity: 0 }}
//                   transition={{ duration: 0.2 }}
//                   className="overflow-hidden pl-4"
//                 >
//                   {data.states.map((state) => {
//                     const isStateOpen = openState === state.name;
//                     return (
//                       <div key={state.name}>
//                         <button
//                           onClick={() => toggleState(state.name)}
//                           className="w-full flex items-center justify-between gap-2 px-4 py-2 text-[13px] font-medium text-gray-300 hover:text-gold-400"
//                         >
//                           <Link
//                             to={state.path}
//                             onClick={onNavigate}
//                             className="flex-1 text-left"
//                           >
//                             {state.name}
//                           </Link>
//                           {state.cities?.length > 0 && (
//                             <motion.span
//                               onClick={(e) => {
//                                 e.stopPropagation();
//                                 toggleState(state.name);
//                               }}
//                               animate={{ rotate: isStateOpen ? 90 : 0 }}
//                               transition={{ duration: 0.2 }}
//                             >
//                               <ChevronRight className="w-3.5 h-3.5" />
//                             </motion.span>
//                           )}
//                         </button>

//                         {/* Cities */}
//                         <AnimatePresence>
//                           {isStateOpen && state.cities?.length > 0 && (
//                             <motion.div
//                               initial={{ height: 0, opacity: 0 }}
//                               animate={{ height: "auto", opacity: 1 }}
//                               exit={{ height: 0, opacity: 0 }}
//                               transition={{ duration: 0.2 }}
//                               className="overflow-hidden pl-6"
//                             >
//                               {state.cities.map((city) => (
//                                 <Link
//                                   key={city.name}
//                                   to={city.path}
//                                   onClick={onNavigate}
//                                   className="block px-4 py-1.5 text-xs text-gray-400 hover:text-gold-400"
//                                 >
//                                   {city.name}
//                                 </Link>
//                               ))}
//                             </motion.div>
//                           )}
//                         </AnimatePresence>
//                       </div>
//                     );
//                   })}
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default MobileDestinationsAccordion;

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronRight, Globe, MapPin } from "lucide-react";
import { destinationApi } from "../../api/destinationApi";

const MobileDestinationsAccordion = ({ onNavigate }) => {
  const [menuData, setMenuData] = useState({});
  const [loading, setLoading] = useState(true);
  const [openCountry, setOpenCountry] = useState(null);
  const [openState, setOpenState] = useState(null);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        setLoading(true);
        const response = await destinationApi.getAll();
        if (response.success && response.data) {
          const formattedData = formatDestinationData(response.data);
          setMenuData(formattedData);
        }
      } catch (error) {
        console.error("Failed to load mobile destination data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDestinations();
  }, []);

  const formatDestinationData = (backendData) => {
    let destinationsArray = [];
    if (Array.isArray(backendData)) {
      destinationsArray = backendData;
    } else if (backendData && Array.isArray(backendData.destinations)) {
      destinationsArray = backendData.destinations;
    } else if (backendData && Array.isArray(backendData.data)) {
      destinationsArray = backendData.data;
    } else if (backendData && Array.isArray(backendData.docs)) {
      destinationsArray = backendData.docs;
    } else {
      return {};
    }

    const groupedData = {};

    destinationsArray.forEach((dest) => {
      const { country, state, city } = dest;
      const destId = dest._id || dest.id;

      if (!groupedData[country]) {
        groupedData[country] = { icon: Globe, statesMap: {}, states: [] };
      }
      if (!groupedData[country].statesMap[state]) {
        groupedData[country].statesMap[state] = {
          name: state,
          icon: MapPin,
          cities: [],
        };
      }
      if (city && destId) {
        const cityExists = groupedData[country].statesMap[state].cities.some(
          (c) => c.name === city,
        );
        if (!cityExists) {
          groupedData[country].statesMap[state].cities.push({
            name: city,
            path: `/destination/${destId}`,
          });
        }
      }
    });

    Object.keys(groupedData).forEach((countryKey) => {
      groupedData[countryKey].states = Object.values(
        groupedData[countryKey].statesMap,
      );
      delete groupedData[countryKey].statesMap;
    });

    return groupedData;
  };

  const toggleCountry = (name) => {
    setOpenCountry(openCountry === name ? null : name);
    setOpenState(null);
  };

  const toggleState = (name) => {
    setOpenState(openState === name ? null : name);
  };

  if (loading) {
    return (
      <div className="pl-6 py-4 text-sm text-gray-500">
        Loading destinations...
      </div>
    );
  }

  return (
    <div className="pl-2 max-h-[60vh] overflow-y-auto">
      {Object.entries(menuData).map(([country, data]) => {
        const CountryIcon = data.icon || Globe;
        const isCountryOpen = openCountry === country;
        return (
          <div key={country} className="border-b border-gray-100 last:border-0">
            <button
              onClick={() => toggleCountry(country)}
              className="w-full flex items-center justify-between gap-2 px-4 py-3 text-sm font-medium text-gray-900 hover:text-gray-700 transition-colors"
            >
              <span className="flex items-center gap-2">
                <CountryIcon
                  className="w-4 h-4 text-gray-600"
                  strokeWidth={1.5}
                />
                {country}
              </span>
              <motion.span
                animate={{ rotate: isCountryOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="text-gray-400"
              >
                <ChevronDown className="w-4 h-4" />
              </motion.span>
            </button>

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
                      <div
                        key={state.name}
                        className="border-l border-gray-100"
                      >
                        {/* State is NOT a link anymore, just a toggle button */}
                        <button
                          onClick={() => toggleState(state.name)}
                          className="w-full flex items-center justify-between gap-2 px-4 py-2.5 text-[13px] font-medium text-gray-700 hover:text-gray-900 transition-colors"
                        >
                          <span className="flex-1 text-left">{state.name}</span>
                          {state.cities?.length > 0 && (
                            <motion.span
                              animate={{ rotate: isStateOpen ? 90 : 0 }}
                              transition={{ duration: 0.2 }}
                              className="text-gray-400"
                            >
                              <ChevronRight className="w-3.5 h-3.5" />
                            </motion.span>
                          )}
                        </button>

                        <AnimatePresence>
                          {isStateOpen && state.cities?.length > 0 && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden pl-6 pb-2 bg-gray-50"
                            >
                              {/* Cities ARE links */}
                              {state.cities.map((city) => (
                                <Link
                                  key={city.name}
                                  to={city.path}
                                  onClick={onNavigate}
                                  className="block px-4 py-2.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                  <span className="flex items-center gap-2">
                                    <MapPin className="w-3.5 h-3.5 text-gray-400" />
                                    {city.name}
                                  </span>
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