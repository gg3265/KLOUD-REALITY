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
  ArrowLeft, 
  FileText, 
  PenTool, 
  Check, 
  Building, 
  Clock, 
  DollarSign, 
  User, 
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
  // Wizard Step (1: Personal Details, 2: Requirements, 3: Fee Agreement, 4: Declaration & Review)
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);

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
  const [feeStructure, setFeeStructure] = useState('As mutually agreed in writing prior to transaction');
  const [gstStatus, setGstStatus] = useState('Applicable as per prevailing statutory rates (18% GST)');
  const [paymentMilestones, setPaymentMilestones] = useState('Payable upon execution / registration of formal agreement');
  const [specialTerms, setSpecialTerms] = useState('Subject to separate written engagement letter / terms');

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

  // Step 1 Validation
  const validateStep1 = (): boolean => {
    setErrorMsg('');
    if (!fullName.trim() || fullName.trim().length < 2) {
      setErrorMsg('Please enter your full name.');
      return false;
    }
    const cleanPhone = phone.replace(/[\s-]/g, '');
    if (!cleanPhone || cleanPhone.length < 8) {
      setErrorMsg('Please enter a valid telephone or mobile number.');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email.trim())) {
      setErrorMsg('Please enter a valid email address.');
      return false;
    }
    return true;
  };

  // Step 2 Validation
  const validateStep2 = (): boolean => {
    setErrorMsg('');
    if (selectedPurposes.length === 0) {
      setErrorMsg('Please select at least one Purpose of Engagement.');
      return false;
    }
    return true;
  };

  // Step 3 Validation
  const validateStep3 = (): boolean => {
    setErrorMsg('');
    return true;
  };

  const handleNext = () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2);
    } else if (currentStep === 2 && validateStep2()) {
      setCurrentStep(3);
    } else if (currentStep === 3 && validateStep3()) {
      // Pre-fill signature name if empty
      if (!clientSignature) {
        setClientSignature(fullName.trim());
      }
      setCurrentStep(4);
    }
  };

  const handleBack = () => {
    setErrorMsg('');
    if (currentStep > 1) {
      setCurrentStep((currentStep - 1) as any);
    }
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

    if (!validateStep1()) {
      setCurrentStep(1);
      return;
    }

    if (!acceptedTerms) {
      setErrorMsg('Please confirm acceptance of the professional engagement and fee principles stated herein.');
      return;
    }

    if (!clientSignature.trim()) {
      setErrorMsg('Please type your legal signature in the Client Signature field.');
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

  const stepsMeta = [
    { num: 1, label: 'Personal Details', sub: 'Section A' },
    { num: 2, label: 'Property Requirements', sub: 'Section B' },
    { num: 3, label: 'Fee Agreement', sub: 'Section C' },
    { num: 4, label: 'Review & Declaration', sub: 'Section D' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div 
        role="dialog"
        aria-modal="true"
        aria-labelledby="client-registration-title"
        className="relative w-full max-w-4xl bg-charcoal-900 border border-gold-500/40 rounded-sm shadow-2xl overflow-hidden my-4 sm:my-6 animate-fade-in"
      >
        
        {/* Top Decorative Gold Accent Bar */}
        <div className="h-1 bg-gradient-to-r from-gold-500 via-gold-400 to-cyanBrand" />

        {/* Modal Header */}
        <div className="p-4 sm:p-6 border-b border-white/10 flex items-center justify-between bg-charcoal-950/70">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif text-lg sm:text-xl font-bold text-white tracking-wider">
                KLOUD <span className="text-cyanBrand">REALTY</span>
              </span>
              <span className="text-xs text-warmGray">•</span>
              <span className="text-[10px] sm:text-[11px] uppercase tracking-widest text-gold-400 font-semibold">
                Client Registration &amp; Engagement
              </span>
            </div>
            <p className="text-xs text-warmGray mt-0.5">
              Official Property Advisory Intake &amp; 7-Point Professional Agreement
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

        {/* Multi-Step Wizard Progress Bar */}
        {!submittedLeadId && (
          <div className="px-4 sm:px-6 py-3 bg-charcoal-950/40 border-b border-white/5">
            <div className="grid grid-cols-4 gap-2">
              {stepsMeta.map((s) => {
                const isActive = currentStep === s.num;
                const isPast = currentStep > s.num;
                return (
                  <div key={s.num} className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                        isPast
                          ? 'bg-emerald-500 text-charcoal-950'
                          : isActive
                          ? 'bg-gold-500 text-charcoal-950 ring-2 ring-gold-400/30'
                          : 'bg-charcoal-800 text-warmGray border border-white/10'
                      }`}>
                        {isPast ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : s.num}
                      </div>
                    </div>
                    <div className="hidden sm:block">
                      <span className={`text-[10px] font-mono uppercase tracking-wider block ${
                        isActive ? 'text-gold-400 font-bold' : isPast ? 'text-emerald-400' : 'text-warmGray/60'
                      }`}>
                        {s.sub}
                      </span>
                      <span className={`text-[11px] leading-tight block truncate ${
                        isActive ? 'text-white font-semibold' : 'text-warmGray/80'
                      }`}>
                        {s.label}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* Linear progress bar */}
            <div className="w-full h-1 bg-charcoal-800 rounded-full mt-2.5 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-gold-500 to-cyanBrand transition-all duration-300"
                style={{ width: `${(currentStep / 4) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-7 max-h-[72vh] overflow-y-auto custom-scrollbar space-y-6">
          
          {submittedLeadId ? (
            /* SUCCESS CONFIRMATION */
            <div className="text-center py-8 sm:py-10 space-y-5 animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400 shadow-luxury">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h3 className="font-serif text-2xl sm:text-3xl font-light text-white">
                  Client Registration Successfully Recorded
                </h3>
                <p className="text-xs sm:text-sm text-warmGray max-w-lg mx-auto leading-relaxed">
                  Thank you, <strong className="text-white">{fullName}</strong>. Your official Client Registration &amp; Professional Engagement dossier has been recorded and transmitted directly to Abhishek Gupta at KLOUD REALTY.
                </p>
              </div>

              {/* Official Registration ID Card */}
              <div className="p-4 rounded bg-charcoal-850 border border-gold-500/30 max-w-sm mx-auto shadow-md">
                <span className="text-[10px] uppercase tracking-widest text-warmGray block">Official Registration ID</span>
                <span className="font-mono text-xl sm:text-2xl font-bold text-gold-400 tracking-wider">{submittedLeadId}</span>
                <span className="text-[11px] text-warmGray/80 block mt-1">Status: Recorded &amp; Transmitted</span>
              </div>

              {/* Summary Pill Grid */}
              <div className="max-w-md mx-auto p-4 rounded bg-charcoal-950 border border-white/5 text-left text-xs space-y-2">
                <div className="flex justify-between border-b border-white/5 pb-1.5">
                  <span className="text-warmGray">Client:</span>
                  <span className="text-white font-medium">{fullName}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-1.5">
                  <span className="text-warmGray">Contact:</span>
                  <span className="text-white font-mono">{phone} • {email}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-1.5">
                  <span className="text-warmGray">Engagement Scope:</span>
                  <span className="text-gold-300 font-medium text-right max-w-[240px] truncate">{selectedPurposes.join(', ')}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-1.5">
                  <span className="text-warmGray">Fee Agreement:</span>
                  <span className="text-emerald-400 font-semibold">Accepted &amp; Digitally Signed</span>
                </div>
                <div className="flex justify-between pt-0.5">
                  <span className="text-warmGray">Advisory Desk:</span>
                  <span className="text-cyanBrand font-medium">Mazgaon Office • Abhishek Gupta</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3">
                <button
                  type="button"
                  onClick={handleDownloadFilledPdf}
                  className="w-full sm:w-auto px-6 py-3 rounded bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500 text-charcoal-950 font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all duration-300 shadow-gold-glow flex items-center justify-center gap-2 group"
                >
                  <Download className="w-4 h-4 text-charcoal-950" />
                  <span>Download Pre-filled PDF Copy</span>
                </button>

                <a
                  href="/documents/KLOUD_REALTY_Client_Registration_Form_Professional.pdf"
                  download="KLOUD_REALTY_Client_Registration_Form_Professional.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-5 py-3 rounded border border-white/20 text-softWhite hover:text-gold-300 hover:border-gold-500/60 font-semibold text-xs uppercase tracking-wider bg-charcoal-850 hover:bg-charcoal-800 transition-colors flex items-center justify-center gap-2"
                >
                  <FileText className="w-4 h-4 text-gold-400" />
                  <span>Download Official Blank PDF</span>
                </a>

                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto px-5 py-3 rounded border border-white/10 text-warmGray hover:text-white font-medium text-xs transition-colors"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            /* WIZARD FORM */
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
                <div className="p-3.5 rounded bg-red-950/70 border border-red-500/40 text-red-300 text-xs flex items-center gap-2.5 animate-shake">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* ==================================================== */}
              {/* STEP 1: SECTION A — CLIENT PERSONAL DETAILS           */}
              {/* ==================================================== */}
              {currentStep === 1 && (
                <div className="space-y-4 animate-fade-in">
                  <div className="flex items-center justify-between pb-2 border-b border-white/10">
                    <div>
                      <h4 className="font-serif text-sm sm:text-base font-semibold uppercase tracking-wider text-gold-400 flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-gold-500/20 text-gold-400 text-xs flex items-center justify-center font-bold">A</span>
                        <span>SECTION A — CLIENT PERSONAL DETAILS</span>
                      </h4>
                      <p className="text-[11px] text-warmGray mt-0.5">
                        Confidential Client Identification for official advisory records.
                      </p>
                    </div>
                    <span className="text-[10px] uppercase font-mono text-cyanBrand px-2 py-0.5 rounded bg-cyanBrand/10 border border-cyanBrand/20">
                      Step 1 of 4
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {/* Full Name */}
                    <div>
                      <label className="block text-[11px] text-warmGray font-medium mb-1">
                        Full Name of Client <span className="text-gold-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Vikramaditya Singhania"
                        className="w-full px-3.5 py-2.5 bg-charcoal-800 border border-white/10 rounded text-xs text-white placeholder-warmGray/50 focus:border-gold-500 focus:outline-none transition-colors"
                      />
                    </div>

                    {/* Mobile Number */}
                    <div>
                      <label className="block text-[11px] text-warmGray font-medium mb-1">
                        Mobile Number <span className="text-gold-400">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. 98200 12345"
                        className="w-full px-3.5 py-2.5 bg-charcoal-800 border border-white/10 rounded text-xs text-white placeholder-warmGray/50 focus:border-gold-500 focus:outline-none transition-colors font-mono"
                      />
                    </div>

                    {/* Date of Birth */}
                    <div>
                      <label className="block text-[11px] text-warmGray font-medium mb-1">
                        Date of Birth (DD/MM/YYYY)
                      </label>
                      <input
                        type="text"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                        placeholder="DD/MM/YYYY"
                        className="w-full px-3.5 py-2.5 bg-charcoal-800 border border-white/10 rounded text-xs text-white placeholder-warmGray/50 focus:border-gold-500 focus:outline-none transition-colors font-mono"
                      />
                    </div>

                    {/* WhatsApp Number */}
                    <div>
                      <label className="block text-[11px] text-warmGray font-medium mb-1">
                        WhatsApp Number
                      </label>
                      <input
                        type="tel"
                        value={whatsapp}
                        onChange={(e) => setWhatsapp(e.target.value)}
                        placeholder="Same as mobile or alternate"
                        className="w-full px-3.5 py-2.5 bg-charcoal-800 border border-white/10 rounded text-xs text-white placeholder-warmGray/50 focus:border-gold-500 focus:outline-none transition-colors font-mono"
                      />
                    </div>

                    {/* Email Address */}
                    <div className="sm:col-span-2">
                      <label className="block text-[11px] text-warmGray font-medium mb-1">
                        Email Address <span className="text-gold-400">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. client@domain.com"
                        className="w-full px-3.5 py-2.5 bg-charcoal-800 border border-white/10 rounded text-xs text-white placeholder-warmGray/50 focus:border-gold-500 focus:outline-none transition-colors"
                      />
                    </div>

                    {/* Residential Address */}
                    <div className="sm:col-span-2">
                      <label className="block text-[11px] text-warmGray font-medium mb-1">
                        Residential Address (Street, Building / Apartment No.)
                      </label>
                      <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="e.g. Flat 1402, Harbour View Apartments, Mazgaon"
                        className="w-full px-3.5 py-2.5 bg-charcoal-800 border border-white/10 rounded text-xs text-white placeholder-warmGray/50 focus:border-gold-500 focus:outline-none transition-colors"
                      />
                    </div>

                    {/* City and PIN Code */}
                    <div>
                      <label className="block text-[11px] text-warmGray font-medium mb-1">
                        City and PIN Code
                      </label>
                      <input
                        type="text"
                        value={cityPin}
                        onChange={(e) => setCityPin(e.target.value)}
                        placeholder="e.g. Mumbai – 400010"
                        className="w-full px-3.5 py-2.5 bg-charcoal-800 border border-white/10 rounded text-xs text-white placeholder-warmGray/50 focus:border-gold-500 focus:outline-none transition-colors"
                      />
                    </div>

                    {/* PAN Number */}
                    <div>
                      <label className="block text-[11px] text-warmGray font-medium mb-1">
                        PAN Number (Optional at Initial Registration)
                      </label>
                      <input
                        type="text"
                        value={pan}
                        onChange={(e) => setPan(e.target.value.toUpperCase())}
                        placeholder="ABCDE1234F"
                        maxLength={10}
                        className="w-full px-3.5 py-2.5 bg-charcoal-800 border border-white/10 rounded text-xs text-white uppercase placeholder-warmGray/50 focus:border-gold-500 focus:outline-none font-mono tracking-wider transition-colors"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* ==================================================== */}
              {/* STEP 2: SECTION B — PROPERTY REQUIREMENTS             */}
              {/* ==================================================== */}
              {currentStep === 2 && (
                <div className="space-y-4 animate-fade-in">
                  <div className="flex items-center justify-between pb-2 border-b border-white/10">
                    <div>
                      <h4 className="font-serif text-sm sm:text-base font-semibold uppercase tracking-wider text-gold-400 flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-gold-500/20 text-gold-400 text-xs flex items-center justify-center font-bold">B</span>
                        <span>SECTION B — PROPERTY REQUIREMENTS &amp; ENGAGEMENT OBJECTIVE</span>
                      </h4>
                      <p className="text-xs text-white/90 font-medium mt-0.5">
                        Please indicate the scope of advisory.
                      </p>
                    </div>
                    <span className="text-[10px] uppercase font-mono text-cyanBrand px-2 py-0.5 rounded bg-cyanBrand/10 border border-cyanBrand/20">
                      Step 2 of 4
                    </span>
                  </div>

                  {/* Purpose of Engagement Multi-Select */}
                  <div>
                    <label className="block text-[11px] text-warmGray font-semibold uppercase tracking-wider mb-2">
                      Purpose of Engagement (Select all that apply) <span className="text-gold-400">*</span>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {purposeOptions.map((purpose) => {
                        const isSelected = selectedPurposes.includes(purpose);
                        return (
                          <button
                            key={purpose}
                            type="button"
                            onClick={() => togglePurpose(purpose)}
                            className={`p-2.5 rounded text-left text-xs transition-all flex items-start gap-2 border ${
                              isSelected
                                ? 'bg-gold-500/15 border-gold-500 text-gold-300 font-semibold shadow-xs'
                                : 'bg-charcoal-800/80 border-white/5 text-softWhite/80 hover:bg-charcoal-800 hover:border-white/15'
                            }`}
                          >
                            {isSelected ? (
                              <CheckSquare className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                            ) : (
                              <Square className="w-4 h-4 text-warmGray shrink-0 mt-0.5" />
                            )}
                            <span className="leading-snug">{purpose}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Separate Requirement Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                    {/* 1. Preferred Property Location(s) */}
                    <div>
                      <label className="block text-[11px] text-warmGray font-medium mb-1">
                        1. Preferred Property Location(s)
                      </label>
                      <input
                        type="text"
                        value={preferredLocation}
                        onChange={(e) => setPreferredLocation(e.target.value)}
                        placeholder="e.g. Worli, Byculla, Mazgaon, Karjat, Alibaug"
                        className="w-full px-3.5 py-2.5 bg-charcoal-800 border border-white/10 rounded text-xs text-white placeholder-warmGray/50 focus:border-gold-500 focus:outline-none transition-colors"
                      />
                    </div>

                    {/* 2. Preferred Configuration */}
                    <div>
                      <label className="block text-[11px] text-warmGray font-medium mb-1">
                        2. Preferred Configuration (e.g. 2, 3, 4, 5 BHK / Plot Area)
                      </label>
                      <input
                        type="text"
                        value={configuration}
                        onChange={(e) => setConfiguration(e.target.value)}
                        placeholder="e.g. 3 BHK / 4 BHK / 10,000 sq.ft. Plot"
                        className="w-full px-3.5 py-2.5 bg-charcoal-800 border border-white/10 rounded text-xs text-white placeholder-warmGray/50 focus:border-gold-500 focus:outline-none transition-colors"
                      />
                    </div>

                    {/* 3. Property Type */}
                    <div>
                      <label className="block text-[11px] text-warmGray font-medium mb-1">
                        3. Property Type (Apartment, Penthouse, Villa, Land, Commercial)
                      </label>
                      <select
                        value={propertyType}
                        onChange={(e) => setPropertyType(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-charcoal-800 border border-white/10 rounded text-xs text-white focus:border-gold-500 focus:outline-none transition-colors"
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
                          placeholder="Specify property type"
                          className="mt-2 w-full px-3.5 py-2 bg-charcoal-800 border border-gold-500/50 rounded text-xs text-white placeholder-warmGray/50 focus:border-gold-500 focus:outline-none"
                        />
                      )}
                    </div>

                    {/* 4. Approximate Budget (Single field, no duplicates) */}
                    <div>
                      <label className="block text-[11px] text-warmGray font-medium mb-1">
                        4. Approximate Budget (₹ in Crores / Lakhs)
                      </label>
                      <input
                        type="text"
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        placeholder="e.g. ₹2.5 Cr – ₹5 Cr / ₹75 Lakhs"
                        className="w-full px-3.5 py-2.5 bg-charcoal-800 border border-white/10 rounded text-xs text-white placeholder-warmGray/50 focus:border-gold-500 focus:outline-none transition-colors"
                      />
                    </div>

                    {/* 5. Preferred Timeline */}
                    <div className="sm:col-span-2">
                      <label className="block text-[11px] text-warmGray font-medium mb-1">
                        5. Preferred Timeline
                      </label>
                      <select
                        value={timeline}
                        onChange={(e) => setTimeline(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-charcoal-800 border border-white/10 rounded text-xs text-white focus:border-gold-500 focus:outline-none transition-colors"
                      >
                        <option value="Immediate / Ready Possession">Immediate / Ready Possession (0–30 Days)</option>
                        <option value="1 to 3 Months">1 to 3 Months</option>
                        <option value="3 to 6 Months">3 to 6 Months</option>
                        <option value="6 to 12 Months">6 to 12 Months</option>
                        <option value="Planning / Long-Term Investment">Planning / Long-Term Investment</option>
                      </select>
                    </div>

                    {/* 6. Specific Requirements / Notes / Society Details */}
                    <div className="sm:col-span-2">
                      <label className="block text-[11px] text-warmGray font-medium mb-1">
                        6. Specific Requirements / Notes / Society Details (particularly for redevelopment enquiries)
                      </label>
                      <textarea
                        rows={3}
                        value={additionalRequirements}
                        onChange={(e) => setAdditionalRequirements(e.target.value)}
                        placeholder="Provide details such as floor preference, sea view, society age & number of members (for redevelopment), specific developer preferences, or investment horizon."
                        className="w-full px-3.5 py-2.5 bg-charcoal-800 border border-white/10 rounded text-xs text-white placeholder-warmGray/50 focus:border-gold-500 focus:outline-none transition-colors leading-relaxed"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* ==================================================== */}
              {/* STEP 3: SECTION C — FEE AGREEMENT & REMUNERATION     */}
              {/* ==================================================== */}
              {currentStep === 3 && (
                <div className="space-y-4 animate-fade-in">
                  <div className="flex items-center justify-between pb-2 border-b border-white/10">
                    <div>
                      <h4 className="font-serif text-sm sm:text-base font-semibold uppercase tracking-wider text-gold-400 flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-gold-500/20 text-gold-400 text-xs flex items-center justify-center font-bold">C</span>
                        <span>SECTION C — PROFESSIONAL CONSULTANCY &amp; FEE AGREEMENT</span>
                      </h4>
                      <p className="text-[11px] text-warmGray mt-0.5">
                        Clear, transparent 7-point professional advisory and remuneration principles.
                      </p>
                    </div>
                    <span className="text-[10px] uppercase font-mono text-cyanBrand px-2 py-0.5 rounded bg-cyanBrand/10 border border-cyanBrand/20">
                      Step 3 of 4
                    </span>
                  </div>

                  {/* 7-Point Agreement Terms */}
                  <div className="space-y-2.5 p-4 rounded bg-charcoal-950 border border-white/10 max-h-[38vh] overflow-y-auto custom-scrollbar text-xs text-softWhite/90 leading-relaxed">
                    <div className="p-2.5 rounded bg-charcoal-900/80 border border-white/5 space-y-1">
                      <p className="font-semibold text-white text-[12px] flex items-center gap-2">
                        <span className="text-gold-400 font-mono">1.</span> Scope of Professional Advisory
                      </p>
                      <p className="text-warmGray text-[11.5px]">
                        Kloud Realty provides professional property advisory, consultation, market research, property identification, comparative valuation insights, negotiations and transaction coordination.
                      </p>
                    </div>

                    <div className="p-2.5 rounded bg-charcoal-900/80 border border-white/5 space-y-1">
                      <p className="font-semibold text-white text-[12px] flex items-center gap-2">
                        <span className="text-gold-400 font-mono">2.</span> Advance Communication of Fees
                      </p>
                      <p className="text-warmGray text-[11.5px]">
                        Consultation fees, wherever applicable, will be communicated to the client in advance and agreed upon before the consultation takes place.
                      </p>
                    </div>

                    <div className="p-2.5 rounded bg-charcoal-900/80 border border-white/5 space-y-1">
                      <p className="font-semibold text-white text-[12px] flex items-center gap-2">
                        <span className="text-gold-400 font-mono">3.</span> Purchase / Sale Transactions
                      </p>
                      <p className="text-warmGray text-[11.5px]">
                        If a successful property purchase or sale is facilitated through Kloud Realty, professional fees will be payable as mutually agreed in writing.
                      </p>
                    </div>

                    <div className="p-2.5 rounded bg-charcoal-900/80 border border-white/5 space-y-1">
                      <p className="font-semibold text-white text-[12px] flex items-center gap-2">
                        <span className="text-gold-400 font-mono">4.</span> Rental / Lease Transactions
                      </p>
                      <p className="text-warmGray text-[11.5px]">
                        Applicable professional fees will be communicated and agreed upon before proceeding with the transaction.
                      </p>
                    </div>

                    <div className="p-2.5 rounded bg-charcoal-900/80 border border-white/5 space-y-1">
                      <p className="font-semibold text-white text-[12px] flex items-center gap-2">
                        <span className="text-gold-400 font-mono">5.</span> Written Recording of Terms
                      </p>
                      <p className="text-warmGray text-[11.5px]">
                        The applicable fee amount or percentage, payment terms, milestones and conditions will be recorded separately in writing before the transaction or engagement is executed.
                      </p>
                    </div>

                    <div className="p-2.5 rounded bg-charcoal-900/80 border border-white/5 space-y-1">
                      <p className="font-semibold text-white text-[12px] flex items-center gap-2">
                        <span className="text-gold-400 font-mono">6.</span> Statutory Taxes
                      </p>
                      <p className="text-warmGray text-[11.5px]">
                        Applicable taxes, including GST where applicable, will be communicated separately and charged according to prevailing laws.
                      </p>
                    </div>

                    <div className="p-2.5 rounded bg-charcoal-900/80 border border-white/5 space-y-1">
                      <p className="font-semibold text-white text-[12px] flex items-center gap-2">
                        <span className="text-gold-400 font-mono">7.</span> Registration Nature
                      </p>
                      <p className="text-warmGray text-[11.5px]">
                        Submitting the registration form does not automatically create an immediate financial obligation. Professional fees become payable strictly according to the specific engagement and mutually accepted written terms.
                      </p>
                    </div>
                  </div>

                  {/* Consultancy Remuneration Details Box */}
                  <div className="p-4 rounded bg-gold-500/10 border border-gold-500/30 space-y-3">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-gold-400" />
                      <h5 className="font-serif text-xs font-bold uppercase tracking-wider text-gold-300">
                        Consultancy Remuneration Details
                      </h5>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div className="p-2.5 rounded bg-charcoal-900/90 border border-gold-500/20">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-warmGray block">Applicable Fee Structure:</span>
                        <p className="text-softWhite font-medium mt-0.5">{feeStructure}</p>
                      </div>
                      <div className="p-2.5 rounded bg-charcoal-900/90 border border-gold-500/20">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-warmGray block">GST Status:</span>
                        <p className="text-softWhite font-medium mt-0.5">{gstStatus}</p>
                      </div>
                      <div className="p-2.5 rounded bg-charcoal-900/90 border border-gold-500/20">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-warmGray block">Payment Milestones:</span>
                        <p className="text-softWhite font-medium mt-0.5">{paymentMilestones}</p>
                      </div>
                      <div className="p-2.5 rounded bg-charcoal-900/90 border border-gold-500/20">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-warmGray block">Special Terms:</span>
                        <p className="text-softWhite font-medium mt-0.5">{specialTerms}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ==================================================== */}
              {/* STEP 4: SECTION D — REVIEW & CLIENT DECLARATION      */}
              {/* ==================================================== */}
              {currentStep === 4 && (
                <div className="space-y-4 animate-fade-in">
                  <div className="flex items-center justify-between pb-2 border-b border-white/10">
                    <div>
                      <h4 className="font-serif text-sm sm:text-base font-semibold uppercase tracking-wider text-gold-400 flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-gold-500/20 text-gold-400 text-xs flex items-center justify-center font-bold">D</span>
                        <span>SECTION D — CLIENT DECLARATION &amp; SIGNATURE</span>
                      </h4>
                      <p className="text-[11px] text-warmGray mt-0.5">
                        Review your entered information, confirm declaration, and provide legal digital signature.
                      </p>
                    </div>
                    <span className="text-[10px] uppercase font-mono text-cyanBrand px-2 py-0.5 rounded bg-cyanBrand/10 border border-cyanBrand/20">
                      Step 4 of 4
                    </span>
                  </div>

                  {/* Review Summary Accordion / Card */}
                  <div className="p-3.5 rounded bg-charcoal-950 border border-white/10 space-y-2 text-xs">
                    <span className="text-[10px] uppercase font-mono tracking-wider text-gold-400 font-bold block">
                      Summary Review of Registration Dossier:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-[11px]">
                      <div>
                        <span className="text-warmGray block">Client:</span>
                        <strong className="text-white">{fullName}</strong>
                      </div>
                      <div>
                        <span className="text-warmGray block">Mobile &amp; Email:</span>
                        <span className="text-white font-mono">{phone} • {email}</span>
                      </div>
                      <div>
                        <span className="text-warmGray block">PAN:</span>
                        <span className="text-white font-mono">{pan || 'Not provided (Optional)'}</span>
                      </div>
                      <div className="sm:col-span-2">
                        <span className="text-warmGray block">Purpose(s):</span>
                        <span className="text-gold-300 font-medium">{selectedPurposes.join(', ')}</span>
                      </div>
                      <div>
                        <span className="text-warmGray block">Budget &amp; Timeline:</span>
                        <span className="text-white font-medium">{budget || 'To discuss'} ({timeline})</span>
                      </div>
                    </div>
                  </div>

                  {/* Verbatim Declaration Quotation Box */}
                  <div className="p-3.5 rounded bg-charcoal-850 border border-gold-500/30 text-xs sm:text-sm text-softWhite/90 leading-relaxed italic relative">
                    &ldquo;I hereby confirm that the information provided above is accurate and that I have read and understood the professional engagement and fee terms. I agree to the applicable terms specifically communicated and accepted by me in writing.&rdquo;
                  </div>

                  {/* Required Confirmation Checkbox */}
                  <label className="flex items-start gap-2.5 cursor-pointer p-3 rounded bg-charcoal-950/60 border border-white/5 hover:border-gold-500/30 transition-colors">
                    <input
                      type="checkbox"
                      required
                      checked={acceptedTerms}
                      onChange={(e) => setAcceptedTerms(e.target.checked)}
                      className="mt-1 w-4 h-4 rounded border-gold-500 text-gold-500 focus:ring-gold-500 bg-charcoal-800"
                    />
                    <span className="text-xs text-white font-medium leading-relaxed">
                      I confirm acceptance of the applicable professional engagement and fee principles stated herein. <span className="text-gold-400">*</span>
                    </span>
                  </label>

                  {/* Dual Signature Blocks (Client + Representative) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                    
                    {/* Client Signature Box */}
                    <div className="p-4 rounded bg-charcoal-850 border border-gold-500/30 space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-gold-400 font-bold">
                          Client Signature &amp; Execution
                        </span>
                        <PenTool className="w-3.5 h-3.5 text-gold-400" />
                      </div>

                      <div>
                        <label className="block text-[10px] text-warmGray uppercase tracking-wider mb-1">
                          Client Signature <span className="text-gold-400">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={clientSignature}
                          onChange={(e) => setClientSignature(e.target.value)}
                          placeholder="Type your full legal name to sign"
                          className="w-full px-3 py-2 bg-charcoal-900 border border-white/10 rounded text-sm text-gold-300 font-serif italic focus:border-gold-500 focus:outline-none"
                        />
                        <span className="text-[9.5px] text-warmGray/70 mt-0.5 block">
                          Legally binding electronic signature pursuant to IT regulations.
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 pt-1 text-[11px]">
                        <div>
                          <label className="text-[10px] text-warmGray block">Date:</label>
                          <input
                            type="text"
                            value={declarationDate}
                            onChange={(e) => setDeclarationDate(e.target.value)}
                            className="w-full px-2 py-1 bg-charcoal-900 border border-white/10 rounded text-xs text-white font-mono focus:border-gold-500 focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-warmGray block">Place:</label>
                          <input
                            type="text"
                            value={clientPlace}
                            onChange={(e) => setClientPlace(e.target.value)}
                            placeholder="e.g. Mumbai"
                            className="w-full px-2 py-1 bg-charcoal-900 border border-white/10 rounded text-xs text-white focus:border-gold-500 focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Authorized Representative Box (Abhishek Gupta) */}
                    <div className="p-4 rounded bg-charcoal-850 border border-white/10 space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-cyanBrand font-bold">
                          For KLOUD REALTY (Authorized Representative)
                        </span>
                        <ShieldCheck className="w-3.5 h-3.5 text-cyanBrand" />
                      </div>

                      <div>
                        <span className="text-[10px] text-warmGray uppercase tracking-wider block">Representative:</span>
                        <p className="text-xs text-white font-medium mt-0.5">Abhishek Gupta</p>
                        <span className="text-[10px] text-gold-400 font-mono">Founder / Representative</span>
                      </div>

                      <div className="p-2 rounded bg-charcoal-900/80 border border-white/5 flex items-center justify-between">
                        <div>
                          <span className="text-[10px] text-warmGray block">Official Signature Seal:</span>
                          <span className="font-serif italic text-gold-300 text-sm">Abhishek Gupta</span>
                        </div>
                        <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          VERIFIED
                        </span>
                      </div>

                      <div className="text-[10px] text-warmGray/80 pt-0.5">
                        <p>Office: Shop No. 2, 321 R.B. Marg, Mazgaon, Mumbai – 400010</p>
                        <p className="text-gold-400/90 font-mono">MahaRERA: A0311 72501659</p>
                      </div>
                    </div>

                  </div>
                </div>
              )}

              {/* Modal Navigation Buttons */}
              <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-[11px] text-warmGray">
                  <ShieldCheck className="w-4 h-4 text-cyanBrand" />
                  <span>RERA ID: A0311 72501659 • Mazgaon, Mumbai</span>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  {currentStep > 1 && (
                    <button
                      type="button"
                      onClick={handleBack}
                      className="px-4 py-2.5 rounded border border-white/10 hover:border-white/20 text-warmGray hover:text-white text-xs font-medium flex items-center gap-1.5 transition-colors"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Back</span>
                    </button>
                  )}

                  {currentStep < 4 ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="flex-1 sm:flex-initial px-6 py-2.5 rounded bg-gold-500 text-charcoal-950 font-bold text-xs uppercase tracking-wider hover:bg-gold-400 transition-colors shadow-gold-glow flex items-center justify-center gap-2"
                    >
                      <span>Continue</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 sm:flex-initial px-7 py-2.5 rounded bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500 text-charcoal-950 font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all duration-300 shadow-gold-glow flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      <span>{isSubmitting ? 'Recording Registration...' : 'SUBMIT REGISTRATION'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

            </form>
          )}

        </div>

      </div>
    </div>
  );
};
