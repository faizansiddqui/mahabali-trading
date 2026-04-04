import React, { useState, useEffect, useRef } from "react";

const Index = () => {
  const [open, setOpen] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setHeaderVisible(false);
      } else {
        setHeaderVisible(true);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setOpen(false);
    }
  };

  return (
    <div
      id="hero"
      className="min-h-screen relative bg-[hsl(220_26%_8%)] overflow-hidden"
    >
      {/* Background Chart Image */}
      <div className="absolute inset-0 bg-[url('/chart1.png')] bg-cover bg-center opacity-70"></div>

      {/* Premium Black Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Green Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-[hsl(142_76%_45%_/_0.2)] via-transparent to-[hsl(142_76%_45%_/_0.1)] pointer-events-none" />

      {/* Header */}
      <header
        className={`fixed left-0 w-full z-[9999] bg-[hsl(220_20%_15%_/_0.6)] backdrop-blur-xl border-b border-white/10 shadow-2xl transition-transform duration-300 ease-in-out ${
          headerVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-3 py-3">
          {/* LOGO - LEFT */}
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center p-1.5">
            <img
              src="/finalLogo.png"
              alt="MahaBali Logo"
              className="w-full h-full rounded-full object-contain drop-shadow-md"
            />
          </div>

          {/* TEXT - RIGHT */}
          <div className="leading-tight text-right">
            <h1 className="text-white text-base sm:text-2xl font-extrabold tracking-wide uppercase drop-shadow-lg">
              India's
              <span className="ml-1 text-xl sm:text-2xl font-black">1</span>
              <sup className="text-xs sm:text-sm font-bold ml-0.5">st</sup>
            </h1>
            <p className="text-[#75c13f] text-xs sm:text-base font-bold uppercase tracking-wide mt-0.5 drop-shadow-md">
              Price Behavior Program
            </p>
          </div>
        </div>
      </header>

      {/* Content Container */}
      <div className="relative z-10 max-w-lg mx-auto pt-20 min-h-screen flex flex-col">
        {/* Headline */}
        <div className="px-4 pt-3 pb-2">
          {/* PREMIUM MOBILE-FRIENDLY HEADLINE */}
          <h1
            className="text-center uppercase font-extrabold 
                 text-[18px] sm:text-[24px] 
                 leading-[1.2] tracking-wide 
                 text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.3)]"
          >
            <span className="block text-[hsl(48_100%_60%)]">
              REVEALED SECRET OF
            </span>
            <span className="block mt-0.5 text-[hsl(0,0%,100%)]">
              SUCCESSFUL TRADER
            </span>
          </h1>

          {/* LIVE Badge */}
          <div className="flex justify-center mt-3">
            <div className="relative group">
              {/* Glow */}
              <div
                className="absolute inset-0 rounded-2xl blur-xl bg-red-500 opacity-40 
                      group-hover:opacity-60 transition-all duration-300"
              />

              {/* Button */}
              <div
                className="relative rounded-2xl px-2.5 py-1.5 bg-gradient-to-br 
                      from-red-600 to-red-700 shadow-2xl border border-white/10"
              >
                <div className="flex items-center justify-center gap-2">
                  <div className="flex items-center justify-center gap-0">
                    <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                    <div className="w-2.5 h-2.5 bg-white rounded-full animate-ping" />
                  </div>
                  <span className="text-white text-base sm:text-lg font-extrabold tracking-widest drop-shadow-lg">
                    LIVE
                  </span>
                </div>
              </div>

              <p className="text-white text-[10px] font-bold text-center mt-1.5 tracking-[0.2em]">
                TRAINING
              </p>
            </div>
          </div>
        </div>

        {/* Mentor Section - Compact */}
        <div className="relative px-4 py-0">
          <div className="w-full max-w-[240px] mx-auto relative">
            {/* Mentor Image - Smaller with glow */}
            <div
              className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden border border-[hsl(220_20%_25%_/_0.3)]
                   "
            >
              <img
                src={"/neerajSirImg.png"}
                alt="Mr. Suresh Latiyal - Professional Trading Instructor"
                className="w-full h-full object-cover  shadow-[0_15px_40px_rgba(34,197,94,0.3),_-15px_0_40px_rgba(34,197,94,0.2),_15px_0_40px_rgba(34,197,94,0.2)]"
              />

              {/* Stats Overlays - Compact */}
              <div className="absolute left-1.5 top-1/2 -translate-y-1/2 bg-[hsl(220_26%_8%_/_0.95)] backdrop-blur-sm p-2 rounded-lg shadow-xl border border-[hsl(142_76%_45%_/_0.2)]">
                <p className="text-white text-xl sm:text-2xl font-black leading-none uppercase">
                  2700+
                </p>
                <p className="text-white text-[10px] font-black leading-tight mt-0.5 uppercase">
                  Success
                  <br />
                  Stories
                </p>
              </div>

              <div className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-[hsl(220_26%_8%_/_0.95)] backdrop-blur-sm p-2 rounded-lg shadow-xl border border-[hsl(142_76%_45%_/_0.2)]">
                <div className="flex items-baseline gap-0.5">
                  <p className="text-white text-xl sm:text-2xl font-black leading-none uppercase">
                    14
                  </p>
                  <span className="text-white text-[10px] font-black uppercase">
                    Year
                  </span>
                </div>
                <p className="text-white text-[10px] font-black leading-tight mt-0.5 uppercase">
                  Experience
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section - Compact */}
        <div className="mt-0 px-3 pb-3">
          <div
            className="w-full bg-[hsl(220_20%_15%_/_0.6)] backdrop-blur-xl 
                  rounded-3xl border border-white/10 shadow-2xl 
                  p-3 flex flex-col items-center"
          >
            {/* REGISTER BUTTON */}
            <button
              onClick={() => (window.location.href = "/form")}
              className="
    group relative overflow-hidden
    w-full max-w-xs py-4
    rounded-full 
    text-lg sm:text-xl font-black uppercase tracking-wider
    bg-[#75c13f]
    text-gray-900
    /* Depth and Dimension */
    hover:shadow-[0_4px_0_rgb(93,156,50)]
    /* Glow effect matching your color */
    hover:shadow-[0_20px_40px_-10px_rgba(117,193,63,0.5)]
    /* Movement */
    translate-y-[2px]
    hover:-translate-y-[4px]
    active:translate-y-[2px] active:shadow-none
    transition-all duration-150 ease-in-out
    cursor-pointer
  "
            >
              {/* Glass Shine Effect */}
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]"></span>

              <span className="relative z-10">Register Now — Free</span>
            </button>
            {/* DETAILS BLOCK */}
            <div className="text-center mt-6 p-6 rounded-3xl  ">
              {/* TOP LABEL */}
              <div className="flex items-center justify-center gap-2 mb-1">
                <span className="h-[1px] w-8  bg-[#75c13f]/50"></span>
                <p className="text-white/60 text-xs font-bold uppercase tracking-[0.3em]">
                  Training Program
                </p>
                <span className="h-[1px] w-8 bg-[#75c13f]/50"></span>
              </div>

              {/* VALUE SECTION */}
              <div className="relative inline-block mt-2">
                <p className="text-white/40 text-lg font-bold line-through decoration-[#75c13f]/50 mb-[-8px]">
                  ₹10,000 VALUE
                </p>
                <h2 className="text-white text-4xl sm:text-5xl font-black tracking-tighter italic drop-shadow-2xl">
                  FREE <span className="text-[#75c13f]">NOW</span>
                </h2>
              </div>

              {/* CALL TO ACTION SUBTEXT */}
              <p className="mt-3 text-sm font-medium text-white/80 flex items-center justify-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#75c13f] animate-pulse"></span>
                Exclusive Access for Early Birds
              </p>

              {/* MENTOR SECTION */}
              <div className="mt-6 pt-4 border-t border-white/10">
                <p className="text-[#75c13f] text-[10px] font-black tracking-[0.25em] uppercase mb-1">
                  Masterclass Lead By
                </p>
                <p className="text-white text-xl font-extrabold tracking-tight">
                  Mr. Suresh Latiyal
                </p>
                <p className="text-white/40 text-[10px] uppercase font-medium mt-1">
                  Industry Expert & Mentor
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
