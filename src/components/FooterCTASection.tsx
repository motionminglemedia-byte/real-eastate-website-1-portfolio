"use client";

import React from "react";
import { ArrowUpRight, Download, Mail, Phone, MapPin, ArrowUp } from "lucide-react";

export default function FooterCTASection() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="contact" className="relative z-10 w-full pt-28 pb-12 border-t border-white/10 overflow-hidden bg-black/40 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Top CTA Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start pb-20 border-b border-white/10">
          {/* Left Column: Heading and Action Buttons */}
          <div className="lg:col-span-7 space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/25 text-amber-300 text-[11px] font-mono tracking-[0.2em] uppercase">
              <span>09 • COMMENCE YOUR ESTATE</span>
            </div>

            <h2 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-white leading-[1.04]">
              Start{" "}
              <span className="font-serif italic font-normal text-amber-200/90 text-glow">
                yours.
              </span>
            </h2>

            <p className="max-w-xl text-base sm:text-lg md:text-xl text-zinc-300/90 font-light leading-relaxed">
              Book a private consultation with our architectural team. We&apos;ll walk you through land selection, custom design, and turnkey delivery.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="mailto:consultation@pheme-estate.com"
                className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-amber-400 text-black hover:bg-amber-300 transition-all duration-300 shadow-[0_0_30px_-5px_rgba(251,191,36,0.4)] hover:shadow-[0_0_40px_0px_rgba(251,191,36,0.6)]"
              >
                <span>Book a consultation</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <a
                href="#brochure"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full text-xs font-semibold tracking-wider uppercase text-zinc-300 hover:text-white bg-white/[0.03] hover:bg-white/[0.08] border border-white/15 hover:border-white/30 transition-all duration-300"
              >
                <Download className="w-4 h-4 text-amber-300" />
                <span>Download Portfolio</span>
              </a>
            </div>
          </div>

          {/* Right Column: Contact Details & Office Location */}
          <div className="lg:col-span-5 flex flex-col space-y-8 lg:pl-10">
            <div className="space-y-3">
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-amber-400">
                HEADQUARTERS & ATELIER
              </span>
              <div className="flex items-start gap-3 text-zinc-300">
                <MapPin className="w-4 h-4 text-amber-400 mt-1 flex-shrink-0" />
                <div className="text-sm leading-relaxed">
                  <div className="font-medium text-white">Limassol, Cyprus</div>
                  <div className="text-zinc-400">Seafront Boulevard 48, 3036 Limassol</div>
                  <div className="text-zinc-500 text-xs mt-1">Private viewings by prior appointment</div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-amber-400">
                DIRECT INQUIRIES
              </span>
              <div className="space-y-2">
                <a
                  href="mailto:info@pheme-estate.com"
                  className="flex items-center gap-3 text-sm text-zinc-300 hover:text-amber-200 transition-colors group"
                >
                  <Mail className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                  <span>info@pheme-estate.com</span>
                </a>
                <a
                  href="tel:+35725000000"
                  className="flex items-center gap-3 text-sm text-zinc-300 hover:text-amber-200 transition-colors group"
                >
                  <Phone className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                  <span>+357 25 000 000</span>
                </a>
              </div>
            </div>

            <div className="pt-2 border-t border-white/10">
              <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
                LANGUAGES SPOKEN: ENGLISH • GREEK • GERMAN • RUSSIAN
              </div>
            </div>
          </div>
        </div>

        {/* Monumental Watermark Text: PHEME (Matching Video Frame 00:19) */}
        <div className="w-full overflow-hidden select-none pointer-events-none py-8 md:py-12 flex justify-center">
          <span className="font-sans font-black tracking-tighter text-[22vw] leading-none text-transparent bg-clip-text bg-gradient-to-b from-white/[0.08] to-transparent block text-center">
            PHEME
          </span>
        </div>

        {/* Bottom Legal and Navigation Row */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-400">
          <div>
            © {new Date().getFullYear()} PHEME Estate Cyprus. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <a href="#privacy" className="hover:text-zinc-200 transition-colors">
              Privacy Policy
            </a>
            <a href="#terms" className="hover:text-zinc-200 transition-colors">
              Terms of Service
            </a>
            <a href="#disclosures" className="hover:text-zinc-200 transition-colors">
              Disclosures
            </a>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-zinc-400 hover:text-amber-300 transition-colors focus:outline-none"
            aria-label="Back to top"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}

