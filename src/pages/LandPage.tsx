import React, { useState } from 'react';
import { 
  Map, 
  ShieldCheck, 
  Compass, 
  FileText, 
  CheckCircle, 
  ExternalLink, 
  ArrowRight, 
  Building2, 
  Sparkles, 
  Scale, 
  FileCheck, 
  Route, 
  Info, 
  Loader2,
  Layers,
  ChevronRight
} from 'lucide-react';
import { PropertyCard } from '../components/PropertyCard';
import { propertyService } from '../services/propertyService';
import { leadService } from '../services/leadService';
import { landOpportunities } from '../data/landOpportunities';
import { LandOpportunity } from '../types';

interface LandPageProps {
  onOpenConsultation: (vertical?: string, propertyTitle?: string, propertyId?: string, location?: string) => void;
}

export const LandPage: React.FC<LandPageProps> = ({ onOpenConsultation }) => {
  const verifiedPlots = propertyService.getPropertiesByCategory('land');

  // Vision Section Form State
  const [selectedVisionCategory, setSelectedVisionCategory] = useState('Residential Land');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [preferredLocation, setPreferredLocation] = useState('Raigad–Pen Growth Centre');
  const [budget, setBudget] = useState('₹1 – ₹3 Crore');
  const [intendedUse, setIntendedUse] = useState('Residential Second Home / Villa');
  const [plotSize, setPlotSize] = useState('Quarter to Half Acre (10,000–20,000 sq.ft.)');
  const [additionalRequirements, setAdditionalRequirements] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submittedLeadId, setSubmittedLeadId] = useState<string | null>(null);

  const visionCategories = [
    {
      id: 'residential-land',
      title: 'Residential Land',
      desc: 'Private parcels suited for bespoke individual homes or future estates.',
      defaultUse: 'Residential Second Home / Villa'
    },
    {
      id: 'plotted-dev',
      title: 'Plotted Developments',
      desc: 'Master-planned communities with internal paved roads and utilities.',
      defaultUse: 'Plotted Development'
    },
    {
      id: 'long-term',
      title: 'Land for Long-Term Ownership',
      desc: 'Strategic acreage positioned along major transit corridors.',
      defaultUse: 'Investment & Long-Term Hold'
    },
    {
      id: 'commercial-other',
      title: 'Commercial or Other Land Requirements',
      desc: 'Sites for logistics, agro-hospitality, institutions, or specialized projects.',
      defaultUse: 'Commercial / Logistics / Institutional'
    }
  ];

  const handleCategorySelect = (category: typeof visionCategories[0]) => {
    setSelectedVisionCategory(category.title);
    setIntendedUse(category.defaultUse);
  };

  const handleVisionFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');

    if (!fullName.trim() || fullName.trim().length < 2) {
      setSubmitError('Please enter your full name.');
      return;
    }
    const cleanPhone = phone.replace(/[\s-]/g, '');
    if (!cleanPhone || cleanPhone.length < 8) {
      setSubmitError('Please enter a valid phone number (minimum 8 digits).');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      setSubmitError('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);

    try {
      const detailedMessage = `Vision Category: ${selectedVisionCategory} | Intended Use: ${intendedUse} | Preferred Size: ${plotSize} | Location: ${preferredLocation} | Budget: ${budget}${additionalRequirements ? ` | Notes: ${additionalRequirements}` : ''}`;
      
      const result = await leadService.createLead({
        fullName,
        phone,
        email,
        enquirySource: 'Land',
        serviceVertical: 'Second Homes & Land',
        propertyRequirement: 'Purchase a Second Home or Plot',
        preferredLocation,
        budgetRange: budget,
        preferredContactMethod: 'Phone Call',
        message: detailedMessage
      });

      if (result.success && result.leadId) {
        setSubmittedLeadId(result.leadId);
        localStorage.setItem('kloud_lead_modal_dismissed_v1', 'true');
      } else {
        setSubmitError(result.error || 'Failed to submit consultation request. Please try again.');
      }
    } catch {
      setSubmitError('A network error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToCorridors = () => {
    const section = document.getElementById('land-corridors');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-charcoal-900 text-softWhite min-h-screen font-sans selection:bg-gold-500 selection:text-charcoal-950">
      
      {/* =========================================================================
          HERO SECTION
          ========================================================================= */}
      <section className="relative min-h-[85vh] sm:min-h-[88vh] flex items-center justify-center pt-28 pb-20 overflow-hidden">
        {/* Background Wide-Format Aerial Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/land/land-hero-corridor.jpg"
            alt="Maharashtra emerging growth corridor aerial landscape"
            className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-1000 ease-out"
          />
          {/* Subtle Dark Overlays for Maximum Contrast & Luxury Depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900 via-charcoal-950/80 to-charcoal-950/70" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-charcoal-950/60 to-charcoal-950/95" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-semibold uppercase tracking-widest mb-6 backdrop-blur-sm shadow-sm">
            <Compass className="w-3.5 h-3.5 text-gold-400" />
            <span>STRATEGIC LAND ADVISORY · MMR & REGIONAL CORRIDORS</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-light text-white tracking-tight leading-tight mb-4 max-w-4xl mx-auto">
            Own Land. <span className="italic font-normal text-gold-400">Be Part of Tomorrow.</span>
          </h1>

          <p className="text-base sm:text-xl text-softWhite/90 font-light tracking-wide max-w-3xl mx-auto mb-6">
            Explore Emerging Growth Corridors Across the Mumbai Metropolitan Region.
          </p>

          <p className="text-sm sm:text-base text-warmGray max-w-2xl mx-auto leading-relaxed mb-10 font-sans">
            Discover land opportunities across emerging growth corridors, planned urban development areas, and scenic destinations around Mumbai. KLOUD REALTY helps you explore suitable properties with informed guidance, location insights, and a transparent approach to due diligence.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
            <button
              onClick={scrollToCorridors}
              className="w-full sm:w-auto px-7 py-3.5 rounded text-xs uppercase tracking-widest font-semibold bg-gold-500 text-charcoal-950 hover:bg-gold-400 hover:shadow-gold transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <span>EXPLORE LAND OPPORTUNITIES</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onOpenConsultation('Second Homes & Land', 'Land Acquisition Consultation')}
              className="w-full sm:w-auto px-7 py-3.5 rounded text-xs uppercase tracking-widest font-semibold border border-gold-500/60 text-gold-400 hover:bg-gold-500/10 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer backdrop-blur-sm"
            >
              <span>BOOK A PRIVATE CONSULTATION</span>
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          GROWTH CORRIDORS & OPPORTUNITIES SECTION
          ========================================================================= */}
      <section id="land-corridors" className="py-20 sm:py-24 border-t border-white/10 bg-charcoal-950 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="max-w-3xl mb-14">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-gold-400 mb-2">
              <Layers className="w-3.5 h-3.5 text-gold-400" />
              <span>REGIONAL GROWTH CORRIDORS & DESTINATIONS</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-light text-white tracking-tight mb-4">
              Emerging Corridors Across the Region.
            </h2>
            <p className="text-sm text-warmGray leading-relaxed font-sans">
              From notified planning authorities like MMRDA to picturesque countryside retreats, compare verified regional growth corridors, notified townships, and scenic land destinations with rigorous transparency.
            </p>
          </div>

          {/* Responsive Cards Grid: 3 cols desktop, 2 cols tablet, 1 col mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {landOpportunities.map((opp) => (
              <div 
                key={opp.id}
                className="bg-charcoal-900 border border-white/10 hover:border-gold-500/40 rounded-sm overflow-hidden flex flex-col justify-between transition-all duration-300 group shadow-luxury hover:shadow-gold/10"
              >
                <div>
                  {/* Image with subtle overlay */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-charcoal-850">
                    <img 
                      src={opp.image} 
                      alt={opp.displayName}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900 via-transparent to-black/40" />
                    
                    {/* Publication Status Badge */}
                    <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
                      <span className="px-2.5 py-1 rounded-sm text-[10px] font-semibold tracking-wider uppercase bg-charcoal-950/85 text-gold-400 border border-gold-500/30 backdrop-blur-md">
                        {opp.statusBadgeText}
                      </span>
                    </div>

                    {/* Planning Authority or District */}
                    <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end text-[11px] text-softWhite/80">
                      <span className="flex items-center gap-1 font-mono tracking-wider text-warmGray-400 text-[10px]">
                        <Map className="w-3 h-3 text-gold-400" />
                        {opp.district} District
                      </span>
                      {opp.verificationDate && (
                        <span className="text-[10px] text-warmGray-400">
                          Verified: {opp.verificationDate}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6">
                    {/* Unified Titles */}
                    <div className="mb-3">
                      <h3 className="font-serif text-xl sm:text-2xl font-normal text-white group-hover:text-gold-300 transition-colors">
                        {opp.displayName}
                      </h3>
                      {opp.secondaryTitle && (
                        <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 block mt-0.5">
                          {opp.secondaryTitle}
                        </span>
                      )}
                      <p className="text-xs text-warmGray-400 mt-1 flex items-center gap-1">
                        <Route className="w-3 h-3 text-gold-500/80" />
                        {opp.location}
                      </p>
                    </div>

                    {/* Headline */}
                    <h4 className="text-xs sm:text-sm font-medium text-gold-400/90 mb-2">
                      "{opp.headline}"
                    </h4>

                    {/* Concise Description */}
                    <p className="text-xs text-warmGray leading-relaxed mb-4">
                      {opp.description}
                    </p>

                    {/* Secondary Notice Badge */}
                    {opp.secondaryBadgeText && (
                      <div className="p-2.5 rounded bg-charcoal-850 border border-white/5 text-[11px] text-warmGray-300 leading-normal mb-4">
                        <div className="flex items-start gap-1.5">
                          <Info className="w-3.5 h-3.5 text-gold-400 flex-shrink-0 mt-0.5" />
                          <span>{opp.secondaryBadgeText}</span>
                        </div>
                      </div>
                    )}

                    {/* Contextual Verified Highlights */}
                    <div className="space-y-2 mb-5">
                      <span className="text-[10px] uppercase font-mono tracking-widest text-warmGray-500 block">
                        Verified Framework & Highlights:
                      </span>
                      {opp.highlights.map((h, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-softWhite/85 leading-relaxed">
                          <span className="w-1.5 h-1.5 rounded-full bg-gold-500 flex-shrink-0 mt-1.5" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>

                    {/* Planning Authority Citation */}
                    {opp.planningAuthority && (
                      <div className="text-[11px] text-warmGray-400 border-t border-white/5 pt-3 pb-1 flex items-center justify-between">
                        <span>Planning Body:</span>
                        <span className="text-softWhite font-medium truncate max-w-[190px] text-right">
                          {opp.planningAuthority}
                        </span>
                      </div>
                    )}

                    {opp.officialReferenceUrl && (
                      <a
                        href={opp.officialReferenceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] text-cyan-400 hover:text-cyan-300 transition-colors mt-1"
                      >
                        <span>Official MMRDA / Government Source</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Card Actions & Statutory Notice */}
                <div className="p-6 pt-0 border-t border-white/5 mt-4">
                  {/* Legal Caution Note */}
                  <p className="text-[10px] text-warmGray-500 leading-relaxed mb-4 pt-4">
                    {opp.disclaimerText}
                  </p>

                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => onOpenConsultation('Second Homes & Land', opp.displayName, opp.id, opp.enquiryLocation)}
                      className="w-full py-2.5 px-4 rounded text-xs font-semibold uppercase tracking-wider bg-gold-500 text-charcoal-950 hover:bg-gold-400 transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                    >
                      <span>{opp.ctaPrimaryText}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onOpenConsultation('Second Homes & Land', `Advisory Request: ${opp.displayName}`, opp.id, opp.enquiryLocation)}
                      className="w-full py-2.5 px-4 rounded text-xs font-medium uppercase tracking-wider border border-white/15 text-softWhite hover:border-gold-500/50 hover:text-gold-300 transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>{opp.ctaSecondaryText}</span>
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================================
          VERIFIED DEMARCATED PLOTS (PRESERVING EXISTING INVENTORY)
          ========================================================================= */}
      {verifiedPlots.length > 0 && (
        <section className="py-16 border-t border-white/10 bg-charcoal-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-white/10 gap-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-gold-400 block mb-1">
                  CURRENT VERIFIED INVENTORY
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-light text-white">
                  Demarcated Residential Plots & Enclaves
                </h3>
              </div>
              <p className="text-xs text-warmGray max-w-md">
                Individual verified listings with demarcated survey boundaries, sanctioned NA orders, and road connectivity.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {verifiedPlots.map((p) => (
                <PropertyCard
                  key={p.id}
                  property={p}
                  onEnquire={(prop) => onOpenConsultation('Second Homes & Land', prop.title, prop.id, prop.location)}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* =========================================================================
          FIND THE RIGHT LAND FOR YOUR VISION (INTERACTIVE ENQUIRY SECTION)
          ========================================================================= */}
      <section id="land-vision" className="py-20 border-t border-white/10 bg-charcoal-950">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-400 text-xs font-semibold uppercase tracking-widest mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>BESPOKE PROPERTY ADVISORY</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-light text-white tracking-tight mb-3">
              Find the Right Land for Your Vision
            </h2>
            <p className="text-sm text-warmGray leading-relaxed font-sans">
              Every buyer has a different objective. Tell us what you are looking for, and our advisory team will help you explore suitable opportunities.
            </p>
          </div>

          {/* 4 Interactive Visual Enquiry Category Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {visionCategories.map((cat) => {
              const isSelected = selectedVisionCategory === cat.title;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleCategorySelect(cat)}
                  className={`p-5 rounded-sm border text-left transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-charcoal-850 border-gold-500 shadow-gold/10 ring-1 ring-gold-500/40'
                      : 'bg-charcoal-900 border-white/10 hover:border-gold-500/30 hover:bg-charcoal-850/60'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-mono ${
                        isSelected ? 'bg-gold-500 text-charcoal-950 font-bold' : 'bg-white/5 text-gold-400'
                      }`}>
                        {cat.id === 'residential-land' && <Building2 className="w-4 h-4" />}
                        {cat.id === 'plotted-dev' && <Map className="w-4 h-4" />}
                        {cat.id === 'long-term' && <Compass className="w-4 h-4" />}
                        {cat.id === 'commercial-other' && <Route className="w-4 h-4" />}
                      </div>
                      {isSelected && (
                        <CheckCircle className="w-4 h-4 text-gold-400" />
                      )}
                    </div>
                    <h3 className="font-serif text-base font-medium text-white mb-1.5">
                      {cat.title}
                    </h3>
                    <p className="text-xs text-warmGray-400 leading-relaxed font-sans">
                      {cat.desc}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-white/5">
                    <span className="text-[10px] font-mono tracking-wider uppercase text-gold-400">
                      {isSelected ? '✓ Selected Category' : 'Click to Select'}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Prominent Custom Enquiry Form */}
          <div className="bg-charcoal-900 border border-gold-500/30 rounded-sm p-6 sm:p-10 shadow-luxury">
            {submittedLeadId ? (
              /* Success Card */
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-gold-500/10 text-gold-400 border border-gold-500/30 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <span className="text-[11px] font-mono uppercase tracking-widest px-3 py-1 rounded bg-gold-500/10 text-gold-400 border border-gold-500/30">
                  Enquiry ID: {submittedLeadId}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-light text-white mt-4 mb-2">
                  Consultation Request Confirmed.
                </h3>
                <p className="text-sm text-warmGray max-w-lg mx-auto leading-relaxed mb-6 font-sans">
                  Thank you, <strong className="text-white">{fullName}</strong>. Your requirement for <strong className="text-gold-400">{selectedVisionCategory}</strong> in <strong className="text-white">{preferredLocation}</strong> has been assigned to our land advisory division. Abhishek Gupta will reach out to schedule your private briefing.
                </p>
                <button
                  onClick={() => setSubmittedLeadId(null)}
                  className="px-6 py-2.5 rounded text-xs uppercase tracking-widest font-semibold border border-gold-500/50 text-gold-400 hover:bg-gold-500/10 transition-colors"
                >
                  Submit Another Land Requirement
                </button>
              </div>
            ) : (
              <form onSubmit={handleVisionFormSubmit} className="space-y-6">
                <div>
                  <h3 className="font-serif text-2xl font-light text-white mb-1">
                    Request a Personalized Consultation
                  </h3>
                  <p className="text-xs text-warmGray">
                    Currently exploring: <strong className="text-gold-400">{selectedVisionCategory}</strong>. Please provide your contact details and criteria.
                  </p>
                </div>

                {submitError && (
                  <div className="p-3 rounded text-xs bg-red-500/10 border border-red-500/30 text-red-400">
                    {submitError}
                  </div>
                )}

                {/* Full Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-warmGray mb-1.5">
                      Full Name <span className="text-gold-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Vikramaditya Mehta"
                      className="w-full px-4 py-2.5 text-xs rounded bg-charcoal-850 border border-white/10 text-white placeholder-warmGray-500 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-all font-sans"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-warmGray mb-1.5">
                      Phone Number <span className="text-gold-400">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. +91 98200 12345"
                      className="w-full px-4 py-2.5 text-xs rounded bg-charcoal-850 border border-white/10 text-white placeholder-warmGray-500 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-all font-sans"
                    />
                  </div>
                </div>

                {/* Email & Preferred Location */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-warmGray mb-1.5">
                      Email Address <span className="text-gold-400">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. name@example.com"
                      className="w-full px-4 py-2.5 text-xs rounded bg-charcoal-850 border border-white/10 text-white placeholder-warmGray-500 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-all font-sans"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-warmGray mb-1.5">
                      Preferred Location
                    </label>
                    <select
                      value={preferredLocation}
                      onChange={(e) => setPreferredLocation(e.target.value)}
                      className="w-full px-4 py-2.5 text-xs rounded bg-charcoal-850 border border-white/10 text-white focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-all font-sans cursor-pointer"
                    >
                      <option value="Raigad–Pen Growth Centre">Raigad–Pen Growth Centre</option>
                      <option value="KSC New Town | Mumbai 3.0">KSC New Town | Mumbai 3.0</option>
                      <option value="Pali, Raigad District">Pali, Raigad District</option>
                      <option value="Khopoli, Raigad District">Khopoli, Raigad District</option>
                      <option value="Karjat, Maharashtra">Karjat, Maharashtra</option>
                      <option value="Lonavala / Foothills">Lonavala / Foothills</option>
                      <option value="Multiple Corridors / Other">Multiple Corridors / Other</option>
                    </select>
                  </div>
                </div>

                {/* Budget & Intended Use */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-warmGray mb-1.5">
                      Approximate Budget
                    </label>
                    <select
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      className="w-full px-4 py-2.5 text-xs rounded bg-charcoal-850 border border-white/10 text-white focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-all font-sans cursor-pointer"
                    >
                      <option value="₹50 Lakh – ₹1 Crore">₹50 Lakh – ₹1 Crore</option>
                      <option value="₹1 – ₹3 Crore">₹1 – ₹3 Crore</option>
                      <option value="₹3 – ₹5 Crore">₹3 – ₹5 Crore</option>
                      <option value="₹5 – ₹10 Crore">₹5 – ₹10 Crore</option>
                      <option value="₹10 Crore+">₹10 Crore+</option>
                      <option value="Budget to be Evaluated">Budget to be Evaluated</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-warmGray mb-1.5">
                      Intended Use
                    </label>
                    <select
                      value={intendedUse}
                      onChange={(e) => setIntendedUse(e.target.value)}
                      className="w-full px-4 py-2.5 text-xs rounded bg-charcoal-850 border border-white/10 text-white focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-all font-sans cursor-pointer"
                    >
                      <option value="Residential Second Home / Villa">Residential Second Home / Villa</option>
                      <option value="Plotted Development">Plotted Development</option>
                      <option value="Investment & Long-Term Hold">Investment & Long-Term Hold</option>
                      <option value="Commercial / Logistics / Institutional">Commercial / Logistics / Institutional</option>
                      <option value="Agrarian / Farm Retreat">Agrarian / Farm Retreat</option>
                      <option value="Other Requirement">Other Requirement</option>
                    </select>
                  </div>
                </div>

                {/* Preferred Plot Size */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-warmGray mb-1.5">
                    Preferred Plot Size (If Applicable)
                  </label>
                  <select
                    value={plotSize}
                    onChange={(e) => setPlotSize(e.target.value)}
                    className="w-full px-4 py-2.5 text-xs rounded bg-charcoal-850 border border-white/10 text-white focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-all font-sans cursor-pointer"
                  >
                    <option value="Quarter to Half Acre (10,000–20,000 sq.ft.)">Quarter to Half Acre (10,000–20,000 sq.ft.)</option>
                    <option value="Villa Plot (2,500 – 6,000 sq.ft.)">Villa Plot (2,500 – 6,000 sq.ft.)</option>
                    <option value="1 – 2 Acres">1 – 2 Acres</option>
                    <option value="3 – 5 Acres">3 – 5 Acres</option>
                    <option value="5+ Acres / Large Parcel">5+ Acres / Large Parcel</option>
                    <option value="Flexible / Needs Advisory Input">Flexible / Needs Advisory Input</option>
                  </select>
                </div>

                {/* Additional Requirements */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-warmGray mb-1.5">
                    Additional Requirements or Notes
                  </label>
                  <textarea
                    rows={3}
                    value={additionalRequirements}
                    onChange={(e) => setAdditionalRequirements(e.target.value)}
                    placeholder="Mention specific parameters such as road frontage, electricity connection, topography, or timing requirements..."
                    className="w-full px-4 py-2.5 text-xs rounded bg-charcoal-850 border border-white/10 text-white placeholder-warmGray-500 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-all font-sans resize-none"
                  />
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-8 py-3.5 rounded text-xs font-semibold uppercase tracking-widest bg-gold-500 text-charcoal-950 hover:bg-gold-400 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-gold"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>PROCESSING CONSULTATION REQUEST...</span>
                    </>
                  ) : (
                    <>
                      <span>REQUEST A PERSONALISED CONSULTATION</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

        </div>
      </section>

      {/* =========================================================================
          CLARITY BEFORE EVERY DECISION (DUE DILIGENCE GUIDANCE)
          ========================================================================= */}
      <section className="py-20 border-t border-white/10 bg-charcoal-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-gold-400 mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-gold-400" />
              <span>DUE DILIGENCE FRAMEWORK</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-light text-white tracking-tight mb-3">
              Clarity Before Every Decision
            </h2>
            <p className="text-sm text-warmGray leading-relaxed font-sans">
              Land purchases require careful evaluation. We encourage buyers to review the relevant documentation and applicable permissions before proceeding with any transaction.
            </p>
          </div>

          {/* 4 Elegant Information Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            
            {/* Card 1: Title & Ownership */}
            <div className="p-6 rounded-sm bg-charcoal-850 border border-white/10 hover:border-gold-500/30 transition-all">
              <div className="w-10 h-10 rounded bg-gold-500/10 text-gold-400 flex items-center justify-center mb-4 border border-gold-500/20">
                <FileCheck className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-medium text-white mb-2 tracking-wide">
                TITLE & OWNERSHIP
              </h3>
              <p className="text-xs text-warmGray leading-relaxed font-sans">
                Review ownership records, 7/12 extract lineage, mutation entries, encumbrance certificates, and the applicable title documentation with competent legal counsel.
              </p>
            </div>

            {/* Card 2: Land Use & Zoning */}
            <div className="p-6 rounded-sm bg-charcoal-850 border border-white/10 hover:border-gold-500/30 transition-all">
              <div className="w-10 h-10 rounded bg-gold-500/10 text-gold-400 flex items-center justify-center mb-4 border border-gold-500/20">
                <Scale className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-medium text-white mb-2 tracking-wide">
                LAND USE & ZONING
              </h3>
              <p className="text-xs text-warmGray leading-relaxed font-sans">
                Confirm the permitted regional land use, Non-Agricultural (NA) sanction orders, environmental buffers, and relevant master planning restrictions.
              </p>
            </div>

            {/* Card 3: Approvals & Registration */}
            <div className="p-6 rounded-sm bg-charcoal-850 border border-white/10 hover:border-gold-500/30 transition-all">
              <div className="w-10 h-10 rounded bg-gold-500/10 text-gold-400 flex items-center justify-center mb-4 border border-gold-500/20">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-medium text-white mb-2 tracking-wide">
                APPROVALS & REGISTRATION
              </h3>
              <p className="text-xs text-warmGray leading-relaxed font-sans">
                Verify the applicable development layout approvals, town planning sanctions, and MahaRERA registration status where required by real estate statutes.
              </p>
            </div>

            {/* Card 4: Access & Infrastructure */}
            <div className="p-6 rounded-sm bg-charcoal-850 border border-white/10 hover:border-gold-500/30 transition-all">
              <div className="w-10 h-10 rounded bg-gold-500/10 text-gold-400 flex items-center justify-center mb-4 border border-gold-500/20">
                <Route className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-medium text-white mb-2 tracking-wide">
                ACCESS & INFRASTRUCTURE
              </h3>
              <p className="text-xs text-warmGray leading-relaxed font-sans">
                Assess actual recorded road access easements, available water and electricity utilities, boundary demarcations, and the current status of relevant regional infrastructure.
              </p>
            </div>

          </div>

          {/* Transparent Statutory & Legal Disclaimers */}
          <div className="p-6 rounded bg-charcoal-950 border border-white/10 text-xs text-warmGray-400 space-y-3 leading-relaxed">
            <div className="flex items-center gap-2 text-gold-400 font-semibold text-xs tracking-wider uppercase">
              <Info className="w-4 h-4" />
              <span>STATUTORY NOTICE & TRANSPARENCY COMMITMENT</span>
            </div>
            <p>
              All property details, prices, availability, planning information, and development timelines are subject to verification. Prospective buyers should independently review applicable records and obtain appropriate professional advice before purchasing. References to proposed infrastructure or planned developments do not guarantee completion or property appreciation.
            </p>
            <p>
              KLOUD REALTY operates as an independent advisory firm and does not speculate, guarantee legal outcomes, or promise financial appreciation on land investments. Verified MahaRERA filings, planning authority notifications, and survey numbers must be confirmed prior to any formal transaction.
            </p>
          </div>

        </div>
      </section>

    </div>
  );
};
