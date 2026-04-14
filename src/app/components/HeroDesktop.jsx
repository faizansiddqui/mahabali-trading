import React, { useState, useEffect, useRef } from 'react';

const HeroDesktop = () => {
  const [headerVisible, setHeaderVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;
      if (current > lastScrollY.current && current > 120) {
        setHeaderVisible(false);
      } else {
        setHeaderVisible(true);
      }
      lastScrollY.current = current;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div id="hero" className="relative min-h-screen bg-[#06090f] text-white overflow-hidden flex flex-col">
      {/* --- Background Elements --- */}
      <div className="absolute inset-0 bg-[url('/chart-bg1.png')] bg-cover bg-center opacity-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#06090f]/80 to-[#06090f]" />
      
      {/* Animated Orbs */}
      <div className="absolute -left-20 -top-20 w-64 h-64 sm:w-96 sm:h-96 bg-emerald-500/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute -right-20 top-1/2 w-64 h-64 sm:w-96 sm:h-96 bg-blue-500/10 rounded-full blur-[120px] animate-pulse delay-700" />

      {/* --- Header --- */}
      <header
        className={`fixed inset-x-0 top-0 z-[100] transition-all duration-500 transform ${
          headerVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="backdrop-blur-md bg-black/20 border-b border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl overflow-hidden ring-2 ring-emerald-500/20 shadow-lg shadow-emerald-500/10">
                <img src="/finalLogo.png" alt="Mahhabali" className="w-full h-full object-cover" />
              </div>
              <div>
                <h2 className="text-white text-base sm:text-xl font-bold leading-tight tracking-tight">Mahhabali Education</h2>
                <p className="text-emerald-400 text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase"></p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-white text-sm sm:text-xl font-black italic">
                INDIA&apos;S <span className="text-[#75c13f]">№1</span>
              </div>
              <p className="text-white/50 text-[9px] sm:text-[11px] font-bold tracking-widest uppercase">
                Price Behavior
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* --- Main Hero Content --- */}
      <main className="relative z-10 flex-1 flex items-center pt-24 pb-12 sm:pt-32 sm:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            
            {/* Left Content */}
            <div className="flex flex-col space-y-8 text-center lg:text-left order-2 lg:order-1">
              <div className="space-y-2">
                <span className="inline-block py-1 px-3 rounded-full bg-[#75c13f]/10 border border-[#75c13f]/20 text-[#75c13f] text-xs font-bold tracking-widest uppercase mb-4">
                  Official Training Program
                </span>
                <h1 className="text-4xl sm:text-6xl xl:text-7xl font-black tracking-tight leading-[1.1]">
                  <span className="text-[#75c13f]">REVEALED:</span><br />
                  SECRET OF<br />
                  SUCCESSFUL<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#75c13f] to-[#5da432]">TRADERS</span>
                </h1>
              </div>

              {/* LIVE Badge & Button Container */}
              <div className="flex flex-col sm:flex-row items-center gap-4 bg-white/5 border border-white/10 p-2 sm:p-3 rounded-[2rem] backdrop-blur-xl max-w-xl mx-auto lg:mx-0">
                <div className="flex items-center gap-3 px-6 py-2">
                  <div className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                  </div>
                  <div className="flex flex-col items-start leading-none">
                    <span className="text-red-500 font-black text-lg tracking-tighter">LIVE</span>
                    <span className="text-white/40 text-[10px] font-bold uppercase tracking-widest">Workshop</span>
                  </div>
                </div>
                
                <button 
                  onClick={() => window.location.href='/form'}
                  className="w-full sm:flex-1 py-4 px-8 bg-gradient-to-r from-[#75c13f] to-[#5da432] hover:from-[#75c13f] hover:to-[#5da432] text-gray-900 font-black uppercase tracking-wider rounded-2xl shadow-[0_0_20px_rgba(117,193,63,0.3)] hover:shadow-[0_0_30px_rgba(117,193,63,0.5)] transition-all duration-300 transform hover:scale-[1.02] active:scale-95 cursor-pointer animate-btn-breath"
                >
                  Register Now — Free
                </button>
              </div>

              {/* Mentor Info Card */}
              <div className="flex items-center justify-center lg:justify-start gap-6 pt-4">
                <div className="h-12 w-[1px] bg-gradient-to-b from-transparent via-white/20 to-transparent hidden sm:block" />
                <div className="text-center lg:text-left">
                  <p className="text-[#75c13f] text-[10px] font-bold tracking-[0.2em] uppercase">
                    ₹10,000 VALUE PROGRAM
                  </p>
                  <p className="text-white/60 text-sm">
                    Mentored by <span className="text-white font-bold text-lg block sm:inline">Mr. Suresh Latiyal</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Right Content - Mentor Image */}
            <div className="relative order-1 lg:order-2 flex justify-center items-center">
              <div className="relative w-64 sm:w-80 lg:w-[400px] aspect-[4/5]">
                {/* Decorative Glow */}
                <div className="absolute inset-0 bg-emerald-500/20 rounded-[3rem] blur-3xl -z-10 animate-pulse" />
                
                {/* Image Wrapper */}
                <div className="relative h-full w-full rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl">
                  <img
                    src="/neerajSirImg.png"
                    alt="Mr. Suresh Latiyal"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  /> 
                  <div className="absolute inset-0 bg-gradient-to-t from-[#06090f] via-transparent to-transparent opacity-60" />
                </div>

                {/* Floating Stat 1 */}
                <div className="absolute -left-6 top-1/4 backdrop-blur-md bg-white/10 border border-white/20 p-3 sm:p-4 rounded-2xl shadow-2xl animate-bounce-slow">
                  <p className="text-xl sm:text-2xl font-black text-[#75c13f] leading-none">2700+</p>
                  <p className="text-[10px] sm:text-xs font-bold text-white/70 uppercase mt-1">Students</p>
                </div>

                {/* Floating Stat 2 */}
                <div className="absolute -right-6 bottom-1/4 backdrop-blur-md bg-white/10 border border-white/20 p-3 sm:p-4 rounded-2xl shadow-2xl animate-bounce-slow delay-700">
                  <p className="text-xl sm:text-2xl font-black text-[#75c13f] leading-none">14+</p>
                  <p className="text-[10px] sm:text-xs font-bold text-white/70 uppercase mt-1">Years Exp.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>

      <style jsx>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes btn-breath {
          0%, 100% { 
            box-shadow: 0 12px 28px rgba(117, 193, 63, 0.4), 0 8px 16px rgba(117, 193, 63, 0.2);
          }
          50% { 
            box-shadow: 0 12px 32px rgba(117, 193, 63, 0.6), 0 10px 20px rgba(117, 193, 63, 0.3);
          }
        }
        
        .animate-btn-breath {
          animation: btn-breath 2s ease-in-out infinite;
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default HeroDesktop;
