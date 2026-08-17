import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import Button from "../ui/Button";
import { useNavigate } from "react-router-dom";
import { portfolioApi } from "../../api/portfolioApi";
import GalleryPopup from "../ui/GalleryPopup";

gsap.registerPlugin(ScrollTrigger);

// ==========================================
// 1. INDIVIDUAL PORTFOLIO CARD
// ==========================================
const PortfolioCard = React.memo(({ item, isWider, onCardClick }) => {
  const imageUrl = useMemo(() => {
    return (
      item?.image ||
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80"
    );
  }, [item?.image]);

  const handleClick = useCallback(() => {
    if (onCardClick && item) {
      onCardClick(item);
    }
  }, [onCardClick, item]);

  return (
    <div
      className={`
        relative cursor-pointer bg-[#1A1A1A] 
        ${isWider ? "w-[260px] md:w-[320px] lg:w-[380px]" : "w-[200px] md:w-[240px] lg:w-[280px]"} 
        h-[180px] md:h-[200px] lg:h-[240px]
        transition-all duration-500 ease-out flex-shrink-0
        rounded-none border-[1px] border-[#C58B48]/60 -ml-[1px]
        shadow-[0_0_15px_rgba(197,139,72,0.15)]
        z-10 hover:z-50 hover:scale-[1.05] hover:border-[#C58B48] 
        hover:shadow-[0_0_40px_rgba(197,139,72,0.8)]
        group-hover:opacity-40 hover:!opacity-100
      `}
      onClick={handleClick}
    >
      <img
        src={imageUrl}
        alt={item?.title || "Portfolio"}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 hover:scale-110"
        loading="lazy"
        onError={(e) => {
          e.target.src =
            "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80";
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-60 pointer-events-none" />

      <div className="absolute top-4 right-4 w-8 h-8 rounded-full border border-[#C58B48]/50 bg-black/60 backdrop-blur-md flex items-center justify-center text-[#E9C38A] opacity-0 transform translate-y-2 transition-all duration-300 hover:bg-[#C58B48] hover:text-white group-hover/card:opacity-100">
        <ArrowUpRight size={16} strokeWidth={1.5} />
      </div>
    </div>
  );
});

PortfolioCard.displayName = "PortfolioCard";

// ==========================================
// 2. SCROLLING MARQUEE ROW - FIXED KEYS
// ==========================================
const MarqueeRow = React.memo(
  ({ items, direction = "left", speed = 40, isWider = false, onCardClick }) => {
    const rowRef = useRef(null);
    const tweenRef = useRef(null);

    // ✅ Create unique keys for doubled items
    const doubledItems = useMemo(() => {
      if (!items || items.length === 0) return [];

      const result = [];
      items.forEach((item, idx) => {
        const baseKey = item?._id || item?.id || `item-${idx}`;
        // First copy - add '-first' suffix
        result.push({
          ...item,
          _key: `${baseKey}-first-${idx}`,
        });
        // Second copy - add '-second' suffix
        result.push({
          ...item,
          _key: `${baseKey}-second-${idx}`,
        });
      });
      return result;
    }, [items]);

    useEffect(() => {
      const row = rowRef.current;
      if (!row || !items || items.length === 0) return;

      const distance = direction === "left" ? -50 : 0;
      const startPos = direction === "left" ? 0 : -50;

      gsap.set(row, { xPercent: startPos });

      tweenRef.current = gsap.to(row, {
        xPercent: distance,
        repeat: -1,
        duration: speed,
        ease: "none",
      });

      return () => {
        if (tweenRef.current) tweenRef.current.kill();
      };
    }, [direction, speed, items?.length]);

    if (!items || items.length === 0) return null;

    return (
      <div
        className="flex w-max"
        onMouseEnter={() => tweenRef.current?.pause()}
        onMouseLeave={() => tweenRef.current?.play()}
      >
        <div ref={rowRef} className="flex gap-0">
          {doubledItems.map((item) => (
            <PortfolioCard
              key={item._key} // ✅ Unique key
              item={item}
              isWider={isWider}
              onCardClick={onCardClick}
            />
          ))}
        </div>
      </div>
    );
  },
);

MarqueeRow.displayName = "MarqueeRow";

// ==========================================
// 3. MAIN COMPONENT
// ==========================================
const PortfolioGallery = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const navigate = useNavigate();

  const [portfolioItems, setPortfolioItems] = useState({
    row1: [],
    row2: [],
    row3: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [galleryImages, setGalleryImages] = useState([]);
  const [galleryStartIndex, setGalleryStartIndex] = useState(0);

  // Fetch portfolio items from API
  useEffect(() => {
    const fetchPortfolioItems = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await portfolioApi.getAll({
          page: 1,
          limit: 20,
        });

        if (response?.success && response?.data) {
          let items = [];

          if (response.data.items && Array.isArray(response.data.items)) {
            items = response.data.items;
          } else if (Array.isArray(response.data)) {
            items = response.data;
          } else if (response.data.portfolios) {
            items = response.data.portfolios;
          } else if (response.data.data) {
            items = response.data.data;
          }

          // Filter out items without images
          const validItems = items.filter((item) => item?.image);

          if (validItems.length === 0) {
            setError("No portfolio items with images found");
            setPortfolioItems({ row1: [], row2: [], row3: [] });
            setLoading(false);
            return;
          }

          // Shuffle and split into 3 rows
          const shuffled = [...validItems].sort(() => 0.5 - Math.random());
          const total = shuffled.length;
          const row1Count = Math.ceil(total / 3);
          const row2Count = Math.ceil((total - row1Count) / 2);

          setPortfolioItems({
            row1: shuffled.slice(0, row1Count),
            row2: shuffled.slice(row1Count, row1Count + row2Count),
            row3: shuffled.slice(row1Count + row2Count),
          });
        } else {
          setError("No portfolio items found");
        }
      } catch (err) {
        console.error("Error fetching portfolio items:", err);
        setError("Failed to load portfolio items");
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolioItems();
  }, []);

  const handleCardClick = useCallback((item) => {
    if (!item) return;

    const images = [];
    if (item.image) images.push(item.image);
    if (item.images && Array.isArray(item.images)) {
      item.images.forEach((img) => {
        if (img && !images.includes(img)) {
          images.push(img);
        }
      });
    }

    if (images.length === 0) {
      images.push(
        "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80",
      );
    }

    setGalleryImages(images);
    setGalleryStartIndex(0);
    setIsGalleryOpen(true);
  }, []);

  const handleCloseGallery = useCallback(() => {
    setIsGalleryOpen(false);
    setGalleryImages([]);
    setGalleryStartIndex(0);
  }, []);

  // GSAP Animations
  useEffect(() => {
    if (loading) return;

    const ctx = gsap.context(() => {
      if (headerRef.current && headerRef.current.children) {
        gsap.fromTo(
          headerRef.current.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
            },
          },
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [loading]);

  const { row1 = [], row2 = [], row3 = [] } = portfolioItems;

  if (loading) {
    return (
      <section className="relative w-full bg-[#FAF8F0] py-20 flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C58B48] mb-4"></div>
          <p className="text-gray-500 font-inter text-sm">Loading gallery...</p>
        </div>
      </section>
    );
  }

  if (error && !row1.length && !row2.length && !row3.length) {
    return (
      <section className="relative w-full bg-[#FAF8F0] py-20 flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center text-center px-6">
          <p className="text-gray-500 font-inter text-sm mb-4">{error}</p>
          <Button
            onClick={() => window.location.reload()}
            variant="secondary"
            shape="pill"
            size="md"
          >
            Retry
          </Button>
        </div>
      </section>
    );
  }

  if (!row1.length && !row2.length && !row3.length) {
    return (
      <section className="relative w-full bg-[#FAF8F0] py-20 flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center text-center px-6">
          <p className="text-gray-500 font-inter text-sm mb-4">
            No portfolio items available
          </p>
          <Button
            onClick={() => navigate("/portfolio")}
            variant="secondary"
            shape="pill"
            size="md"
          >
            View Portfolio
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#FAF8F0] pt-20 pb-28 font-sans overflow-hidden"
    >
      {/* Header */}
      <div
        ref={headerRef}
        className="max-w-4xl mx-auto flex flex-col items-center text-center mb-16 px-6 relative z-20"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-6 h-[1px] bg-[#C58B48]" />
          <span className="text-[#C58B48] text-[10px] md:text-xs font-semibold tracking-[0.25em] uppercase">
            OUR PORTFOLIO
          </span>
          <div className="w-6 h-[1px] bg-[#C58B48]" />
        </div>

        <h2 className="text-4xl md:text-5xl lg:text-[64px] font-serif text-[#1F2937] leading-[1.1] mb-6">
          Signature <br className="md:hidden" />
          <span className="italic text-[#C58B48] font-cormorant">
            Celebrations
          </span>
        </h2>

        <p className="font-sans text-xs lg:text-sm font-medium leading-[1.7] text-gray-600 max-w-[500px] mb-8">
          A curated showcase of extraordinary celebrations we have designed &
          delivered across the world.
        </p>

        <Button
          onClick={() => navigate("/portfolio")}
          variant="secondary"
          shape="pill"
          size="md"
        >
          EXPLORE PORTFOLIO <ArrowRight size={14} />
        </Button>
      </div>

      {/* Marquee Gallery */}
      <div className="w-[110vw] -ml-[5vw] overflow-visible flex flex-col items-center justify-center group pb-10">
        {row1.length > 0 && (
          <div
            className="w-full relative z-10 border-y border-[#C58B48]/40 shadow-[0_15px_30px_rgba(0,0,0,0.3)]"
            style={{ transform: "perspective(1200px) rotateY(-3.5deg)" }}
          >
            <MarqueeRow
              items={row1}
              direction="left"
              speed={60}
              onCardClick={handleCardClick}
            />
          </div>
        )}

        {row2.length > 0 && (
          <div
            className="w-full relative z-20 -mt-4 border-b border-[#C58B48]/40 shadow-[0_15px_30px_rgba(0,0,0,0.4)]"
            style={{ transform: "perspective(1200px) rotateY(3.5deg)" }}
          >
            <MarqueeRow
              items={row2}
              direction="right"
              speed={55}
              isWider={true}
              onCardClick={handleCardClick}
            />
          </div>
        )}

        {row3.length > 0 && (
          <div
            className="w-full relative z-30 -mt-4 border-b border-[#C58B48]/40 shadow-[0_25px_40px_rgba(0,0,0,0.5)]"
            style={{ transform: "perspective(1200px) rotateY(-3.5deg)" }}
          >
            <MarqueeRow
              items={row3}
              direction="left"
              speed={65}
              onCardClick={handleCardClick}
            />
          </div>
        )}
      </div>

      <GalleryPopup
        isOpen={isGalleryOpen}
        onClose={handleCloseGallery}
        images={galleryImages}
        initialIndex={galleryStartIndex}
      />
    </section>
  );
};

export default PortfolioGallery;
