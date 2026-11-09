import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  ShieldCheck, 
  Download, 
  AlertCircle, 
  CheckSquare, 
  Square, 
  ArrowRight, 
  FileText, 
  PenTool, 
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { leadService } from '../services/leadService';
import { pdfService } from '../services/pdfService';

interface ClientRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ClientRegistrationModal: React.FC<ClientRegistrationModalProps> = ({ isOpen, onClose }) => {
  // Section A: Client Personal Details
  const [fullName, setFullName] = useState('');
  const [dob, setDob] = useState('');
  const [phone, setPhone] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [cityPin, setCityPin] = useState('');
  const [pan, setPan] = useState('');

  // Section B: Property Requirements & Scope of Advisory
  const [selectedPurposes, setSelectedPurposes] = useState<string[]>([
    'Purchase – Primary Market'
  ]);
  const [preferredLocation, setPreferredLocation] = useState('');
  const [propertyType, setPropertyType] = useState('Apartment');
  const [customPropertyType, setCustomPropertyType] = useState('');
  const [configuration, setConfiguration] = useState('');
  const [budget, setBudget] = useState('');
  const [timeline, setTimeline] = useState('Immediate / Ready Possession');
  const [additionalRequirements, setAdditionalRequirements] = useState('');

  // Section C: Consultancy Remuneration Details
  const [feeStructure] = useState('As mutually agreed in writing prior to transaction');
  const [gstStatus] = useState('Applicable as per prevailing statutory rates (18% GST)');
  const [paymentMilestones] = useState('Payable upon execution / registration of formal agreement');
  const [specialTerms] = useState('Subject to separate written engagement letter / terms');

  // Section D: Client Declaration & Signature
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [clientSignature, setClientSignature] = useState('');
  const [clientPlace, setClientPlace] = useState('Mumbai');
  const [declarationDate, setDeclarationDate] = useState(() => {
    return new Date().toLocaleDateString('en-GB'); // DD/MM/YYYY
  });

  // Anti-bot honeypot
  const [honeypot, setHoneypot] = useState('');

