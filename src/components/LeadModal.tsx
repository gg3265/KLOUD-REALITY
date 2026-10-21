import React, { useState, useEffect } from 'react';
import { X, CheckCircle, ShieldCheck, Loader2, ArrowRight, Sparkles } from 'lucide-react';
import { leadService } from '../services/leadService';
import { LeadSource, ServiceVertical, ContactMethod } from '../types';

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialVertical?: string;
  initialPropertyTitle?: string;
  initialPropertyId?: string;
}

export const LeadModal: React.FC<LeadModalProps> = ({
  isOpen,
  onClose,
  initialVertical,
  initialPropertyTitle,
  initialPropertyId
}) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [lookingTo, setLookingTo] = useState(
    initialVertical === 'Redevelopment Consulting' 
      ? 'Explore Redevelopment Opportunities'
      : initialVertical === 'Second Homes & Land'
      ? 'Purchase a Second Home or Plot'
      : initialVertical === 'Rental'
      ? 'Rent a Property'
      : 'Buy a New Property'
  );
  const [location, setLocation] = useState('Mazgaon, Mumbai');
  const [budget, setBudget] = useState('₹2–₹5 Crore');
  const [contactMethod, setContactMethod] = useState<ContactMethod>('Phone Call');
  const [customMessage, setCustomMessage] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [submittedLeadId, setSubmittedLeadId] = useState<string | null>(null);

  // Sync if initialVertical or property title changes
  useEffect(() => {
    if (initialVertical) {
      if (initialVertical === 'Redevelopment Consulting') setLookingTo('Explore Redevelopment Opportunities');
      else if (initialVertical === 'Second Homes & Land') setLookingTo('Purchase a Second Home or Plot');
      else if (initialVertical === 'Rental') setLookingTo('Rent a Property');
      else if (initialVertical === 'Secondary Market') setLookingTo('Buy a Resale Property');
      else setLookingTo('Buy a New Property');
    }
    if (initialPropertyTitle) {
      setCustomMessage(`Regarding property: ${initialPropertyTitle}`);
    }
  }, [initialVertical, initialPropertyTitle]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // Validation
    if (!fullName.trim() || fullName.trim().length < 2) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    const cleanPhone = phone.replace(/[\s-]/g, '');
    if (!cleanPhone || cleanPhone.length < 8) {
      setErrorMessage('Please enter a valid phone number (minimum 8 digits).');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);

    // Map lookingTo to ServiceVertical
    let mappedVertical: ServiceVertical = 'General Consultation';
    if (lookingTo.includes('New Property')) mappedVertical = 'Primary Market';
    else if (lookingTo.includes('Resale')) mappedVertical = 'Secondary Market';
    else if (lookingTo.includes('Rent')) mappedVertical = 'Rental';
    else if (lookingTo.includes('Second Home') || lookingTo.includes('Plot')) mappedVertical = 'Second Homes & Land';
    else if (lookingTo.includes('Redevelopment')) mappedVertical = 'Redevelopment Consulting';
    else if (lookingTo.includes('Sell')) mappedVertical = 'Secondary Market';

    const source: LeadSource = initialPropertyId ? 'Property Details' : 'Entry Modal';

    try {
      const result = await leadService.createLead({
        fullName,
        phone,
        email,
        enquirySource: source,
        serviceVertical: mappedVertical,
        preferredLocation: location,
        budgetRange: budget,
        preferredContactMethod: contactMethod,
        propertyId: initialPropertyId,
        propertyTitle: initialPropertyTitle,
        message: customMessage || `Looking to: ${lookingTo} in ${location}`
      });

      if (result.success && result.leadId) {
        setSubmittedLeadId(result.leadId);
        // Mark as interacted in localStorage
        localStorage.setItem('kloud_lead_modal_dismissed_v1', 'true');
      } else {
        setErrorMessage(result.error || 'Failed to submit enquiry. Please verify your details and try again.');
      }
    } catch {
      setErrorMessage('A network error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDismiss = () => {
    localStorage.setItem('kloud_lead_modal_dismissed_v1', 'true');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-charcoal-950/85 backdrop-blur-md transition-opacity duration-300"
        onClick={handleDismiss}
      />

      {/* Modal Dialog Container */}
      <div 
        className="relative w-full max-w-4xl bg-cream-100 text-charcoal-900 rounded-sm shadow-luxury overflow-hidden z-10 my-auto animate-in fade-in zoom-in-95 duration-200 border border-gold-500/30"
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button Top Right */}
        <button
          onClick={handleDismiss}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-charcoal-900/10 hover:bg-charcoal-900/20 text-charcoal-800 hover:text-charcoal-950 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {submittedLeadId ? (
          /* Success Screen */
          <div className="p-8 sm:p-12 text-center bg-cream-50 flex flex-col items-center justify-center min-h-[460px]">
            <div className="w-16 h-16 rounded-full bg-gold-500/10 text-gold-600 flex items-center justify-center mb-5 border border-gold-500/30">
              <CheckCircle className="w-9 h-9 text-gold-600" />
            </div>

            <span className="text-[11px] font-mono uppercase tracking-widest px-3 py-1 rounded bg-gold-500/10 text-gold-700 border border-gold-500/30 mb-3">
              Enquiry ID: {submittedLeadId}
            </span>

            <h3 className="font-serif text-3xl font-semibold text-charcoal-950 mb-3">
              We Have Received Your Enquiry.
            </h3>

            <p className="text-sm text-charcoal-700 max-w-md mx-auto leading-relaxed mb-6 font-sans">
              Thank you, <strong className="text-charcoal-950">{fullName}</strong>. Our senior real estate advisor, Abhishek Gupta, has been notified and will connect with you via <strong className="text-gold-700">{contactMethod}</strong> shortly to share tailored opportunities.
            </p>

            <div className="p-4 rounded bg-white border border-charcoal-900/10 max-w-md w-full text-left text-xs space-y-2 mb-8 shadow-sm">
              <div className="flex justify-between py-1 border-b border-charcoal-900/5">
                <span className="text-warmGray-500">Service:</span>
                <span className="font-medium text-charcoal-900">{lookingTo}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-charcoal-900/5">
                <span className="text-warmGray-500">Location:</span>
                <span className="font-medium text-charcoal-900">{location}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-warmGray-500">Preferred Contact:</span>
                <span className="font-medium text-charcoal-900">{phone}</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="px-8 py-3 rounded text-xs uppercase tracking-widest font-semibold bg-charcoal-950 text-gold-400 hover:bg-gold-500 hover:text-charcoal-950 transition-all duration-300 shadow-md"
            >
              Continue Exploring KLOUD REALTY
            </button>
          </div>
        ) : (
          /* Split Layout */
          <div className="grid grid-cols-1 md:grid-cols-12 min-h-[580px]">
            
            {/* Left Column: Atmospheric Architectural Imagery (Desktop) */}
            <div className="hidden md:flex md:col-span-5 relative bg-charcoal-950 flex-col justify-between p-8 text-white overflow-hidden">
              <img 
                src="/images/hero_architecture_1785684802035.jpg" 
                alt="Luxury Mumbai Architecture" 
                className="absolute inset-0 w-full h-full object-cover object-center opacity-45 scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/60 to-charcoal-950/30" />

              {/* Top Branding in Left Pane */}
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-1 rounded bg-charcoal-900/80 border border-gold-500/30">
                    <img src="/images/logo_badge.png" alt="KLOUD REALTY" className="h-7 w-auto" />
                  </div>
                  <span className="font-serif tracking-widest font-semibold text-sm">KLOUD REALTY</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-gold-500/15 border border-gold-500/30 text-[10px] text-gold-300 font-mono tracking-wider">
                  <ShieldCheck className="w-3 h-3 text-cyanBrand" />
                  <span>RERA: A0311 72501659</span>
                </div>
              </div>

              {/* Bottom Editorial Quote */}
              <div className="relative z-10 space-y-3">
                <div className="w-8 h-px bg-gold-500" />
                <span className="text-[10px] uppercase tracking-widest text-gold-400 font-medium">
                  YOUR NEXT CHAPTER STARTS HERE
                </span>
                <h3 className="font-serif text-2xl font-light text-softWhite leading-snug">
                  Discover a property that feels effortlessly yours.
                </h3>
                <p className="text-xs text-warmGray leading-relaxed font-sans">
                  From distinguished Mumbai developments to private retreats and redevelopment advisory.
                </p>
              </div>
            </div>

            {/* Right Column: Clean Warm-White Consultation Form */}
            <div className="md:col-span-7 p-6 sm:p-8 md:p-10 flex flex-col justify-between max-h-[88vh] md:max-h-[640px] overflow-y-auto">
              <div>
                
                {/* Header */}
                <div className="mb-5">
                  <div className="flex items-center gap-2 text-[11px] uppercase tracking-widest font-semibold text-gold-600 mb-1">
                    <Sparkles className="w-3.5 h-3.5 text-gold-600" />
                    <span>Private Property Advisory</span>
                  </div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-charcoal-950 tracking-tight">
                    Let's Find Your Place.
                  </h2>
                  <p className="text-xs text-charcoal-700 mt-1 leading-relaxed">
                    Tell us a little about what you're looking for. Our team will help you explore the right property opportunities.
                  </p>
                </div>

                {errorMessage && (
                  <div className="mb-4 p-3 rounded text-xs bg-red-50 text-red-700 border border-red-200">
                    {errorMessage}
                  </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-3.5">
                  
                  {/* Name & Phone Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-medium uppercase tracking-wider text-charcoal-800 mb-1">
                        Full Name <span className="text-gold-600">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Vikramaditya Mehta"
                        className="w-full px-3 py-2 text-xs rounded border border-charcoal-300 focus:border-gold-600 focus:ring-1 focus:ring-gold-600 outline-none bg-white text-charcoal-950 transition-all font-sans"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium uppercase tracking-wider text-charcoal-800 mb-1">
                        Mobile Number <span className="text-gold-600">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. 98200 12345"
                        className="w-full px-3 py-2 text-xs rounded border border-charcoal-300 focus:border-gold-600 focus:ring-1 focus:ring-gold-600 outline-none bg-white text-charcoal-950 transition-all font-sans"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-[11px] font-medium uppercase tracking-wider text-charcoal-800 mb-1">
                      Email Address <span className="text-gold-600">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. name@example.com"
                      className="w-full px-3 py-2 text-xs rounded border border-charcoal-300 focus:border-gold-600 focus:ring-1 focus:ring-gold-600 outline-none bg-white text-charcoal-950 transition-all font-sans"
                    />
                  </div>

                  {/* I Am Looking To */}
                  <div>
                    <label className="block text-[11px] font-medium uppercase tracking-wider text-charcoal-800 mb-1">
                      I Am Looking To:
                    </label>
                    <select
                      value={lookingTo}
                      onChange={(e) => setLookingTo(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded border border-charcoal-300 focus:border-gold-600 focus:ring-1 focus:ring-gold-600 outline-none bg-white text-charcoal-950 transition-all font-sans"
                    >
                      <option value="Buy a New Property">Buy a New Property (Primary Market)</option>
                      <option value="Buy a Resale Property">Buy a Resale Property</option>
                      <option value="Rent a Property">Rent a Property</option>
                      <option value="Purchase a Second Home or Plot">Purchase a Second Home or Plot</option>
                      <option value="Explore Redevelopment Opportunities">Explore Redevelopment Opportunities</option>
                      <option value="Sell My Property">Sell My Property</option>
                      <option value="I'm Exploring My Options">I'm Exploring My Options</option>
                    </select>
                  </div>

                  {/* Location & Budget Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-medium uppercase tracking-wider text-charcoal-800 mb-1">
                        Preferred Location
                      </label>
                      <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="e.g. Mazgaon, Worli, Alibaug"
                        className="w-full px-3 py-2 text-xs rounded border border-charcoal-300 focus:border-gold-600 focus:ring-1 focus:ring-gold-600 outline-none bg-white text-charcoal-950 transition-all font-sans"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium uppercase tracking-wider text-charcoal-800 mb-1">
                        Approximate Budget
                      </label>
                      <select
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded border border-charcoal-300 focus:border-gold-600 focus:ring-1 focus:ring-gold-600 outline-none bg-white text-charcoal-950 transition-all font-sans"
                      >
                        <option value="Under ₹50 Lakhs">Under ₹50 Lakhs</option>
                        <option value="₹50 Lakhs–₹1 Crore">₹50 Lakhs–₹1 Crore</option>
                        <option value="₹1–₹2 Crore">₹1–₹2 Crore</option>
                        <option value="₹2–₹5 Crore">₹2–₹5 Crore</option>
                        <option value="Above ₹5 Crore">Above ₹5 Crore</option>
                        <option value="Not Decided Yet">Not Decided Yet</option>
                      </select>
                    </div>
                  </div>

                  {/* Preferred Contact Method */}
                  <div>
                    <label className="block text-[11px] font-medium uppercase tracking-wider text-charcoal-800 mb-1.5">
                      Preferred Contact Method:
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {(['Phone Call', 'WhatsApp', 'Email'] as ContactMethod[]).map((method) => (
                        <button
                          type="button"
                          key={method}
                          onClick={() => setContactMethod(method)}
                          className={`py-1.5 px-2 text-[11px] rounded border font-medium transition-all ${
                            contactMethod === method
                              ? 'border-gold-600 bg-gold-500/15 text-gold-800 font-semibold shadow-xs'
                              : 'border-charcoal-200 bg-white text-charcoal-700 hover:border-charcoal-300'
                          }`}
                        >
                          {method}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 rounded text-xs uppercase tracking-widest font-semibold bg-charcoal-950 text-gold-400 hover:bg-gold-500 hover:text-charcoal-950 transition-all duration-300 shadow-md flex items-center justify-center gap-2 group disabled:opacity-70"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Connecting With Advisory...</span>
                        </>
                      ) : (
                        <>
                          <span>HELP ME FIND MY PROPERTY</span>
                          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </>
                      )}
                    </button>
                  </div>
                </form>

                {/* Subtext and Privacy link */}
                <div className="mt-4 pt-3 border-t border-charcoal-200 text-center space-y-1">
                  <p className="text-[11px] text-charcoal-600">
                    Your information will be used solely to respond to your enquiry with utmost discretion.
                  </p>
                  <div className="flex items-center justify-center gap-3 text-[11px]">
                    <a href="#/privacy" onClick={onClose} className="text-gold-700 hover:underline">
                      Privacy Policy
                    </a>
                    <span className="text-charcoal-400">•</span>
                    <button
                      type="button"
                      onClick={handleDismiss}
                      className="text-charcoal-500 hover:text-charcoal-900 underline"
                    >
                      Explore Website First
                    </button>
                  </div>
                </div>

              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
