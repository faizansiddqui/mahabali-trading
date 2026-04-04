"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  CheckCircle2,
  Loader2,
  Pause,
  Play,
  PlayCircle,
  ShieldCheck,
  Volume2,
  VolumeX,
} from "lucide-react";
import { useRouter } from "next/navigation";

const COURSE_PRICE = 999;
const STRUCK_PRICE = 4999;
const MENTOR_VIDEO_URL = (
  process.env.NEXT_PUBLIC_MENTOR_VIDEO_URL || "/intro.mp4"
).trim();

function loadRazorpayScript() {
  return new Promise((resolve) => {
    if (window.Razorpay) return resolve(true);
    const existing = document.getElementById("razorpay-checkout-script");
    if (existing) {
      existing.addEventListener("load", () => resolve(true), { once: true });
      return;
    }
    const script = document.createElement("script");
    script.id = "razorpay-checkout-script";
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export default function CourseHero() {
  const router = useRouter();
  const videoRef = useRef(null);
  const paymentCompletedRef = useRef(false);
  const [ready, setReady] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [hasStarted, setHasStarted] = useState(false);
  const [showPoster, setShowPoster] = useState(true);
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

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    let mounted = true;
    loadRazorpayScript().then((loaded) => mounted && setReady(loaded));
    return () => {
      mounted = false;
    };
  }, []);

  const trustPoints = useMemo(
    () => ["2700+ Students", "14 Year Experience", "Real Market Learning"],
    [],
  );

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    if (error) setError("");
  };

  const togglePlay = async () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      if (!hasStarted) {
        video.muted = false;
        setIsMuted(false);
      }
      try {
        await video.play();
        setIsPlaying(true);
        setHasStarted(true);
        setShowPoster(false);
      } catch {
        setIsPlaying(false);
      }
      return;
    }

    video.pause();
    setIsPlaying(false);
  };

  const toggleMute = (event) => {
    event.stopPropagation();
    const video = videoRef.current;
    if (!video) return;

    const nextMuted = !video.muted;
    video.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  const handleEnded = () => {
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = 0;
    video.pause();
    setIsPlaying(false);
    setShowPoster(false);
  };

  const openCheckout = async (event) => {
    event.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.phone.trim()) {
      setError("Please fill name, email, and phone.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/razorpay/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message || "Unable to create order.");
      }

      if (!ready || !window.Razorpay) {
        throw new Error(
          "Payment checkout is still loading. Please try again in a moment.",
        );
      }

      paymentCompletedRef.current = false;

      const options = {
        key: result.keyId,
        amount: result.order.amount,
        currency: result.order.currency,
        name: "Trading Course",
        description: result.courseName,
        order_id: result.order.id,
        prefill: {
          name: form.name,
          email: form.email,
          contact: form.phone,
        },
        theme: { color: "#d9ff3f" },
        modal: {
          ondismiss: async () => {
            setLoading(false);
            if (paymentCompletedRef.current) return;
            try {
              await fetch("/api/razorpay/status", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  ...form,
                  paymentStatus: "Cancel",
                }),
              });
            } catch {
              // Ignore tracking failure so checkout UX is unaffected.
            }
          },
        },
        handler: async (paymentResponse) => {
          try {
            const verifyResponse = await fetch("/api/razorpay/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                ...paymentResponse,
                ...form,
              }),
            });
            const verifyResult = await verifyResponse.json();

            if (!verifyResult.success) {
              throw new Error(
                verifyResult.message || "Payment verification failed.",
              );
            }

            paymentCompletedRef.current = true;

            if (typeof window !== "undefined") {
              localStorage.setItem(
                "courseThankyouData",
                JSON.stringify({
                  name: form.name.trim(),
                  email: form.email.trim().toLowerCase(),
                  phone: form.phone.trim(),
                  timestamp: new Date().toISOString(),
                  courseName: "Learn Trading in ₹999",
                  paymentId: paymentResponse.razorpay_payment_id,
                  orderId: paymentResponse.razorpay_order_id,
                }),
              );
            }

            router.push("/courses/thank-you");
          } catch (paymentError) {
            setError(paymentError?.message || "Payment verification failed.");
            setLoading(false);
          }
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (submitError) {
      setError(submitError?.message || "Something went wrong.");
      setLoading(false);
    }
  };

  return (
    <>
      {/* --- Header Desktop--- */}
      <header
        className={`fixed inset-x-0 hidden top-0 z-[100] transition-all duration-500 transform lg:block ${
          headerVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="backdrop-blur-md bg-black/20 border-b border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl overflow-hidden ring-2 ring-emerald-500/20 shadow-lg shadow-emerald-500/10">
                <img
                  src="/finalLogo.png"
                  alt="Mahhabali"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h2 className="text-white text-base sm:text-xl font-bold leading-tight tracking-tight">
                  Mahhabali Education
                </h2>
                <p className="text-emerald-400 text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase"></p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-white text-sm sm:text-xl font-black italic">
                INDIA'S <span className="text-[#75c13f]">№1</span>
              </div>
              <p className="text-white/50 text-[9px] sm:text-[11px] font-bold tracking-widest uppercase">
                Price Behavior
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Header Mobile */}
      <header
        className={`fixed left-0 w-full z-[9999] bg-[hsl(220_20%_15%_/_0.6)] backdrop-blur-xl border-b border-white/10 shadow-2xl transition-transform duration-300 ease-in-out lg:hidden ${
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

      <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(217,255,63,0.16),_transparent_30%),linear-gradient(180deg,#0b0f14_0%,#111824_100%)] px-4 py-5 pt-25 text-white md:py-6 md:pt-20">
        <div className="mx-auto grid max-w-7xl items-center gap-1 lg:gap-10 lg:grid-cols-2">
          <div className="space-y-6">
            {/* <div className="inline-flex items-center gap-2 rounded-full border border-[#d9ff3f]/20 bg-[#d9ff3f]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#d9ff3f]">
            <Star className="h-4 w-4" /> Learn Trading in ₹999
          </div> */}
            <div className="space-y-3">
              <h1 className="max-w-3xl text-4xl font-black leading-tight md:text-6xl">
                PRICE BEHAVIOUR{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#75c13f] to-[#5da432]">
                  MASTERY
                </span>
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-200 md:text-2xl">
                A 10-day system that teaches you how to understand the market.
              </p>
            </div>

            <div className="hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-2xl backdrop-blur lg:block">
              <div className="flex flex-wrap items-end gap-4">
                <span className="text-2xl font-semibold text-slate-400 line-through">
                  ₹{STRUCK_PRICE}
                </span>
                <h2 className="text-white text-4xl sm:text-5xl font-black tracking-tighter italic drop-shadow-2xl">
                  <span className="text-[#75c13f]">₹999</span>
                </h2>
              </div>
              <p className="mt-2 text-sm text-slate-300">
                One-time payment. Limited seats. Real market learning.
              </p>
            </div>

            <form
              onSubmit={openCheckout}
              className="hidden space-y-4 rounded-[2rem] border border-white/10 bg-black/20 p-6 lg:block"
            >
              <div className="grid gap-4 md:grid-row-3">
                <input
                  name="name"
                  value={form.name}
                  onChange={updateField}
                  placeholder="Your name"
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none placeholder:text-slate-500"
                />
                <input
                  name="email"
                  value={form.email}
                  onChange={updateField}
                  type="email"
                  placeholder="Email address"
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none placeholder:text-slate-500"
                />
                <input
                  name="phone"
                  value={form.phone}
                  onChange={updateField}
                  type="tel"
                  placeholder="Phone number"
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none placeholder:text-slate-500"
                />
              </div>
              {error ? <p className="text-sm text-red-300">{error}</p> : null}
              <button
                disabled={loading}
                className="flex w-full items-center justify-center gap-3 px-2 py-4 md:py-4 md:px-8  bg-gradient-to-r from-[#75c13f] to-[#5da432] hover:from-[#75c13f] hover:to-[#5da432] text-gray-900 font-black uppercase tracking-wider rounded-2xl shadow-[0_0_20px_rgba(117,193,63,0.3)] hover:shadow-[0_0_30px_rgba(117,193,63,0.5)] transition-all duration-300 transform hover:scale-[1.02] active:scale-95 cursor-pointer animate-btn-breath"
              >
                {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : null}
                <h2 className="text-white text-2xl sm:text-2xl font-black tracking-tighter italic drop-shadow-2xl">
                  Enroll Now <span>- ₹999</span>
                </h2>
              </button>
              <p className="text-xs leading-6 text-slate-400">
                By continuing, you agree to receive course updates on WhatsApp
                and email.
              </p>
            </form>

            {/* <div className="hidden grid gap-3  sm:grid-cols-3 lg:block">
              {trustPoints.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3"
                >
                  <CheckCircle2 className="h-5 w-5 text-[#75c13f]" />
                  <span className="text-sm font-medium text-slate-200">
                    {item}
                  </span>
                </div>
              ))}
            </div> */}
          </div>

          <div className="mx-auto w-full max-w-[22rem]">
            <div className="overflow-hidden rounded-[2rem] border border-[#75c13f]/25 bg-black/40 p-3 shadow-[0_30px_100px_rgba(0,0,0,0.55)]">
              <div className="relative aspect-[9/16] overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#111923]">
                {MENTOR_VIDEO_URL.includes("youtube") ||
                MENTOR_VIDEO_URL.includes("youtu.be") ? (
                  <iframe
                    title="Mentor intro video"
                    src={MENTOR_VIDEO_URL}
                    className="h-full w-full"
                    allow="autoplay; encrypted-media; picture-in-picture"
                    allowFullScreen
                  />
                ) : MENTOR_VIDEO_URL ? (
                  <div
                    className="group relative h-full w-full cursor-pointer"
                    onClick={togglePlay}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        togglePlay();
                      }
                    }}
                  >
                    <video
                      ref={videoRef}
                      className="h-full w-full pt-6 object-cover content-center"
                      playsInline
                      src={MENTOR_VIDEO_URL}
                      muted={isMuted}
                      poster={
                        showPoster
                          ? process.env.NEXT_PUBLIC_MENTOR_VIDEO_POSTER || ""
                          : ""
                      }
                      onPlay={() => setIsPlaying(true)}
                      onPause={() => setIsPlaying(false)}
                      onEnded={handleEnded}
                    />

                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/10" />

                    {!isPlaying ? (
                      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-black/55 text-white ring-1 ring-white/20 backdrop-blur-sm transition-transform duration-300 group-hover:scale-105">
                          <Play className="ml-1 h-8 w-8" />
                        </div>
                      </div>
                    ) : null}

                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation();
                          togglePlay();
                        }}
                        className="inline-flex items-center justify-center rounded-full bg-black/55 p-2 text-white ring-1 ring-white/20 backdrop-blur-sm"
                        aria-label={isPlaying ? "Pause video" : "Play video"}
                      >
                        {isPlaying ? (
                          <Pause className="h-4 w-4" />
                        ) : (
                          <Play className="h-4 w-4" />
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={toggleMute}
                        className="inline-flex items-center justify-center rounded-full bg-black/55 p-2 text-white ring-1 ring-white/20 backdrop-blur-sm"
                        aria-label={isMuted ? "Unmute video" : "Mute video"}
                      >
                        {isMuted ? (
                          <VolumeX className="h-4 w-4" />
                        ) : (
                          <Volume2 className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex h-full flex-col items-center justify-center gap-4 p-8 text-center">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#75c13f]/10 text-[#75c13f]">
                      <PlayCircle className="h-10 w-10" />
                    </div>
                    <div>
                      <p className="text-lg font-black">Mentor Intro Video</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-4 rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-5 text-center">
              <p className="mt-2 text-lg font-bold text-slate-100">
                2700+ Students | 14 Year Experience | Real Market Learning
              </p>
              <div className="mt-4 flex items-center justify-center gap-2 text-sm text-slate-400">
                <ShieldCheck className="h-4 w-4 text-[#75c13f]" /> Secure
                Razorpay Payment
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 mt-4 shadow-2xl backdrop-blur lg:hidden">
              <div className="flex flex-wrap items-end gap-4">
                <span className="text-2xl font-semibold text-slate-400 line-through">
                  ₹{STRUCK_PRICE}
                </span>
                <h2 className="text-white text-4xl sm:text-5xl font-black tracking-tighter italic drop-shadow-2xl">
                  <span className="text-[#75c13f]">₹999</span>
                </h2>
              </div>
              <p className="mt-2 text-sm text-slate-300">
                One-time payment. Limited seats. Real market learning.
              </p>
            </div>

            <form
              onSubmit={openCheckout}
              className="mt-4 space-y-4 rounded-[2rem] border border-white/10 bg-black/20 p-6 lg:hidden"
            >
              <div className="grid gap-4 md:grid-row-3">
                <input
                  name="name"
                  value={form.name}
                  onChange={updateField}
                  placeholder="Your name"
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none placeholder:text-slate-500"
                />
                <input
                  name="email"
                  value={form.email}
                  onChange={updateField}
                  type="email"
                  placeholder="Email address"
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none placeholder:text-slate-500"
                />
                <input
                  name="phone"
                  value={form.phone}
                  onChange={updateField}
                  type="tel"
                  placeholder="Phone number"
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none placeholder:text-slate-500"
                />
              </div>
              {error ? <p className="text-sm text-red-300">{error}</p> : null}
              <button
                disabled={loading}
                className="flex w-full items-center justify-center gap-3 px-2 py-4 md:px-8 md:py-4  bg-gradient-to-r from-[#75c13f] to-[#5da432] hover:from-[#75c13f] hover:to-[#5da432] text-gray-900 font-black uppercase tracking-wider rounded-2xl shadow-[0_0_20px_rgba(117,193,63,0.3)] hover:shadow-[0_0_30px_rgba(117,193,63,0.5)] transition-all duration-300 transform hover:scale-[1.02] active:scale-95 cursor-pointer animate-btn-breath"
              >
                {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : null}
                <h2 className="text-white text-2xl sm:text-2xl font-black tracking-tighter italic drop-shadow-2xl">
                  Enroll Now <span>- ₹999</span>
                </h2>
              </button>
              <p className="text-xs leading-6 text-slate-400">
                By continuing, you agree to receive course updates on WhatsApp
                and email.
              </p>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
