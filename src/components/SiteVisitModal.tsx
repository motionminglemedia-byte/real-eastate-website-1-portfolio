"use client";

import React, { useState, useEffect } from "react";
import { X, Calendar, CheckCircle2, MapPin, Sparkles, Send } from "lucide-react";

interface SiteVisitModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SiteVisitModal({ isOpen, onClose }: SiteVisitModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    estate: "Villa Amara (Paphos Coastline)",
    date: "",
    chauffeur: true,
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl animate-fade-in">
      <div 
        className="relative w-full max-w-lg bg-[#0c1017] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors focus:outline-none"
          aria-label="Close booking modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-12 flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-300">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-3xl text-white">Private Visit Requested</h3>
            <p className="text-sm text-zinc-300 max-w-sm">
              Our architectural concierge will contact you within 2 business hours to finalize your private itinerary and transportation.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/25 text-amber-300 text-[10px] font-mono tracking-[0.2em] uppercase mb-2">
                <Sparkles className="w-3 h-3 text-amber-300" />
                <span>PRIVATE CONCIERGE</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal">
                Book a Site Visit
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 font-light mt-1">
                Experience the location, coastline views, and architectural masonry in person.
              </p>
            </div>

            <div className="space-y-4 text-xs">
              {/* Full Name */}
              <div>
                <label className="block text-[10px] font-mono uppercase tracking-widest text-zinc-400 mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Lord Alexander Wright"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/15 text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-widest text-zinc-400 mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="alex@domain.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/15 text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-widest text-zinc-400 mb-1.5">
                    Phone / WhatsApp
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+44 7911 123456"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/15 text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>
              </div>

              {/* Estate Preference */}
              <div>
                <label className="block text-[10px] font-mono uppercase tracking-widest text-zinc-400 mb-1.5">
                  Estate of Interest
                </label>
                <select
                  value={formData.estate}
                  onChange={(e) => setFormData({ ...formData, estate: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#111620] border border-white/15 text-white focus:outline-none focus:border-amber-400 transition-colors"
                >
                  <option value="Villa Amara (Paphos Coastline)">Villa Amara — Paphos Coastline (6 Bed)</option>
                  <option value="Hillside Haven (Limassol Heights)">Hillside Haven — Limassol Heights (5 Bed)</option>
                  <option value="Secret Haven (Akamas Peninsula)">Secret Haven — Akamas Peninsula (4 Bed)</option>
                  <option value="Coast Villa (Coral Bay)">Coast Villa — Coral Bay (7 Bed)</option>
                  <option value="Bespoke Architectural Commission">Bespoke Architectural Land & Commission</option>
                </select>
              </div>

              {/* Preferred Date & Chauffeur Checkbox */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-widest text-zinc-400 mb-1.5">
                    Target Date
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl bg-white/[0.03] border border-white/15 text-white focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>

                <div className="sm:pt-5">
                  <label className="flex items-center gap-2.5 cursor-pointer text-xs text-zinc-300">
                    <input
                      type="checkbox"
                      checked={formData.chauffeur}
                      onChange={(e) => setFormData({ ...formData, chauffeur: e.target.checked })}
                      className="w-4 h-4 rounded bg-white/10 border-white/20 text-amber-500 focus:ring-0 focus:ring-offset-0 cursor-pointer"
                    />
                    <span>Request Larnaca/Paphos VIP Airport Chauffeur</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Submit CTA */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-amber-400 text-black hover:bg-amber-300 transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-400/20"
              >
                <span>Confirm Visit Request</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

