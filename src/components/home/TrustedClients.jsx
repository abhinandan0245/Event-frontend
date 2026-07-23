import React from "react";

// --- CONSTANTS FOR ICONS ---
const iconMap = {
  palace: (className) => (
    <svg
      className={`w-14 h-14 ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
    >
      <path d="M3 21h18v-7l-9-5-9 5v7zM12 9v12m-4 0v-4m8 4v-4M7 3h2v3H7zm4 0h2v3h-2zm4 0h2v3h-2z" />
    </svg>
  ),
  wheat: (className) => (
    <svg
      className={`w-14 h-14 ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
    >
      <path d="M12 2a4 4 0 0 1 4 4v12a4 4 0 0 1-8 0V6a4 4 0 0 1 4-4zM8 10l-4 1m4-1-1 4m5-4 4 1m-4-1 1 4M10 16l-3 1m3-1-1 3m5-3 3 1m-3-1 1 3" />
    </svg>
  ),
  airplane: (className) => (
    <svg
      className={`w-16 h-16 ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
    >
      <path d="M22 12 12.5 13 9 20 6.5 20 8.5 13 3 12.5 2 15 1 15 2 12 1 9 2 9 3 11.5 8.5 11 6.5 4 9 4 12.5 11 22 12z" />
    </svg>
  ),
  crest: (className) => (
    <svg
      className={`w-16 h-16 ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10zM12 6a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-2 5h4v5l-2 2-2-2v-5z" />
    </svg>
  ),
  crown: (className) => (
    <svg
      className={`w-12 h-12 ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
    >
      <path d="M16 4h.01M8 4h.01M12 2l-2.5 3L6 4l1.5 6h9L18 4l-3.5 1L12 2zM3 13h18v6H3v-6zm3-7v6m12-6v6" />
    </svg>
  ),
  temple: (className) => (
    <svg
      className={`w-14 h-14 ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
    >
      <path d="M12 3v18M5 10l7-7 7 7v9H5v-9zm0 0v10m14-10v10M7 19v3m10-3v3M9 13a3 3 0 1 1 6 0" />
    </svg>
  ),
  circle: (className) => (
    <svg
      className={`w-10 h-10 ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
    >
      <circle cx="12" cy="12" r="9" />
    </svg>
  ),
  letterX: (className) => (
    <span className={`text-3xl font-light font-sans ${className}`}>X</span>
  ),
  lettersRR: (className) => (
    <span
      className={`text-4xl font-extrabold font-serif tracking-tighter ${className}`}
    >
      RR
    </span>
  ),
  letterV: (className) => (
    <span className={`text-6xl font-light font-serif ${className}`}>V</span>
  ),
};

// --- THEMES ---
const cardThemes = {
  frontGold: {
    border: "border-amber-400/80",
    innerGlow:
      "inset 0 1px 2px 0 rgba(251, 191, 36, 0.4), inset 0 0 20px 0 rgba(245, 158, 11, 0.15)",
    iconColor: "text-amber-300 drop-shadow-[0_0_10px_rgba(245,158,11,0.3)]",
  },
  frontBoldGlow: {
    border: "border-amber-400/90",
    innerGlow:
      "inset 0 1px 2px 0 rgba(251, 191, 36, 0.6), inset 0 0 30px 0 rgba(245, 158, 11, 0.3)",
    iconColor: "text-white/95",
    isBrightCenter: true,
  },
  backFaint: {
    border: "border-neutral-700/50",
    innerGlow: "inset 0 1px 1px 0 rgba(255, 255, 255, 0.05)",
    iconColor: "text-neutral-500",
  },
};

// --- CARD DATA WITH DIFFERENT SIZES ---
const cardsData = [
  { id: 1, icon: "palace", size: "w-28 h-28", theme: "frontGold" },
  { id: 2, icon: "temple", size: "w-36 h-36", theme: "frontGold" },
  { id: 3, icon: "circle", size: "w-24 h-24", theme: "frontGold" },
  { id: 4, icon: "temple", size: "w-32 h-32", theme: "frontGold" },
  { id: 5, icon: "wheat", size: "w-40 h-40", theme: "frontGold" },
  { id: 6, icon: "airplane", size: "w-44 h-44", theme: "frontGold" },
  { id: 7, icon: "crest", size: "w-44 h-44", theme: "frontGold" },
  { id: 8, icon: "letterV", size: "w-48 h-48", theme: "frontBoldGlow" },
  { id: 9, icon: "crown", size: "w-32 h-32", theme: "frontGold" },
  { id: 10, icon: "crest", size: "w-44 h-44", theme: "frontGold" },
  { id: 11, icon: "lettersRR", size: "w-40 h-40", theme: "frontGold" },
  { id: 12, icon: "palace", size: "w-28 h-28", theme: "frontGold" },
  { id: 13, icon: "temple", size: "w-36 h-36", theme: "frontGold" },
  { id: 14, icon: "wheat", size: "w-32 h-32", theme: "frontGold" },
  { id: 15, icon: "circle", size: "w-20 h-20", theme: "frontGold" },
  { id: 16, icon: "letterX", size: "w-16 h-16", theme: "frontGold" },
];

export default function TrustedClients() {
  return (
    <section className="relative min-h-screen w-full bg-[#030303] text-white flex flex-col items-center justify-start pt-12 pb-20 overflow-hidden select-none">
      {/* TOP GOLD RADIAL LIGHTING */}
      <div
        className="absolute top-0 left-[60%] -translate-x-1/2 w-[900px] h-[500px] pointer-events-none opacity-50 blur-[120px]"
        style={{
          background:
            "radial-gradient(circle at 50% 0%, rgba(217, 119, 6, 0.4) 0%, rgba(180, 83, 9, 0.15) 50%, transparent 80%)",
        }}
      />

      {/* TEXT CONTENT SECTION */}
      <div className="relative z-20 text-center max-w-2xl px-6 space-y-2 mt-4">
        <p className="text-xs uppercase tracking-[0.4em] font-medium text-amber-500/80">
          Trusted Worldwide
        </p>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-amber-100 via-amber-200 to-amber-500/80">
          Trusted by Exceptional Clients.
        </h2>
        <p className="text-sm md:text-base text-neutral-400 font-light leading-relaxed max-w-xl mx-auto pt-2">
          From luxury hotels and heritage palaces to destination wedding clients
          and global brands, Violin Events LLP delivers exceptional experiences
          with precision, creativity, and flawless execution.
        </p>
      </div>

      {/* CARDS GRID - ALL SEPARATE, NO OVERLAP, PROPER GAPS */}
      <div className="relative z-10 w-full max-w-6xl px-4 mt-10 md:mt-16">
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-5">
          {cardsData.map((card) => {
            const theme = cardThemes[card.theme];
            const isletters =
              typeof card.icon === "string" &&
              (card.icon.includes("letters") || card.icon.includes("letter"));

            return (
              <div
                key={card.id}
                className={`transition-all duration-500 ease-out cursor-pointer hover:scale-110 hover:z-[50] ${card.size}`}
              >
                <div
                  className={`
                    relative w-full h-full rounded-2xl md:rounded-3xl p-6 flex flex-col items-center justify-center
                    bg-gradient-to-br from-[#1c1a17] via-[#0f0e0d] to-[#060606]
                    border ${theme.border}
                    transition-all duration-300
                    hover:shadow-xl
                  `}
                  style={{
                    boxShadow: `
                      ${theme.innerGlow},
                      0 25px 60px -12px rgba(0, 0, 0, 0.95)
                    `,
                  }}
                >
                  {theme.isBrightCenter && (
                    <div
                      className="absolute inset-0 rounded-2xl md:rounded-3xl pointer-events-none opacity-80"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.05) 40%, transparent 60%)",
                      }}
                    />
                  )}

                  <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-amber-300/40 to-transparent" />

                  <div
                    className={`relative z-10 flex items-center justify-center transition-transform duration-300 ${isletters ? "text-3xl" : ""}`}
                  >
                    {iconMap[card.icon](theme.iconColor)}
                  </div>

                  <div className="absolute bottom-0 left-1/3 right-1/3 h-[1px] bg-gradient-to-r from-transparent via-amber-500/10 to-transparent" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
