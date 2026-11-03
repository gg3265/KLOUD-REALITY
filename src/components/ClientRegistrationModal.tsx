import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, Download, AlertCircle, FileText, CheckSquare, Square } from 'lucide-react';
import { leadService } from '../services/leadService';
import { pdfService } from '../services/pdfService';

interface ClientRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ClientRegistrationModal: React.FC<ClientRegistrationModalProps> = ({ isOpen, onClose }) => {
  const [fullName, setFullName] = useState('');
  const [dob, setDob] = useState('');
  const [phone, setPhone] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [cityPin, setCityPin] = useState('');
  const [pan, setPan] = useState('');
  
  const [selectedPurposes, setSelectedPurposes] = useState<string[]>([]);
  const [preferredLocation, setPreferredLocation] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [configuration, setConfiguration] = useState('');
  const [budget, setBudget] = useState('');
  const [timeline, setTimeline] = useState('');
  const [additionalRequirements, setAdditionalRequirements] = useState('');
  
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [clientPlace, setClientPlace] = useState('');
  const [honeypot, setHoneypot] = useState(''); // Anti-bot honeypot
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [submittedLeadId, setSubmittedLeadId] = useState<string | null>(null);

  if (!isOpen) return null;

  const purposeOptions = [
    'Purchase – Primary Market',
    'Purchase – Resale Property',
    'Residential Rental',
    'Commercial Property',
    'Sale of Property',
    'Leasing of Property',
    'Second Home / Land / Plot',
    'Redevelopment Consultancy',
    'General Property Consultation'
  ];

  const togglePurpose = (purpose: string) => {
    if (selectedPurposes.includes(purpose)) {
      setSelectedPurposes(selectedPurposes.filter(p => p !== purpose));
    } else {
      setSelectedPurposes([...selectedPurposes, purpose]);
    }
  };

