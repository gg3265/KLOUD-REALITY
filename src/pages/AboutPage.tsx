import React from 'react';
import { ShieldCheck, MapPin, Phone, Mail, Award, CheckCircle2, Building, ArrowRight } from 'lucide-react';
import { ReraTrustSection } from '../components/ReraTrustSection';

interface AboutPageProps {
  onOpenConsultation: (vertical?: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenConsultation }) => {
  return (
    <div className="bg-charcoal-900 text-softWhite min-h-screen pt-28 pb-20 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="border-b border-white/10 pb-12 mb-16 max-w-4xl">
          <span className="text-xs uppercase tracking-widest text-gold-400 font-semibold block mb-2">
            ABOUT KLOUD REALTY
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-light text-white tracking-tight mb-6">
            Property Guidance Built Around Your Needs.
          </h1>
          <p className="text-sm sm:text-base text-warmGray leading-relaxed font-light">
            KLOUD REALTY is a RERA-registered real estate consultancy headquartered in Mazgaon, Mumbai. We help clients discover, evaluate, buy, sell, rent, and plan property investments across four dedicated service verticals.
          </p>
        </div>

        {/* Main Two-Column Section: Left Photo / Right About KLOUD REALTY */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-20">
          
          {/* LEFT SIDE — PHOTO */}
          <div className="lg:col-span-6 space-y-3">
            <div className="relative rounded-xl overflow-hidden border border-gold-500/30 bg-charcoal-850 shadow-2xl shadow-black/70 group">
              <img 
                src="/images/about/abhishek-gupta-consultation.jpg" 
                alt="Abhishek Gupta, Property Consultant at KLOUD REALTY during client consultation" 
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.01]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/40 via-transparent to-transparent pointer-events-none" />
            </div>
            
            {/* Short caption below the image */}
            <p className="text-xs sm:text-[13px] text-warmGray/90 italic text-center font-light tracking-wide px-2">
              Abhishek Gupta — Guiding clients through informed property decisions.
            </p>
          </div>

          {/* RIGHT SIDE — ABOUT KLOUD REALTY */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs uppercase tracking-widest text-gold-400 font-semibold block">
              LEADERSHIP & ETHOS
            </span>

            {/* Heading requested by client */}
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-light text-white tracking-tight leading-snug">
              PERSONALIZED PROPERTY ADVISORY. BUILT ON TRUST.
            </h2>

            {/* Founder highlight */}
            <div className="flex items-center gap-3.5 py-3 px-4 rounded-lg bg-charcoal-850 border border-white/5">
              <div className="w-1.5 h-10 bg-gold-400 rounded-full" />
              <div>
                <h3 className="font-serif text-lg font-medium text-white tracking-wide">
                  Abhishek Gupta
                </h3>
                <p className="text-xs text-gold-400/90 font-mono uppercase tracking-wider">
                  Founder / Property Consultant • KLOUD REALTY
                </p>
              </div>
            </div>

            {/* Retained company introduction & information */}
            <div className="space-y-4 text-sm sm:text-[15px] text-warmGray leading-relaxed font-sans">
              <p>
                Positioned in the historic neighbourhood of Mazgaon, South Mumbai, Abhishek Gupta founded KLOUD REALTY to offer a grounded, client-focused alternative to high-pressure brokerages. Operating under RERA Registration ID <strong className="text-white font-medium">A0311 72501659</strong>, the consultancy prioritizes objective research, transparent property facts, and measured guidance over exaggerated promises.
              </p>
              <p className="text-xs sm:text-sm text-warmGray/90">
                KLOUD REALTY operates across primary developer acquisitions, curated resale properties, luxury leasing, demarcated land parcels, and specialized society redevelopment advisory — ensuring every transaction adheres strictly to MahaRERA statutory standards and client confidentiality.
              </p>
            </div>

            {/* Feature Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="p-4 rounded-lg bg-charcoal-850 border border-white/5 space-y-1 hover:border-gold-500/20 transition-colors">
                <span className="text-gold-400 font-bold text-xs uppercase tracking-wider block">Consultative Advice</span>
                <p className="text-xs text-warmGray leading-relaxed">Understanding family, budget, and lifestyle requirements before recommending inventory.</p>
              </div>

              <div className="p-4 rounded-lg bg-charcoal-850 border border-white/5 space-y-1 hover:border-gold-500/20 transition-colors">
                <span className="text-gold-400 font-bold text-xs uppercase tracking-wider block">Regulatory Clarity</span>
                <p className="text-xs text-warmGray leading-relaxed">Demystifying RERA timelines, carpet area calculations, and municipal regulations.</p>
              </div>
            </div>

            {/* Action CTA */}
            <div className="pt-2">
              <button
                onClick={() => onOpenConsultation('Primary Market')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded bg-gold-500 hover:bg-gold-400 text-charcoal-950 font-medium text-xs uppercase tracking-widest transition-all duration-300 shadow-luxury group"
              >
                <span>Book a Consultation</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>

          </div>

        </div>

        {/* Official Business Card & Credentials Section */}
        <div className="border border-white/10 rounded-xl bg-charcoal-850 p-6 sm:p-8 mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-5">
              <div className="p-3 rounded-lg bg-charcoal-900 border border-gold-500/30 shadow-luxury space-y-3">
                <span className="text-[10px] uppercase tracking-wider text-gold-400 font-semibold block text-center">
                  OFFICIAL BUSINESS CARD & CREDENTIALS
                </span>
                <div className="relative rounded overflow-hidden border border-white/10 shadow-subtle">
                  <img 
                    src="/images/business_card.jpg" 
                    alt="KLOUD REALTY Abhishek Gupta Business Card" 
                    className="w-full h-auto object-contain"
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-5">
              <div>
                <span className="text-xs uppercase tracking-widest text-gold-400 font-semibold block mb-1">
                  OFFICIAL FIRM DETAILS
                </span>
                <h3 className="font-serif text-2xl font-light text-white">
                  KLOUD REALTY — Mazgaon Office
                </h3>
                <p className="text-xs text-cyanBrand font-mono tracking-wider mt-0.5">
                  THE PLACE TO FIND YOUR PLACE
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1.5 p-3 rounded bg-charcoal-900/60 border border-white/5">
                  <span className="text-gold-400 font-semibold block uppercase text-[11px]">Registered Address</span>
                  <p className="text-warmGray">Shop No. 2, 321 R.B. Marg, Abdul Rauf Manzil, Mazgaon, Mumbai – 400010</p>
                </div>

                <div className="space-y-1.5 p-3 rounded bg-charcoal-900/60 border border-white/5">
                  <span className="text-gold-400 font-semibold block uppercase text-[11px]">MahaRERA Registration</span>
                  <p className="text-white font-mono font-medium">A0311 72501659</p>
                  <p className="text-[10px] text-warmGray">Real Estate Consultant</p>
                </div>

                <div className="space-y-1.5 p-3 rounded bg-charcoal-900/60 border border-white/5">
                  <span className="text-gold-400 font-semibold block uppercase text-[11px]">Direct Lines</span>
                  <p className="text-warmGray font-mono">+91 86-555-88880</p>
                  <p className="text-warmGray font-mono">+91 96-199-77171</p>
                </div>

                <div className="space-y-1.5 p-3 rounded bg-charcoal-900/60 border border-white/5">
                  <span className="text-gold-400 font-semibold block uppercase text-[11px]">Official Email</span>
                  <p className="text-warmGray font-mono">kloudrealty@gmail.com</p>
                  <p className="text-[10px] text-warmGray">Advisory & Client Intake</p>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* 5 Pillars of Our Approach */}
        <div className="py-16 border-t border-b border-white/10 mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-widest text-gold-400 font-semibold block mb-2">
              OUR WORKING METHOD
            </span>
            <h3 className="font-serif text-3xl font-light text-white">
              The Firm's Five-Point Approach
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-center">
            <div className="p-5 rounded bg-charcoal-850 border border-white/5 space-y-2">
              <span className="w-8 h-8 rounded-full bg-gold-500/10 text-gold-400 font-serif font-bold flex items-center justify-center mx-auto text-sm">1</span>
              <h4 className="text-xs font-semibold text-white uppercase tracking-wider">Understand</h4>
              <p className="text-[11px] text-warmGray leading-relaxed">Deeply analyze the client's preferences, budget, and long-term intentions.</p>
            </div>

            <div className="p-5 rounded bg-charcoal-850 border border-white/5 space-y-2">
              <span className="w-8 h-8 rounded-full bg-gold-500/10 text-gold-400 font-serif font-bold flex items-center justify-center mx-auto text-sm">2</span>
              <h4 className="text-xs font-semibold text-white uppercase tracking-wider">Present</h4>
              <p className="text-[11px] text-warmGray leading-relaxed">Filter the market to curate only relevant, verified property opportunities.</p>
            </div>

            <div className="p-5 rounded bg-charcoal-850 border border-white/5 space-y-2">
              <span className="w-8 h-8 rounded-full bg-gold-500/10 text-gold-400 font-serif font-bold flex items-center justify-center mx-auto text-sm">3</span>
              <h4 className="text-xs font-semibold text-white uppercase tracking-wider">Inform</h4>
              <p className="text-[11px] text-warmGray leading-relaxed">Encourage informed decisions by clarifying documentation and comparing options.</p>
            </div>

            <div className="p-5 rounded bg-charcoal-850 border border-white/5 space-y-2">
              <span className="w-8 h-8 rounded-full bg-gold-500/10 text-gold-400 font-serif font-bold flex items-center justify-center mx-auto text-sm">4</span>
              <h4 className="text-xs font-semibold text-white uppercase tracking-wider">Communicate</h4>
              <p className="text-[11px] text-warmGray leading-relaxed">Maintain clear, transparent, and prompt updates at every interaction.</p>
            </div>

            <div className="p-5 rounded bg-charcoal-850 border border-white/5 space-y-2">
              <span className="w-8 h-8 rounded-full bg-gold-500/10 text-gold-400 font-serif font-bold flex items-center justify-center mx-auto text-sm">5</span>
              <h4 className="text-xs font-semibold text-white uppercase tracking-wider">Coordinate</h4>
              <p className="text-[11px] text-warmGray leading-relaxed">Coordinate viewings, negotiations, and closing formalities with diligence.</p>
            </div>
          </div>
        </div>

      </div>

      <ReraTrustSection />
    </div>
  );
};
