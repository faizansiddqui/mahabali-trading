"use client"
import { useState, useEffect } from 'react';
import { X, Play, CheckCircle, Users, Clock, Sparkles, TrendingUp } from 'lucide-react';

function CoursePopup() {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (!localStorage.getItem('coursePopupSeen')) {
            (window).coursePopupTimer = setTimeout(() => {
                setIsOpen(true);
            }, 0);
        }

        return () => {
            clearTimeout((window).coursePopupTimer);
        };
    }, []);

    const closePopup = (remindLater = false) => {
        setIsOpen(false);
        const delay = remindLater ? 5000 : 10000;
        (window).coursePopupTimer = setTimeout(() => {
            if (!localStorage.getItem('coursePopupSeen')) {
                setIsOpen(true);
            }
        }, delay);
    };

    const enrollNow = () => {
        window.open('https://www.mahabalipriceaction.info/courses.html', '_blank');
        setIsOpen(false);
        localStorage.setItem('coursePopupSeen', 'true');
        clearTimeout((window).coursePopupTimer);
    };

    const joinWebinar = () => {
        window.open('https://www.youtube.com/channel/UCEr2JtHOOOxmXCwUtVoz7jw/live', '_blank');
    };

    if (!isOpen) return null;

    return (
        <>
            <style>{`
        @keyframes slideDown {
          from {
            transform: translateY(-100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        @keyframes pulseGlow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(0, 217, 184, 0.4), 0 0 40px rgba(0, 217, 184, 0.2);
          }
          50% {
            box-shadow: 0 0 30px rgba(0, 217, 184, 0.6), 0 0 60px rgba(0, 217, 184, 0.3);
          }
        }
        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-5px);
          }
        }
        .slide-down {
          animation: slideDown 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .pulse-glow {
          animation: pulseGlow 2s infinite ease-in-out;
        }
        .shimmer {
          background: linear-gradient(
            90deg,
            rgba(255,255,255,0) 0%,
            rgba(255,255,255,0.1) 50%,
            rgba(255,255,255,0) 100%
          );
          background-size: 1000px 100%;
          animation: shimmer 3s infinite;
        }
        .float-animation {
          animation: float 3s ease-in-out infinite;
        }
        .neon-text {
          text-shadow:
            0 0 10px rgba(212, 255, 0, 0.8),
            0 0 20px rgba(212, 255, 0, 0.5),
            0 0 30px rgba(212, 255, 0, 0.3);
        }
        .neon-border {
          box-shadow:
            0 0 15px rgba(0, 217, 184, 0.6),
            0 0 30px rgba(0, 217, 184, 0.4),
            inset 0 0 15px rgba(0, 217, 184, 0.2);
        }
        .glass-effect {
          background: rgba(10, 47, 31, 0.85);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(0, 217, 184, 0.2);
        }
      `}</style>

            <div className="fixed top-0 left-0 w-full z-[9999] slide-down">
                <div className="relative bg-gradient-to-br from-[#0A2F1F] via-[#0D3D2A] to-[#084035] border-b-4 border-[#00D9B8] shadow-2xl overflow-hidden">
                    {/* Animated Background Elements */}
                    <div className="absolute inset-0 opacity-20">
                        <div className="absolute top-0 left-1/4 w-64 h-64 bg-[#00D9B8] rounded-full blur-3xl"></div>
                        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#D4FF00] rounded-full blur-3xl"></div>
                    </div>

                    <div className="shimmer absolute inset-0 pointer-events-none"></div>

                    <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5 lg:py-6">
                        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 lg:gap-6">
                            {/* Close Button - Mobile Top Right */}
                            <button
                                onClick={() => closePopup(false)}
                                className="absolute top-3 right-3 lg:hidden text-gray-300 hover:text-[#00D9B8] transition-all duration-300 hover:rotate-90 z-10"
                                aria-label="Close"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            {/* Course Image & Details */}
                            <div className="flex items-start gap-3 sm:gap-4 lg:gap-5 flex-1 w-full lg:w-auto">
                                <div className="relative flex-shrink-0 float-animation">
                                    <img
                                        src="https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=800"
                                        alt="Mahabali Price Action Course"
                                        className="w-20 h-16 sm:w-28 sm:h-20 lg:w-36 lg:h-28 rounded-2xl object-cover shadow-2xl neon-border transition-all duration-500 hover:scale-110"
                                        loading="lazy"
                                    />
                                    <div className="absolute -top-2 -right-2 bg-[#D4FF00] text-[#0A2F1F] rounded-full p-1.5 sm:p-2 shadow-lg">
                                        <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
                                    </div>
                                </div>

                                <div className="flex-1 min-w-0 pr-8 lg:pr-0">
                                    <div className="flex items-center gap-2 mb-1 sm:mb-2">
                                        <h3 className="text-base sm:text-xl lg:text-2xl xl:text-3xl font-extrabold text-[#D4FF00] neon-text leading-tight">
                                            Mahabali Price Action Mastery
                                        </h3>
                                        <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-[#D4FF00] flex-shrink-0 hidden sm:block" />
                                    </div>

                                    <p className="text-gray-200 text-xs sm:text-sm lg:text-base mb-2 sm:mb-3 font-semibold leading-relaxed">
                                        Transform Your Trading with Pure Price Action • Zero Indicators • Professional Mindset
                                    </p>

                                    <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-2 sm:mb-3">
                                        <div className="flex items-center gap-1.5 text-xs sm:text-sm text-[#00D9B8] font-semibold glass-effect px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg">
                                            <Users className="w-4 h-4" />
                                            <span>500+ Success Stories</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 text-xs sm:text-sm text-[#D4FF00] font-semibold">
                                            <Sparkles className="w-4 h-4" />
                                            <span>Limited Seats</span>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2 text-xs sm:text-sm">
                                        <div className="flex items-center gap-2 text-gray-100">
                                            <CheckCircle className="w-4 h-4 text-[#00D9B8] flex-shrink-0" />
                                            <span>Elite Demand & Supply Zones</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-100">
                                            <CheckCircle className="w-4 h-4 text-[#00D9B8] flex-shrink-0" />
                                            <span>Real Market Pressure Analysis</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-100">
                                            <CheckCircle className="w-4 h-4 text-[#00D9B8] flex-shrink-0" />
                                            <span>Master Market Rhythm</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-100">
                                            <CheckCircle className="w-4 h-4 text-[#00D9B8] flex-shrink-0" />
                                            <span>Dynamic S/R Techniques</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row lg:flex-col gap-2 sm:gap-3 w-full lg:w-auto lg:min-w-[200px] xl:min-w-[240px]">
                                <button
                                    onClick={enrollNow}
                                    className="relative overflow-hidden px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-[#00D9B8] to-[#00F5D4] text-[#0A2F1F] rounded-xl font-extrabold text-sm sm:text-base lg:text-lg transition-all duration-300 shadow-2xl transform hover:scale-105 pulse-glow group"
                                >
                                    <span className="relative z-10 flex items-center justify-center gap-2">
                                        Enroll Now
                                        <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-12 transition-transform" />
                                    </span>
                                    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                                </button>

                                <button
                                    onClick={joinWebinar}
                                    className="flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-white/10 backdrop-blur-md border-2 border-[#00D9B8] text-[#00D9B8] rounded-xl font-bold hover:bg-[#00D9B8]/20 hover:border-[#00F5D4] transition-all duration-300 text-sm sm:text-base shadow-lg group"
                                >
                                    <Play className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
                                    <span>Join Live Webinar</span>
                                </button>

                                <div className="hidden lg:flex  gap-3 items-start">
                                    <button
                                        onClick={() => closePopup(true)}
                                        className="flex items-center gap-2 text-gray-300 hover:text-[#00D9B8] transition-all duration-300 text-sm font-semibold hover:gap-3 group"
                                    >
                                        <Clock className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                                        <span>Remind Me Later</span>
                                    </button>
                                    <button
                                        onClick={() => closePopup(false)}
                                        className="text-gray-300 hover:text-[#00D9B8] transition-all duration-300 hover:rotate-90"
                                        aria-label="Close"
                                    >
                                        <X className="w-6 h-6" />
                                    </button>


                                    <button
                                        onClick={() => closePopup(true)}
                                        className="lg:hidden flex items-center justify-center gap-2 text-gray-300 hover:text-[#00D9B8] transition-all duration-300 text-sm font-semibold w-full py-2 border-t border-[#00D9B8]/20 -mx-4 px-4"
                                    >
                                        <Clock className="w-4 h-4" />
                                        <span>Remind Me Later</span>
                                    </button>
                                </div>




                            </div>

                            {/* Desktop Close & Remind Buttons */}


                            {/* Mobile Remind Button */}

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CoursePopup;
