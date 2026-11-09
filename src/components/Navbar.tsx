"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ArrowUpRight } from "lucide-react";
import SiteVisitModal from "./SiteVisitModal";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [siteVisitOpen, setSiteVisitOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-[#090c10]/80 backdrop-blur-xl border-b border-white/[0.08] shadow-2xl py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
          {/* Brand Logo */}
          <Link 
            href="/" 
            className="flex items-center gap-3 group text-white transition-opacity hover:opacity-90"
          >
            {/* Architectural Icon Mark */}
            <div className="w-7 h-7 rounded-sm border border-amber-400/50 flex items-center justify-center p-1 bg-amber-400/5 relative group-hover:border-amber-300 transition-colors">
              <div className="w-full h-full border border-white/20 flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-amber-300 rotate-45" />
              </div>
            </div>
            <span className="font-sans font-bold tracking-[0.22em] text-xs uppercase text-zinc-100 group-hover:text-white transition-colors">
              PHEME ESTATE
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 px-6 py-2 rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-md shadow-2xl">
            <Link
              href="#home"
              className="text-xs uppercase tracking-[0.18em] text-zinc-100 font-medium hover:text-amber-300 transition-colors relative group py-1"
            >
              Home
              <span className="absolute -bottom-0.5 left-0 w-full h-[1.5px] bg-amber-400 rounded-full scale-x-100 transition-transform origin-left" />
            </Link>
            <Link
              href="#projects"
              className="text-xs uppercase tracking-[0.18em] text-zinc-400 font-medium hover:text-zinc-100 transition-colors relative group py-1"
            >
              Projects
              <span className="absolute -bottom-0.5 left-0 w-full h-[1.5px] bg-amber-400 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </Link>
            <Link
              href="#impact"
              className="text-xs uppercase tracking-[0.18em] text-zinc-400 font-medium hover:text-zinc-100 transition-colors relative group py-1"
            >
              Impact
              <span className="absolute -bottom-0.5 left-0 w-full h-[1.5px] bg-amber-400 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </Link>
            <Link
              href="#about"
              className="text-xs uppercase tracking-[0.18em] text-zinc-400 font-medium hover:text-zinc-100 transition-colors relative group py-1"
            >
              About
              <span className="absolute -bottom-0.5 left-0 w-full h-[1.5px] bg-amber-400 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </Link>
          </nav>

          {/* Right CTA */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => setSiteVisitOpen(true)}
              className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-medium tracking-wide uppercase text-amber-200/95 border border-amber-400/40 bg-amber-500/[0.06] hover:bg-amber-400/15 hover:border-amber-300 transition-all duration-300 shadow-[0_0_20px_-5px_rgba(234,179,8,0.25)] focus:outline-none"
            >
              <span>Book a site visit</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-amber-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-zinc-300 hover:text-white focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden px-6 py-6 bg-[#0c1017]/95 border-b border-white/10 backdrop-blur-xl">
            <nav className="flex flex-col gap-4">
              <Link
                href="#home"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm uppercase tracking-widest text-amber-300 font-medium"
              >
                Home
              </Link>
              <Link
                href="#projects"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm uppercase tracking-widest text-zinc-300 hover:text-white"
              >
                Projects
              </Link>
              <Link
                href="#impact"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm uppercase tracking-widest text-zinc-300 hover:text-white"
              >
                Impact
              </Link>
              <Link
                href="#about"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm uppercase tracking-widest text-zinc-300 hover:text-white"
              >
                About
              </Link>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setSiteVisitOpen(true);
                }}
                className="mt-2 text-center py-3 rounded-full text-xs font-semibold tracking-wider uppercase text-amber-200 border border-amber-400/40 bg-amber-500/10 focus:outline-none"
              >
                Book a site visit
              </button>
            </nav>
          </div>
        )}
      </header>

      {/* Site Visit Booking Modal */}
      <SiteVisitModal
        isOpen={siteVisitOpen}
        onClose={() => setSiteVisitOpen(false)}
      />
    </>
  );
}
