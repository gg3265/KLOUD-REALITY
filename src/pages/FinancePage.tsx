import React, { useState } from 'react';
import { 
  Building, 
  Calculator, 
  Landmark, 
  FileCheck2, 
  Clock, 
  Coins, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Phone, 
  AlertCircle,
  HelpCircle,
  Sparkles
} from 'lucide-react';
import { leadService } from '../services/leadService';

export const FinancePage: React.FC = () => {
  // Form State
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [employmentType, setEmploymentType] = useState<'Salaried' | 'Self-employed'>('Salaried');
  const [propertyType, setPropertyType] = useState('Apartment / Flat');
  const [propertyLocation, setPropertyLocation] = useState('');
  const [approxPropertyValue, setApproxPropertyValue] = useState('');
  const [requiredLoanAmount, setRequiredLoanAmount] = useState('');
  const [existingLoanObligations, setExistingLoanObligations] = useState('');
  const [preferredCallbackTime, setPreferredCallbackTime] = useState('Morning (9 AM – 12 PM)');
  const [additionalMessage, setAdditionalMessage] = useState('');
  const [consentChecked, setConsentChecked] = useState(false);
  const [honeypot, setHoneypot] = useState('');

  // Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [submittedLeadId, setSubmittedLeadId] = useState<string | null>(null);

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
      setErrorMsg('Please enter a valid mobile number.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email.trim())) {
      setErrorMsg('Please provide a valid email address.');
      return;
    }

    if (!requiredLoanAmount.trim()) {
      setErrorMsg('Please specify your required loan amount.');
      return;
    }

    if (!consentChecked) {
      setErrorMsg('Please agree to the contact consent checkbox.');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await leadService.createLead({
        fullName: fullName.trim(),
        phone: phone.trim(),
        email: email.trim().toLowerCase(),
        enquirySource: 'Finance Page',
        serviceVertical: 'Finance & Home Loan',
        preferredLocation: propertyLocation.trim() || 'Mumbai',
        budgetRange: requiredLoanAmount.trim(),
        preferredContactMethod: 'Phone Call',
        employmentType,
        approxPropertyValue: approxPropertyValue.trim() || 'Not specified',
        requiredLoanAmount: requiredLoanAmount.trim(),
        existingLoanObligations: existingLoanObligations.trim() || 'None',
        preferredCallbackTime,
        message: [
          `Property Type: ${propertyType}`,
          `Value: ${approxPropertyValue || 'N/A'}`,
          `Loan Req: ${requiredLoanAmount}`,
          `Obligations: ${existingLoanObligations || 'None'}`,
          `Callback: ${preferredCallbackTime}`,
          additionalMessage ? `Note: ${additionalMessage}` : ''
        ].filter(Boolean).join(' | ')
      });

      if (res.success && res.leadId) {
        setSubmittedLeadId(res.leadId);
      } else {
        setErrorMsg(res.error || 'Failed to submit loan enquiry. Please try again or call 8655588880.');
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
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const services = [
    {
      title: 'Home Loan Assistance',
      icon: Building,
      desc: "Assistance in exploring suitable home-loan options based on the client's property requirements and financial profile.",
      highlight: 'Competitive Rates & Lenders'
    },
    {
      title: 'Loan Eligibility Guidance',
      icon: Calculator,
      desc: 'Initial guidance on understanding loan eligibility, income requirements and potential borrowing capacity.',
      highlight: 'Borrowing Capacity Analysis'
    },
    {
      title: 'Bank & Financial Institution Coordination',
      icon: Landmark,
      desc: 'Assistance in connecting clients with relevant banks and authorised financial institutions.',
      highlight: 'Leading Institutional Partners'
    },
    {
      title: 'Documentation Assistance',
      icon: FileCheck2,
      desc: 'Guidance on commonly required documents, application preparation and submission.',
      highlight: 'End-to-End Checklist'
    },
    {
      title: 'Loan Application Support',
      icon: Clock,
      desc: 'Coordination and follow-up support during the application and processing stages.',
      highlight: 'Timely Follow-ups'
    },
    {
      title: 'Loan Against Property',
      icon: Coins,
      desc: 'Assistance in exploring financing options against eligible existing properties, subject to lender policies.',
      highlight: 'Equity Unlocking Options'
    }
  ];

  const steps = [
    {
      number: '01',
      title: 'Share Your Requirements',
      desc: 'Provide your basic property details, financial profile, and financing expectations via our consultation desk.'
    },
    {
      number: '02',
      title: 'Initial Financial Assessment',
      desc: 'We review eligible borrowing parameters, typical debt-to-income benchmarks, and suitable tenure structures.'
    },
    {
      number: '03',
      title: 'Explore Suitable Financing Options',
      desc: 'Compare loan structures, floating vs. fixed interest terms, and processing criteria across authorized lending institutions.'
    },
    {
      number: '04',
      title: 'Documentation & Application Assistance',
      desc: 'Receive systematic guidance to assemble KYC, financial statements, property title copies, and application forms.'
    },
    {
      number: '05',
      title: 'Lender Review and Final Decision',
      desc: 'The chosen financial institution conducts its formal appraisal, legal verification, credit underwriting, and disbursement.'
    }
  ];

  return (
    <div className="min-h-screen bg-charcoal-900 text-softWhite w-full max-w-full overflow-x-hidden pt-24 sm:pt-28">
      
      {/* 1. HERO SECTION */}
      <section className="relative py-20 lg:py-28 px-4 sm:px-6 lg:px-8 border-b border-white/10 overflow-hidden">
        {/* Background Gradient & Ambient Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-charcoal-950 via-charcoal-900 to-charcoal-950 pointer-events-none" />
        <div className="absolute -top-24 right-10 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-cyanBrand/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-semibold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-gold-400" />
            <span>FINANCE &amp; HOME LOAN ASSISTANCE</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-white tracking-tight leading-tight max-w-4xl mx-auto">
            Making Your Dream Home Financially Possible.
          </h1>

          <p className="text-sm sm:text-base lg:text-lg text-warmGray max-w-3xl mx-auto leading-relaxed">
            From exploring suitable financing options to navigating the home-loan application process, we help simplify your property financing journey through personalised assistance and professional coordination.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => scrollToSection('loan-services')}
              className="w-full sm:w-auto px-7 py-3.5 rounded bg-gold-500 text-charcoal-950 font-bold text-xs uppercase tracking-wider hover:bg-gold-400 transition-all shadow-gold-glow flex items-center justify-center gap-2"
            >
              <span>EXPLORE HOME LOAN ASSISTANCE</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => scrollToSection('loan-enquiry-form')}
              className="w-full sm:w-auto px-7 py-3.5 rounded border border-white/20 hover:border-gold-500 text-white hover:text-gold-300 font-semibold text-xs uppercase tracking-wider bg-charcoal-850 hover:bg-charcoal-800 transition-all flex items-center justify-center gap-2"
            >
              <span>REQUEST A CALLBACK</span>
            </button>
          </div>

          <div className="pt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-warmGray">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-cyanBrand" />
              <span>MahaRERA Reg: A0311 72501659</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-gold-400" />
              <span>Advisory Desk: +91 86-555-88880</span>
            </div>
            <span>•</span>
            <div>Mazgaon, Mumbai</div>
          </div>
        </div>
      </section>

      {/* 2. SERVICES OFFERED */}
      <section id="loan-services" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-gold-400 block mb-2">COMPREHENSIVE FINANCIAL ADVISORY</span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-white tracking-tight">
            Services Offered
          </h2>
          <p className="mt-4 text-sm sm:text-base text-warmGray leading-relaxed">
            Transparent, dedicated coordination with leading public, private, and housing finance institutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((svc, idx) => {
            const Icon = svc.icon;
            return (
              <div
                key={svc.title}
                className="group p-7 rounded-sm bg-charcoal-850 border border-white/10 hover:border-gold-500/50 shadow-subtle hover:shadow-luxury transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded bg-charcoal-900 border border-gold-500/30 flex items-center justify-center text-gold-400 group-hover:scale-105 group-hover:border-gold-500 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-cyanBrand font-semibold block mb-1">
                      SERVICE 0{idx + 1}
                    </span>
                    <h3 className="font-serif text-xl font-bold text-white group-hover:text-gold-300 transition-colors">
                      {svc.title}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-warmGray leading-relaxed">
                    {svc.desc}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between text-xs text-warmGray/80">
                  <span className="text-[11px] font-medium text-gold-400/90">{svc.highlight}</span>
                  <button
                    onClick={() => scrollToSection('loan-enquiry-form')}
                    className="text-white hover:text-gold-400 font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                  >
                    <span>Inquire</span>
                    <ArrowRight className="w-3.5 h-3.5 text-gold-400" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. HOW IT WORKS */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-charcoal-950 border-t border-b border-white/10">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-widest text-gold-400 block mb-2">STREAMLINED 5-STEP JOURNEY</span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-white tracking-tight">
              How It Works
            </h2>
            <p className="mt-4 text-sm sm:text-base text-warmGray leading-relaxed">
              A transparent, well-coordinated roadmap designed to remove ambiguity from property financing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {steps.map((step) => (
              <div 
                key={step.number}
                className="p-6 rounded bg-charcoal-850 border border-white/5 relative space-y-3 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-serif text-2xl font-bold text-gold-400 font-mono">
                      {step.number}
                    </span>
                    <span className="w-2 h-2 rounded-full bg-cyanBrand" />
                  </div>
                  <h3 className="font-serif text-base font-bold text-white mb-2 leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-xs text-warmGray leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Statutory Lender Determination Notice */}
          <div className="mt-12 p-5 rounded-sm bg-charcoal-900 border border-gold-500/20 max-w-4xl mx-auto flex items-start gap-3.5">
            <HelpCircle className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
            <div className="space-y-1 text-xs text-warmGray leading-relaxed">
              <span className="font-semibold text-white uppercase tracking-wider block">Important Regulatory Notice:</span>
              <p>
                KLOUD REALTY acts solely as a professional advisory and liaison facilitator. Final loan eligibility, interest rates, sanctioned loan amounts, processing fees, approval, and disbursement decisions are determined solely by the respective financial institution or lending bank in accordance with their internal credit and regulatory underwriting guidelines.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 4. HOME LOAN ENQUIRY FORM */}
      <section id="loan-enquiry-form" className="py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="rounded-sm bg-charcoal-850 border border-gold-500/35 p-6 sm:p-10 shadow-2xl relative">
          
          <div className="text-center max-w-2xl mx-auto mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-semibold uppercase tracking-widest mb-2">
              <span>Personalised Financial Evaluation</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-light text-white">
              Home Loan Assistance Enquiry Form
            </h2>
            <p className="text-xs sm:text-sm text-warmGray mt-2">
              Share your financing preferences below. A KLOUD REALTY mortgage specialist will connect with tailored guidance.
            </p>
          </div>

          {submittedLeadId ? (
            <div className="text-center py-10 space-y-4 animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-2xl font-light text-white">
                Enquiry Successfully Submitted
              </h3>
              <p className="text-xs sm:text-sm text-warmGray max-w-md mx-auto">
                Thank you, <strong className="text-white">{fullName}</strong>. Your home-loan assistance enquiry has been transmitted directly to Abhishek Gupta at KLOUD REALTY.
              </p>
              
              <div className="p-4 rounded bg-charcoal-900 border border-gold-500/30 max-w-xs mx-auto">
                <span className="text-[10px] uppercase tracking-widest text-warmGray block">Reference Number</span>
                <span className="font-mono text-lg font-bold text-gold-400">{submittedLeadId}</span>
              </div>

              <p className="text-xs text-warmGray">
                We have also dispatched an official acknowledgment email to <span className="text-white font-mono">{email}</span>.
              </p>

              <button
                type="button"
                onClick={() => {
                  setSubmittedLeadId(null);
                  setRequiredLoanAmount('');
                  setApproxPropertyValue('');
                  setAdditionalMessage('');
                }}
                className="mt-4 px-6 py-2.5 rounded border border-white/20 text-xs uppercase tracking-wider text-softWhite hover:border-gold-500 hover:text-gold-400 transition-colors"
              >
                Submit Another Enquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              
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
                <div className="p-3.5 rounded bg-red-950/60 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Row 1: Contact Details */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs text-warmGray font-medium mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full px-3.5 py-2.5 bg-charcoal-900 border border-white/10 rounded text-xs text-white placeholder-warmGray/50 focus:border-gold-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs text-warmGray font-medium mb-1">Mobile Number *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 98200 88880"
                    className="w-full px-3.5 py-2.5 bg-charcoal-900 border border-white/10 rounded text-xs text-white placeholder-warmGray/50 focus:border-gold-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs text-warmGray font-medium mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. rahul@example.com"
                    className="w-full px-3.5 py-2.5 bg-charcoal-900 border border-white/10 rounded text-xs text-white placeholder-warmGray/50 focus:border-gold-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Row 2: Employment & Property Type */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs text-warmGray font-medium mb-1">Employment Type *</label>
                  <select
                    value={employmentType}
                    onChange={(e) => setEmploymentType(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 bg-charcoal-900 border border-white/10 rounded text-xs text-white focus:border-gold-500 focus:outline-none"
                  >
                    <option value="Salaried">Salaried (Corporate / Professional)</option>
                    <option value="Self-employed">Self-employed (Business / Practice)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-warmGray font-medium mb-1">Property Type</label>
                  <select
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-charcoal-900 border border-white/10 rounded text-xs text-white focus:border-gold-500 focus:outline-none"
                  >
                    <option value="Apartment / Flat">Apartment / Flat (Primary / Resale)</option>
                    <option value="Penthouse">Penthouse / Sky Residence</option>
                    <option value="Villa / Second Home">Villa / Second Home</option>
                    <option value="Plot / Land Parcel">Plot / Land Parcel</option>
                    <option value="Commercial Property">Commercial Property</option>
                    <option value="Loan Against Property">Loan Against Existing Property</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-warmGray font-medium mb-1">Property Location</label>
                  <input
                    type="text"
                    value={propertyLocation}
                    onChange={(e) => setPropertyLocation(e.target.value)}
                    placeholder="e.g. Worli, Byculla, Karjat, etc."
                    className="w-full px-3.5 py-2.5 bg-charcoal-900 border border-white/10 rounded text-xs text-white placeholder-warmGray/50 focus:border-gold-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Row 3: Financial Figures & Callback */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs text-warmGray font-medium mb-1">Approx. Property Value</label>
                  <input
                    type="text"
                    value={approxPropertyValue}
                    onChange={(e) => setApproxPropertyValue(e.target.value)}
                    placeholder="e.g. ₹3.5 Crore"
                    className="w-full px-3.5 py-2.5 bg-charcoal-900 border border-white/10 rounded text-xs text-white placeholder-warmGray/50 focus:border-gold-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs text-warmGray font-medium mb-1">Required Loan Amount *</label>
                  <input
                    type="text"
                    required
                    value={requiredLoanAmount}
                    onChange={(e) => setRequiredLoanAmount(e.target.value)}
                    placeholder="e.g. ₹2.5 Crore"
                    className="w-full px-3.5 py-2.5 bg-charcoal-900 border border-white/10 rounded text-xs text-white placeholder-warmGray/50 focus:border-gold-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs text-warmGray font-medium mb-1">Existing Loan Obligations (Optional)</label>
                  <input
                    type="text"
                    value={existingLoanObligations}
                    onChange={(e) => setExistingLoanObligations(e.target.value)}
                    placeholder="e.g. None or ₹50,000 / mo"
                    className="w-full px-3.5 py-2.5 bg-charcoal-900 border border-white/10 rounded text-xs text-white placeholder-warmGray/50 focus:border-gold-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Row 4: Callback Time & Message */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs text-warmGray font-medium mb-1">Preferred Callback Time</label>
                  <select
                    value={preferredCallbackTime}
                    onChange={(e) => setPreferredCallbackTime(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-charcoal-900 border border-white/10 rounded text-xs text-white focus:border-gold-500 focus:outline-none"
                  >
                    <option value="Morning (9 AM – 12 PM)">Morning (9 AM – 12 PM)</option>
                    <option value="Afternoon (12 PM – 4 PM)">Afternoon (12 PM – 4 PM)</option>
                    <option value="Evening (4 PM – 8 PM)">Evening (4 PM – 8 PM)</option>
                    <option value="Anytime during office hours">Anytime during office hours</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs text-warmGray font-medium mb-1">Additional Message / Query (Optional)</label>
                  <input
                    type="text"
                    value={additionalMessage}
                    onChange={(e) => setAdditionalMessage(e.target.value)}
                    placeholder="Any specific bank preference, tenure expectations, or co-applicant notes"
                    className="w-full px-3.5 py-2.5 bg-charcoal-900 border border-white/10 rounded text-xs text-white placeholder-warmGray/50 focus:border-gold-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Consent Checkbox */}
              <div className="pt-2">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={consentChecked}
                    onChange={(e) => setConsentChecked(e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded border-gold-500 text-gold-500 focus:ring-gold-500 bg-charcoal-900 shrink-0"
                  />
                  <span className="text-xs text-warmGray leading-relaxed">
                    I consent to being contacted regarding my home-loan enquiry and understand that my information may be shared with relevant authorised lending partners only with my consent. *
                  </span>
                </label>
              </div>

              {/* Submit CTA */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10">
                <div className="flex items-center gap-2 text-[11px] text-warmGray">
                  <ShieldCheck className="w-4 h-4 text-cyanBrand" />
                  <span>Strict confidentiality • Direct advisor follow-up</span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-8 py-3.5 rounded bg-gold-500 text-charcoal-950 font-bold text-xs uppercase tracking-wider hover:bg-gold-400 transition-all shadow-gold-glow flex items-center justify-center gap-2"
                >
                  <span>{isSubmitting ? 'Submitting Enquiry...' : 'SUBMIT HOME LOAN ENQUIRY'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </form>
          )}

        </div>
      </section>

      {/* 5. FOOTER ASSURANCE */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-white/10 bg-charcoal-950 text-center">
        <div className="max-w-3xl mx-auto space-y-3">
          <h3 className="font-serif text-xl sm:text-2xl font-light text-white">
            Need Immediate Financial Guidance?
          </h3>
          <p className="text-xs sm:text-sm text-warmGray">
            Speak directly with Abhishek Gupta at KLOUD REALTY to discuss financing feasibility for upcoming acquisitions.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <a 
              href="tel:8655588880"
              className="px-6 py-2.5 rounded bg-charcoal-850 border border-gold-500/40 text-gold-400 text-xs font-semibold uppercase tracking-wider hover:bg-gold-500 hover:text-charcoal-950 transition-colors"
            >
              📞 Call 86-555-88880
            </a>
            <a 
              href="mailto:kloudrealty@gmail.com"
              className="px-6 py-2.5 rounded border border-white/20 text-softWhite text-xs font-medium hover:border-gold-500 transition-colors font-mono"
            >
              kloudrealty@gmail.com
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};
