import React, { useState } from 'react';
import { 
  Building2, Home, Trees, RefreshCw, ArrowRight, CheckCircle2, 
  Compass, ShieldCheck, ChevronDown, Sparkles
} from 'lucide-react';
import { SearchBar } from '../components/SearchBar';
import { PropertyCard } from '../components/PropertyCard';
import { ReraTrustSection } from '../components/ReraTrustSection';
import { propertyService } from '../services/propertyService';
import { Property, PropertyCategory } from '../types';

interface HomePageProps {
  onOpenConsultation: (vertical?: string, propertyTitle?: string, propertyId?: string) => void;
  onNavigate: (path: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenConsultation, onNavigate }) => {
  const [activeCategoryTab, setActiveCategoryTab] = useState<PropertyCategory | 'all'>('primary');
  const allProperties = propertyService.getPublishedProperties();

  const displayedProperties = activeCategoryTab === 'all' 
    ? allProperties 
    : allProperties.filter(p => p.category === activeCategoryTab);

  const handleHeroSearch = (params: {
    intent: string;
    propertyType: string;
    locality: string;
    budget: string;
  }) => {
    if (params.intent === 'rent') window.location.hash = '#/rent';
    else if (params.intent === 'land') window.location.hash = '#/land';
    else window.location.hash = '#/buy';
  };

  const handleCardEnquiry = (property: Property) => {
    onOpenConsultation('Primary Market', property.title, property.id);
  };

  return (
    <div className="bg-charcoal-900 text-softWhite font-sans">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[680px] lg:min-h-[740px] flex flex-col justify-center pt-28 pb-16 px-6 sm:px-10 lg:px-12 xl:px-14 overflow-hidden">
        {/* Full-width High-Resolution Architectural Photography with Left-to-Right Contrast Gradient */}
        <div className="absolute inset-0 bg-charcoal-950">
          <img 
            src="/images/hero_architecture_1785684802035.jpg" 
            alt="Luxury Mumbai Architecture" 
            className="w-full h-full object-cover object-center opacity-45 scale-100"
          />
          {/* Subtle gradient: darkens left side where text sits, reveals architectural tower on right */}
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal-950/95 via-charcoal-950/80 to-charcoal-900/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900 via-transparent to-charcoal-950/70" />
        </div>

        {/* Hero Content Container (Max width ~1350px, vertically centered, generous negative space) */}
        <div className="relative z-10 w-full max-w-[1350px] mx-auto py-8">
          
          {/* Small refined uppercase eyebrow */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-charcoal-850/90 border border-gold-500/30 text-gold-400 text-[11px] font-semibold uppercase tracking-[0.16em] mb-6 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-cyanBrand animate-pulse" />
            <span>REAL ESTATE. REIMAGINED.</span>
          </div>

          {/* Large Editorial Headline (68-84px desktop with responsive clamp, distinction between lines) */}
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-[76px] xl:text-[84px] font-light text-softWhite tracking-tight leading-[1.08] mb-6">
            Find a Place. <br />
            <span className="gold-gradient-text font-normal italic">Make It Yours.</span>
          </h1>

          {/* Readable Description (Max ~760px, 17-20px font size, 1.6 line height) */}
          <p className="text-base sm:text-lg lg:text-[18.5px] text-warmGray-100/90 max-w-[760px] leading-[1.65] mb-9 font-light font-sans">
            From new residential developments and resale homes to private retreats and redevelopment advisory, KLOUD REALTY helps you navigate real estate with clarity and confidence.
          </p>

          {/* CTA Buttons in a single aligned row on desktop (Consistent 54px height, balanced visual weight) */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-10">
            <a
              href="#/buy"
              className="px-8 h-[54px] rounded-sm text-xs uppercase tracking-widest font-semibold bg-gold-500 text-charcoal-950 hover:bg-gold-400 transition-all duration-300 shadow-gold-glow flex items-center justify-center gap-2.5 group"
            >
              <span>Explore Properties</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </a>

            <button
              onClick={() => onOpenConsultation('General Consultation')}
              className="px-8 h-[54px] rounded-sm text-xs uppercase tracking-widest font-semibold border border-gold-500/50 bg-charcoal-900/60 hover:bg-gold-500/10 hover:border-gold-500 text-softWhite hover:text-gold-300 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <span>Book a Consultation</span>
            </button>
          </div>

          {/* Repositioned Trust Information Row */}
          <div className="pt-6 border-t border-white/10 max-w-[760px] flex flex-wrap items-center gap-y-2 gap-x-5 text-xs text-warmGray font-sans">
            <div className="flex items-center gap-2">
              <span className="text-[10.5px] uppercase tracking-widest font-semibold text-gold-400">
                RERA REGISTERED
              </span>
              <span className="font-mono text-xs text-white font-medium tracking-wider">
                A0311 72501659
              </span>
            </div>

            <span className="hidden sm:inline text-white/20">•</span>

            <div className="flex items-center gap-2">
              <span className="text-[10.5px] uppercase tracking-widest font-semibold text-gold-400">
                OFFICE
              </span>
              <span className="text-xs text-softWhite/90 font-medium">
                Mazgaon, Mumbai
              </span>
            </div>
          </div>

        </div>

        {/* Refined Center Scroll Indicator */}
        <div className="relative z-10 flex justify-center mt-6">
          <a 
            href="#search-bar" 
            className="animate-bounce p-2 text-warmGray/70 hover:text-gold-400 transition-colors"
            aria-label="Scroll to property search"
          >
            <ChevronDown className="w-5 h-5" />
          </a>
        </div>
      </section>

      {/* 2. OVERLAPPING PROPERTY SEARCH BAR */}
      <section id="search-bar" className="relative z-20 -mt-10 px-4 sm:px-6 lg:px-8">
        <SearchBar onSearch={handleHeroSearch} />
      </section>
      {/* 3. FOUR CORE BUSINESS VERTICALS */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-400 text-xs font-semibold uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5 text-gold-400" />
            <span>Advisory Framework</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-white tracking-tight">
            Real Estate, at Every Stage.
          </h2>
          <p className="mt-4 text-sm sm:text-base text-warmGray leading-relaxed">
            Whether you are searching for your first home, exploring a second residence, or evaluating the future of an existing property, find the guidance you need under one roof.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Vertical 1 */}
          <div className="group bg-charcoal-850 rounded-sm border border-white/10 hover:border-gold-500/50 shadow-subtle hover:shadow-luxury transition-all duration-300 overflow-hidden flex flex-col justify-between">
            <div className="relative aspect-[16/9] overflow-hidden">
              <img src="/images/project_exterior_1785684820308.jpg" alt="New Residential Developments" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-850 via-charcoal-850/40 to-transparent" />
              <div className="absolute top-4 left-4 p-2.5 rounded bg-charcoal-900/90 border border-gold-500/30 text-gold-400 backdrop-blur-md">
                <Building2 className="w-5 h-5 text-gold-400" />
              </div>
            </div>
            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-gold-400 font-semibold block mb-1">VERTICAL 01 — PRIMARY MARKET</span>
                <h3 className="font-serif text-2xl font-bold text-white mb-3">New Homes. New Possibilities.</h3>
                <p className="text-xs sm:text-sm text-warmGray leading-relaxed mb-6 font-sans">
                  Explore newly launched and under-construction residential projects with guidance through property selection, project comparisons, site visits, and the buying process.
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-softWhite/90 mb-6">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-cyanBrand shrink-0" /><span>New residential launches</span></li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-cyanBrand shrink-0" /><span>Under-construction projects</span></li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-cyanBrand shrink-0" /><span>Project & floorplan comparisons</span></li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-cyanBrand shrink-0" /><span>Site visit coordination</span></li>
                </ul>
              </div>
              <div>
                <a href="#/primary-market" className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-gold-400 hover:text-gold-300 transition-colors group/link">
                  <span>Explore New Projects</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                </a>
              </div>
            </div>
          </div>

          {/* Vertical 2 */}
          <div className="group bg-charcoal-850 rounded-sm border border-white/10 hover:border-gold-500/50 shadow-subtle hover:shadow-luxury transition-all duration-300 overflow-hidden flex flex-col justify-between">
            <div className="relative aspect-[16/9] overflow-hidden">
              <img src="/images/project_interior_1785684832928.jpg" alt="Resale & Rentals" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-850 via-charcoal-850/40 to-transparent" />
              <div className="absolute top-4 left-4 p-2.5 rounded bg-charcoal-900/90 border border-gold-500/30 text-gold-400 backdrop-blur-md">
                <Home className="w-5 h-5 text-gold-400" />
              </div>
            </div>
            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-gold-400 font-semibold block mb-1">VERTICAL 02 — SECONDARY MARKET</span>
                <h3 className="font-serif text-2xl font-bold text-white mb-3">The Right Property, Already Waiting.</h3>
                <p className="text-xs sm:text-sm text-warmGray leading-relaxed mb-6 font-sans">
                  Discover resale properties and rental opportunities that suit your preferred location, budget, and lifestyle.
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-softWhite/90 mb-6">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-cyanBrand shrink-0" /><span>Resale apartments & penthouses</span></li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-cyanBrand shrink-0" /><span>Curated rental residences</span></li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-cyanBrand shrink-0" /><span>Buyer & seller advisory</span></li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-cyanBrand shrink-0" /><span>Private viewing coordination</span></li>
                </ul>
              </div>
              <div className="flex items-center gap-6">
                <a href="#/resale" className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest font-semibold text-gold-400 hover:text-gold-300 transition-colors">
                  <span>Explore Resale</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
                <a href="#/rent" className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest font-semibold text-warmGray hover:text-white transition-colors">
                  <span>Find a Rental</span>
                </a>
              </div>
            </div>
          </div>

          {/* Vertical 3 */}
          <div className="group bg-charcoal-850 rounded-sm border border-white/10 hover:border-gold-500/50 shadow-subtle hover:shadow-luxury transition-all duration-300 overflow-hidden flex flex-col justify-between">
            <div className="relative aspect-[16/9] overflow-hidden">
              <img src="/images/project_clubhouse_1785684842599.jpg" alt="Second Homes & Land" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-850 via-charcoal-850/40 to-transparent" />
              <div className="absolute top-4 left-4 p-2.5 rounded bg-charcoal-900/90 border border-gold-500/30 text-gold-400 backdrop-blur-md">
                <Trees className="w-5 h-5 text-gold-400" />
              </div>
            </div>
            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-gold-400 font-semibold block mb-1">VERTICAL 03 — SECOND HOMES & LAND</span>
                <h3 className="font-serif text-2xl font-bold text-white mb-3">Space to Escape. Room to Grow.</h3>
                <p className="text-xs sm:text-sm text-warmGray leading-relaxed mb-6 font-sans">
                  Explore second-home opportunities, plots, and land around Mumbai and other serviceable locations for a future home, family retreat, or long-term property plans.
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-softWhite/90 mb-6">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-cyanBrand shrink-0" /><span>Coastal & hillside retreats</span></li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-cyanBrand shrink-0" /><span>Residential villa plots</span></li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-cyanBrand shrink-0" /><span>Location & access research</span></li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-cyanBrand shrink-0" /><span>Due-diligence coordination</span></li>
                </ul>
              </div>
              <div>
                <a href="#/second-homes" className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-gold-400 hover:text-gold-300 transition-colors">
                  <span>Explore Second Homes</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Vertical 4 */}
          <div className="group bg-charcoal-850 rounded-sm border border-white/10 hover:border-gold-500/50 shadow-subtle hover:shadow-luxury transition-all duration-300 overflow-hidden flex flex-col justify-between">
            <div className="relative aspect-[16/9] overflow-hidden">
              <img src="/images/hero_architecture_1785684802035.jpg" alt="Redevelopment Consulting" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-850 via-charcoal-850/40 to-transparent" />
              <div className="absolute top-4 left-4 p-2.5 rounded bg-charcoal-900/90 border border-gold-500/30 text-gold-400 backdrop-blur-md">
                <RefreshCw className="w-5 h-5 text-gold-400" />
              </div>
            </div>
            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-gold-400 font-semibold block mb-1">VERTICAL 04 — REDEVELOPMENT CONSULTING</span>
                <h3 className="font-serif text-2xl font-bold text-white mb-3">Reimagining Existing Spaces.</h3>
                <p className="text-xs sm:text-sm text-warmGray leading-relaxed mb-6 font-sans">
                  Explore redevelopment possibilities for existing residential buildings, housing societies, and property owners seeking guidance on their building's next chapter.
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-softWhite/90 mb-6">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-cyanBrand shrink-0" /><span>Society committee consultations</span></li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-cyanBrand shrink-0" /><span>Preliminary feasibility guidance</span></li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-cyanBrand shrink-0" /><span>Developer evaluation support</span></li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-cyanBrand shrink-0" /><span>Architect & legal coordination</span></li>
                </ul>
              </div>
              <div>
                <a href="#/redevelopment" className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-gold-400 hover:text-gold-300 transition-colors">
                  <span>Discuss a Redevelopment Project</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* 4. FEATURED PROPERTIES */}
      <section className="py-24 bg-charcoal-950/60 border-t border-b border-white/10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-gold-400 mb-2 block">CURATED PORTFOLIO</span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-white tracking-tight">Spaces Worth Discovering.</h2>
              <p className="mt-2 text-xs sm:text-sm text-warmGray max-w-xl">A selection of properties and opportunities for different stages of life.</p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {[
                { id: 'primary', label: 'New Projects' },
                { id: 'resale', label: 'Resale Homes' },
                { id: 'rental', label: 'Rentals' },
                { id: 'second-home', label: 'Second Homes' },
                { id: 'land', label: 'Land' },
                { id: 'all', label: 'View All' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategoryTab(tab.id as any)}
                  className={`px-3.5 py-1.5 rounded-sm text-xs uppercase tracking-wider font-medium transition-all ${
                    activeCategoryTab === tab.id
                      ? 'bg-gold-500 text-charcoal-950 font-semibold shadow-gold-glow'
                      : 'bg-charcoal-800 text-warmGray hover:text-white hover:bg-charcoal-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {displayedProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayedProperties.map((property) => (
                <PropertyCard key={property.id} property={property} onEnquire={handleCardEnquiry} />
              ))}
            </div>
          ) : (
            <div className="p-12 text-center rounded bg-charcoal-850 border border-white/10 max-w-2xl mx-auto my-8">
              <Compass className="w-10 h-10 text-gold-400 mx-auto mb-4" />
              <h3 className="font-serif text-2xl font-semibold text-white mb-2">We're curating the right opportunities for you.</h3>
              <p className="text-xs text-warmGray max-w-md mx-auto mb-6">Tell us what you're looking for and our team will help you explore suitable properties matching your criteria.</p>
              <button
                onClick={() => onOpenConsultation('Primary Market')}
                className="px-6 py-2.5 rounded bg-gold-500 text-charcoal-950 font-semibold text-xs uppercase tracking-wider hover:bg-gold-400 transition-colors shadow-gold-glow"
              >
                Request Property Assistance
              </button>
            </div>
          )}

          <div className="text-center mt-12">
            <a href="#/buy" className="inline-flex items-center gap-2 px-6 py-3 rounded border border-white/20 text-xs uppercase tracking-widest font-semibold text-white hover:border-gold-500 hover:text-gold-400 hover:bg-gold-500/5 transition-all">
              <span>Explore Complete Inventory</span>
              <ArrowRight className="w-4 h-4 text-gold-400" />
            </a>
          </div>
        </div>
      </section>

      {/* 5. WHY CHOOSE KLOUD REALTY */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-gold-400 mb-2 block">THE KLOUD PHILOSOPHY</span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-white tracking-tight">Property Decisions Deserve Clarity.</h2>
          <p className="mt-4 text-sm text-warmGray leading-relaxed">
            Real estate is rarely just about square footage. It involves long-term financial commitments, emotional peace of mind, and family aspirations.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="p-8 rounded-sm bg-charcoal-850 border border-white/10 hover:border-gold-500/40 transition-colors space-y-4">
            <div className="w-12 h-12 rounded bg-gold-500/10 border border-gold-500/20 text-gold-400 flex items-center justify-center font-serif text-xl font-bold">01</div>
            <h3 className="font-serif text-xl font-semibold text-white">Personalized Property Search</h3>
            <p className="text-xs text-warmGray leading-relaxed">Explore opportunities based on your preferred location, budget, requirements, and long-term plans.</p>
          </div>

          <div className="p-8 rounded-sm bg-charcoal-850 border border-white/10 hover:border-gold-500/40 transition-colors space-y-4">
            <div className="w-12 h-12 rounded bg-gold-500/10 border border-gold-500/20 text-gold-400 flex items-center justify-center font-serif text-xl font-bold">02</div>
            <h3 className="font-serif text-xl font-semibold text-white">Multiple Property Options</h3>
            <p className="text-xs text-warmGray leading-relaxed">Discover new developments, resale homes, rentals, second homes, and land opportunities through one point of contact.</p>
          </div>

          <div className="p-8 rounded-sm bg-charcoal-850 border border-white/10 hover:border-gold-500/40 transition-colors space-y-4">
            <div className="w-12 h-12 rounded bg-gold-500/10 border border-gold-500/20 text-gold-400 flex items-center justify-center font-serif text-xl font-bold">03</div>
            <h3 className="font-serif text-xl font-semibold text-white">Informed Decision-Making</h3>
            <p className="text-xs text-warmGray leading-relaxed">Understand available property information, compare options, and identify the questions that matter before proceeding.</p>
          </div>

          <div className="p-8 rounded-sm bg-charcoal-850 border border-white/10 hover:border-gold-500/40 transition-colors space-y-4">
            <div className="w-12 h-12 rounded bg-gold-500/10 border border-gold-500/20 text-gold-400 flex items-center justify-center font-serif text-xl font-bold">04</div>
            <h3 className="font-serif text-xl font-semibold text-white">Guidance Through the Process</h3>
            <p className="text-xs text-warmGray leading-relaxed">Receive assistance coordinating property enquiries, viewings, and relevant next steps with total transparency.</p>
          </div>
        </div>
      </section>

      {/* 6. THE KLOUD REALTY EXPERIENCE */}
      <section className="py-24 bg-charcoal-950 border-t border-b border-white/10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-widest text-gold-400 mb-2 block">OUR ADVISORY PROCESS</span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-white tracking-tight">A Clearer Way to Find Your Place.</h2>
            <p className="mt-4 text-sm text-warmGray">A structured, stress-free journey from initial inquiry to transaction closure.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="p-6 rounded bg-charcoal-850 border border-white/5 space-y-3">
              <span className="text-[11px] font-mono uppercase tracking-widest text-cyanBrand font-semibold">STEP 01</span>
              <h3 className="font-serif text-lg font-bold text-white">Tell Us What You Need</h3>
              <p className="text-xs text-warmGray leading-relaxed">Share your preferred location, budget, property type, and requirements.</p>
            </div>
            <div className="p-6 rounded bg-charcoal-850 border border-white/5 space-y-3">
              <span className="text-[11px] font-mono uppercase tracking-widest text-cyanBrand font-semibold">STEP 02</span>
              <h3 className="font-serif text-lg font-bold text-white">Explore Your Options</h3>
              <p className="text-xs text-warmGray leading-relaxed">Review relevant opportunities and compare available property information.</p>
            </div>
            <div className="p-6 rounded bg-charcoal-850 border border-white/5 space-y-3">
              <span className="text-[11px] font-mono uppercase tracking-widest text-cyanBrand font-semibold">STEP 03</span>
              <h3 className="font-serif text-lg font-bold text-white">Visit and Evaluate</h3>
              <p className="text-xs text-warmGray leading-relaxed">Arrange viewings and review the available documentation and property details.</p>
            </div>
            <div className="p-6 rounded bg-charcoal-850 border border-white/5 space-y-3">
              <span className="text-[11px] font-mono uppercase tracking-widest text-cyanBrand font-semibold">STEP 04</span>
              <h3 className="font-serif text-lg font-bold text-white">Move Forward with Confidence</h3>
              <p className="text-xs text-warmGray leading-relaxed">Receive assistance coordinating next steps with developers and legal advisors.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. SECOND HOMES & LAND HIGHLIGHT */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-semibold uppercase tracking-widest text-gold-400 block">BEYOND THE CITY GRID</span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-white tracking-tight leading-tight">Make Room for a Different Kind of Living.</h2>
            <p className="text-sm text-warmGray leading-relaxed">From weekend retreats to plots for a future family home, explore possibilities beyond the everyday city address.</p>
            <div className="pt-2">
              <a href="#/second-homes" className="px-6 py-3 rounded bg-gold-500 text-charcoal-950 font-semibold text-xs uppercase tracking-widest hover:bg-gold-400 transition-colors shadow-gold-glow inline-block">
                Discover Second-Home Opportunities
              </a>
            </div>
          </div>
          <div className="lg:col-span-6">
            <div className="rounded-sm overflow-hidden border border-gold-500/30 shadow-luxury">
              <img src="/images/project_clubhouse_1785684842599.jpg" alt="Second Home" className="w-full h-80 object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* 8. RERA TRUST SECTION */}
      <ReraTrustSection />

      {/* 9. BOTTOM BANNER */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-charcoal-950 text-center border-t border-white/10">
        <div className="max-w-4xl mx-auto p-10 rounded-sm bg-charcoal-850 border border-gold-500/30 shadow-luxury">
          <h2 className="font-serif text-3xl sm:text-4xl font-light text-white mb-4">Let's Discuss Your Next Property Decision.</h2>
          <p className="text-sm text-warmGray max-w-xl mx-auto mb-8">Whether evaluating a new Mumbai development or seeking housing society guidance, we are here to assist.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button onClick={() => onOpenConsultation('General Consultation')} className="w-full sm:w-auto px-8 py-3.5 rounded bg-gold-500 text-charcoal-950 font-semibold text-xs uppercase tracking-widest hover:bg-gold-400 transition-all shadow-gold-glow">
              Book a Private Consultation
            </button>
            <a href="tel:8655588880" className="w-full sm:w-auto px-8 py-3.5 rounded border border-white/20 text-white font-semibold text-xs uppercase tracking-widest hover:border-gold-500 hover:text-gold-400 transition-colors font-mono">
              Call 86-555-88880
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};
