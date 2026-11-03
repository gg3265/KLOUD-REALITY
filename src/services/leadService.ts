import { Lead, LeadSource, ServiceVertical, ContactMethod, LeadStatus } from '../types';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { emailService } from './emailService';

const LOCAL_STORAGE_LEADS_KEY = 'kloud_realty_leads_v1';

// Generate authentic enquiry ID
export function generateEnquiryId(prefix: string = 'KR'): string {
  const year = new Date().getFullYear();
  const randomSuffix = Math.floor(10000 + Math.random() * 90000);
  return `${prefix}-${year}-${randomSuffix}`;
}

export interface CreateLeadInput {
  fullName: string;
  phone: string;
  email: string;
  enquirySource: LeadSource;
  serviceVertical: ServiceVertical;
  preferredLocation?: string;
  budgetRange?: string;
  preferredContactMethod?: ContactMethod;
  propertyId?: string;
  propertyTitle?: string;
  message?: string;
  propertyRequirement?: string;
  roleInSociety?: string;
  buildingAge?: string;
  numberOfUnits?: string;
  // Finance & Home Loan
  employmentType?: 'Salaried' | 'Self-employed';
  approxPropertyValue?: string;
  requiredLoanAmount?: string;
  existingLoanObligations?: string;
  preferredCallbackTime?: string;
  // Client Registration
  dateOfBirth?: string;
  whatsappNumber?: string;
  residentialAddress?: string;
  cityPin?: string;
  panNumber?: string;
  purposeOfEngagement?: string[];
  preferredTimeline?: string;
  acceptedFeeTerms?: boolean;
}

export interface SubmissionResult {
  success: boolean;
  leadId?: string;
  error?: string;
  isBackendConnected: boolean;
}

// Initial demonstration leads so admin CRM is immediately interactive and functional
const defaultDemoLeads: Lead[] = [
  {
    id: 'KR-2026-18492',
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    fullName: 'Vikramaditya Singhania',
    phone: '98201-99882',
    email: 'v.singhania@apexcapital.in',
    enquirySource: 'Property Details',
    serviceVertical: 'Primary Market',
    preferredLocation: 'Mazgaon / South Mumbai',
    budgetRange: 'Above ₹5 Crore',
    preferredContactMethod: 'WhatsApp',
    propertyId: 'prop-demo-01',
    propertyTitle: 'The Harbour Crest Tower',
    message: 'Requesting a private presentation and floor plans for the higher floor 3 BHK harbour facing inventory.',
    propertyRequirement: 'Buy a New Property (Primary Market)',
    leadStatus: 'Qualified',
    assignedTo: 'Abhishek Gupta',
    notes: ['Spoke on WhatsApp. Client is keen on 25th floor or above. Site visit coordinated for Saturday.'],
    consentStatus: true
  },
  {
    id: 'KR-2026-29104',
    createdAt: new Date(Date.now() - 3600000 * 18).toISOString(),
    fullName: 'Farhan Merchant',
    phone: '98190-44221',
    email: 'merchant.farhan@gmail.com',
    enquirySource: 'Entry Modal',
    serviceVertical: 'Secondary Market',
    propertyRequirement: 'Buy a Resale Property',
    preferredLocation: 'Mazgaon',
    budgetRange: '₹2–₹5 Crore',
    preferredContactMethod: 'Phone Call',
    message: 'Looking for a verified resale 3 BHK in Mazgaon or Byculla East with immediate occupancy.',
    leadStatus: 'New',
    assignedTo: 'Abhishek Gupta',
    notes: [],
    consentStatus: true
  },
  {
    id: 'KR-2026-30481',
    createdAt: new Date(Date.now() - 3600000 * 36).toISOString(),
    fullName: 'Shirish Joshi (Secretary, Silver Arch CHS)',
    phone: '98210-55732',
    email: 'silverarch.secretary@gmail.com',
    enquirySource: 'Redevelopment',
    serviceVertical: 'Redevelopment Consulting',
    propertyRequirement: 'Consultancy for Redevelopment',
    preferredLocation: 'Mazgaon, Mumbai',
    budgetRange: 'Not Decided Yet',
    preferredContactMethod: 'Phone Call',
    roleInSociety: 'Society Committee Representative',
    buildingAge: '42 Years',
    numberOfUnits: '28 Flats (G+4)',
    message: 'Our housing society general body passed a resolution to explore redevelopment feasibility. We would like an initial advisory discussion on the procedure.',
    leadStatus: 'Site Visit Scheduled',
    assignedTo: 'Abhishek Gupta',
    notes: ['Preliminary meeting held. Requested building layout and DP remark copies.'],
    consentStatus: true
  }
];

