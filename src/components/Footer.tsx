import React from 'react';
import { MapPin, Phone, Mail, ShieldCheck, ArrowUpRight, Lock } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-charcoal-950 border-t border-white/10 text-warmGray pt-16 pb-12 font-sans relative overflow-hidden">
      {/* Decorative background subtle glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyanBrand/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-14 border-b border-white/10">
          
          {/* Column 1: Identity & RERA */}
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="p-1 rounded bg-charcoal-850 border border-gold-500/30">
                <img src="/images/logo_badge.png" alt="KLOUD REALTY" className="h-10 w-auto" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-white tracking-wider">
                  KLOUD <span className="text-cyanBrand">REALTY</span>
                </h3>
                <p className="text-[10px] tracking-widest uppercase text-gold-400">
                  The Place to Find Your Place
                </p>
              </div>
            </div>

            <p className="text-xs text-warmGray leading-relaxed">
              Professional RERA-registered real estate advisory firm positioned in Mazgaon, Mumbai. Guiding clients with clarity, discretion, and diligence across all real estate stages.
            </p>

            <div className="p-3 rounded bg-charcoal-850/80 border border-gold-500/30 space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-gold-400 font-semibold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-cyanBrand" />
                <span>RERA Registered Firm</span>
              </div>
              <p className="text-xs text-white font-mono tracking-wider">
                A0311 72501659
              </p>
              <p className="text-[10px] text-warmGray">
                MahaRERA Registered Real Estate Consultant
              </p>
            </div>
          </div>

          {/* Column 2: Explore Properties */}
          <div>
            <h4 className="font-serif text-sm uppercase tracking-widest text-white mb-5 flex items-center gap-2">
              <span>Explore Properties</span>
              <span className="w-6 h-px bg-gold-500/60" />
            </h4>
            <ul className="space-y-3 text-xs">
              <li>
                <a href="#/buy" className="hover:text-gold-400 transition-colors flex items-center justify-between group">
                  <span>All Residential For Sale</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-gold-400" />
                </a>
              </li>
              <li>
                <a href="#/primary-market" className="hover:text-gold-400 transition-colors flex items-center justify-between group">
                  <span>Primary Market / New Projects</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-gold-400" />
                </a>
              </li>
              <li>
                <a href="#/resale" className="hover:text-gold-400 transition-colors flex items-center justify-between group">
                  <span>Resale Apartments & Penthouses</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-gold-400" />
                </a>
              </li>
              <li>
                <a href="#/rent" className="hover:text-gold-400 transition-colors flex items-center justify-between group">
                  <span>Curated High-End Rentals</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-gold-400" />
                </a>
              </li>
              <li>
                <a href="#/second-homes" className="hover:text-gold-400 transition-colors flex items-center justify-between group">
                  <span>Second Homes & Retreats</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-gold-400" />
                </a>
              </li>
              <li>
                <a href="#/land" className="hover:text-gold-400 transition-colors flex items-center justify-between group">
                  <span>Land & Residential Plots</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-gold-400" />
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Advisory Verticals */}
          <div>
            <h4 className="font-serif text-sm uppercase tracking-widest text-white mb-5 flex items-center gap-2">
              <span>Our Services</span>
              <span className="w-6 h-px bg-gold-500/60" />
            </h4>
            <ul className="space-y-3 text-xs">
              <li>
                <a href="#/primary-market" className="hover:text-gold-400 transition-colors block">
                  <span className="font-medium text-white/90">Primary Market</span>
                  <p className="text-[11px] text-warmGray/70 mt-0.5">Project comparison, site visits & booking</p>
                </a>
              </li>
              <li>
                <a href="#/resale" className="hover:text-gold-400 transition-colors block">
                  <span className="font-medium text-white/90">Secondary Market</span>
                  <p className="text-[11px] text-warmGray/70 mt-0.5">Resale acquisition & buyer/seller advisory</p>
                </a>
              </li>
              <li>
                <a href="#/second-homes" className="hover:text-gold-400 transition-colors block">
                  <span className="font-medium text-white/90">Second Homes & Land</span>
                  <p className="text-[11px] text-warmGray/70 mt-0.5">Private retreats, villas & clear-title plots</p>
                </a>
              </li>
              <li>
                <a href="#/redevelopment" className="hover:text-gold-400 transition-colors block">
                  <span className="font-medium text-white/90">Redevelopment Consulting</span>
                  <p className="text-[11px] text-warmGray/70 mt-0.5">Housing society advisory & partner alignment</p>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Office */}
          <div>
            <h4 className="font-serif text-sm uppercase tracking-widest text-white mb-5 flex items-center gap-2">
              <span>Office & Contact</span>
              <span className="w-6 h-px bg-gold-500/60" />
            </h4>
            
            <div className="space-y-3.5 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                <div className="leading-relaxed text-softWhite/90">
                  <p className="font-medium text-white">KLOUD REALTY</p>
                  <p>Shop No. 2, 321 R.B. Marg,</p>
                  <p>Abdul Rauf Manzil, Opp Piramal Aranya,</p>
                  <p>Mazgaon, Mumbai – 400010, Maharashtra</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-gold-400 shrink-0" />
                <div className="space-x-2 text-white">
                  <a href="tel:8655588880" className="hover:text-gold-400 font-mono transition-colors">86-555-88880</a>
                  <span>/</span>
                  <a href="tel:9619977171" className="hover:text-gold-400 font-mono transition-colors">96-199-77171</a>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-gold-400 shrink-0" />
                <a href="mailto:kloudrealty@gmail.com" className="text-white hover:text-gold-400 transition-colors font-mono">
                  kloudrealty@gmail.com
                </a>
              </div>

              <div className="pt-2 text-[11px] text-warmGray/80 border-t border-white/5">
                <span>Founder / Representative: </span>
                <span className="text-white font-medium">Abhishek Gupta</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar & Legal Links */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-warmGray/80">
            <span>© {currentYear} KLOUD REALTY. All rights reserved.</span>
            <span className="hidden md:inline text-white/20">|</span>
            <span className="text-gold-400 font-mono">RERA ID: A0311 72501659</span>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs">
            <a href="#/about" className="hover:text-gold-400 transition-colors">About Us</a>
            <a href="#/contact" className="hover:text-gold-400 transition-colors">Contact</a>
            <a href="#/privacy" className="hover:text-gold-400 transition-colors">Privacy Policy</a>
            <a href="#/terms" className="hover:text-gold-400 transition-colors">Terms of Service</a>
            <a href="#/disclaimer" className="hover:text-gold-400 transition-colors">Disclaimer</a>
            <a href="#/admin" className="hover:text-gold-400 transition-colors flex items-center gap-1 text-gold-400/80">
              <Lock className="w-3 h-3" />
              <span>Admin Portal</span>
            </a>
          </div>
        </div>

        {/* Mandatory Regulatory Disclaimer */}
        <div className="mt-6 pt-6 border-t border-white/5 text-[11px] text-warmGray/60 leading-relaxed text-center max-w-4xl mx-auto">
          Disclaimer: KLOUD REALTY is a professional real estate advisory firm. The information displayed on this website is for general guidance and representation purposes. Prospective purchasers and tenants are advised to independently verify all property specifications, approvals, carpet areas, and project-specific RERA details on the official MahaRERA regulatory portal before executing any transaction agreement.
        </div>

      </div>
    </footer>
  );
};
