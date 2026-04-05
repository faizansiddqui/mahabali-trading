"use client";

import { useEffect, useState } from "react";
import { ChevronRight, Clock } from "lucide-react";
import Link from "next/link";
import CourseHero from "../components/CourseHero";
import VideoTestimonials from "../components/VideoTestimonials";
import CoursePainPoints from "../components/CoursePainPoints";
import CourseContent from "../components/CourseContent";
import CourseJourney from "../components/CourseJourney";

const INITIAL_TIMER = 30 * 60;

export default function CoursePage() {
  const [remainingTime, setRemainingTime] = useState(INITIAL_TIMER);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const savedTimer = localStorage.getItem("coursePageTimer");
    const parsedTimer = savedTimer ? parseInt(savedTimer, 10) : NaN;

    if (parsedTimer > 0 && parsedTimer !== INITIAL_TIMER) {
      const timeoutId = setTimeout(() => {
        setRemainingTime(parsedTimer);
      }, 0);
      return () => clearTimeout(timeoutId);
    }
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime((prev) => {
        const newTime = prev - 1;

        if (newTime <= 0) {
          const resetTime = INITIAL_TIMER;
          if (typeof window !== "undefined") {
            localStorage.setItem("coursePageTimer", resetTime.toString());
          }
          return resetTime;
        }

        if (typeof window !== "undefined") {
          localStorage.setItem("coursePageTimer", newTime.toString());
        }

        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, "0")}h ${mins
      .toString()
      .padStart(2, "0")}m ${secs.toString().padStart(2, "0")}s`;
  };

  return (
    <>
      <main className="bg-[#0b0f14] pb-24 text-white">
        <CourseHero />
        <VideoTestimonials />
        <CoursePainPoints />
        <CourseContent />
        <CourseJourney />
      </main>

      <div className="fixed bottom-0 left-0 z-[110] w-full border-t border-white/10 bg-black/80 backdrop-blur-xl shadow-[0_-10px_40px_rgba(0,0,0,0.4)]">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:py-4">
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="hidden rounded-xl bg-red-500/20 p-2 xs:block">
              <Clock className="h-5 w-5 animate-pulse text-red-500" />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 sm:text-xs">
                Offer Ends In
              </p>
              <p className="font-mono text-lg font-black tracking-tighter text-white tabular-nums sm:text-2xl">
                {formatTime(remainingTime)}
              </p>
            </div>
          </div>

          <Link
            href="/courses/form"
            className="relative group overflow-hidden rounded-xl sm:rounded-2xl bg-white px-5 py-3 text-sm font-black text-black transition-all duration-300 hover:bg-[#75c13f] hover:text-gray-900 active:scale-95 sm:px-8 sm:py-4 sm:text-lg"
          >
            <span className="pointer-events-none absolute inset-0 h-full w-full -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:animate-shimmer" />
            <span className="relative flex items-center gap-2">
              ENROLL <span className="hidden sm:inline">NOW</span>
              <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        </div>
      </div>

      <style jsx global>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%) skewX(-15deg);
          }
          100% {
            transform: translateX(200%) skewX(-15deg);
          }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </>
  );
}