export const leadService = {
  getBackendStatus(): { isConnected: boolean; provider: string } {
    return {
      isConnected: isSupabaseConfigured,
      provider: isSupabaseConfigured ? 'Supabase Database (Live)' : 'Persistent Local Database (Active)'
    };
  },

  getAllLeads(): Lead[] {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_LEADS_KEY);
      if (!stored) {
        localStorage.setItem(LOCAL_STORAGE_LEADS_KEY, JSON.stringify(defaultDemoLeads));
        return defaultDemoLeads;
      }
      return JSON.parse(stored);
    } catch {
      return defaultDemoLeads;
    }
  },

  async createLead(input: CreateLeadInput): Promise<SubmissionResult> {
    // Client-side validation
    if (!input.fullName || input.fullName.trim().length < 2) {
      return { success: false, error: 'Please enter your full name.', isBackendConnected: isSupabaseConfigured };
    }
    const cleanPhone = input.phone.replace(/[\s-]/g, '');
    if (!cleanPhone || cleanPhone.length < 8) {
      return { success: false, error: 'Please enter a valid telephone or mobile number.', isBackendConnected: isSupabaseConfigured };
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!input.email || !emailRegex.test(input.email.trim())) {
      return { success: false, error: 'Please provide a valid email address.', isBackendConnected: isSupabaseConfigured };
    }

    // Anti-duplicate protection: check for identical submission in last 120 seconds
    const existingLeads = this.getAllLeads();
    const twoMinutesAgo = Date.now() - 120000;
    const isDuplicate = existingLeads.find(l => {
      const isSameClient = (l.phone === input.phone.trim() || l.email === input.email.trim().toLowerCase());
      const isRecent = new Date(l.createdAt).getTime() > twoMinutesAgo;
      const isSameVertical = l.serviceVertical === input.serviceVertical;
      return isSameClient && isRecent && isSameVertical;
    });

    if (isDuplicate) {
      return {
        success: true,
        leadId: isDuplicate.id,
        isBackendConnected: isSupabaseConfigured
      };
    }

    const prefix = input.serviceVertical === 'Finance & Home Loan' ? 'KR-HL' : (input.serviceVertical === 'Client Registration' ? 'KR-REG' : 'KR');
    const leadId = generateEnquiryId(prefix);

    const newLead: Lead = {
      id: leadId,
      createdAt: new Date().toISOString(),
      fullName: input.fullName.trim(),
      phone: input.phone.trim(),
      email: input.email.trim().toLowerCase(),
      enquirySource: input.enquirySource,
      serviceVertical: input.serviceVertical,
      preferredLocation: input.preferredLocation?.trim() || 'Mazgaon / Mumbai',
      budgetRange: input.budgetRange || 'Not Decided Yet',
      preferredContactMethod: input.preferredContactMethod || 'Phone Call',
      propertyId: input.propertyId,
      propertyTitle: input.propertyTitle,
      message: input.message?.trim(),
      leadStatus: 'New',
      assignedTo: 'Abhishek Gupta',
      notes: [],
      consentStatus: true,
      propertyRequirement: input.propertyRequirement,
      roleInSociety: input.roleInSociety,
      buildingAge: input.buildingAge,
      numberOfUnits: input.numberOfUnits,
      employmentType: input.employmentType,
      approxPropertyValue: input.approxPropertyValue,
      requiredLoanAmount: input.requiredLoanAmount,
      existingLoanObligations: input.existingLoanObligations,
      preferredCallbackTime: input.preferredCallbackTime,
      dateOfBirth: input.dateOfBirth,
      whatsappNumber: input.whatsappNumber,
      residentialAddress: input.residentialAddress,
      cityPin: input.cityPin,
      panNumber: input.panNumber,
      purposeOfEngagement: input.purposeOfEngagement,
      preferredTimeline: input.preferredTimeline,
      acceptedFeeTerms: input.acceptedFeeTerms
    };

    // 1. Try Supabase if configured
    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase.from('leads').insert([{
          id: newLead.id,
          created_at: newLead.createdAt,
          full_name: newLead.fullName,
          phone: newLead.phone,
          email: newLead.email,
          enquiry_source: newLead.enquirySource,
          service_vertical: newLead.serviceVertical,
          preferred_location: newLead.preferredLocation,
          budget_range: newLead.budgetRange,
          preferred_contact_method: newLead.preferredContactMethod,
          property_id: newLead.propertyId,
          property_title: newLead.propertyTitle,
          message: newLead.message,
          lead_status: newLead.leadStatus,
          assigned_to: newLead.assignedTo,
          notes: newLead.notes,
          consent_status: newLead.consentStatus,
          role_in_society: newLead.roleInSociety,
          building_age: newLead.buildingAge,
          number_of_units: newLead.numberOfUnits,
          employment_type: newLead.employmentType,
          approx_property_value: newLead.approxPropertyValue,
          required_loan_amount: newLead.requiredLoanAmount,
          existing_loan_obligations: newLead.existingLoanObligations,
          preferred_callback_time: newLead.preferredCallbackTime,
          residential_address: newLead.residentialAddress,
          city_pin: newLead.cityPin,
          pan_number: newLead.panNumber,
          purpose_of_engagement: newLead.purposeOfEngagement,
          accepted_fee_terms: newLead.acceptedFeeTerms
        }]);

        if (error) {
          console.warn('Supabase insert failed, falling back to local persistent store:', error.message);
          this.saveLocalLead(newLead);
        } else {
          // Keep local store in sync
          this.saveLocalLead(newLead);
        }
      } catch (err) {
        console.warn('Supabase network issue, falling back to local storage:', err);
        this.saveLocalLead(newLead);
      }
    } else {
      // Local persistent storage
      this.saveLocalLead(newLead);
    }

    // 2. Trigger notification & confirmation email engine
    emailService.sendNotificationAndAcknowledgment(newLead).catch((err) => {
      console.warn('Email dispatch notice:', err);
    });

    return {
      success: true,
      leadId,
      isBackendConnected: isSupabaseConfigured
    };
  },

  saveLocalLead(lead: Lead): void {
    const existing = this.getAllLeads();
    const updated = [lead, ...existing.filter(l => l.id !== lead.id)];
    localStorage.setItem(LOCAL_STORAGE_LEADS_KEY, JSON.stringify(updated));
  },

  updateLeadStatus(leadId: string, status: LeadStatus): boolean {
    const leads = this.getAllLeads();
    const target = leads.find(l => l.id === leadId);
    if (!target) return false;
    target.leadStatus = status;
    localStorage.setItem(LOCAL_STORAGE_LEADS_KEY, JSON.stringify(leads));
    return true;
  },

  addInternalNote(leadId: string, note: string): boolean {
    if (!note.trim()) return false;
    const leads = this.getAllLeads();
    const target = leads.find(l => l.id === leadId);
    if (!target) return false;
    if (!target.notes) target.notes = [];
    const stamped = `[${new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}] ${note.trim()}`;
    target.notes.push(stamped);
    localStorage.setItem(LOCAL_STORAGE_LEADS_KEY, JSON.stringify(leads));
    return true;
  },

  exportToCSV(): string {
    const leads = this.getAllLeads();
    const headers = [
      'Enquiry ID',
      'Date & Time',
      'Full Name',
      'Phone',
      'Email',
      'Source',
      'Vertical',
      'Location',
      'Budget',
      'Contact Method',
      'Property Title',
      'Status',
      'Employment Type',
      'Property Value',
      'Loan Required',
      'Callback Time',
      'Address',
      'City/PIN',
      'PAN',
      'Assigned To',
      'Message'
    ];

    const rows = leads.map(l => [
      l.id,
      new Date(l.createdAt).toLocaleString('en-IN'),
      `"${l.fullName.replace(/"/g, '""')}"`,
      `"${l.phone}"`,
      `"${l.email}"`,
      `"${l.enquirySource}"`,
      `"${l.serviceVertical}"`,
      `"${(l.preferredLocation || '').replace(/"/g, '""')}"`,
      `"${l.budgetRange || ''}"`,
      `"${l.preferredContactMethod || ''}"`,
      `"${(l.propertyTitle || 'N/A').replace(/"/g, '""')}"`,
      `"${l.leadStatus}"`,
      `"${l.employmentType || 'N/A'}"`,
      `"${l.approxPropertyValue || 'N/A'}"`,
      `"${l.requiredLoanAmount || 'N/A'}"`,
      `"${l.preferredCallbackTime || 'N/A'}"`,
      `"${(l.residentialAddress || 'N/A').replace(/"/g, '""')}"`,
      `"${l.cityPin || 'N/A'}"`,
      `"${l.panNumber || 'N/A'}"`,
      `"${l.assignedTo || 'Unassigned'}"`,
      `"${(l.message || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    return csvContent;
  },

  logNotification(lead: Lead): void {
    console.info(`[KLOUD REALTY NOTIFICATION] Lead ${lead.id} received from ${lead.fullName} (${lead.phone}) for ${lead.serviceVertical}. Sent notification to kloudrealty@gmail.com.`);
  }
};