  // State
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
      if (selectedPurposes.length > 1) {
        setSelectedPurposes(selectedPurposes.filter(p => p !== purpose));
      }
    } else {
      setSelectedPurposes([...selectedPurposes, purpose]);
    }
  };

  const effectivePropertyType = propertyType === 'Other' && customPropertyType.trim() 
    ? customPropertyType.trim() 
    : propertyType;

  // Validation
  const validateForm = (): boolean => {
    setErrorMsg('');
    if (!fullName.trim() || fullName.trim().length < 2) {
      setErrorMsg('Please enter your Full Name in Section A.');
      document.getElementById('reg-fullname')?.focus();
      return false;
    }
    const cleanPhone = phone.replace(/[\s-]/g, '');
    if (!cleanPhone || cleanPhone.length < 8) {
      setErrorMsg('Please enter a valid Mobile Number in Section A.');
      document.getElementById('reg-phone')?.focus();
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email.trim())) {
      setErrorMsg('Please enter a valid Email Address in Section A.');
      document.getElementById('reg-email')?.focus();
      return false;
    }
    if (selectedPurposes.length === 0) {
      setErrorMsg('Please select at least one Purpose of Engagement in Section B.');
      document.getElementById('reg-purposes')?.scrollIntoView({ behavior: 'smooth' });
      return false;
    }
    if (!acceptedTerms) {
      setErrorMsg('Please confirm acceptance of the professional engagement and fee principles in Section D.');
      document.getElementById('reg-declaration')?.scrollIntoView({ behavior: 'smooth' });
      return false;
    }
    if (!clientSignature.trim()) {
      setErrorMsg('Please type your legal signature in the Client Signature field in Section D.');
      document.getElementById('reg-signature')?.focus();
      return false;
    }
    return true;
  };

  // Download pre-filled PDF
  const handleDownloadFilledPdf = () => {
    pdfService.generateClientRegistrationPdf({
      fullName: fullName.trim(),
      dob: dob.trim(),
      phone: phone.trim(),
      whatsapp: whatsapp.trim() || phone.trim(),
      email: email.trim(),
      address: address.trim(),
      cityPin: cityPin.trim(),
      pan: pan.trim(),
      purposes: selectedPurposes,
      preferredLocation: preferredLocation.trim(),
      propertyType: effectivePropertyType,
      configuration: configuration.trim(),
      budget: budget.trim(),
      timeline: timeline.trim(),
      additionalRequirements: additionalRequirements.trim(),
      clientSignature: clientSignature.trim() || fullName.trim(),
      place: clientPlace.trim(),
      date: declarationDate.trim(),
      feeStructure: feeStructure.trim(),
      gstStatus: gstStatus.trim(),
      paymentMilestones: paymentMilestones.trim(),
      specialTerms: specialTerms.trim()
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (honeypot) {
      // Bot detected silently
      return;
    }

    if (!validateForm()) {
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
        budgetRange: budget.trim() || 'To be discussed',
        preferredContactMethod: 'Phone Call',
        dateOfBirth: dob.trim(),
        whatsappNumber: whatsapp.trim() || phone.trim(),
        residentialAddress: address.trim(),
        cityPin: cityPin.trim(),
        panNumber: pan.trim().toUpperCase(),
        purposeOfEngagement: selectedPurposes,
        propertyType: effectivePropertyType,
        configuration: configuration.trim(),
        preferredTimeline: timeline.trim(),
        acceptedFeeTerms: true,
        clientSignature: clientSignature.trim(),
        declarationPlace: clientPlace.trim() || 'Mumbai',
        declarationDate: declarationDate.trim(),
        feeStructure: feeStructure.trim(),
        gstStatus: gstStatus.trim(),
        paymentMilestones: paymentMilestones.trim(),
        specialTerms: specialTerms.trim(),
        message: [
          `Purpose: ${selectedPurposes.join(', ')}`,
          `Config: ${configuration.trim() || 'Not specified'}`,
          `Property Type: ${effectivePropertyType}`,
          `Budget: ${budget.trim() || 'Not specified'}`,
          `Timeline: ${timeline.trim()}`,
          `Signed: ${clientSignature.trim()} (${clientPlace.trim()})`,
          additionalRequirements.trim() ? `Notes: ${additionalRequirements.trim()}` : ''
        ].filter(Boolean).join(' | ')
      });

      if (res.success && res.leadId) {
        setSubmittedLeadId(res.leadId);
      } else {
        setErrorMsg(res.error || 'Unable to record registration. Please try again or call 86-555-88880.');
      }
    } catch (err: any) {
      setErrorMsg(err?.message || 'A network error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div 
        role="dialog"
        aria-modal="true"
        aria-labelledby="client-registration-title"
        className="relative w-full max-w-5xl bg-charcoal-900 border border-gold-500/40 rounded shadow-2xl overflow-hidden my-3 sm:my-5 animate-fade-in flex flex-col max-h-[92vh]"
      >
        
        {/* Top Decorative Gold Accent Bar */}
        <div className="h-1 bg-gradient-to-r from-gold-500 via-gold-400 to-cyanBrand shrink-0" />

        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between bg-charcoal-950 shrink-0">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-serif text-lg sm:text-xl font-bold text-white tracking-wider">
                KLOUD <span className="text-cyanBrand">REALTY</span>
              </span>
              <span className="text-xs text-warmGray hidden sm:inline">•</span>
              <span className="text-[11px] sm:text-xs uppercase tracking-widest text-gold-400 font-semibold">
                Client Registration &amp; Engagement
              </span>
            </div>
            <p className="text-xs text-warmGray mt-0.5">
              Official Property Advisory Intake &amp; 7-Point Professional Fee Agreement
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-warmGray hover:text-white hover:bg-charcoal-800 transition-colors shrink-0"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Section Quick Jump Navigator Bar */}
        {!submittedLeadId && (
          <div className="px-4 sm:px-6 py-2.5 bg-charcoal-950/90 border-b border-white/10 shrink-0 flex items-center justify-between gap-2 overflow-x-auto text-xs">
            <span className="text-[10px] uppercase font-mono tracking-wider text-warmGray hidden md:inline shrink-0">
              Form Sections:
            </span>
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              <button
                type="button"
                onClick={() => scrollToSection('sec-personal-details')}
                className="px-2.5 py-1 rounded bg-charcoal-800 hover:bg-gold-500/20 text-warmGray hover:text-gold-300 border border-white/5 text-[11px] font-medium transition-colors whitespace-nowrap"
              >
                Section A: Personal Details
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('sec-property-requirements')}
                className="px-2.5 py-1 rounded bg-charcoal-800 hover:bg-gold-500/20 text-warmGray hover:text-gold-300 border border-white/5 text-[11px] font-medium transition-colors whitespace-nowrap"
              >
                Section B: Requirements
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('sec-fee-agreement')}
                className="px-2.5 py-1 rounded bg-charcoal-800 hover:bg-gold-500/20 text-warmGray hover:text-gold-300 border border-white/5 text-[11px] font-medium transition-colors whitespace-nowrap"
              >
                Section C: Fee Agreement
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('sec-client-declaration')}
                className="px-2.5 py-1 rounded bg-charcoal-800 hover:bg-gold-500/20 text-warmGray hover:text-gold-300 border border-white/5 text-[11px] font-medium transition-colors whitespace-nowrap"
              >
                Section D: Declaration
              </button>
            </div>
            <a
              href="/documents/KLOUD_REALTY_Client_Registration_Form_Professional.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] text-gold-400 hover:text-gold-300 hover:underline flex items-center gap-1 shrink-0 ml-auto"
            >
              <FileText className="w-3.5 h-3.5 text-gold-400" />
              <span className="hidden sm:inline">Official Blank PDF</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        )}

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-6 lg:p-7 overflow-y-auto custom-scrollbar flex-1 bg-slate-100">
          
          {submittedLeadId ? (
            /* SUCCESS CONFIRMATION */
            <div className="text-center py-8 sm:py-12 space-y-6 animate-fade-in bg-white rounded border border-slate-200 p-6 sm:p-10 shadow-sm max-w-2xl mx-auto">
              <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-300 flex items-center justify-center mx-auto text-emerald-600 shadow-sm">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h3 className="font-serif text-2xl sm:text-3xl font-light text-slate-900">
                  Client Registration Successfully Recorded
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
                  Thank you, <strong className="text-slate-900">{fullName}</strong>. Your official Client Registration &amp; Professional Engagement dossier has been recorded and transmitted directly to Abhishek Gupta at KLOUD REALTY.
                </p>
              </div>

              {/* Official Registration ID Card */}
              <div className="p-4 rounded bg-slate-50 border border-gold-500/40 max-w-sm mx-auto shadow-xs">
                <span className="text-[10px] uppercase tracking-widest text-slate-500 block">Official Registration ID</span>
                <span className="font-mono text-xl sm:text-2xl font-bold text-gold-600 tracking-wider">{submittedLeadId}</span>
                <span className="text-[11px] text-slate-500 block mt-1">Status: Recorded &amp; Transmitted</span>
              </div>

              {/* Summary Pill Grid */}
              <div className="max-w-md mx-auto p-4 rounded bg-slate-50 border border-slate-200 text-left text-xs space-y-2 text-slate-700">
                <div className="flex justify-between border-b border-slate-200 pb-1.5">
                  <span className="text-slate-500">Client:</span>
                  <span className="text-slate-900 font-medium">{fullName}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-1.5">
                  <span className="text-slate-500">Contact:</span>
                  <span className="text-slate-900 font-mono">{phone} • {email}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-1.5">
                  <span className="text-slate-500">Engagement Scope:</span>
                  <span className="text-gold-700 font-medium text-right max-w-[240px] truncate">{selectedPurposes.join(', ')}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-1.5">
                  <span className="text-slate-500">Fee Agreement:</span>
                  <span className="text-emerald-700 font-semibold">Accepted &amp; Digitally Signed</span>
                </div>
                <div className="flex justify-between pt-0.5">
                  <span className="text-slate-500">Advisory Desk:</span>
                  <span className="text-slate-900 font-medium">Mazgaon Office • Abhishek Gupta</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3">
                <button
                  type="button"
                  onClick={handleDownloadFilledPdf}
                  className="w-full sm:w-auto px-6 py-3 rounded bg-gold-500 hover:bg-gold-400 text-charcoal-950 font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-gold-glow flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4 text-charcoal-950" />
                  <span>Download Pre-filled PDF Copy</span>
                </button>

                <a
                  href="/documents/KLOUD_REALTY_Client_Registration_Form_Professional.pdf"
                  download="KLOUD_REALTY_Client_Registration_Form_Professional.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-5 py-3 rounded border border-slate-300 text-slate-700 hover:text-slate-900 hover:border-gold-500 font-semibold text-xs uppercase tracking-wider bg-white hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
                >
                  <FileText className="w-4 h-4 text-gold-600" />
                  <span>Download Blank Official PDF</span>
                </a>

                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto px-5 py-3 rounded border border-slate-200 text-slate-500 hover:text-slate-800 font-medium text-xs transition-colors"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            /* COMPREHENSIVE DOSSIER FORM */
            <form onSubmit={handleSubmit} className="space-y-7">
              
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
                <div className="p-4 rounded bg-red-50 border border-red-300 text-red-700 text-xs flex items-center gap-2.5 animate-shake shadow-xs">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                  <span className="font-medium">{errorMsg}</span>
                </div>
              )}

              {/* ==================================================== */}
              {/* SECTION A — CLIENT PERSONAL DETAILS                  */}
              {/* ==================================================== */}
              <div id="sec-personal-details" className="scroll-mt-4">
                
                {/* Dark Navy Section Heading Bar */}
                <div className="bg-slate-900 border-l-4 border-gold-500 text-white py-3 px-4 sm:px-5 rounded-t flex items-center justify-between min-h-[44px]">
                  <h4 className="font-serif text-xs sm:text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-gold-500/20 text-gold-400 text-xs flex items-center justify-center font-mono font-bold">A</span>
                    <span>SECTION A — CLIENT PERSONAL DETAILS</span>
                  </h4>
                  <span className="text-[10px] sm:text-[11px] uppercase font-mono tracking-wider text-slate-300 hidden sm:block">
                    Confidential Client Identification
                  </span>
                </div>

                {/* Form Inputs Container */}
                <div className="bg-white border border-slate-300 border-t-0 rounded-b p-4 sm:p-6 shadow-xs">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-5">
                    
                    {/* ROW 1: Full Name (2/3 width) & Date of Birth (1/3 width) */}
                    <div className="col-span-1 md:col-span-8">
                      <label htmlFor="reg-fullname" className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Full Name of Client <span className="text-amber-600 font-bold">*</span>
                      </label>
                      <input
                        id="reg-fullname"
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Vikramaditya Singhania"
                        className="w-full h-11 px-3.5 bg-white border border-slate-300 rounded text-sm text-slate-900 placeholder-slate-400 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 focus:outline-none transition-colors"
                      />
                    </div>

                    <div className="col-span-1 md:col-span-4">
                      <label htmlFor="reg-dob" className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Date of Birth <span className="text-slate-400 font-normal">(DD/MM/YYYY)</span>
                      </label>
                      <input
                        id="reg-dob"
                        type="text"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                        placeholder="DD/MM/YYYY"
                        className="w-full h-11 px-3.5 bg-white border border-slate-300 rounded text-sm text-slate-900 placeholder-slate-400 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 focus:outline-none transition-colors font-mono"
                      />
                    </div>

                    {/* ROW 2: Mobile Number (1/3), WhatsApp Number (1/3), Email Address (1/3) */}
                    <div className="col-span-1 md:col-span-4">
                      <label htmlFor="reg-phone" className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Mobile Number <span className="text-amber-600 font-bold">*</span>
                      </label>
                      <input
                        id="reg-phone"
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. 98200 12345"
                        className="w-full h-11 px-3.5 bg-white border border-slate-300 rounded text-sm text-slate-900 placeholder-slate-400 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 focus:outline-none transition-colors font-mono"
                      />
                    </div>

                    <div className="col-span-1 md:col-span-4">
                      <div className="flex items-center justify-between mb-1.5">
                        <label htmlFor="reg-whatsapp" className="block text-xs font-semibold text-slate-700">
                          WhatsApp Number
                        </label>
                        {phone && (
                          <button
                            type="button"
                            onClick={() => setWhatsapp(phone)}
                            className="text-[10px] text-gold-600 hover:text-gold-700 font-medium hover:underline"
                          >
                            Same as mobile
                          </button>
                        )}
                      </div>
                      <input
                        id="reg-whatsapp"
                        type="tel"
                        value={whatsapp}
                        onChange={(e) => setWhatsapp(e.target.value)}
                        placeholder="Same as mobile or alternate"
                        className="w-full h-11 px-3.5 bg-white border border-slate-300 rounded text-sm text-slate-900 placeholder-slate-400 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 focus:outline-none transition-colors font-mono"
                      />
                    </div>

                    <div className="col-span-1 md:col-span-4">
                      <label htmlFor="reg-email" className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Email Address <span className="text-amber-600 font-bold">*</span>
                      </label>
                      <input
                        id="reg-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. client@domain.com"
                        className="w-full h-11 px-3.5 bg-white border border-slate-300 rounded text-sm text-slate-900 placeholder-slate-400 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 focus:outline-none transition-colors"
                      />
                    </div>

                    {/* ROW 3: Residential Address (full width) */}
                    <div className="col-span-1 md:col-span-12">
                      <label htmlFor="reg-address" className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Residential Address <span className="text-slate-400 font-normal">(Street, Building / Apartment No.)</span>
                      </label>
                      <input
                        id="reg-address"
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="e.g. Flat 1402, Harbour View Apartments, Mazgaon"
                        className="w-full h-11 px-3.5 bg-white border border-slate-300 rounded text-sm text-slate-900 placeholder-slate-400 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 focus:outline-none transition-colors"
                      />
                    </div>

                    {/* ROW 4: City and PIN Code (1/2 width) & PAN Number (1/2 width) */}
                    <div className="col-span-1 md:col-span-6">
                      <label htmlFor="reg-citypin" className="block text-xs font-semibold text-slate-700 mb-1.5">
                        City and PIN Code
                      </label>
                      <input
                        id="reg-citypin"
                        type="text"
                        value={cityPin}
                        onChange={(e) => setCityPin(e.target.value)}
                        placeholder="e.g. Mumbai – 400010"
                        className="w-full h-11 px-3.5 bg-white border border-slate-300 rounded text-sm text-slate-900 placeholder-slate-400 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 focus:outline-none transition-colors"
                      />
                    </div>

                    <div className="col-span-1 md:col-span-6">
                      <label htmlFor="reg-pan" className="block text-xs font-semibold text-slate-700 mb-1.5">
                        PAN Number <span className="text-slate-400 font-normal">(Optional at Initial Registration)</span>
                      </label>
                      <input
                        id="reg-pan"
                        type="text"
                        value={pan}
                        onChange={(e) => setPan(e.target.value.toUpperCase())}
                        placeholder="ABCDE1234F"
                        maxLength={10}
                        className="w-full h-11 px-3.5 bg-white border border-slate-300 rounded text-sm text-slate-900 uppercase placeholder-slate-400 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 focus:outline-none font-mono tracking-wider transition-colors"
                      />
                    </div>

                  </div>
                </div>
              </div>

              {/* ==================================================== */}
              {/* SECTION B — PROPERTY REQUIREMENTS & ENGAGEMENT OBJECTIVE */}
              {/* ==================================================== */}
              <div id="sec-property-requirements" className="scroll-mt-4">
                
                {/* Dark Navy Section Heading Bar */}
                <div className="bg-slate-900 border-l-4 border-gold-500 text-white py-3 px-4 sm:px-5 rounded-t flex items-center justify-between min-h-[44px]">
                  <h4 className="font-serif text-xs sm:text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-gold-500/20 text-gold-400 text-xs flex items-center justify-center font-mono font-bold">B</span>
                    <span>SECTION B — PROPERTY REQUIREMENTS &amp; ENGAGEMENT OBJECTIVE</span>
                  </h4>
                  <span className="text-[10px] sm:text-[11px] uppercase font-mono tracking-wider text-slate-300 hidden sm:block">
                    Scope of Advisory &amp; Property Intake
                  </span>
                </div>

                {/* Form Inputs Container */}
                <div className="bg-white border border-slate-300 border-t-0 rounded-b p-4 sm:p-6 shadow-xs space-y-6">
                  
                  {/* Part A: Purpose of Engagement */}
                  <div id="reg-purposes" className="border-b border-slate-200 pb-5">
                    {/* Separate Heading Row with Sufficient Spacing */}
                    <div className="mb-3.5">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-800 mb-1">
                        PURPOSE OF ENGAGEMENT (Select all that apply) <span className="text-amber-600 font-bold">*</span>
                      </label>
                      <p className="text-xs text-slate-500">
                        Please indicate the scope of advisory by selecting all relevant transaction categories.
                      </p>
                    </div>

                    {/* Clean 3-Column Desktop Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {purposeOptions.map((purpose) => {
                        const isSelected = selectedPurposes.includes(purpose);
                        return (
                          <button
                            key={purpose}
                            type="button"
                            onClick={() => togglePurpose(purpose)}
                            className={`p-3 rounded text-left transition-all flex items-start gap-3 border min-w-0 ${
                              isSelected
                                ? 'bg-gold-50/80 border-gold-500 text-slate-900 font-semibold shadow-xs ring-1 ring-gold-500/40'
                                : 'bg-slate-50/80 border-slate-300 text-slate-700 hover:bg-slate-100 hover:border-slate-400'
                            }`}
                          >
                            <span className="shrink-0 mt-0.5">
                              {isSelected ? (
                                <CheckSquare className="w-4 h-4 text-gold-600" />
                              ) : (
                                <Square className="w-4 h-4 text-slate-400" />
                              )}
                            </span>
                            <span className="text-xs leading-snug break-words flex-1">{purpose}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Part B: Property Requirement Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-5">
                    
                    {/* ROW 1: Preferred Location (1/2 width) & Property Type (1/2 width) */}
                    <div className="col-span-1 md:col-span-6">
                      <label htmlFor="reg-location" className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Preferred Property Location(s)
                      </label>
                      <input
                        id="reg-location"
                        type="text"
                        value={preferredLocation}
                        onChange={(e) => setPreferredLocation(e.target.value)}
                        placeholder="e.g. Worli, Byculla, Mazgaon, Karjat, Alibaug"
                        className="w-full h-11 px-3.5 bg-white border border-slate-300 rounded text-sm text-slate-900 placeholder-slate-400 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 focus:outline-none transition-colors"
                      />
                    </div>

                    <div className="col-span-1 md:col-span-6">
                      <label htmlFor="reg-type" className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Property Type
                      </label>
                      <select
                        id="reg-type"
                        value={propertyType}
                        onChange={(e) => setPropertyType(e.target.value)}
                        className="w-full h-11 px-3.5 bg-white border border-slate-300 rounded text-sm text-slate-900 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 focus:outline-none transition-colors"
                      >
                        <option value="Apartment">Apartment</option>
                        <option value="Penthouse">Penthouse</option>
                        <option value="Villa / Independent Bungalow">Villa / Independent Bungalow</option>
                        <option value="Land / Residential Plot">Land / Residential Plot</option>
                        <option value="Commercial Property">Commercial Property</option>
                        <option value="Other">Other (Please specify)</option>
                      </select>
                      {propertyType === 'Other' && (
                        <input
                          type="text"
                          value={customPropertyType}
                          onChange={(e) => setCustomPropertyType(e.target.value)}
                          placeholder="Specify custom property type"
                          className="mt-2 w-full h-10 px-3.5 bg-white border border-gold-500 rounded text-sm text-slate-900 placeholder-slate-400 focus:border-gold-500 focus:outline-none"
                        />
                      )}
                    </div>

                    {/* ROW 2: Preferred Configuration (1/2 width) & Approximate Budget (1/2 width) */}
                    <div className="col-span-1 md:col-span-6">
                      <label htmlFor="reg-config" className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Preferred Configuration <span className="text-slate-400 font-normal">(e.g. 2, 3, 4, 5 BHK / Plot Area)</span>
                      </label>
                      <input
                        id="reg-config"
                        type="text"
                        value={configuration}
                        onChange={(e) => setConfiguration(e.target.value)}
                        placeholder="e.g. 3 BHK / 4 BHK / 10,000 sq.ft. Plot"
                        className="w-full h-11 px-3.5 bg-white border border-slate-300 rounded text-sm text-slate-900 placeholder-slate-400 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 focus:outline-none transition-colors"
                      />
                    </div>

                    <div className="col-span-1 md:col-span-6">
                      <label htmlFor="reg-budget" className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Approximate Budget <span className="text-slate-500 font-medium">(INR in Crores / Lakhs)</span>
                      </label>
                      <input
                        id="reg-budget"
                        type="text"
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        placeholder="e.g. INR 2.5 Cr – INR 5 Cr / INR 75 Lakhs"
                        className="w-full h-11 px-3.5 bg-white border border-slate-300 rounded text-sm text-slate-900 placeholder-slate-400 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 focus:outline-none transition-colors"
                      />
                    </div>

                    {/* ROW 3: Preferred Timeline (full width) */}
                    <div className="col-span-1 md:col-span-12">
                      <label htmlFor="reg-timeline" className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Preferred Timeline
                      </label>
                      <select
                        id="reg-timeline"
                        value={timeline}
                        onChange={(e) => setTimeline(e.target.value)}
                        className="w-full h-11 px-3.5 bg-white border border-slate-300 rounded text-sm text-slate-900 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 focus:outline-none transition-colors"
                      >
                        <option value="Immediate / Ready Possession">Immediate / Ready Possession (0–30 Days)</option>
                        <option value="1 to 3 Months">1 to 3 Months</option>
                        <option value="3 to 6 Months">3 to 6 Months</option>
                        <option value="6 to 12 Months">6 to 12 Months</option>
                        <option value="Planning / Long-Term Investment">Planning / Long-Term Investment</option>
                      </select>
                    </div>

                    {/* ROW 4: Specific Requirements / Notes / Society Details (full width, larger textarea) */}
                    <div className="col-span-1 md:col-span-12">
                      <label htmlFor="reg-requirements" className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Specific Requirements / Notes / Society Details <span className="text-slate-400 font-normal">(particularly for redevelopment enquiries)</span>
                      </label>
                      <textarea
                        id="reg-requirements"
                        rows={4}
                        value={additionalRequirements}
                        onChange={(e) => setAdditionalRequirements(e.target.value)}
                        placeholder="Provide details such as floor preference, sea view, society age & number of members (for redevelopment), specific developer preferences, or investment horizon."
                        className="w-full p-3.5 bg-white border border-slate-300 rounded text-sm text-slate-900 placeholder-slate-400 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 focus:outline-none transition-colors leading-relaxed"
                      />
                    </div>

                  </div>
                </div>
              </div>

              {/* ==================================================== */}
              {/* SECTION C — PROFESSIONAL CONSULTANCY & FEE AGREEMENT */}
              {/* ==================================================== */}
              <div id="sec-fee-agreement" className="scroll-mt-4">
                
                {/* Dark Navy Section Heading Bar */}
                <div className="bg-slate-900 border-l-4 border-gold-500 text-white py-3 px-4 sm:px-5 rounded-t flex items-center justify-between min-h-[44px]">
                  <h4 className="font-serif text-xs sm:text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-gold-500/20 text-gold-400 text-xs flex items-center justify-center font-mono font-bold">C</span>
                    <span>SECTION C — PROFESSIONAL CONSULTANCY &amp; FEE AGREEMENT</span>
                  </h4>
                  <span className="text-[10px] sm:text-[11px] uppercase font-mono tracking-wider text-slate-300 hidden sm:block">
                    7-Point Engagement Principles
                  </span>
                </div>

                {/* Form Inputs Container */}
                <div className="bg-white border border-slate-300 border-t-0 rounded-b p-4 sm:p-6 shadow-xs space-y-5">
                  <p className="text-xs text-slate-600 leading-relaxed">
                    This agreement sets out the operational and remuneration principles governing advisory services rendered by KLOUD REALTY. Both parties adhere to the following 7 principles:
                  </p>

                  {/* 7-Point Agreement Terms */}
                  <div className="space-y-2.5 max-h-56 overflow-y-auto custom-scrollbar pr-1">
                    <div className="p-3 rounded bg-slate-50 border border-slate-200 space-y-1">
                      <p className="font-semibold text-slate-900 text-xs flex items-center gap-2">
                        <span className="text-gold-600 font-mono font-bold">1.</span> Scope of Professional Advisory
                      </p>
                      <p className="text-slate-600 text-[11.5px] leading-relaxed">
                        Kloud Realty provides professional property advisory, consultation, market research, property identification, comparative valuation insights, negotiations and transaction coordination.
                      </p>
                    </div>

                    <div className="p-3 rounded bg-slate-50 border border-slate-200 space-y-1">
                      <p className="font-semibold text-slate-900 text-xs flex items-center gap-2">
                        <span className="text-gold-600 font-mono font-bold">2.</span> Advance Communication of Fees
                      </p>
                      <p className="text-slate-600 text-[11.5px] leading-relaxed">
                        Consultation fees, wherever applicable, will be communicated to the client in advance and agreed upon before the consultation takes place.
                      </p>
                    </div>

                    <div className="p-3 rounded bg-slate-50 border border-slate-200 space-y-1">
                      <p className="font-semibold text-slate-900 text-xs flex items-center gap-2">
                        <span className="text-gold-600 font-mono font-bold">3.</span> Purchase / Sale Transactions
                      </p>
                      <p className="text-slate-600 text-[11.5px] leading-relaxed">
                        If a successful property purchase or sale is facilitated through Kloud Realty, professional fees will be payable as mutually agreed in writing.
                      </p>
                    </div>

                    <div className="p-3 rounded bg-slate-50 border border-slate-200 space-y-1">
                      <p className="font-semibold text-slate-900 text-xs flex items-center gap-2">
                        <span className="text-gold-600 font-mono font-bold">4.</span> Rental / Lease Transactions
                      </p>
                      <p className="text-slate-600 text-[11.5px] leading-relaxed">
                        Applicable professional fees will be communicated and agreed upon before proceeding with the transaction.
                      </p>
                    </div>

                    <div className="p-3 rounded bg-slate-50 border border-slate-200 space-y-1">
                      <p className="font-semibold text-slate-900 text-xs flex items-center gap-2">
                        <span className="text-gold-600 font-mono font-bold">5.</span> Written Recording of Terms
                      </p>
                      <p className="text-slate-600 text-[11.5px] leading-relaxed">
                        The applicable fee amount or percentage, payment terms, milestones and conditions will be recorded separately in writing before the transaction or engagement is executed.
                      </p>
                    </div>

                    <div className="p-3 rounded bg-slate-50 border border-slate-200 space-y-1">
                      <p className="font-semibold text-slate-900 text-xs flex items-center gap-2">
                        <span className="text-gold-600 font-mono font-bold">6.</span> Statutory Taxes
                      </p>
                      <p className="text-slate-600 text-[11.5px] leading-relaxed">
                        Applicable taxes, including GST where applicable, will be communicated separately and charged according to prevailing laws.
                      </p>
                    </div>

                    <div className="p-3 rounded bg-slate-50 border border-slate-200 space-y-1">
                      <p className="font-semibold text-slate-900 text-xs flex items-center gap-2">
                        <span className="text-gold-600 font-mono font-bold">7.</span> Registration Nature
                      </p>
                      <p className="text-slate-600 text-[11.5px] leading-relaxed">
                        Submitting the registration form does not automatically create an immediate financial obligation. Professional fees become payable strictly according to the specific engagement and mutually accepted written terms.
                      </p>
                    </div>
                  </div>

                  {/* Consultancy Remuneration Details Box */}
                  <div className="p-4 rounded bg-slate-50 border border-gold-500/30 space-y-3">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-gold-600" />
                      <h5 className="font-serif text-xs font-bold uppercase tracking-wider text-slate-900">
                        Consultancy Remuneration Details
                      </h5>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div className="p-3 rounded bg-white border border-slate-200">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block">Applicable Fee Structure:</span>
                        <p className="text-slate-900 font-medium mt-0.5">{feeStructure}</p>
                      </div>
                      <div className="p-3 rounded bg-white border border-slate-200">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block">GST Status:</span>
                        <p className="text-slate-900 font-medium mt-0.5">{gstStatus}</p>
                      </div>
                      <div className="p-3 rounded bg-white border border-slate-200">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block">Payment Milestones:</span>
                        <p className="text-slate-900 font-medium mt-0.5">{paymentMilestones}</p>
                      </div>
                      <div className="p-3 rounded bg-white border border-slate-200">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block">Special Terms:</span>
                        <p className="text-slate-900 font-medium mt-0.5">{specialTerms}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ==================================================== */}
              {/* SECTION D — CLIENT DECLARATION & SIGNATURE           */}
              {/* ==================================================== */}
              <div id="sec-client-declaration" className="scroll-mt-4">
                
                {/* Dark Navy Section Heading Bar */}
                <div className="bg-slate-900 border-l-4 border-gold-500 text-white py-3 px-4 sm:px-5 rounded-t flex items-center justify-between min-h-[44px]">
                  <h4 className="font-serif text-xs sm:text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-gold-500/20 text-gold-400 text-xs flex items-center justify-center font-mono font-bold">D</span>
                    <span>SECTION D — CLIENT DECLARATION &amp; SIGNATURE</span>
                  </h4>
                  <span className="text-[10px] sm:text-[11px] uppercase font-mono tracking-wider text-slate-300 hidden sm:block">
                    Legal Acceptance &amp; Execution
                  </span>
                </div>

                {/* Form Inputs Container */}
                <div className="bg-white border border-slate-300 border-t-0 rounded-b p-4 sm:p-6 shadow-xs space-y-5">
                  
                  {/* Verbatim Declaration Quotation Box */}
                  <div className="p-4 rounded bg-amber-50/70 border border-amber-200 text-xs sm:text-sm text-slate-800 leading-relaxed italic">
                    &ldquo;I hereby confirm that the information provided above is accurate and that I have read and understood the professional engagement and fee terms. I agree to the applicable terms specifically communicated and accepted by me in writing.&rdquo;
                  </div>

                  {/* Required Confirmation Checkbox */}
                  <label id="reg-declaration" className="flex items-start gap-3 cursor-pointer p-3.5 rounded bg-slate-50 border border-slate-200 hover:border-gold-500/50 transition-colors">
                    <input
                      id="reg-accepted-terms"
                      type="checkbox"
                      required
                      checked={acceptedTerms}
                      onChange={(e) => setAcceptedTerms(e.target.checked)}
                      className="mt-1 w-4 h-4 rounded border-slate-400 text-gold-600 focus:ring-gold-500"
                    />
                    <span className="text-xs text-slate-800 font-semibold leading-relaxed">
                      I confirm acceptance of the applicable professional engagement and fee principles stated herein. <span className="text-amber-600 font-bold">*</span>
                    </span>
                  </label>

                  {/* Dual Signature Blocks (Client + Representative) */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-1">
                    
                    {/* Client Signature Box */}
                    <div className="p-4 rounded bg-slate-50 border border-slate-300 space-y-3">
                      <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                        <span className="text-xs font-mono uppercase tracking-wider text-gold-700 font-bold">
                          Client Signature &amp; Execution
                        </span>
                        <PenTool className="w-4 h-4 text-gold-600" />
                      </div>

                      <div>
                        <label htmlFor="reg-signature" className="block text-xs font-semibold text-slate-700 mb-1.5">
                          Client Signature <span className="text-amber-600 font-bold">*</span>
                        </label>
                        <input
                          id="reg-signature"
                          type="text"
                          required
                          value={clientSignature}
                          onChange={(e) => setClientSignature(e.target.value)}
                          placeholder="Type your full legal name to sign"
                          className="w-full h-11 px-3.5 bg-white border border-slate-300 rounded text-base text-slate-900 font-serif italic focus:border-gold-500 focus:ring-1 focus:ring-gold-500 focus:outline-none"
                        />
                        <span className="text-[10px] text-slate-500 mt-1 block">
                          Legally binding electronic signature pursuant to Information Technology Act.
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-3 pt-1">
                        <div>
                          <label htmlFor="reg-date" className="text-xs text-slate-600 font-medium block mb-1">Date:</label>
                          <input
                            id="reg-date"
                            type="text"
                            value={declarationDate}
                            onChange={(e) => setDeclarationDate(e.target.value)}
                            className="w-full h-9 px-3 bg-white border border-slate-300 rounded text-xs text-slate-900 font-mono focus:border-gold-500 focus:outline-none"
                          />
                        </div>
                        <div>
                          <label htmlFor="reg-place" className="text-xs text-slate-600 font-medium block mb-1">Place:</label>
                          <input
                            id="reg-place"
                            type="text"
                            value={clientPlace}
                            onChange={(e) => setClientPlace(e.target.value)}
                            placeholder="e.g. Mumbai"
                            className="w-full h-9 px-3 bg-white border border-slate-300 rounded text-xs text-slate-900 focus:border-gold-500 focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Authorized Representative Box (Abhishek Gupta) */}
                    <div className="p-4 rounded bg-slate-50 border border-slate-300 space-y-3">
                      <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                        <span className="text-xs font-mono uppercase tracking-wider text-slate-800 font-bold">
                          For KLOUD REALTY (Authorized Advisor)
                        </span>
                        <ShieldCheck className="w-4 h-4 text-cyanBrand" />
                      </div>

                      <div>
                        <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Representative:</span>
                        <p className="text-sm text-slate-900 font-bold mt-0.5">Abhishek Gupta</p>
                        <span className="text-[11px] text-gold-700 font-mono">Founder / Representative</span>
                      </div>

                      <div className="p-2.5 rounded bg-white border border-slate-200 flex items-center justify-between">
                        <div>
                          <span className="text-[10px] text-slate-500 block">Official Signature Seal:</span>
                          <span className="font-serif italic text-gold-700 text-sm font-semibold">Abhishek Gupta</span>
                        </div>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-300 font-semibold">
                          VERIFIED
                        </span>
                      </div>

                      <div className="text-[10.5px] text-slate-600 pt-0.5 leading-relaxed">
                        <p>Office: Shop No. 2, 321 R.B. Marg, Mazgaon, Mumbai – 400010</p>
                        <p className="text-slate-800 font-mono font-semibold">MahaRERA: A0311 72501659</p>
                      </div>
                    </div>

                  </div>
                </div>
              </div>

              {/* Form Submission Bar */}
              <div className="p-4 rounded bg-white border border-slate-300 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <ShieldCheck className="w-4 h-4 text-cyanBrand shrink-0" />
                  <span>MahaRERA: A0311 72501659 • Mazgaon, Mumbai</span>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2.5 rounded border border-slate-300 hover:border-slate-400 text-slate-600 hover:text-slate-900 text-xs font-semibold transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 sm:flex-initial px-8 py-3 rounded bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500 hover:brightness-110 text-charcoal-950 font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-gold-glow flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    <span>{isSubmitting ? 'Recording Registration...' : 'SUBMIT CLIENT REGISTRATION'}</span>
                    <ArrowRight className="w-4 h-4" />
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