  const handleDownloadFilledPdf = () => {
    pdfService.generateClientRegistrationPdf({
      fullName,
      dob,
      phone,
      whatsapp,
      email,
      address,
      cityPin,
      pan,
      purposes: selectedPurposes,
      preferredLocation,
      propertyType,
      configuration,
      budget,
      timeline,
      additionalRequirements
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (honeypot) {
      // Bot detected silently
      return;
    }

    if (!fullName.trim() || fullName.trim().length < 2) {
      setErrorMsg('Please enter your full name.');
      return;
    }

    const cleanPhone = phone.replace(/[\s-]/g, '');
    if (!cleanPhone || cleanPhone.length < 8) {
      setErrorMsg('Please enter a valid telephone or mobile number.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email.trim())) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    if (!acceptedTerms) {
      setErrorMsg('Please review and check the agreement acknowledgment checkbox before submitting.');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await leadService.createLead({
        fullName: fullName.trim(),
        phone: phone.trim(),
        email: email.trim().toLowerCase(),
        enquirySource: 'Registration Form',
        serviceVertical: 'Client Registration',
        preferredLocation: preferredLocation.trim() || cityPin.trim() || 'Mumbai',
        budgetRange: budget || 'To be discussed',
        preferredContactMethod: 'Phone Call',
        dateOfBirth: dob.trim(),
        whatsappNumber: whatsapp.trim() || phone.trim(),
        residentialAddress: address.trim(),
        cityPin: cityPin.trim(),
        panNumber: pan.trim(),
        purposeOfEngagement: selectedPurposes.length > 0 ? selectedPurposes : ['General Property Consultation'],
        preferredTimeline: timeline.trim(),
        acceptedFeeTerms: true,
        message: [
          `Property Type: ${propertyType || 'Not specified'}`,
          `Config: ${configuration || 'Not specified'}`,
          `Place: ${clientPlace || 'Mumbai'}`,
          additionalRequirements ? `Notes: ${additionalRequirements}` : ''
        ].filter(Boolean).join(' | ')
      });

      if (res.success && res.leadId) {
        setSubmittedLeadId(res.leadId);
      } else {
        setErrorMsg(res.error || 'Unable to complete registration. Please try again or call 8655588880.');
      }
    } catch (err: any) {
      setErrorMsg(err?.message || 'A network error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div 
        role="dialog"
        aria-modal="true"
        aria-labelledby="client-registration-title"
        className="relative w-full max-w-3xl bg-charcoal-900 border border-gold-500/40 rounded-sm shadow-2xl overflow-hidden my-6"
      >
        
        {/* Top Decorative Bar */}
        <div className="h-1 bg-gradient-to-r from-gold-500 via-gold-400 to-cyanBrand" />

        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-white/10 flex items-center justify-between bg-charcoal-950/60">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif text-lg font-bold text-white tracking-wider">
                KLOUD <span className="text-cyanBrand">REALTY</span>
              </span>
              <span className="text-xs text-warmGray">•</span>
              <span className="text-[11px] uppercase tracking-widest text-gold-400 font-semibold">
                Client Registration Dossier
              </span>
            </div>
            <p className="text-xs text-warmGray mt-0.5">
              Official Property Advisory Intake &amp; Professional Engagement Form
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-warmGray hover:text-white hover:bg-charcoal-800 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-5 sm:p-8 max-h-[78vh] overflow-y-auto custom-scrollbar space-y-6">
          
          {submittedLeadId ? (
            <div className="text-center py-10 space-y-5 animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h3 className="font-serif text-2xl font-light text-white">
                  Registration Successfully Recorded
                </h3>
                <p className="text-xs sm:text-sm text-warmGray max-w-md mx-auto">
                  Thank you, <strong className="text-white">{fullName}</strong>. Your client registration dossier has been submitted to Abhishek Gupta at KLOUD REALTY.
                </p>
              </div>

              <div className="p-4 rounded bg-charcoal-850 border border-gold-500/30 max-w-sm mx-auto">
                <span className="text-[10px] uppercase tracking-widest text-warmGray block">Official Registration ID</span>
                <span className="font-mono text-xl font-bold text-gold-400 tracking-wider">{submittedLeadId}</span>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3">
                <button
                  type="button"
                  onClick={handleDownloadFilledPdf}
                  className="px-5 py-2.5 rounded bg-gold-500 text-charcoal-950 font-bold text-xs uppercase tracking-wider hover:bg-gold-400 transition-colors flex items-center gap-2 shadow-gold-glow"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Pre-filled PDF Copy</span>
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded border border-white/20 text-white font-medium text-xs hover:border-gold-500 transition-colors"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Anti-spam honeypot */}
              <input
                type="text"
                name="website_url_hp"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                style={{ display: 'none' }}
                tabIndex={-1}
                autoComplete="off"
              />

              {errorMsg && (
                <div className="p-3 rounded bg-red-950/60 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Section A: Client Personal Details */}
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <h4 className="font-serif text-sm font-semibold uppercase tracking-wider text-gold-400 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-gold-500/20 text-gold-400 text-xs flex items-center justify-center font-bold">A</span>
                    <span>Client Personal Details</span>
                  </h4>
                  <span className="text-[11px] text-warmGray">Confidential</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-[11px] text-warmGray font-medium mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Vikramaditya Singhania"
                      className="w-full px-3 py-2 bg-charcoal-800 border border-white/10 rounded text-xs text-white placeholder-warmGray/50 focus:border-gold-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-warmGray font-medium mb-1">Date of Birth</label>
                    <input
                      type="text"
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                      placeholder="DD/MM/YYYY"
                      className="w-full px-3 py-2 bg-charcoal-800 border border-white/10 rounded text-xs text-white placeholder-warmGray/50 focus:border-gold-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-warmGray font-medium mb-1">Mobile Number *</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. 98200 12345"
                      className="w-full px-3 py-2 bg-charcoal-800 border border-white/10 rounded text-xs text-white placeholder-warmGray/50 focus:border-gold-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-warmGray font-medium mb-1">WhatsApp Number</label>
                    <input
                      type="tel"
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value)}
                      placeholder="Same as mobile or alternate"
                      className="w-full px-3 py-2 bg-charcoal-800 border border-white/10 rounded text-xs text-white placeholder-warmGray/50 focus:border-gold-500 focus:outline-none"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] text-warmGray font-medium mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. name@domain.com"
                      className="w-full px-3 py-2 bg-charcoal-800 border border-white/10 rounded text-xs text-white placeholder-warmGray/50 focus:border-gold-500 focus:outline-none"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] text-warmGray font-medium mb-1">Residential Address</label>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Apartment, Street, Landmark"
                      className="w-full px-3 py-2 bg-charcoal-800 border border-white/10 rounded text-xs text-white placeholder-warmGray/50 focus:border-gold-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-warmGray font-medium mb-1">City &amp; PIN Code</label>
                    <input
                      type="text"
                      value={cityPin}
                      onChange={(e) => setCityPin(e.target.value)}
                      placeholder="e.g. Mumbai – 400010"
                      className="w-full px-3 py-2 bg-charcoal-800 border border-white/10 rounded text-xs text-white placeholder-warmGray/50 focus:border-gold-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-warmGray font-medium mb-1">PAN Number (Optional)</label>
                    <input
                      type="text"
                      value={pan}
                      onChange={(e) => setPan(e.target.value.toUpperCase())}
                      placeholder="ABCDE1234F"
                      className="w-full px-3 py-2 bg-charcoal-800 border border-white/10 rounded text-xs text-white uppercase placeholder-warmGray/50 focus:border-gold-500 focus:outline-none font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Section B: Property Requirements */}
              <div className="space-y-3 pt-3">
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <h4 className="font-serif text-sm font-semibold uppercase tracking-wider text-gold-400 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-gold-500/20 text-gold-400 text-xs flex items-center justify-center font-bold">B</span>
                    <span>Property Requirements</span>
                  </h4>
                  <span className="text-[11px] text-warmGray">Advisory Scope</span>
                </div>

                <div>
                  <label className="block text-[11px] text-warmGray font-medium mb-2">Purpose of Engagement (Select all that apply):</label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {purposeOptions.map((purpose) => {
                      const isSelected = selectedPurposes.includes(purpose);
                      return (
                        <button
                          key={purpose}
                          type="button"
                          onClick={() => togglePurpose(purpose)}
                          className={`p-2 rounded text-left text-xs transition-colors flex items-start gap-2 border ${
                            isSelected
                              ? 'bg-gold-500/15 border-gold-500 text-gold-300 font-semibold'
                              : 'bg-charcoal-800/80 border-white/5 text-softWhite/80 hover:bg-charcoal-800'
                          }`}
                        >
                          {isSelected ? (
                            <CheckSquare className="w-3.5 h-3.5 text-gold-400 shrink-0 mt-0.5" />
                          ) : (
                            <Square className="w-3.5 h-3.5 text-warmGray shrink-0 mt-0.5" />
                          )}
                          <span className="leading-snug">{purpose}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                  <div>
                    <label className="block text-[11px] text-warmGray font-medium mb-1">Preferred Location</label>
                    <input
                      type="text"
                      value={preferredLocation}
                      onChange={(e) => setPreferredLocation(e.target.value)}
                      placeholder="e.g. Worli, Byculla, Alibaug, Karjat"
                      className="w-full px-3 py-2 bg-charcoal-800 border border-white/10 rounded text-xs text-white placeholder-warmGray/50 focus:border-gold-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-warmGray font-medium mb-1">Property Type</label>
                    <input
                      type="text"
                      value={propertyType}
                      onChange={(e) => setPropertyType(e.target.value)}
                      placeholder="e.g. Apartment, Villa, Land, Penthouse"
                      className="w-full px-3 py-2 bg-charcoal-800 border border-white/10 rounded text-xs text-white placeholder-warmGray/50 focus:border-gold-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-warmGray font-medium mb-1">Preferred Configuration</label>
                    <input
                      type="text"
                      value={configuration}
                      onChange={(e) => setConfiguration(e.target.value)}
                      placeholder="e.g. 3 BHK / 4 BHK / Plot Area"
                      className="w-full px-3 py-2 bg-charcoal-800 border border-white/10 rounded text-xs text-white placeholder-warmGray/50 focus:border-gold-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-warmGray font-medium mb-1">Approximate Budget</label>
                    <input
                      type="text"
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      placeholder="e.g. ₹2.5 Cr – ₹5 Cr"
                      className="w-full px-3 py-2 bg-charcoal-800 border border-white/10 rounded text-xs text-white placeholder-warmGray/50 focus:border-gold-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] text-warmGray font-medium mb-1">Specific Requirements / Notes</label>
                  <textarea
                    rows={2}
                    value={additionalRequirements}
                    onChange={(e) => setAdditionalRequirements(e.target.value)}
                    placeholder="Floor preferences, sea view, society age if redevelopment, etc."
                    className="w-full px-3 py-2 bg-charcoal-800 border border-white/10 rounded text-xs text-white placeholder-warmGray/50 focus:border-gold-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Section C: Professional Consultancy & Fee Agreement */}
              <div className="space-y-3 pt-3">
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <h4 className="font-serif text-sm font-semibold uppercase tracking-wider text-gold-400 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-gold-500/20 text-gold-400 text-xs flex items-center justify-center font-bold">C</span>
                    <span>Professional Consultancy &amp; Fee Agreement</span>
                  </h4>
                  <span className="text-[11px] text-warmGray">7-Point Terms</span>
                </div>

                <div className="p-4 rounded bg-charcoal-950 border border-white/10 max-h-40 overflow-y-auto custom-scrollbar text-[11px] text-warmGray space-y-2 leading-relaxed">
                  <p><strong className="text-white">1. Scope:</strong> The client acknowledges that the consultancy provides professional property advisory, consultation, research, property identification, negotiations and transaction coordination services.</p>
                  <p><strong className="text-white">2. Advance Communication:</strong> Consultation fees, wherever applicable, shall be communicated to the client in advance and agreed upon before the consultation service is undertaken.</p>
                  <p><strong className="text-white">3. Purchase/Sale Transactions:</strong> In case of a successful property purchase or sale facilitated through the consultancy, professional fees shall be payable as mutually agreed in writing between the client and the consultancy.</p>
                  <p><strong className="text-white">4. Rental/Lease Transactions:</strong> In case of rental or lease transactions facilitated through the consultancy, applicable professional fees shall be communicated and agreed upon before proceeding with the transaction.</p>
                  <p><strong className="text-white">5. Written Agreement:</strong> The applicable fee amount or percentage, payment terms and relevant conditions shall be recorded separately in writing before the transaction or engagement.</p>
                  <p><strong className="text-white">6. Applicable Taxes:</strong> Any applicable taxes (GST where applicable) shall be communicated separately.</p>
                  <p><strong className="text-white">7. Registration Nature:</strong> Registration does not automatically create a financial obligation. Professional fees become payable according to the specific engagement and mutually accepted written terms.</p>
                </div>
              </div>

              {/* Section D: Client Declaration */}
              <div className="space-y-3 pt-2 border-t border-white/10">
                <div className="p-3 rounded bg-gold-500/10 border border-gold-500/20 text-xs text-softWhite/90 leading-relaxed italic">
                  &ldquo;I hereby confirm that the information provided above is accurate and that I have read and understood the professional engagement and fee terms. I agree to the applicable terms specifically communicated and accepted by me in writing.&rdquo;
                </div>

                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={acceptedTerms}
                    onChange={(e) => setAcceptedTerms(e.target.checked)}
                    className="mt-1 w-4 h-4 rounded border-gold-500 text-gold-500 focus:ring-gold-500 bg-charcoal-800"
                  />
                  <span className="text-xs text-white font-medium">
                    I acknowledge and accept the applicable professional fee terms and registration guidelines as stated above. *
                  </span>
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                  <div>
                    <label className="block text-[11px] text-warmGray font-medium mb-1">Place of Submission</label>
                    <input
                      type="text"
                      value={clientPlace}
                      onChange={(e) => setClientPlace(e.target.value)}
                      placeholder="e.g. Mumbai"
                      className="w-full px-3 py-2 bg-charcoal-800 border border-white/10 rounded text-xs text-white placeholder-warmGray/50 focus:border-gold-500 focus:outline-none"
                    />
                  </div>
                  <div className="flex items-end">
                    <button
                      type="button"
                      onClick={handleDownloadFilledPdf}
                      className="w-full py-2 px-3 rounded border border-white/20 text-warmGray hover:text-gold-300 hover:border-gold-500/60 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download Printable PDF Draft</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-[11px] text-warmGray">
                  <ShieldCheck className="w-4 h-4 text-cyanBrand" />
                  <span>RERA ID: A0311 72501659 • Mazgaon, Mumbai</span>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2.5 rounded border border-white/10 text-warmGray hover:text-white text-xs font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 sm:flex-initial px-6 py-2.5 rounded bg-gold-500 text-charcoal-950 font-bold text-xs uppercase tracking-wider hover:bg-gold-400 transition-colors shadow-gold-glow flex items-center justify-center gap-2"
                  >
                    <span>{isSubmitting ? 'Recording...' : 'SUBMIT CLIENT REGISTRATION'}</span>
                  </button>
                </div>
              </div>

            </form>
          )}

        </div>

      </div>
    </div>
  );
};
