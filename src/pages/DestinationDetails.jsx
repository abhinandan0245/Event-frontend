import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { destinationApi } from "../api/destinationApi";
import { MapPin, Tag, ArrowLeft, Compass } from "lucide-react";
import Button from "../components/ui/Button";

// Fallback image in case the API doesn't return one
const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1200&auto=format&fit=crop";

const DestinationDetails = () => {
  const { id } = useParams();
  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSingleDestination = async () => {
      try {
        setLoading(true);
        const response = await destinationApi.getById(id);

        if (response.success && response.data) {
          setDestination(response.data);
        } else {
          setError("Destination not found");
        }
      } catch (err) {
        console.error("Error fetching destination details", err);
        setError("Failed to load destination details.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchSingleDestination();
    }
  }, [id]);

  // Handle go back - navigate to previous page or destinations
  const handleGoBack = () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate("/destinations");
    }
  };

  // Handle explore more - navigate to destinations page
  const handleExploreMore = () => {
    navigate("/destinations");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FDFBF7]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C58B48]"></div>
      </div>
    );
  }

  if (error || !destination) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FDFBF7]">
        <div className="text-center">
          <h2 className="text-2xl text-gray-700 mb-4">
            {error || "Destination not found"}
          </h2>
          <button
            onClick={handleGoBack}
            className="text-[#C58B48] hover:underline font-inter"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // Use the image from API, otherwise use the fallback
  const imageUrl = destination.image || FALLBACK_IMAGE;

  return (
    <div className="min-h-screen bg-[#FDFBF7] pt-24 pb-20">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-16">
        {/* Navigation Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <button
            onClick={handleGoBack}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-[#C58B48] transition-colors font-inter text-sm group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Go Back
          </button>
          
          <button
            onClick={handleExploreMore}
            className="inline-flex items-center gap-2 text-[#C58B48] hover:text-[#1F2937] transition-colors font-inter text-sm group"
          >
            Explore More Destinations
            <Compass className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Header Section */}
        <div className="mb-10 text-center">
          <span className="font-montserrat text-[#C58B48] text-sm font-bold tracking-[0.25em] uppercase mb-4 block">
            {destination.country} • {destination.state}
          </span>
          <h1 className="font-cormorant text-5xl lg:text-7xl text-[#1F2937] leading-[1.1] mb-4 uppercase tracking-wide">
            {destination.city}
          </h1>
          {destination.category && (
            <div className="flex items-center justify-center gap-2 text-gray-500 font-inter mt-4">
              <Tag className="w-4 h-4" />
              <span className="uppercase text-xs tracking-wider">
                {destination.category}
              </span>
            </div>
          )}
        </div>

        {/* Image Section */}
        <div className="w-full h-[50vh] md:h-[60vh] rounded-3xl overflow-hidden shadow-xl mb-12 relative group">
          <img
            src={imageUrl}
            alt={destination.city}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
            onError={(e) => {
              e.currentTarget.src = FALLBACK_IMAGE;
            }}
          />
          <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md py-2 px-4 rounded-full flex items-center gap-2 shadow-lg">
            <MapPin className="w-4 h-4 text-[#C58B48]" />
            <span className="text-sm font-semibold text-gray-800">
              {destination.city}, {destination.country}
            </span>
          </div>
        </div>

        {/* Details Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="md:col-span-2">
            <h3 className="font-cormorant text-3xl text-[#1F2937] mb-4">
              About the Destination
            </h3>
            <p className="font-inter text-gray-600 leading-relaxed text-lg mb-6 whitespace-pre-line">
              {destination.description ||
                "Discover the beautiful landscapes, rich culture, and luxury venues this destination has to offer. The perfect place for your unforgettable celebration."}
            </p>

            {/* Tags Section */}
            {destination.tags && destination.tags.length > 0 && (
              <div className="mt-6">
                <h4 className="font-montserrat text-xs font-bold tracking-widest text-gray-400 uppercase mb-3">
                  Tags
                </h4>
                <div className="flex flex-wrap gap-2">
                  {destination.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full text-sm font-inter"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Box */}
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-[#EBE3D5] h-fit">
            <h4 className="font-montserrat text-[#C58B48] text-xs font-bold tracking-widest uppercase mb-6 border-b border-[#EBE3D5] pb-4">
              Quick Info
            </h4>

            <div className="space-y-4 font-inter text-sm text-gray-700">
              <div className="flex justify-between">
                <span className="text-gray-400">Country</span>
                <span className="font-semibold">{destination.country}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">State</span>
                <span className="font-semibold">{destination.state}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">City</span>
                <span className="font-semibold">{destination.city}</span>
              </div>
              {destination.category && (
                <div className="flex justify-between">
                  <span className="text-gray-400">Category</span>
                  <span className="font-semibold">{destination.category}</span>
                </div>
              )}
              {destination.price && (
                <div className="flex justify-between">
                  <span className="text-gray-400">Starting Price</span>
                  <span className="font-semibold text-[#C58B48]">
                    {destination.price}
                  </span>
                </div>
              )}
              {destination.featured && (
                <div className="flex justify-between">
                  <span className="text-gray-400">Status</span>
                  <span className="font-semibold text-[#C58B48]">Featured</span>
                </div>
              )}
            </div>

            <Button 
              onClick={() => navigate("/contact")} 
              className="w-full mt-8 bg-[#1F2937] text-white py-3 rounded-lg font-montserrat text-xs tracking-widest hover:bg-[#C58B48] transition-colors"
            >
              PLAN YOUR EVENT
            </Button>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="mt-16 pt-8 border-t border-[#EBE3D5] flex flex-wrap items-center justify-between gap-4">
          <button
            onClick={handleGoBack}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-[#C58B48] transition-colors font-inter text-sm group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Go Back
          </button>
          
          <div className="flex gap-3">
            <button
              onClick={handleExploreMore}
              className="inline-flex items-center gap-2 bg-[#C58B48] text-white px-6 py-2.5 rounded-lg hover:bg-[#1F2937] transition-colors font-inter text-sm"
            >
              <Compass className="w-4 h-4" />
              Explore All Destinations
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationDetails;