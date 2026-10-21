import os

def write_file(path, content):
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Written: {path}")

# ==========================================
# 1. RedevelopmentPage.tsx
# ==========================================
redev_code = """import React, { useState } from 'react';
import { RefreshCw, Building2, CheckCircle2, ShieldCheck, ArrowRight, Loader2, Sparkles } from 'lucide-react';
import { leadService } from '../services/leadService';

export const RedevelopmentPage: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Society Committee Representative');
  const [locality, setLocality] = useState('Mazgaon / South Mumbai');
  const [buildingAge, setBuildingAge] = useState('35+ Years');
  const [units, setUnits] = useState('');
  const [message, setMessage] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedLeadId, setSubmittedLeadId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!fullName.trim() || !phone.trim() || !email.trim()) {
      setErrorMessage('Please fill in your name, contact phone, and email.');
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await leadService.createLead({
        fullName,
        phone,
        email,
        enquirySource: 'Redevelopment',
        serviceVertical: 'Redevelopment Consulting',
        preferredLocation: locality,
        budgetRange: 'Redevelopment Advisory',
        preferredContactMethod: 'Phone Call',
        roleInSociety: role,
        buildingAge,
        numberOfUnits: units,
        message: message || `Redevelopment enquiry from ${role} for ${buildingAge} old building in ${locality}`
      });

      if (result.success && result.leadId) {
        setSubmittedLeadId(result.leadId);
      } else {
        setErrorMessage(result.error || 'Submission failed. Please try again.');
      }
    } catch {
      setErrorMessage('A network error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-charcoal-900 text-softWhite min-h-screen pt-28 pb-20 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="border-b border-white/10 pb-12 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-cyanBrand/10 border border-cyanBrand/30 text-cyanBrand text-xs font-semibold uppercase tracking-widest mb-3">
            <RefreshCw className="w-3.5 h-3.5" />
            <span>VERTICAL 04 — URBAN REDEVELOPMENT CONSULTING</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-light text-white tracking-tight mb-6 max-w-4xl">
            The Next Chapter of Your Building Starts with a Conversation.
          </h1>
          <p className="text-sm sm:text-base text-warmGray max-w-3xl leading-relaxed">
            Explore redevelopment possibilities for residential buildings and housing societies with structured initial guidance, objective process navigation, and coordination with qualified architects, engineers, and legal professionals.
          </p>
        </div>

        {/* 2-Column Split: Advisory Framework & Consultation Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Scope & Principles */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <span className="text-xs uppercase tracking-widest text-gold-400 font-semibold block mb-2">
                STRUCTURED STAGES
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-4">
                Guiding Societies with Objectivity
              </h2>
              <p className="text-xs sm:text-sm text-warmGray leading-relaxed mb-6">
                Redevelopment is one of the most significant collective decisions a housing society will ever undertake. KLOUD REALTY acts as an independent advisory bridge, helping society members understand regulations, compare proposals, and avoid common pitfalls.
              </p>

              <div className="space-y-4">
                <div className="p-4 rounded bg-charcoal-850 border border-white/5 space-y-1">
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-white flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyanBrand" />
                    <span>Initial Society Consultation</span>
                  </h4>
                  <p className="text-xs text-warmGray leading-relaxed pl-6">
                    Clarifying the DCPR 2034 provisions, redevelopment routes (self-redevelopment vs. developer appointment), and member alignment.
                  </p>
                </div>

                <div className="p-4 rounded bg-charcoal-850 border border-white/5 space-y-1">
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-white flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyanBrand" />
                    <span>Feasibility & Assessment Coordination</span>
                  </h4>
                  <p className="text-xs text-warmGray leading-relaxed pl-6">
                    Facilitating structural audit reports, title chain checks, and plot demarcation with credentialed specialists.
                  </p>
                </div>

                <div className="p-4 rounded bg-charcoal-850 border border-white/5 space-y-1">
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-white flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyanBrand" />
                    <span>Developer Evaluation Support</span>
                  </h4>
                  <p className="text-xs text-warmGray leading-relaxed pl-6">
                    Objective evaluation of prospective developer track records, balance sheets, past project completions, and bank guarantee offers.
                  </p>
                </div>
              </div>
            </div>

            {/* Mandatory Regulatory Transparency Note */}
            <div className="p-5 rounded bg-charcoal-950 border border-gold-500/30 space-y-2">
              <div className="flex items-center gap-2 text-gold-400 font-semibold text-xs uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-cyanBrand" />
                <span>Advisory Disclaimer</span>
              </div>
              <p className="text-xs text-warmGray leading-relaxed">
                KLOUD REALTY does not promise redevelopment approvals, guaranteed additional carpet area ratios, guaranteed project completion dates, or speculative financial returns. All redevelopment feasibility depends strictly on municipal sanctions, building age, plot FSI/TDR potential, and society member consent.
              </p>
            </div>
          </div>

          {/* Right Column: Society Consultation Form */}
          <div className="lg:col-span-6">
            <div className="bg-charcoal-850 p-6 sm:p-8 rounded-sm border border-gold-500/30 shadow-luxury">
              
              {submittedLeadId ? (
                <div className="p-8 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-gold-500/10 text-gold-400 flex items-center justify-center mx-auto border border-gold-500/30">
                    <CheckCircle2 className="w-8 h-8 text-gold-400" />
                  </div>
                  <span className="text-[11px] font-mono uppercase tracking-widest px-3 py-1 rounded bg-gold-500/10 text-gold-300 border border-gold-500/30 inline-block">
                    Enquiry ID: {submittedLeadId}
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-white">
                    Redevelopment Consultation Requested
                  </h3>
                  <p className="text-xs text-warmGray leading-relaxed">
                    Thank you, {fullName}. Abhishek Gupta will review your society's parameters and reach out within 24 hours to schedule an initial advisory discussion.
                  </p>
                  <button
                    onClick={() => setSubmittedLeadId(null)}
                    className="mt-4 px-6 py-2.5 rounded bg-charcoal-800 text-xs text-softWhite hover:bg-charcoal-700 font-medium"
                  >
                    Submit Another Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-widest text-cyanBrand block mb-1">
                      CONFIDENTIAL INQUIRY
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-white">
                      Request a Society Consultation
                    </h3>
                    <p className="text-xs text-warmGray mt-1">
                      Connect with Abhishek Gupta for an initial building or society assessment.
                    </p>
                  </div>

                  {errorMessage && (
                    <div className="p-3 rounded text-xs bg-red-950/60 text-red-300 border border-red-800">
                      {errorMessage}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-warmGray mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Ramesh Kulkarni"
                        className="w-full px-3 py-2 text-xs rounded bg-charcoal-800 border border-white/10 text-white focus:border-cyanBrand outline-none font-sans"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-warmGray mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. 98201 12345"
                        className="w-full px-3 py-2 text-xs rounded bg-charcoal-800 border border-white/10 text-white focus:border-cyanBrand outline-none font-sans"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-warmGray mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. society.secretary@gmail.com"
                      className="w-full px-3 py-2 text-xs rounded bg-charcoal-800 border border-white/10 text-white focus:border-cyanBrand outline-none font-sans"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-warmGray mb-1">
                        Role / Relationship to Property
                      </label>
                      <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded bg-charcoal-800 border border-white/10 text-white focus:border-cyanBrand outline-none font-sans"
                      >
                        <option value="Society Committee Representative">Society Committee Representative</option>
                        <option value="Individual Flat Owner">Individual Flat Owner</option>
                        <option value="Society Chairman / Secretary">Society Chairman / Secretary</option>
                        <option value="Building Landlord / Heir">Building Landlord / Heir</option>
                        <option value="Potential Redevelopment Partner">Potential Redevelopment Partner</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-warmGray mb-1">
                        Property Locality
                      </label>
                      <input
                        type="text"
                        value={locality}
                        onChange={(e) => setLocality(e.target.value)}
                        placeholder="e.g. Mazgaon, Byculla, Dadar"
                        className="w-full px-3 py-2 text-xs rounded bg-charcoal-800 border border-white/10 text-white focus:border-cyanBrand outline-none font-sans"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-warmGray mb-1">
                        Approximate Building Age
                      </label>
                      <select
                        value={buildingAge}
                        onChange={(e) => setBuildingAge(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded bg-charcoal-800 border border-white/10 text-white focus:border-cyanBrand outline-none font-sans"
                      >
                        <option value="25–30 Years">25–30 Years</option>
                        <option value="30–40 Years">30–40 Years</option>
                        <option value="40+ Years (Cess / Pagdi / Freehold)">40+ Years</option>
                        <option value="Not Sure">Not Sure</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-warmGray mb-1">
                        Number of Floors / Units
                      </label>
                      <input
                        type="text"
                        value={units}
                        onChange={(e) => setUnits(e.target.value)}
                        placeholder="e.g. G+4 floors, 16 flats"
                        className="w-full px-3 py-2 text-xs rounded bg-charcoal-800 border border-white/10 text-white focus:border-cyanBrand outline-none font-sans"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-warmGray mb-1">
                      Brief Society Context / Message
                    </label>
                    <textarea
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Share any details, e.g. general body resolution status or specific questions..."
                      className="w-full px-3 py-2 text-xs rounded bg-charcoal-800 border border-white/10 text-white focus:border-cyanBrand outline-none font-sans"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 rounded text-xs uppercase tracking-widest font-semibold bg-cyanBrand hover:bg-cyanBrand-hover text-charcoal-950 transition-all duration-300 shadow-md flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Submitting Request...</span>
                      </>
                    ) : (
                      <>
                        <span>REQUEST A REDEVELOPMENT CONSULTATION</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-warmGray/60 text-center pt-2">
                    Submission does not guarantee project feasibility, appointment, or agreement.
                  </p>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
"""
write_file("src/pages/RedevelopmentPage.tsx", redev_code)
# ==========================================
# 2. PropertyDetailPage.tsx
# ==========================================
prop_detail_code = """import React, { useState, useEffect } from 'react';
import { 
  MapPin, Bed, Bath, Maximize2, ShieldCheck, Share2, PhoneCall, 
  MessageCircle, Check, CheckCircle2, ArrowLeft, Loader2, Info, Building2
} from 'lucide-react';
import { propertyService } from '../services/propertyService';
import { leadService } from '../services/leadService';
import { Property, ContactMethod } from '../types';

interface PropertyDetailPageProps {
  propertyId: string;
  onOpenConsultation: (vertical?: string, propertyTitle?: string, propertyId?: string) => void;
}

export const PropertyDetailPage: React.FC<PropertyDetailPageProps> = ({ propertyId, onOpenConsultation }) => {
  const property = propertyService.getPropertyById(propertyId);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Sticky callback form state
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [method, setMethod] = useState<ContactMethod>('Phone Call');
  const [userMessage, setUserMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [propertyId]);

  if (!property) {
    return (
      <div className="min-h-screen bg-charcoal-900 text-softWhite pt-36 pb-20 text-center font-sans">
        <h2 className="font-serif text-3xl font-light mb-4">Property Not Found</h2>
        <p className="text-sm text-warmGray mb-8">The requested property listing could not be found or has been moved.</p>
        <a href="#/buy" className="px-6 py-2.5 rounded bg-gold-500 text-charcoal-950 text-xs uppercase tracking-widest font-semibold">
          Return to Inventory
        </a>
      </div>
    );
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${property.title} | KLOUD REALTY`,
        text: property.tagline,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const handleCallbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !email.trim()) return;

    setIsSubmitting(true);
    try {
      const res = await leadService.createLead({
        fullName: name,
        phone,
        email,
        enquirySource: 'Property Details',
        serviceVertical: property.category === 'primary' ? 'Primary Market' : 'Secondary Market',
        propertyId: property.id,
        propertyTitle: property.title,
        preferredLocation: property.location,
        budgetRange: property.priceDisplay,
        preferredContactMethod: method,
        message: userMessage || `Enquiring about ${property.title} in ${property.location}`
      });

      if (res.success) {
        setSubmitSuccess(true);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentImg = property.images[selectedImageIndex] || property.images[0] || '/images/hero_architecture_1785684802035.jpg';

  const defaultPhone = '918655588880';
  const waText = encodeURIComponent(`Hello KLOUD REALTY, I am interested in "${property.title}" (${property.priceDisplay}, ${property.location}). Please share details.`);

  return (
    <div className="bg-charcoal-900 text-softWhite min-h-screen pt-24 pb-20 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link & Action Bar */}
        <div className="py-4 flex items-center justify-between border-b border-white/10 mb-8">
          <a href="#/buy" className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-warmGray hover:text-gold-400 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Discovery</span>
          </a>

          <div className="flex items-center gap-3">
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-charcoal-800 border border-white/10 text-xs text-softWhite hover:text-gold-400 transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copiedLink ? 'Link Copied!' : 'Share Property'}</span>
            </button>
          </div>
        </div>

        {/* Top Gallery Layout */}
        <div className="space-y-4 mb-12">
          {/* Main Hero Image */}
          <div className="relative aspect-[16/9] md:aspect-[21/9] rounded-sm overflow-hidden bg-charcoal-950 border border-white/10 shadow-luxury">
            <img 
              src={currentImg} 
              alt={property.title} 
              className="w-full h-full object-cover transition-all duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/80 via-transparent to-transparent pointer-events-none" />

            {/* Badges Overlay */}
            <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-sm text-xs uppercase tracking-wider font-semibold bg-charcoal-900/90 text-gold-400 border border-gold-500/30 backdrop-blur-md">
                {property.category.toUpperCase()}
              </span>
              {property.isDemoData && (
                <span className="px-2.5 py-1 rounded-sm text-[10px] uppercase tracking-wider font-medium bg-amber-500/20 text-amber-300 border border-amber-500/40 backdrop-blur-md flex items-center gap-1">
                  <Info className="w-3 h-3" />
                  <span>DEMO DATA LISTING</span>
                </span>
              )}
            </div>
          </div>

          {/* Thumbnails Row */}
          {property.images.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {property.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`relative w-24 h-16 rounded overflow-hidden shrink-0 border-2 transition-all ${
                    selectedImageIndex === idx ? 'border-gold-500 scale-105' : 'border-white/10 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 2-Column Split: Specs/Details & Sticky CallBack Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Property Full Details */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* Title & Core Price */}
            <div className="space-y-3">
              <div className="flex flex-wrap items-baseline justify-between gap-4">
                <h1 className="font-serif text-3xl sm:text-5xl font-light text-white tracking-tight">
                  {property.title}
                </h1>
                <div className="text-2xl sm:text-3xl font-serif font-bold gold-gradient-text">
                  {property.priceDisplay}
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-warmGray-200">
                <MapPin className="w-4 h-4 text-gold-400 shrink-0" />
                <span>{property.location}</span>
                <span className="text-white/20">•</span>
                <span>{property.locality}, {property.city}</span>
              </div>

              <p className="text-sm text-warmGray italic font-serif">
                "{property.tagline}"
              </p>
            </div>

            {/* Key Specs Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded bg-charcoal-850 border border-white/10">
              {property.bedrooms && (
                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-wider text-warmGray block">Configuration</span>
                  <div className="flex items-center gap-1.5 text-sm font-semibold text-white">
                    <Bed className="w-4 h-4 text-gold-400" />
                    <span>{property.bedrooms} Bedrooms</span>
                  </div>
                </div>
              )}

              {property.bathrooms && (
                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-wider text-warmGray block">Bathrooms</span>
                  <div className="flex items-center gap-1.5 text-sm font-semibold text-white">
                    <Bath className="w-4 h-4 text-gold-400" />
                    <span>{property.bathrooms} En-suites</span>
                  </div>
                </div>
              )}

              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-wider text-warmGray block">Area</span>
                <div className="flex items-center gap-1.5 text-sm font-semibold text-white">
                  <Maximize2 className="w-4 h-4 text-gold-400" />
                  <span>{property.carpetArea || property.plotArea}</span>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-wider text-warmGray block">Possession</span>
                <div className="text-sm font-semibold text-white">
                  <span>{property.possession}</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-4">
              <h2 className="font-serif text-2xl font-light text-white">Property Overview</h2>
              <p className="text-sm text-warmGray leading-relaxed font-sans">
                {property.description}
              </p>
            </div>

            {/* Key Architectural Features */}
            {property.features.length > 0 && (
              <div className="space-y-4">
                <h2 className="font-serif text-2xl font-light text-white">Architectural Highlights</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {property.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-xs text-softWhite/90 p-3 rounded bg-charcoal-850 border border-white/5">
                      <CheckCircle2 className="w-4 h-4 text-cyanBrand shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Amenities */}
            {property.amenities.length > 0 && (
              <div className="space-y-4">
                <h2 className="font-serif text-2xl font-light text-white">Amenities & Lifestyle</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {property.amenities.map((am, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-xs text-softWhite/90 p-3 rounded bg-charcoal-850 border border-white/5">
                      <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0" />
                      <span>{am}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Nearby Infrastructure */}
            {property.nearby.length > 0 && (
              <div className="space-y-4">
                <h2 className="font-serif text-2xl font-light text-white">Connectivity & Proximity</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {property.nearby.map((loc, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded bg-charcoal-850 border border-white/5 text-xs">
                      <span className="text-softWhite font-medium">{loc.label}</span>
                      <span className="text-gold-400 font-mono font-medium">{loc.distance}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* RERA and Verification Status */}
            <div className="p-6 rounded bg-charcoal-950 border border-gold-500/30 space-y-3">
              <div className="flex items-center gap-2 text-gold-400 text-xs font-semibold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-cyanBrand" />
                <span>Verification & Regulatory Notice</span>
              </div>
              {property.reraNumber && (
                <div className="text-xs text-white">
                  <span className="text-warmGray">Project Regulatory Reference: </span>
                  <span className="font-mono font-bold text-gold-300">{property.reraNumber}</span>
                </div>
              )}
              <p className="text-xs text-warmGray leading-relaxed">
                KLOUD REALTY acts as a professional advisory consultant (RERA Reg: A0311 72501659). All specifications and dates should be verified against developer agreements before financial commitment.
              </p>
            </div>

          </div>

          {/* Right Column: Sticky Callback & Consultation Panel */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 bg-charcoal-850 p-6 rounded-sm border border-gold-500/30 shadow-luxury space-y-5">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-gold-400 font-semibold block mb-1">
                  DIRECT CONSULTATION
                </span>
                <h3 className="font-serif text-2xl font-bold text-white">
                  Interested in This Property?
                </h3>
                <p className="text-xs text-warmGray mt-1">
                  Connect with Abhishek Gupta for floor plans, availability, and site viewings.
                </p>
              </div>

              {submitSuccess ? (
                <div className="p-6 text-center space-y-3 bg-charcoal-900 rounded border border-gold-500/30">
                  <CheckCircle2 className="w-10 h-10 text-gold-400 mx-auto" />
                  <h4 className="font-serif text-lg font-bold text-white">Callback Scheduled</h4>
                  <p className="text-xs text-warmGray">
                    Thank you. We will connect with you via {method} shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleCallbackSubmit} className="space-y-3">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-warmGray mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your full name"
                      className="w-full px-3 py-2 text-xs rounded bg-charcoal-800 border border-white/10 text-white focus:border-gold-500 outline-none font-sans"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-warmGray mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. 98200 12345"
                      className="w-full px-3 py-2 text-xs rounded bg-charcoal-800 border border-white/10 text-white focus:border-gold-500 outline-none font-sans"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-warmGray mb-1">Email *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your email address"
                      className="w-full px-3 py-2 text-xs rounded bg-charcoal-800 border border-white/10 text-white focus:border-gold-500 outline-none font-sans"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-warmGray mb-1">Contact Method</label>
                    <div className="grid grid-cols-3 gap-1.5">
                      {(['Phone Call', 'WhatsApp', 'Email'] as ContactMethod[]).map(m => (
                        <button
                          key={m}
                          type="button"
                          onClick={() => setMethod(m)}
                          className={`py-1.5 text-[10px] rounded border transition-colors ${
                            method === m ? 'border-gold-500 bg-gold-500/20 text-gold-300 font-semibold' : 'border-white/10 bg-charcoal-800 text-warmGray'
                          }`}
                        >
                          {m}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-warmGray mb-1">Optional Message</label>
                    <textarea
                      rows={2}
                      value={userMessage}
                      onChange={(e) => setUserMessage(e.target.value)}
                      placeholder="Preferred time for callback, specific requirements..."
                      className="w-full px-3 py-2 text-xs rounded bg-charcoal-800 border border-white/10 text-white focus:border-gold-500 outline-none font-sans"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 rounded text-xs uppercase tracking-widest font-semibold bg-gold-500 text-charcoal-950 hover:bg-gold-400 transition-colors shadow-gold-glow flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        <PhoneCall className="w-4 h-4" />
                        <span>REQUEST A CALL BACK</span>
                      </>
                    )}
                  </button>
                </form>
              )}

              {/* Direct WhatsApp Option */}
              <div className="pt-4 border-t border-white/10">
                <a
                  href={`https://wa.me/${defaultPhone}?text=${waText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Enquire on WhatsApp</span>
                </a>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
"""
write_file("src/pages/PropertyDetailPage.tsx", prop_detail_code)
# ==========================================
# 3. AboutPage.tsx
# ==========================================
about_code = """import React from 'react';
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
"""
write_file("src/pages/AboutPage.tsx", about_code)

# ==========================================
# 4. ContactPage.tsx
# ==========================================
contact_code = """import React, { useState } from 'react';
import { MapPin, Phone, Mail, MessageCircle, Clock, ShieldCheck, ArrowRight, Loader2, CheckCircle2 } from 'lucide-react';
import { leadService } from '../services/leadService';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState('Primary Market');
  const [location, setLocation] = useState('Mazgaon, Mumbai');
  const [message, setMessage] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedLeadId, setSubmittedLeadId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!name.trim() || !phone.trim() || !email.trim()) {
      setErrorMessage('Please fill in your name, contact phone, and email.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await leadService.createLead({
        fullName: name,
        phone,
        email,
        enquirySource: 'Contact Page',
        serviceVertical: service as any,
        preferredLocation: location,
        message: message || `General contact enquiry for ${service} in ${location}`
      });

      if (res.success && res.leadId) {
        setSubmittedLeadId(res.leadId);
      } else {
        setErrorMessage(res.error || 'Failed to submit enquiry. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const defaultWaNumber = '918655588880';
  const waMsg = encodeURIComponent('Hello KLOUD REALTY, I would like to schedule a property consultation.');

  return (
    <div className="bg-charcoal-900 text-softWhite min-h-screen pt-28 pb-20 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="border-b border-white/10 pb-12 mb-16 max-w-4xl">
          <span className="text-xs uppercase tracking-widest text-gold-400 font-semibold block mb-2">
            CONNECT WITH US
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-light text-white tracking-tight mb-6">
            Let's Find Your Next Opportunity.
          </h1>
          <p className="text-sm sm:text-base text-warmGray leading-relaxed font-light">
            Whether you are exploring a new residence in Mumbai, looking into weekend land, or seeking an initial consultation regarding your building's redevelopment, we invite you to connect.
          </p>
        </div>

        {/* 2-Column Grid: Contact Information & Direct Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
          
          {/* Left Column: Office & Direct Actions */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-charcoal-850 p-6 sm:p-8 rounded-sm border border-gold-500/30 space-y-6 shadow-luxury">
              
              <div className="flex items-center gap-3 pb-4 border-b border-white/10">
                <img src="/images/logo_badge.png" alt="KLOUD REALTY" className="h-10 w-auto" />
                <div>
                  <h3 className="font-serif text-xl font-bold text-white">KLOUD REALTY</h3>
                  <p className="text-xs text-gold-400 font-mono">Abhishek Gupta</p>
                </div>
              </div>

              {/* Office Address */}
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
                <div className="text-xs space-y-1 text-softWhite/90 leading-relaxed">
                  <p className="font-semibold text-white">Registered Office Address:</p>
                  <p>KLOUD REALTY</p>
                  <p>Shop No. 2, 321 R.B. Marg,</p>
                  <p>Abdul Rauf Manzil, Opposite Piramal Aranya,</p>
                  <p>Mazgaon, Mumbai – 400010, Maharashtra, India.</p>
                </div>
              </div>

              {/* Phone Numbers */}
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
                <div className="text-xs space-y-1">
                  <p className="font-semibold text-white">Direct Telephone Numbers:</p>
                  <div className="space-y-1 font-mono text-sm text-gold-300">
                    <p><a href="tel:8655588880" className="hover:underline">86-555-88880</a></p>
                    <p><a href="tel:9619977171" className="hover:underline">96-199-77171</a></p>
                  </div>
                  <p className="text-[11px] text-warmGray/70 pt-1">
                    Numbers preserved exactly as verified on official business credentials.
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
                <div className="text-xs space-y-1">
                  <p className="font-semibold text-white">Email Consultation Desk:</p>
                  <a href="mailto:kloudrealty@gmail.com" className="font-mono text-sm text-gold-300 hover:underline block">
                    kloudrealty@gmail.com
                  </a>
                </div>
              </div>

              {/* RERA */}
              <div className="pt-4 border-t border-white/10 flex items-center gap-2 text-xs">
                <ShieldCheck className="w-4 h-4 text-cyanBrand" />
                <span className="text-warmGray">RERA Registration ID:</span>
                <span className="font-mono font-bold text-white">A0311 72501659</span>
              </div>

            </div>

            {/* Quick Action Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <a
                href="tel:8655588880"
                className="py-3 px-4 rounded bg-charcoal-850 hover:bg-charcoal-800 border border-white/10 text-xs font-semibold text-center text-white flex items-center justify-center gap-2 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-gold-400" />
                <span>Call Desk</span>
              </a>

              <a
                href={`https://wa.me/${defaultWaNumber}?text=${waMsg}`}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-4 rounded bg-emerald-600 hover:bg-emerald-500 text-xs font-semibold text-center text-white flex items-center justify-center gap-2 transition-colors shadow-sm"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp Us</span>
              </a>
            </div>
          </div>

          {/* Right Column: Contact Enquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-charcoal-850 p-6 sm:p-10 rounded-sm border border-gold-500/30 shadow-luxury">
              
              {submittedLeadId ? (
                <div className="p-8 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-gold-500/10 text-gold-400 flex items-center justify-center mx-auto border border-gold-500/30">
                    <CheckCircle2 className="w-8 h-8 text-gold-400" />
                  </div>
                  <span className="text-[11px] font-mono uppercase tracking-widest px-3 py-1 rounded bg-gold-500/10 text-gold-300 border border-gold-500/30 inline-block">
                    Enquiry ID: {submittedLeadId}
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-white">
                    Enquiry Submitted Successfully
                  </h3>
                  <p className="text-xs text-warmGray leading-relaxed max-w-md mx-auto">
                    Thank you, {name}. Abhishek Gupta will connect with you shortly regarding your enquiry for {service}.
                  </p>
                  <button
                    onClick={() => setSubmittedLeadId(null)}
                    className="mt-4 px-6 py-2.5 rounded bg-charcoal-800 text-xs text-softWhite hover:bg-charcoal-700 font-medium"
                  >
                    Submit Another Enquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-widest text-gold-400 block mb-1">
                      GET IN TOUCH
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-white">
                      Send a Message
                    </h3>
                    <p className="text-xs text-warmGray mt-1">
                      Our team responds promptly with verified information.
                    </p>
                  </div>

                  {errorMessage && (
                    <div className="p-3 rounded text-xs bg-red-950/60 text-red-300 border border-red-800">
                      {errorMessage}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-warmGray mb-1">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your name"
                        className="w-full px-3 py-2 text-xs rounded bg-charcoal-800 border border-white/10 text-white focus:border-gold-500 outline-none font-sans"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-warmGray mb-1">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. 98200 12345"
                        className="w-full px-3 py-2 text-xs rounded bg-charcoal-800 border border-white/10 text-white focus:border-gold-500 outline-none font-sans"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-warmGray mb-1">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. name@example.com"
                        className="w-full px-3 py-2 text-xs rounded bg-charcoal-800 border border-white/10 text-white focus:border-gold-500 outline-none font-sans"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-warmGray mb-1">Interested Service</label>
                      <select
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded bg-charcoal-800 border border-white/10 text-white focus:border-gold-500 outline-none font-sans"
                      >
                        <option value="Primary Market">Primary Market / New Projects</option>
                        <option value="Secondary Market">Secondary Market / Resale</option>
                        <option value="Rental">Curated Rental Residence</option>
                        <option value="Second Homes & Land">Second Homes & Land</option>
                        <option value="Redevelopment Consulting">Redevelopment Consulting</option>
                        <option value="General Consultation">General Property Advisory</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-warmGray mb-1">Preferred Location</label>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g. Mazgaon, Worli, Alibaug"
                      className="w-full px-3 py-2 text-xs rounded bg-charcoal-800 border border-white/10 text-white focus:border-gold-500 outline-none font-sans"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-warmGray mb-1">Message / Requirements</label>
                    <textarea
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Share your requirements, budget preferences, or specific queries..."
                      className="w-full px-3 py-2 text-xs rounded bg-charcoal-800 border border-white/10 text-white focus:border-gold-500 outline-none font-sans"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 rounded text-xs uppercase tracking-widest font-semibold bg-gold-500 text-charcoal-950 hover:bg-gold-400 transition-colors shadow-gold-glow flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Sending Enquiry...</span>
                      </>
                    ) : (
                      <>
                        <span>SUBMIT CONSULTATION REQUEST</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-warmGray/60 text-center pt-2">
                    Your details are confidential and never shared with third-party telemarketers.
                  </p>
                </form>
              )}

            </div>
          </div>

        </div>

        {/* Embedded Google Map Section for Mazgaon Office */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs uppercase tracking-widest text-gold-400 font-semibold block mb-1">
                OFFICE LOCATION
              </span>
              <h3 className="font-serif text-2xl font-light text-white">
                Visit Our Office in Mazgaon
              </h3>
            </div>
            <a
              href="https://maps.google.com/?q=Piramal+Aranya+Mazgaon+Mumbai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-gold-400 hover:underline inline-flex items-center gap-1"
            >
              <span>Open in Google Maps</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="w-full h-[380px] rounded-sm overflow-hidden border border-white/10 shadow-luxury bg-charcoal-950 relative">
            <iframe
              title="KLOUD REALTY Mazgaon Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3773.342111059535!2d72.84650637599042!3d18.96048865560114!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7ce47f0e6371f%3A0x6a0058b8f2d501b1!2sPiramal%20Aranya!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) contrast(90%)' }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

      </div>
    </div>
  );
};
"""
write_file("src/pages/ContactPage.tsx", contact_code)
