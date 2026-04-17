import React from "react";
import {
  TrendingUp,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Shield,
  Award,
  Users,
} from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative bg-[#0a0a0a] text-white overflow-hidden mb-30 sm:mb-14">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#1a1a1a] via-[#0a0a0a] to-[#0a0a0a]"></div>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#C5FF00]/5 rounded-full blur-[120px] animate-pulse"></div>
        <div
          className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-[#C5FF00]/3 rounded-full blur-[120px] animate-pulse"
          style={{ animationDelay: "1000ms" }}
        ></div>
      </div>

      <div className="relative z-10 border-t border-[#C5FF00]/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          {/* Bottom Bar */}
          <div className="pt-8 border-t border-[#C5FF00]/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <div className="flex items-center gap-2 text-gray-400">
              <Users className="w-4 h-4 text-[#75c13f]" />
              <span>Join 25K+ Happy Traders</span>
            </div>
            <div className="text-center">
              <p className="text-gray-400">
                © 2025{" "}
                <span className="text-[#75c13f] font-semibold">
                  Mahhabali Education
                </span>
                . All rights reserved.
              </p>
              <p className="text-[10px] text-stone-400 font-bold uppercase tracking-[0.2em] mt-1">
                Developed by <b>Akamify</b>
              </p>
            </div>
            <div className="flex items-center gap-4 text-gray-400">
              <Link
                href="/privacy-policy"
                className="hover:text-[#C5FF00] transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms-of-service"
                className="hover:text-[#C5FF00] transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient Line */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#C5FF00]/30 to-transparent"></div>
    </footer>
  );
}
