import React from 'react';

const highlights = [
  {
    title: "Read Charts Like Smart Traders",
    description: "Spot real buying & selling pressure before the move happens.",
    image: "/assets/whatlearnImg/graph-reading.png",
  },
  {
    title: "The Right Timeframe = The Right Trade",
    description: "Know which timeframe works, when, and why — no more confusion.",
    image: "/assets/whatlearnImg/time.png",
  },
  {
    title: "Decode Price Behavior (No Indicators)",
    description: "Understand moves, reversals & breakouts using pure price action.",
    image: "/assets/whatlearnImg/price-behavior.png",
  },
  {
    title: "Live Market, Live Learning",
    description: "Real charts. Real market. Real-time practical trading.",
    image: "/assets/whatlearnImg/market-education.png",
  },
  {
    title: "Simple, Clear & Beginner-Friendly Teaching",
    description: "Learn with an easy-to-understand method designed so anyone can follow and apply.",
    image: "/assets/whatlearnImg/simple.png",
  },
];

const TradingProgram = () => {
  return (
    <section className="py-20 sm:py-28 md:py-36 bg-gradient-to-b from-gray-50 to-white"> {/* Increased vertical padding */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center md:mb-20 lg:mb-24"> {/* Increased margins */}
          <span className="mb-6 inline-block rounded-full bg-[#75c13f]/10 px-4 py-2 text-sm font-medium uppercase tracking-wide text-[#75c13f] sm:px-5 sm:py-2.5"> {/* Increased text size and padding */}
            What You&apos;ll Learn
          </span>
          <h2 className="mb-6 text-4xl text-gray-900 font-bold tracking-tight sm:text-5xl md:text-6xl"> {/* Increased text size */}
            Market Education{" "}
            <span className="bg-gradient-to-r from-[#75c13f] to-[#5da432]  bg-clip-text text-transparent">
              Highlights
            </span>
          </h2>
          <p className="text-lg text-gray-600 sm:text-xl md:text-2xl max-w-2xl mx-auto"> {/* Increased text size */}
            Master the essential skills to trade confidently with our proven methodology.
          </p>
        </div>

        {/* Cards */}
        <div className="max-w-4xl mx-auto flex flex-col gap-6 sm:gap-7"> {/* Increased gaps between cards */}
          {highlights.map((item, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 lg:p-7 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02]" 
            >
              <div className="flex flex-row items-start gap-4 sm:gap-5 lg:gap-6"> {/* Changed to items-start for top alignment */}
                {/* Image - Always on left side */}
                <div className="shrink-0 w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-lg sm:rounded-xl bg-[#75c13f]/10 overflow-hidden group-hover:scale-105 transition-transform duration-300"> {/* Further increased image sizes for better visibility */}
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target;
                      target.style.display = 'none';
                    }}
                  />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900 leading-tight mb-2"> {/* Increased text size and margin */}
                    {item.title}
                  </h3>
                  <p className="text-[11px] sm:text-base  lg:text-lg text-gray-600 leading-relaxed"> {/* Increased text size */}
                    {item.description}
                  </p>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TradingProgram;