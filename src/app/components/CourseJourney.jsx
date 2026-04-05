"use client";

import {
  ArrowRight,
  BadgeCheck,
  Clock3,
  ShieldCheck,
  Sparkles,
  Target,
} from "lucide-react";

const transformation = [
  "Confident trading decisions",
  "Correct entry and exit logic",
  "Better loss control",
  "Clear trend understanding",
];

export default function CourseJourney() {
  return (
    <section className="px-4 py-6 bg-[#0b0f14]">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 md:p-8">
            {/* <div className="inline-flex items-center gap-2 rounded-full border border-[#d9ff3f]/20 bg-[#d9ff3f]/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-[#d9ff3f]">
              Transformation
            </div> */}
            <h2 className="mt-4 text-3xl font-black md:text-4xl">
              What Changes After This Course
            </h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {transformation.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 p-4"
                >
                  <BadgeCheck className="h-5 w-5 text-[#75c13f]" />
                  <span className="text-sm font-medium text-slate-100">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-[#d9ff3f]/20 bg-gradient-to-br from-[#111923] to-[#0f141b] p-6 md:p-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-white/70">
              Mentor
            </div>
            <h3 className="mt-4 text-2xl font-bold text-[#75c13f] md:text-3xl">
              Suresh Latiyal
            </h3>
            <p className="mt-2 text-sm leading-7 text-gray-400 md:text-base">
              Experienced trader and mentor guiding students through real market
              reading, execution, and decision-making.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 text-[#75c13f]">
              <Meta icon={Clock3} text="10 Days Training" />
              <Meta icon={Target} text="Live Examples" />
              <Meta icon={Sparkles} text="Strategy + Execution" />
              <Meta icon={ShieldCheck} text="Real Market Learning" />
            </div>
          </div>
        </div>

        <div className="grid gap-6">
          {/* <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 md:p-8">
            <h3 className="text-2xl font-black md:text-3xl">Offer</h3>
            <p className="mt-3 text-sm leading-7 text-slate-300 md:text-base">
              10 Days Training | Live Examples | Strategy + Execution. The
              system is designed to make the learning practical, not
              theoretical.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#75c13f]">
              <span className="rounded-full border border-[#75c13f]/20 bg-[#75c13f]/10 px-4 py-2">
                Limited Seats
              </span>
              <span className="rounded-full border border-[#75c13f]/20 bg-[#75c13f]/10 px-4 py-2">
                Batch Closing Soon
              </span>
            </div>
          </div> */}

          <div className="rounded-[2rem] border border-[#75c13f]/20 bg-gradient-to-br from-[#75c13f]/10 to-transparent p-6 md:p-8">
             <h3 className="text-2xl font-black md:text-3xl">Offer</h3>
            <p className="mt-3 text-sm leading-7 text-slate-300 md:text-base">
              10 Days Training | Live Examples | Strategy + Execution. The
              system is designed to make the learning practical, not
              theoretical.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#75c13f]">
              <span className="rounded-full border border-[#75c13f]/20 bg-[#75c13f]/10 px-4 py-2">
                Limited Seats
              </span>
              <span className="rounded-full border border-[#75c13f]/20 bg-[#75c13f]/10 px-4 py-2">
                Batch Closing Soon
              </span>
            </div>
            <a
              href="/courses/form"
              className="mt-6 items-center justify-center gap-2 flex w-full items-center justify-center py-3 px-4 md:py-4 md:px-8  bg-gradient-to-r from-[#75c13f] to-[#5da432] hover:from-[#75c13f] hover:to-[#5da432] text-gray-900 font-black uppercase tracking-wider rounded-2xl shadow-[0_0_20px_rgba(117,193,63,0.3)] hover:shadow-[0_0_30px_rgba(117,193,63,0.5)] transition-all duration-300 transform hover:scale-[1.02] active:scale-95 cursor-pointer animate-btn-breath"
            >
              Secure Now - ₹999
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Meta({ icon: Icon, text }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 p-4">
      <Icon className="h-5 w-5 text-[#75c13f]" />
      <span className="text-sm font-medium text-slate-100">{text}</span>
    </div>
  );
}
