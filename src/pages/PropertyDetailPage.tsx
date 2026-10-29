import React, { useState, useEffect } from 'react';
import { 
  MapPin, Bed, Bath, Maximize2, ShieldCheck, Share2, PhoneCall, 
  MessageCircle, Check, CheckCircle2, ArrowLeft, Loader2, Info, Building2,
  Calendar, Sparkles, ExternalLink, Compass, X, ZoomIn, Eye, Layers, Clock
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

  // Lightbox Modal State
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  // Custom Enquiry Form State
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [selectedConfig, setSelectedConfig] = useState('');
  const [selectedFloorRange, setSelectedFloorRange] = useState('');
  const [budget, setBudget] = useState('');
  const [method, setMethod] = useState<ContactMethod>('Phone Call');
  const [userMessage, setUserMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setSubmitSuccess(false);
    setErrorMessage('');
    if (property) {
      if (property.configurationsAvailable && property.configurationsAvailable.length > 0) {
        setSelectedConfig(property.configurationsAvailable[0]);
      }
      if (property.specificEnquiryType === 'imperial') {
        setSelectedFloorRange('33rd–45th floors (2,046 sq. ft.)');
      }
    }
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

  const relatedProperties = propertyService
    .getPublishedProperties()
    .filter(p => p.id !== property.id && p.category === property.category)
    .slice(0, 3);

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

  const handleEnquirySubmit = async (e: React.FormEvent, isSiteVisit = false) => {
    e.preventDefault();
    setErrorMessage('');

    if (!name.trim() || name.trim().length < 2) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    const cleanPhone = phone.replace(/[\s-]/g, '');
    if (!cleanPhone || cleanPhone.length < 8) {
      setErrorMessage('Please enter a valid phone number (minimum 8 digits).');
      return;
    }

    setIsSubmitting(true);
    try {
      const intentNote = isSiteVisit ? 'Site Visit Request' : 'Direct Property Enquiry';
      const configNote = selectedConfig ? ` | Config: ${selectedConfig}` : '';
      const floorNote = selectedFloorRange ? ` | Floor: ${selectedFloorRange}` : '';
      const fullMessage = userMessage 
        ? `${intentNote}: ${property.title}${configNote}${floorNote} | Note: ${userMessage}`
        : `${intentNote}: ${property.title}${configNote}${floorNote} in ${property.location}`;

      const res = await leadService.createLead({
        fullName: name,
        phone,
        email: email || 'Not provided',
        enquirySource: 'Property Details',
        serviceVertical: property.category === 'primary' ? 'Primary Market' : 'Secondary Market',
        propertyId: property.id,
        propertyTitle: property.title,
        propertyRequirement: isSiteVisit ? 'Schedule a Site Visit' : 'Buy a New Property (Primary Market)',
        preferredLocation: property.location,
        budgetRange: budget || property.priceDisplay,
        preferredContactMethod: method,
        message: fullMessage
      });

      if (res.success) {
        setSubmitSuccess(true);
      } else {
        setErrorMessage(res.error || 'Failed to submit enquiry. Please verify your details.');
      }
    } catch {
      setErrorMessage('A network error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentImg = property.images[selectedImageIndex] || property.images[0] || '/images/hero_architecture_1785684802035.jpg';
  const defaultPhone = '918655588880';
  const waText = encodeURIComponent(`Hello KLOUD REALTY, I am interested in exploring "${property.title}" in ${property.location} (${property.priceDisplay}). Please share details.`);

  return (
    <div className="bg-charcoal-900 text-softWhite min-h-screen pt-20 pb-20 font-sans selection:bg-gold-500 selection:text-charcoal-950">
      
      {/* SECTION A: EDITORIAL HERO */}
      <section className="relative min-h-[520px] sm:min-h-[580px] lg:min-h-[640px] flex flex-col justify-end pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 border-b border-white/10 overflow-hidden">
        {/* Full-width Background Image with Left/Bottom Gradient */}
        <div className="absolute inset-0 bg-charcoal-950">
          <img 
            src={property.creativeImage || currentImg} 
            alt={property.title} 
            className="w-full h-full object-cover object-center opacity-50 scale-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/70 to-charcoal-950/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal-950/90 via-charcoal-950/60 to-transparent" />
        </div>

        {/* Hero Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto w-full">
          {/* Breadcrumb & Navigation Link */}
          <div className="flex items-center justify-between pb-6 mb-6 border-b border-white/10">
            <a href="#/buy" className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-warmGray hover:text-gold-400 transition-colors">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Curated Portfolio</span>
            </a>

            <div className="flex items-center gap-2">
              <button
                onClick={handleShare}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-charcoal-900/90 border border-white/10 text-xs text-softWhite hover:text-gold-400 transition-colors backdrop-blur-md"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{copiedLink ? 'Link Copied!' : 'Share'}</span>
              </button>
            </div>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            {property.developer && (
              <span className="px-3 py-1 rounded-sm text-xs uppercase tracking-wider font-semibold bg-charcoal-900/90 text-cyanBrand border border-cyanBrand/30 backdrop-blur-md flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5" />
                <span>{property.developer}</span>
              </span>
            )}
            <span className="px-3 py-1 rounded-sm text-xs uppercase tracking-wider font-semibold bg-charcoal-900/90 text-gold-400 border border-gold-500/30 backdrop-blur-md">
              {property.category === 'primary' ? 'Landmark Development' : property.category.toUpperCase()}
            </span>
            <span className="px-3 py-1 rounded-sm text-xs font-mono text-warmGray bg-charcoal-950/80 border border-white/10 backdrop-blur-md">
              MahaRERA: {property.reraNumber}
            </span>
          </div>

          {/* Project Title & Headline */}
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-light text-white tracking-tight mb-3">
            {property.title}
          </h1>
          
          <p className="font-serif italic text-lg sm:text-2xl text-gold-300 font-light max-w-3xl mb-4">
            {property.subheading || property.mainHeadline || property.tagline}
          </p>

          <div className="flex items-center gap-2 text-sm text-warmGray-100/90 mb-8 font-sans">
            <MapPin className="w-4 h-4 text-gold-400 shrink-0" />
            <span>{property.location}</span>
          </div>

          {/* Primary & Secondary Hero CTAs */}
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => onOpenConsultation('Primary Market', property.title, property.id)}
              className="px-7 py-3.5 rounded bg-gold-500 text-charcoal-950 font-semibold text-xs uppercase tracking-widest hover:bg-gold-400 transition-all shadow-gold-glow flex items-center gap-2"
            >
              <span>{property.priceRevisionNote ? 'Enquire for Current Pricing' : 'Enquire Now'}</span>
            </button>

            <button
              onClick={() => onOpenConsultation('Site Visit Scheduling', `Schedule Site Visit: ${property.title}`, property.id)}
              className="px-7 py-3.5 rounded border border-gold-500/50 bg-charcoal-900/80 text-softWhite hover:text-gold-300 hover:border-gold-400 hover:bg-gold-500/10 transition-all text-xs uppercase tracking-widest font-semibold flex items-center gap-2"
            >
              <Calendar className="w-4 h-4 text-cyanBrand" />
              <span>Schedule a Site Visit</span>
            </button>

            <a
              href={`https://wa.me/${defaultPhone}?text=${waText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded bg-emerald-600/90 hover:bg-emerald-500 text-white font-semibold text-xs uppercase tracking-widest transition-all flex items-center gap-2 shadow-sm"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Advisory</span>
            </a>
          </div>

        </div>
      </section>

      {/* MAIN CONTENT CONTAINER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* LEFT 8 COLUMNS: Project Details */}
          <div className="lg:col-span-8 space-y-16">
            
            {/* SECTION B: PROJECT INTRODUCTION */}
            <section className="bg-charcoal-850 p-6 sm:p-8 rounded-sm border border-white/10 shadow-subtle space-y-4">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-gold-400">
                <Sparkles className="w-4 h-4" />
                <span>Project Overview & Architectural Vision</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-light text-white">
                {property.subheading || 'Refined Urban Living in Mumbai'}
              </h2>
              <p className="text-sm sm:text-base text-warmGray-100 leading-relaxed font-sans">
                {property.description}
              </p>
              
              {/* Land Parcel & Tower Architecture Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10 text-xs">
                {property.landParcel && (
                  <div>
                    <span className="text-warmGray block text-[11px] uppercase tracking-wider">Land Parcel</span>
                    <span className="font-semibold text-white text-sm">{property.landParcel}</span>
                  </div>
                )}
                {property.ceilingHeight && (
                  <div>
                    <span className="text-warmGray block text-[11px] uppercase tracking-wider">Ceiling Height</span>
                    <span className="font-semibold text-white text-sm">{property.ceilingHeight}</span>
                  </div>
                )}
                {property.clubhouseDetails && (
                  <div>
                    <span className="text-warmGray block text-[11px] uppercase tracking-wider">Clubhouse</span>
                    <span className="font-semibold text-white text-sm">{property.clubhouseDetails}</span>
                  </div>
                )}
                {property.balconyDetails && (
                  <div>
                    <span className="text-warmGray block text-[11px] uppercase tracking-wider">Balcony Space</span>
                    <span className="font-semibold text-white text-sm">{property.balconyDetails}</span>
                  </div>
                )}
                <div>
                  <span className="text-warmGray block text-[11px] uppercase tracking-wider">Current Status</span>
                  <span className="font-semibold text-gold-400 text-sm">{property.constructionStatus}</span>
                </div>
                <div>
                  <span className="text-warmGray block text-[11px] uppercase tracking-wider">Possession Timeline</span>
                  <span className="font-semibold text-white text-sm">{property.possession}</span>
                </div>
              </div>

              {/* Tower Breakdown for Piramal Aranya */}
              {property.towerBreakdown && (
                <div className="mt-4 pt-4 border-t border-white/10">
                  <span className="text-xs font-semibold uppercase tracking-wider text-gold-400 block mb-2">
                    Tower Configurations & Heights
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                    {property.towerBreakdown.map((t, idx) => (
                      <div key={idx} className="p-2.5 rounded bg-charcoal-900 border border-white/5">
                        <span className="text-warmGray block text-[10px] uppercase">{t.name}</span>
                        <span className="font-semibold text-white">{t.storeys}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </section>

            {/* SECTION C: KEY HIGHLIGHTS GRID */}
            <section className="space-y-6">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-gold-400">
                <Layers className="w-4 h-4" />
                <span>Distinguished Highlights</span>
              </div>
              <h3 className="font-serif text-2xl font-light text-white">Crafted for Exceptional Living</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {property.features.map((feat, index) => (
                  <div key={index} className="p-4 rounded-sm bg-charcoal-850 border border-white/10 flex items-start gap-3 hover:border-gold-500/30 transition-colors">
                    <CheckCircle2 className="w-4 h-4 text-cyanBrand shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-softWhite leading-relaxed">{feat}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION D: CONFIGURATIONS & PRICING */}
            <section className="bg-charcoal-850 p-6 sm:p-8 rounded-sm border border-white/10 space-y-6">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-widest text-gold-400 block mb-1">
                    RESIDENCE SELECTION & PRICING
                  </span>
                  <h3 className="font-serif text-2xl font-light text-white">
                    Available Layouts & Configurations
                  </h3>
                </div>
                <div className="text-right">
                  <span className="text-xs text-warmGray block">Starting Price</span>
                  <span className="font-serif text-2xl sm:text-3xl font-bold text-gold-400">
                    {property.priceDisplay}
                  </span>
                </div>
              </div>

              {/* Configurations List */}
              {property.configurationsAvailable && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {property.configurationsAvailable.map((config, idx) => (
                    <div key={idx} className="p-4 rounded bg-charcoal-900 border border-white/10 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <Bed className="w-4 h-4 text-gold-400" />
                        <span className="text-xs sm:text-sm font-medium text-white">{config}</span>
                      </div>
                      <span className="text-[11px] text-cyanBrand font-mono">Available</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Project Specific Notes */}
              {property.priceRevisionNote && (
                <div className="p-4 rounded bg-charcoal-900 border border-gold-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-xs font-semibold text-gold-300 block mb-0.5">
                      {property.priceRevisionNote}
                    </span>
                    <span className="text-xs text-warmGray">
                      Current inventory and pricing are updated continuously through our direct developer desk.
                    </span>
                  </div>
                  <button
                    onClick={() => onOpenConsultation('Primary Market', property.title, property.id)}
                    className="px-5 py-2.5 rounded bg-gold-500 text-charcoal-950 font-semibold text-xs uppercase tracking-wider hover:bg-gold-400 transition-colors whitespace-nowrap"
                  >
                    Enquire for Current Pricing
                  </button>
                </div>
              )}

              {/* Disclaimers */}
              {property.disclaimerText && (
                <p className="text-[11px] text-warmGray/80 leading-relaxed italic border-t border-white/5 pt-3">
                  {property.disclaimerText}
                </p>
              )}
            </section>

            {/* SECTION E: IMAGE GALLERY & LIGHTBOX */}
            <section className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-widest text-gold-400 block mb-1">
                    PROJECT VISUALS
                  </span>
                  <h3 className="font-serif text-2xl font-light text-white">Visual Showcase</h3>
                </div>
                <span className="text-xs text-warmGray">Click any image to view in full resolution</span>
              </div>

              {/* Main Showcase Image */}
              <div 
                className="relative aspect-[16/10] rounded-sm overflow-hidden bg-charcoal-950 border border-white/10 group cursor-pointer shadow-luxury"
                onClick={() => setLightboxImage(currentImg)}
              >
                <img 
                  src={currentImg} 
                  alt={property.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/70 via-transparent to-transparent" />
                <div className="absolute bottom-4 right-4 flex items-center gap-2 px-3 py-1.5 rounded bg-charcoal-950/80 border border-white/20 text-xs text-softWhite backdrop-blur-md">
                  <ZoomIn className="w-3.5 h-3.5 text-gold-400" />
                  <span>View Full Resolution</span>
                </div>
              </div>

              {/* Thumbnails Row */}
              <div className="grid grid-cols-4 gap-3">
                {property.images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative aspect-[16/10] rounded overflow-hidden border transition-all ${
                      selectedImageIndex === idx 
                        ? 'border-gold-500 ring-2 ring-gold-500/20 shadow-gold-glow' 
                        : 'border-white/10 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`${property.title} gallery ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </section>

            {/* SECTION F: LOCATION & CONNECTIVITY */}
            <section className="bg-charcoal-850 p-6 sm:p-8 rounded-sm border border-white/10 space-y-6">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-gold-400">
                <Compass className="w-4 h-4" />
                <span>Prime Connectivity & Neighborhood</span>
              </div>
              <h3 className="font-serif text-2xl font-light text-white">{property.location}</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {property.nearby.map((place, idx) => (
                  <div key={idx} className="p-3.5 rounded bg-charcoal-900 border border-white/5 flex items-center justify-between text-xs">
                    <span className="text-softWhite font-medium">{place.label}</span>
                    <span className="text-gold-400 font-mono">{place.distance}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION G: RERA & REGULATORY DISCLOSURES / PLANNING AUTHORITY */}
            <section className="p-6 rounded-sm bg-charcoal-950 border border-gold-500/30 space-y-3 text-xs text-warmGray">
              {property.reraNumber ? (
                <>
                  <div className="flex items-center gap-2 text-gold-400 font-semibold uppercase tracking-wider text-[11px]">
                    <ShieldCheck className="w-4 h-4 text-gold-400" />
                    <span>MahaRERA Registration & Regulatory Compliance</span>
                  </div>
                  <p className="leading-relaxed">
                    Project registered under MahaRERA as <strong className="text-white font-mono">{property.reraNumber}</strong>. 
                    Detailed plans, approvals, and quarterly progress disclosures are available for public verification on the official MahaRERA website:
                  </p>
                  <div>
                    <a
                      href={property.reraRegistrationLink || 'https://maharera.maharashtra.gov.in/'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-cyanBrand hover:text-cyanBrand-light underline font-mono font-medium"
                    >
                      <span>Verify on official MahaRERA Portal</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-2 text-gold-400 font-semibold uppercase tracking-wider text-[11px]">
                    <ShieldCheck className="w-4 h-4 text-gold-400" />
                    <span>Planning Authority & Due Diligence Advisory</span>
                  </div>
                  {property.planningAuthority && (
                    <p className="leading-relaxed text-softWhite">
                      Planning Authority: <strong className="text-gold-400">{property.planningAuthority}</strong>
                    </p>
                  )}
                  <p className="leading-relaxed">
                    {property.disclaimerText || 'All property details, planning status, and regulatory notifications are subject to independent verification before purchase. KLOUD REALTY coordinates comprehensive due-diligence support.'}
                  </p>
                  {property.officialReferenceUrl && (
                    <div>
                      <a
                        href={property.officialReferenceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs text-cyanBrand hover:text-cyanBrand-light underline font-mono font-medium"
                      >
                        <span>Official Planning Authority / Government Reference</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  )}
                </>
              )}
            </section>

          </div>

          {/* RIGHT 4 COLUMNS: SECTION H — DEDICATED ENQUIRY & SITE VISIT PANEL */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 bg-charcoal-850 p-6 sm:p-8 rounded-sm border border-gold-500/30 shadow-luxury space-y-6">
              
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-widest text-gold-400 block mb-1">
                  OFFICIAL ADVISORY DESK
                </span>
                <h3 className="font-serif text-2xl font-light text-white">
                  {property.specificEnquiryType === 'imperial' 
                    ? 'Explore Residences at Imperial Tower 3' 
                    : property.specificEnquiryType === 'aranya'
                    ? 'Find Your Home at Piramal Aranya'
                    : property.specificEnquiryType === 'minerva'
                    ? 'Discover The Minerva'
                    : `Enquire About ${property.title}`}
                </h3>
                <p className="text-xs text-warmGray leading-relaxed mt-2">
                  Connect with Abhishek Gupta & our senior advisory desk for confirmed availability, floor plans, and a private site visit.
                </p>
              </div>

              {submitSuccess ? (
                <div className="p-6 rounded bg-emerald-950/40 border border-emerald-500/40 text-center space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                  <h4 className="font-serif text-lg text-white font-semibold">Enquiry Received</h4>
                  <p className="text-xs text-warmGray-100 leading-relaxed">
                    Thank you. Our senior property advisor will reach out to you shortly regarding {property.title}.
                  </p>
                  <button
                    onClick={() => setSubmitSuccess(false)}
                    className="text-xs text-gold-400 underline font-medium"
                  >
                    Submit another request
                  </button>
                </div>
              ) : (
                <form onSubmit={(e) => handleEnquirySubmit(e, false)} className="space-y-4">
                  {errorMessage && (
                    <div className="p-2.5 rounded bg-red-900/30 border border-red-500/50 text-red-300 text-xs">
                      {errorMessage}
                    </div>
                  )}

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-warmGray mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Vikramaditya Singhania"
                      className="w-full px-3.5 py-2.5 rounded bg-charcoal-900 border border-white/10 text-xs text-white placeholder-warmGray/50 focus:border-gold-500 focus:outline-none"
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
                      placeholder="e.g. 98200 12345"
                      className="w-full px-3.5 py-2.5 rounded bg-charcoal-900 border border-white/10 text-xs text-white placeholder-warmGray/50 focus:border-gold-500 focus:outline-none font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-warmGray mb-1">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full px-3.5 py-2.5 rounded bg-charcoal-900 border border-white/10 text-xs text-white placeholder-warmGray/50 focus:border-gold-500 focus:outline-none"
                    />
                  </div>

                  {/* Preferred Configuration Selector */}
                  {property.configurationsAvailable && (
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-warmGray mb-1">
                        Preferred Configuration
                      </label>
                      <select
                        value={selectedConfig}
                        onChange={(e) => setSelectedConfig(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded bg-charcoal-900 border border-white/10 text-xs text-white focus:border-gold-500 focus:outline-none"
                      >
                        {property.configurationsAvailable.map((c, idx) => (
                          <option key={idx} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* Imperial Tower 3 Floor Range Selector */}
                  {property.specificEnquiryType === 'imperial' && (
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-warmGray mb-1">
                        Preferred Floor Range
                      </label>
                      <select
                        value={selectedFloorRange}
                        onChange={(e) => setSelectedFloorRange(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded bg-charcoal-900 border border-white/10 text-xs text-white focus:border-gold-500 focus:outline-none"
                      >
                        <option value="33rd–45th floors (2,046 sq. ft.)">33rd–45th floors (2,046 sq. ft.)</option>
                        <option value="47th–60th floors (2,697–2,849 sq. ft.)">47th–60th floors (2,697–2,849 sq. ft.)</option>
                        <option value="Any available high floor (33rd to 60th)">Any available high floor (33rd to 60th)</option>
                      </select>
                    </div>
                  )}

                  {/* Preferred Contact Method */}
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-warmGray mb-1">
                      Preferred Contact Method
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {(['Phone Call', 'WhatsApp', 'Email'] as ContactMethod[]).map((m) => (
                        <button
                          key={m}
                          type="button"
                          onClick={() => setMethod(m)}
                          className={`py-2 px-2 text-[10.5px] rounded border text-center transition-all ${
                            method === m
                              ? 'bg-gold-500 text-charcoal-950 font-semibold border-gold-500'
                              : 'bg-charcoal-900 text-warmGray border-white/10 hover:text-white'
                          }`}
                        >
                          {m}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-warmGray mb-1">
                      Specific Requirements / Notes
                    </label>
                    <textarea
                      rows={2}
                      value={userMessage}
                      onChange={(e) => setUserMessage(e.target.value)}
                      placeholder="e.g. Interested in sea-facing orientation or weekend site visit."
                      className="w-full px-3.5 py-2 rounded bg-charcoal-900 border border-white/10 text-xs text-white placeholder-warmGray/50 focus:border-gold-500 focus:outline-none resize-none"
                    />
                  </div>

                  <div className="space-y-2 pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 px-4 rounded bg-gold-500 text-charcoal-950 font-semibold text-xs uppercase tracking-widest hover:bg-gold-400 transition-colors shadow-gold-glow flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          <span>Sending Request...</span>
                        </>
                      ) : (
                        <span>
                          {property.specificEnquiryType === 'imperial'
                            ? 'Request Inventory Details'
                            : 'Submit Enquiry'}
                        </span>
                      )}
                    </button>

                    <button
                      type="button"
                      disabled={isSubmitting}
                      onClick={(e) => handleEnquirySubmit(e, true)}
                      className="w-full py-3 px-4 rounded border border-white/20 text-softWhite hover:border-cyanBrand hover:text-cyanBrand hover:bg-cyanBrand/5 transition-colors text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-1.5"
                    >
                      <Calendar className="w-3.5 h-3.5 text-cyanBrand" />
                      <span>
                        {property.specificEnquiryType === 'imperial'
                          ? 'Book a Private Consultation'
                          : 'Book a Site Visit'}
                      </span>
                    </button>
                  </div>

                  <p className="text-[10px] text-warmGray/70 text-center leading-relaxed">
                    Your contact information remains confidential under KLOUD REALTY's privacy standards.
                  </p>
                </form>
              )}

              {/* Direct Calling Info */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-warmGray">
                <span>Immediate Assistance:</span>
                <a href="tel:+918655588880" className="text-gold-400 font-mono font-semibold hover:underline">
                  +91 86555 88880
                </a>
              </div>

            </div>
          </div>

        </div>

        {/* SECTION I: RELATED PROPERTIES */}
        {relatedProperties.length > 0 && (
          <section className="mt-24 pt-16 border-t border-white/10">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-gold-400 block mb-1">
                  CURATED RECOMMENDATIONS
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-light text-white">
                  Other Exceptional Mumbai Residences
                </h3>
              </div>
              <a href="#/buy" className="text-xs uppercase tracking-wider font-semibold text-gold-400 hover:underline">
                View All
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProperties.map((relProp) => (
                <div key={relProp.id} className="p-4 rounded bg-charcoal-850 border border-white/10 hover:border-gold-500/40 transition-colors flex flex-col justify-between">
                  <div className="aspect-[16/10] rounded overflow-hidden mb-3 bg-charcoal-900">
                    <img src={relProp.creativeImage || relProp.images[0]} alt={relProp.title} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-serif text-lg font-semibold text-white">{relProp.title}</h4>
                    <p className="text-xs text-warmGray mb-2">{relProp.location}</p>
                    <span className="text-sm font-semibold text-gold-400">{relProp.priceDisplay}</span>
                  </div>
                  <a
                    href={`#/property/${relProp.slug || relProp.id}`}
                    className="mt-4 py-2 px-3 rounded text-center text-xs font-semibold uppercase tracking-wider border border-white/20 text-softWhite hover:border-gold-500 hover:text-gold-400 transition-colors"
                  >
                    Explore Residence
                  </a>
                </div>
              ))}
            </div>
          </section>
        )}

      </div>

      {/* SECTION E (MODAL): FULL-RESOLUTION UNSTRETCHED LIGHTBOX MODAL */}
      {lightboxImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
          onClick={() => setLightboxImage(null)}
        >
          <div className="relative max-w-5xl max-h-[92vh] flex flex-col items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute -top-12 right-0 p-2 text-white hover:text-gold-400 transition-colors flex items-center gap-1.5 text-xs uppercase tracking-wider"
              aria-label="Close Lightbox"
            >
              <span>Close</span>
              <X className="w-5 h-5" />
            </button>
            <img 
              src={lightboxImage} 
              alt="Full Resolution Project Creative" 
              className="max-w-full max-h-[85vh] object-contain rounded-sm border border-white/10 shadow-2xl"
            />
            <p className="text-xs text-warmGray-200 mt-3 text-center">
              Official Project Creative — {property.title} • {property.location}
            </p>
          </div>
        </div>
      )}

    </div>
  );
};
