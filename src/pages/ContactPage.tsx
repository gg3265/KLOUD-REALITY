import React, { useState } from 'react';
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
