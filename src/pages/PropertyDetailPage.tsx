import React, { useState, useEffect } from 'react';
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
