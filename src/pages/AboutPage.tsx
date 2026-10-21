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

        {/* Founder & Business Card Spotlight */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs uppercase tracking-widest text-gold-400 font-semibold block">
              LEADERSHIP & ETHOS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-light text-white">
              Abhishek Gupta
            </h2>
            <p className="text-xs text-cyanBrand font-mono uppercase tracking-widest">
              Founder & Representative — KLOUD REALTY
            </p>

            <p className="text-sm text-warmGray leading-relaxed font-sans">
              Positioned in the historic neighbourhood of Mazgaon, South Mumbai, Abhishek Gupta founded KLOUD REALTY to offer a grounded, client-focused alternative to high-pressure brokerages. Operating under RERA Registration ID <strong>A0311 72501659</strong>, the consultancy prioritizes objective research, transparent property facts, and measured guidance over exaggerated promises.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-4 rounded bg-charcoal-850 border border-white/5 space-y-1">
                <span className="text-gold-400 font-bold text-xs uppercase block">Consultative Advice</span>
                <p className="text-xs text-warmGray">Understanding family and lifestyle needs before recommending inventory.</p>
              </div>

              <div className="p-4 rounded bg-charcoal-850 border border-white/5 space-y-1">
                <span className="text-gold-400 font-bold text-xs uppercase block">Regulatory Clarity</span>
                <p className="text-xs text-warmGray">Demystifying RERA timelines, carpet definitions, and municipal regulations.</p>
              </div>
            </div>
          </div>

          {/* Business Card Display */}
          <div className="lg:col-span-5">
            <div className="p-4 rounded-sm bg-charcoal-850 border border-gold-500/30 shadow-luxury space-y-3">
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
              <p className="text-[11px] text-warmGray text-center">
                Preserving official business identity, contact details, and RERA registration ID: <strong>A0311 72501659</strong>.
              </p>
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
