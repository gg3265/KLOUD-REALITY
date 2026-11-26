import { Lead } from '../types';

export interface EmailDispatchRecord {
  id: string;
  leadId: string;
  recipient: string;
  clientEmail?: string;
  subject: string;
  enquiryType: string;
  status: 'SENT' | 'SIMULATED' | 'FAILED';
  timestamp: string;
  ownerHtmlSnippet: string;
  clientHtmlSnippet: string;
  error?: string;
}

const LOCAL_STORAGE_OUTBOX_KEY = 'kloud_realty_email_outbox_v1';
export const OWNER_DESIGNATED_EMAIL = 'kloudrealty@gmail.com';

/**
 * Mask PAN number for privacy in emails while keeping full value in database
 * Example: ABCDE1234F -> ABCDE••••F
 */
export function maskPan(pan?: string): string {
  if (!pan || !pan.trim()) return 'Not provided';
  const clean = pan.trim().toUpperCase();
  if (clean.length === 10) {
    return `${clean.slice(0, 5)}••••${clean.slice(9)}`;
  }
  if (clean.length > 4) {
    return `${clean.slice(0, 2)}${'•'.repeat(Math.max(4, clean.length - 4))}${clean.slice(-2)}`;
  }
  return '••••••';
}

/**
 * Mask Date of Birth for privacy in emails while keeping full value in database
 * Example: 1988-05-14 -> ••/••/1988, 14/05/1988 -> ••/••/1988
 */
export function maskDob(dob?: string): string {
  if (!dob || !dob.trim()) return 'Not provided';
  const clean = dob.trim();
  if (/^\d{4}-\d{2}-\d{2}$/.test(clean)) {
    const parts = clean.split('-');
    return `••/••/${parts[0]}`;
  }
  if (/^\d{2}[/-]\d{2}[/-]\d{4}$/.test(clean)) {
    const year = clean.slice(-4);
    return `••/••/${year}`;
  }
  const yearMatch = clean.match(/\d{4}/);
  if (yearMatch) {
    return `••/••/${yearMatch[0]}`;
  }
  return '••/••/••••';
}

export const emailService = {
  getOwnerEmail(): string {
    return OWNER_DESIGNATED_EMAIL;
  },

  getAllDispatches(): EmailDispatchRecord[] {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_OUTBOX_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  },

  saveDispatchRecord(record: EmailDispatchRecord): void {
    const existing = this.getAllDispatches();
    const updated = [record, ...existing.slice(0, 49)]; // keep latest 50
    localStorage.setItem(LOCAL_STORAGE_OUTBOX_KEY, JSON.stringify(updated));
  },

  clearDispatches(): void {
    try {
      localStorage.removeItem(LOCAL_STORAGE_OUTBOX_KEY);
    } catch {}
  },

  /**
   * Generates exact subject lines matching client specification:
   * - NEW PROPERTY ENQUIRY — [Project Name] — [Lead ID]
   * - NEW SITE VISIT REQUEST — [Project Name] — [Lead ID]
   * - NEW CLIENT REGISTRATION — [Lead ID]
   * - NEW HOME LOAN ENQUIRY — [Lead ID]
   * - NEW LAND CONSULTATION — [Lead ID]
   * - NEW REDEVELOPMENT ENQUIRY — [Lead ID]
   * - NEW GENERAL CONSULTATION — [Lead ID]
   * - NEW PROPERTY SEARCH — [Lead ID]
   */
  getSubjectLine(lead: Lead): string {
    const leadId = lead.id;

    // 1. Site Visit Request with Project
    if (lead.isSiteVisit && lead.propertyTitle) {
      return `NEW SITE VISIT REQUEST — ${lead.propertyTitle.trim()} — ${leadId}`;
    }

    // 2. Property Enquiry with Project
    if (lead.propertyTitle && (lead.serviceVertical === 'Primary Market' || lead.serviceVertical === 'Secondary Market' || lead.serviceVertical === 'Rental' || lead.enquirySource === 'Property Details')) {
      return `NEW PROPERTY ENQUIRY — ${lead.propertyTitle.trim()} — ${leadId}`;
    }

    // 3. Client Registration
    if (lead.serviceVertical === 'Client Registration' || lead.enquirySource === 'Registration Form') {
      return `NEW CLIENT REGISTRATION — ${leadId}`;
    }

    // 4. Home Loan Enquiry
    if (lead.serviceVertical === 'Finance & Home Loan' || lead.enquirySource === 'Finance Page') {
      return `NEW HOME LOAN ENQUIRY — ${leadId}`;
    }

    // 5. Land Consultation
    if (lead.serviceVertical === 'Second Homes & Land' || lead.enquirySource === 'Land') {
      return `NEW LAND CONSULTATION — ${leadId}`;
    }

    // 6. Redevelopment Enquiry
    if (lead.serviceVertical === 'Redevelopment Consulting' || lead.enquirySource === 'Redevelopment') {
      return `NEW REDEVELOPMENT ENQUIRY — ${leadId}`;
    }

    // 7. Property Search Interest
    if (lead.serviceVertical === 'Property Search Interest' || lead.enquirySource === 'Property Search') {
      return `NEW PROPERTY SEARCH — ${leadId}`;
    }

    // 8. General Consultation / Entry Popup / Other
    return `NEW GENERAL CONSULTATION — ${leadId}`;
  },

  /**
   * Helper to format values with 'Not provided' fallback
   */
  formatField(val: any, fallback = 'Not provided'): string {
    if (val === undefined || val === null || val === '' || val === false) return fallback;
    if (Array.isArray(val)) return val.length > 0 ? val.join(', ') : fallback;
    const str = String(val).trim();
    return str || fallback;
  },

  /**
   * Generates a luxury, dark-themed responsive HTML notification for the consultancy owner
   * Structured with Sections A through F
   */
  generateOwnerEmailHtml(lead: Lead): string {
    const timeFormatted = new Date(lead.createdAt).toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'full',
      timeStyle: 'medium'
    });

    const isLoan = lead.serviceVertical === 'Finance & Home Loan';
    const isReg = lead.serviceVertical === 'Client Registration';
    const isRedev = lead.serviceVertical === 'Redevelopment Consulting';
    const isSearch = lead.serviceVertical === 'Property Search Interest' || lead.enquirySource === 'Property Search';
    const hasProject = Boolean(lead.propertyTitle || lead.developerName || lead.propertyId);
    const subject = this.getSubjectLine(lead);
    const cleanPhone = (lead.phone || '').replace(/[^0-9+]/g, '');
    const hasCallablePhone = Boolean(cleanPhone && cleanPhone.length >= 8);
    const cleanWa = (lead.whatsappNumber || lead.phone || '').replace(/[^0-9]/g, '').slice(-10);
    const hasValidEmail = lead.email && lead.email.toLowerCase() !== 'not provided' && lead.email.includes('@');

    const maskedPanVal = maskPan(lead.panNumber);
    const maskedDobVal = maskDob(lead.dateOfBirth);

    return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${subject}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #080c14; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #f3f4f6;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #080c14; padding: 30px 15px;">
    <tr>
      <td align="center">
        <table width="640" cellpadding="0" cellspacing="0" style="max-width: 640px; width: 100%; background-color: #121824; border: 1px solid rgba(200, 164, 93, 0.45); border-radius: 8px; overflow: hidden; box-shadow: 0 12px 35px rgba(0,0,0,0.6);">
          
          <!-- Brand Header Banner -->
          <tr>
            <td style="padding: 24px 32px; background: linear-gradient(135deg, #182232 0%, #0d131d 100%); border-bottom: 2px solid #C8A45D;">
              <table width="100%">
                <tr>
                  <td>
                    <h1 style="margin: 0; font-size: 22px; font-weight: 700; color: #C8A45D; letter-spacing: 1.5px;">
                      KLOUD <span style="color: #01B6E5;">REALTY</span>
                    </h1>
                    <p style="margin: 4px 0 0 0; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: #9ca3af;">
                      The Place to Find Your Place • Mazgaon, Mumbai
                    </p>
                  </td>
                  <td align="right">
                    <span style="display: inline-block; padding: 5px 12px; background-color: rgba(200, 164, 93, 0.15); border: 1px solid rgba(200, 164, 93, 0.4); color: #e5c57a; font-size: 11.5px; font-weight: 700; border-radius: 4px; font-family: monospace;">
                      ${lead.id}
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Notification Title Banner -->
          <tr>
            <td style="padding: 24px 32px 14px 32px;">
              <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; color: #C8A45D; font-weight: 700; margin-bottom: 6px;">
                KLOUD REALTY — LEAD NOTIFICATION DISPATCH
              </div>
              <h2 style="margin: 0 0 8px 0; font-size: 19px; color: #ffffff; font-weight: 600; line-height: 1.35;">
                ${subject}
              </h2>
              <p style="margin: 0; font-size: 12.5px; color: #9ca3af; line-height: 1.5;">
                A new customer enquiry was submitted on the website. Full visitor details and requirements are structured below for your direct advisory action.
              </p>
            </td>
          </tr>

          <!-- ============================================== -->
          <!-- SECTION A: VISITOR DETAILS                    -->
          <!-- ============================================== -->
          <tr>
            <td style="padding: 14px 32px 10px 32px;">
              <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 1.2px; color: #01B6E5; font-weight: 700; margin-bottom: 8px;">
                SECTION A: VISITOR DETAILS
              </div>
              <table width="100%" cellpadding="8" cellspacing="0" style="background-color: #0b1019; border-radius: 6px; border: 1px solid #1f293d; font-size: 13px;">
                <tr>
                  <td width="38%" style="color: #9ca3af; border-bottom: 1px solid #1a2233; font-weight: 500;">Full Name</td>
                  <td style="color: #ffffff; font-weight: 700; border-bottom: 1px solid #1a2233;">${lead.fullName}</td>
                </tr>
                <tr>
                  <td style="color: #9ca3af; border-bottom: 1px solid #1a2233; font-weight: 500;">Mobile Number</td>
                  <td style="color: #ffffff; border-bottom: 1px solid #1a2233;">
                    ${hasCallablePhone ? `<a href="tel:${cleanPhone}" style="color: #C8A45D; text-decoration: none; font-weight: 700;">${lead.phone}</a>` : `<span style="color: #9ca3af;">${lead.phone}</span>`}
                  </td>
                </tr>
                <tr>
                  <td style="color: #9ca3af; border-bottom: 1px solid #1a2233; font-weight: 500;">WhatsApp Number</td>
                  <td style="color: #ffffff; border-bottom: 1px solid #1a2233;">
                    ${lead.whatsappNumber && cleanWa ? `<a href="https://wa.me/91${cleanWa}" style="color: #10B981; text-decoration: none; font-weight: 600;">${lead.whatsappNumber}</a>` : (hasCallablePhone ? `<span style="color: #9ca3af;">Same as Mobile (${lead.phone})</span>` : '<span style="color: #6b7280; font-style: italic;">Not provided</span>')}
                  </td>
                </tr>
                <tr>
                  <td style="color: #9ca3af; border-bottom: 1px solid #1a2233; font-weight: 500;">Email Address</td>
                  <td style="color: #ffffff; border-bottom: 1px solid #1a2233;">
                    ${hasValidEmail ? `<a href="mailto:${lead.email}" style="color: #C8A45D; text-decoration: none;">${lead.email}</a>` : '<span style="color: #6b7280; font-style: italic;">Not provided</span>'}
                  </td>
                </tr>
                <tr>
                  <td style="color: #9ca3af; border-bottom: 1px solid #1a2233; font-weight: 500;">Preferred Contact Method</td>
                  <td style="color: #ffffff; border-bottom: 1px solid #1a2233;">${lead.preferredContactMethod || 'Phone Call'}</td>
                </tr>
                ${lead.residentialAddress ? `
                <tr>
                  <td style="color: #9ca3af; border-bottom: 1px solid #1a2233; font-weight: 500;">Residential Address</td>
                  <td style="color: #ffffff; border-bottom: 1px solid #1a2233;">${lead.residentialAddress}</td>
                </tr>
                ` : ''}
                ${lead.cityPin ? `
                <tr>
                  <td style="color: #9ca3af; border-bottom: 1px solid #1a2233; font-weight: 500;">City & PIN Code</td>
                  <td style="color: #ffffff; border-bottom: 1px solid #1a2233;">${lead.cityPin}</td>
                </tr>
                ` : ''}
                ${lead.panNumber ? `
                <tr>
                  <td style="color: #9ca3af; border-bottom: 1px solid #1a2233; font-weight: 500;">PAN Number</td>
                  <td style="color: #ffffff; border-bottom: 1px solid #1a2233; font-family: monospace;">
                    <span style="letter-spacing: 2px; color: #10B981; font-weight: 700;">${maskedPanVal}</span>
                    <span style="font-size: 11px; color: #9ca3af; margin-left: 8px;">(Protected in Database)</span>
                  </td>
                </tr>
                ` : ''}
                ${lead.dateOfBirth ? `
                <tr>
                  <td style="color: #9ca3af; font-weight: 500;">Date of Birth</td>
                  <td style="color: #ffffff;">
                    <span style="letter-spacing: 1.5px; color: #10B981; font-weight: 700;">${maskedDobVal}</span>
                    <span style="font-size: 11px; color: #9ca3af; margin-left: 8px;">(Protected in Database)</span>
                  </td>
                </tr>
                ` : ''}
              </table>
            </td>
          </tr>

          <!-- ============================================== -->
          <!-- SECTION B: ENQUIRY DETAILS                    -->
          <!-- ============================================== -->
          <tr>
            <td style="padding: 14px 32px 10px 32px;">
              <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 1.2px; color: #C8A45D; font-weight: 700; margin-bottom: 8px;">
                SECTION B: ENQUIRY DETAILS
              </div>
              <table width="100%" cellpadding="8" cellspacing="0" style="background-color: #0b1019; border-radius: 6px; border: 1px solid #1f293d; font-size: 13px;">
                <tr>
                  <td width="38%" style="color: #9ca3af; border-bottom: 1px solid #1a2233; font-weight: 500;">Lead Reference ID</td>
                  <td style="color: #e5c57a; font-family: monospace; font-weight: 700; border-bottom: 1px solid #1a2233;">${lead.id}</td>
                </tr>
                <tr>
                  <td style="color: #9ca3af; border-bottom: 1px solid #1a2233; font-weight: 500;">Enquiry Category</td>
                  <td style="color: #01B6E5; font-weight: 600; border-bottom: 1px solid #1a2233;">${lead.serviceVertical}</td>
                </tr>
                <tr>
                  <td style="color: #9ca3af; border-bottom: 1px solid #1a2233; font-weight: 500;">Request Type</td>
                  <td style="color: ${lead.isSiteVisit ? '#10B981' : '#ffffff'}; font-weight: 600; border-bottom: 1px solid #1a2233;">
                    ${lead.isSiteVisit ? '🎯 Priority Site Visit Request' : '📋 General Property Enquiry / Consultation'}
                  </td>
                </tr>
                <tr>
                  <td style="color: #9ca3af; border-bottom: 1px solid #1a2233; font-weight: 500;">Engagement Objective / Purpose</td>
                  <td style="color: #ffffff; border-bottom: 1px solid #1a2233;">
                    ${this.formatField(lead.propertyRequirement || lead.purposeOfEngagement || lead.serviceVertical)}
                  </td>
                </tr>
                ${lead.preferredTimeline ? `
                <tr>
                  <td style="color: #9ca3af; border-bottom: 1px solid #1a2233; font-weight: 500;">Preferred Timeline</td>
                  <td style="color: #ffffff; border-bottom: 1px solid #1a2233;">${lead.preferredTimeline}</td>
                </tr>
                ` : ''}
                ${isLoan ? `
                <tr>
                  <td style="color: #9ca3af; border-bottom: 1px solid #1a2233; font-weight: 500;">Employment Profile</td>
                  <td style="color: #ffffff; border-bottom: 1px solid #1a2233;">${this.formatField(lead.employmentType)}</td>
                </tr>
                <tr>
                  <td style="color: #9ca3af; border-bottom: 1px solid #1a2233; font-weight: 500;">Approx. Property Value</td>
                  <td style="color: #ffffff; border-bottom: 1px solid #1a2233;">${this.formatField(lead.approxPropertyValue)}</td>
                </tr>
                <tr>
                  <td style="color: #9ca3af; border-bottom: 1px solid #1a2233; font-weight: 500;">Required Loan Amount</td>
                  <td style="color: #01B6E5; font-weight: 700; border-bottom: 1px solid #1a2233;">${this.formatField(lead.requiredLoanAmount)}</td>
                </tr>
                <tr>
                  <td style="color: #9ca3af; border-bottom: 1px solid #1a2233; font-weight: 500;">Existing Obligations</td>
                  <td style="color: #ffffff; border-bottom: 1px solid #1a2233;">${this.formatField(lead.existingLoanObligations, 'None reported')}</td>
                </tr>
                <tr>
                  <td style="color: #9ca3af; border-bottom: 1px solid #1a2233; font-weight: 500;">Preferred Callback Time</td>
                  <td style="color: #C8A45D; font-weight: 600; border-bottom: 1px solid #1a2233;">${this.formatField(lead.preferredCallbackTime, 'Anytime')}</td>
                </tr>
                ` : ''}
                ${isRedev ? `
                <tr>
                  <td style="color: #9ca3af; border-bottom: 1px solid #1a2233; font-weight: 500;">Role in Society</td>
                  <td style="color: #ffffff; font-weight: 600; border-bottom: 1px solid #1a2233;">${this.formatField(lead.roleInSociety)}</td>
                </tr>
                <tr>
                  <td style="color: #9ca3af; border-bottom: 1px solid #1a2233; font-weight: 500;">Building Age</td>
                  <td style="color: #01B6E5; border-bottom: 1px solid #1a2233;">${this.formatField(lead.buildingAge)}</td>
                </tr>
                <tr>
                  <td style="color: #9ca3af; border-bottom: 1px solid #1a2233; font-weight: 500;">Number of Flats / Units</td>
                  <td style="color: #ffffff; border-bottom: 1px solid #1a2233;">${this.formatField(lead.numberOfUnits)}</td>
                </tr>
                ` : ''}
                ${isReg ? `
                <tr>
                  <td style="color: #9ca3af; border-bottom: 1px solid #1a2233; font-weight: 500;">Fee Terms Accepted</td>
                  <td style="color: #10B981; font-weight: 700; border-bottom: 1px solid #1a2233;">
                    ${lead.acceptedFeeTerms ? '✓ Yes — Confirmed & Accepted by Client' : 'Not Confirmed'}
                  </td>
                </tr>
                <tr>
                  <td style="color: #9ca3af; border-bottom: 1px solid #1a2233; font-weight: 500;">Fee Structure & GST</td>
                  <td style="color: #ffffff; border-bottom: 1px solid #1a2233;">
                    ${this.formatField(lead.feeStructure, 'Standard Term Sheet Rates')} • GST: ${this.formatField(lead.gstStatus, 'Applicable (18%)')}
                  </td>
                </tr>
                <tr>
                  <td style="color: #9ca3af; border-bottom: 1px solid #1a2233; font-weight: 500;">Payment Milestones</td>
                  <td style="color: #ffffff; border-bottom: 1px solid #1a2233;">${this.formatField(lead.paymentMilestones, 'Standard Execution Milestones')}</td>
                </tr>
                <tr>
                  <td style="color: #9ca3af; border-bottom: 1px solid #1a2233; font-weight: 500;">Client Signature / Execution</td>
                  <td style="color: #ffffff; border-bottom: 1px solid #1a2233;">
                    ${this.formatField(lead.clientSignature, lead.fullName)} • ${this.formatField(lead.declarationPlace, 'Mumbai')} • ${this.formatField(lead.declarationDate, timeFormatted)}
                  </td>
                </tr>
                ` : ''}
                <tr>
                  <td style="color: #9ca3af; font-weight: 500;">Consent Status</td>
                  <td style="color: #10B981; font-weight: 600;">✓ Agreed to KLOUD REALTY Advisory Terms</td>
                </tr>
              </table>
            </td>
          </tr>

          ${hasProject ? `
          <!-- ============================================== -->
          <!-- SECTION C: PROJECT / PROPERTY DETAILS          -->
          <!-- ============================================== -->
          <tr>
            <td style="padding: 14px 32px 10px 32px;">
              <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 1.2px; color: #01B6E5; font-weight: 700; margin-bottom: 8px;">
                SECTION C: PROJECT / PROPERTY DETAILS
              </div>
              <table width="100%" cellpadding="8" cellspacing="0" style="background-color: #0b1019; border-radius: 6px; border: 1px solid #1f293d; font-size: 13px;">
                <tr>
                  <td width="38%" style="color: #9ca3af; border-bottom: 1px solid #1a2233; font-weight: 500;">Project Name</td>
                  <td style="color: #ffffff; font-weight: 700; border-bottom: 1px solid #1a2233;">${this.formatField(lead.propertyTitle)}</td>
                </tr>
                <tr>
                  <td style="color: #9ca3af; border-bottom: 1px solid #1a2233; font-weight: 500;">Developer</td>
                  <td style="color: #C8A45D; font-weight: 600; border-bottom: 1px solid #1a2233;">${this.formatField(lead.developerName)}</td>
                </tr>
                <tr>
                  <td style="color: #9ca3af; border-bottom: 1px solid #1a2233; font-weight: 500;">Property ID</td>
                  <td style="color: #9ca3af; font-family: monospace; border-bottom: 1px solid #1a2233;">${this.formatField(lead.propertyId)}</td>
                </tr>
                <tr>
                  <td style="color: #9ca3af; border-bottom: 1px solid #1a2233; font-weight: 500;">Project Location</td>
                  <td style="color: #ffffff; border-bottom: 1px solid #1a2233;">${this.formatField(lead.preferredLocation)}</td>
                </tr>
                <tr>
                  <td style="color: #9ca3af; border-bottom: 1px solid #1a2233; font-weight: 500;">Selected Configuration</td>
                  <td style="color: #01B6E5; border-bottom: 1px solid #1a2233;">${this.formatField(lead.selectedConfig || lead.configuration)}</td>
                </tr>
                <tr>
                  <td style="color: #9ca3af; border-bottom: 1px solid #1a2233; font-weight: 500;">Selected Floor Range / Plan</td>
                  <td style="color: #ffffff; border-bottom: 1px solid #1a2233;">${this.formatField(lead.selectedFloorRange || lead.selectedFloorPlan)}</td>
                </tr>
                <tr>
                  <td style="color: #9ca3af; font-weight: 500;">Property Listing Page</td>
                  <td style="color: #ffffff;">
                    ${lead.pageUrl ? `<a href="${lead.pageUrl}" target="_blank" style="color: #C8A45D; text-decoration: underline;">View Live Project Page ↗</a>` : 'https://kloud-reality.vercel.app'}
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          ` : ''}

          <!-- ============================================== -->
          <!-- SECTION D: BUDGET AND PREFERENCES              -->
          <!-- ============================================== -->
          <tr>
            <td style="padding: 14px 32px 10px 32px;">
              <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 1.2px; color: #C8A45D; font-weight: 700; margin-bottom: 8px;">
                SECTION D: BUDGET AND PREFERENCES
              </div>
              <table width="100%" cellpadding="8" cellspacing="0" style="background-color: #0b1019; border-radius: 6px; border: 1px solid #1f293d; font-size: 13px;">
                <tr>
                  <td width="38%" style="color: #9ca3af; border-bottom: 1px solid #1a2233; font-weight: 500;">Approximate Budget</td>
                  <td style="color: #C8A45D; font-weight: 700; border-bottom: 1px solid #1a2233;">${this.formatField(lead.budgetRange)}</td>
                </tr>
                <tr>
                  <td style="color: #9ca3af; border-bottom: 1px solid #1a2233; font-weight: 500;">Preferred Location</td>
                  <td style="color: #ffffff; border-bottom: 1px solid #1a2233;">${this.formatField(lead.preferredLocation)}</td>
                </tr>
                <tr>
                  <td style="color: #9ca3af; font-weight: 500;">Property Type / Configuration</td>
                  <td style="color: #ffffff;">${this.formatField(lead.propertyType || lead.configuration || lead.selectedConfig, 'All Configurations')}</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ============================================== -->
          <!-- SECTION E: ADDITIONAL REQUIREMENTS            -->
          <!-- ============================================== -->
          <tr>
            <td style="padding: 14px 32px 10px 32px;">
              <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 1.2px; color: #01B6E5; font-weight: 700; margin-bottom: 8px;">
                SECTION E: ADDITIONAL REQUIREMENTS
              </div>
              <div style="background-color: #0b1019; border-left: 3px solid #C8A45D; padding: 14px 18px; border-radius: 0 6px 6px 0; font-size: 13px; color: #e5e7eb; line-height: 1.55;">
                ${this.formatField(lead.message, 'No additional notes provided by visitor.')}
              </div>
              ${lead.customFields && Object.keys(lead.customFields).length > 0 ? `
              <div style="margin-top: 10px; background-color: #0b1019; border: 1px solid #1f293d; border-radius: 6px; padding: 10px 14px; font-size: 12px;">
                <span style="color: #9ca3af; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Custom Metadata:</span>
                <pre style="margin: 6px 0 0 0; color: #C8A45D; font-family: monospace; white-space: pre-wrap; font-size: 11.5px;">${JSON.stringify(lead.customFields, null, 2)}</pre>
              </div>
              ` : ''}
            </td>
          </tr>

          <!-- ============================================== -->
          <!-- SECTION F: SUBMISSION SOURCE AND TIMESTAMP     -->
          <!-- ============================================== -->
          <tr>
            <td style="padding: 14px 32px 10px 32px;">
              <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 1.2px; color: #C8A45D; font-weight: 700; margin-bottom: 8px;">
                SECTION F: SUBMISSION SOURCE AND TIMESTAMP
              </div>
              <table width="100%" cellpadding="8" cellspacing="0" style="background-color: #0b1019; border-radius: 6px; border: 1px solid #1f293d; font-size: 13px;">
                <tr>
                  <td width="38%" style="color: #9ca3af; border-bottom: 1px solid #1a2233; font-weight: 500;">Submission Source</td>
                  <td style="color: #ffffff; border-bottom: 1px solid #1a2233;">${lead.enquirySource}</td>
                </tr>
                <tr>
                  <td style="color: #9ca3af; border-bottom: 1px solid #1a2233; font-weight: 500;">Form / Action Button</td>
                  <td style="color: #01B6E5; border-bottom: 1px solid #1a2233;">${this.formatField(lead.enquiryButtonSource, 'Direct Submission')}</td>
                </tr>
                <tr>
                  <td style="color: #9ca3af; border-bottom: 1px solid #1a2233; font-weight: 500;">Submission Date & Time (IST)</td>
                  <td style="color: #e5c57a; font-family: monospace; font-size: 12px; border-bottom: 1px solid #1a2233;">${timeFormatted}</td>
                </tr>
                <tr>
                  <td style="color: #9ca3af; font-weight: 500;">Source Page URL</td>
                  <td style="color: #ffffff; word-break: break-all;">
                    ${lead.pageUrl ? `<a href="${lead.pageUrl}" target="_blank" style="color: #C8A45D; text-decoration: underline;">${lead.pageUrl}</a>` : 'https://kloud-reality.vercel.app'}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          ${hasCallablePhone || hasValidEmail ? `
          <!-- Quick Action Buttons -->
          <tr>
            <td style="padding: 20px 32px 24px 32px;" align="center">
              <table cellpadding="0" cellspacing="0">
                <tr>
                  ${hasCallablePhone ? `
                  <td style="padding-right: 12px;">
                    <a href="tel:${cleanPhone}" style="display: inline-block; padding: 12px 20px; background-color: #C8A45D; color: #0b0f17; font-size: 12px; font-weight: 700; text-decoration: none; border-radius: 4px; text-transform: uppercase; letter-spacing: 0.5px;">
                      📞 Call Client
                    </a>
                  </td>
                  ` : ''}
                  ${cleanWa ? `
                  <td style="padding-right: 12px;">
                    <a href="https://wa.me/91${cleanWa}" target="_blank" style="display: inline-block; padding: 12px 20px; background-color: #10B981; color: #ffffff; font-size: 12px; font-weight: 700; text-decoration: none; border-radius: 4px; text-transform: uppercase; letter-spacing: 0.5px;">
                      💬 WhatsApp Client
                    </a>
                  </td>
                  ` : ''}
                  ${hasValidEmail ? `
                  <td>
                    <a href="mailto:${lead.email}?subject=Regarding%20your%20KLOUD%20REALTY%20Enquiry%20${lead.id}" style="display: inline-block; padding: 12px 20px; background-color: #1f293d; color: #ffffff; font-size: 12px; font-weight: 600; text-decoration: none; border-radius: 4px; border: 1px solid #374151;">
                      ✉️ Reply Email
                    </a>
                  </td>
                  ` : ''}
                </tr>
              </table>
            </td>
          </tr>
          ` : ''}

          <!-- Footer Credentials -->
          <tr>
            <td style="padding: 20px 32px; background-color: #0a0e16; border-top: 1px solid #1f293d; font-size: 11px; color: #9ca3af; text-align: center; line-height: 1.6;">
              <strong style="color: #C8A45D; letter-spacing: 1px;">KLOUD REALTY — OFFICIAL ADVISORY DESK</strong><br>
              Founder & Property Consultant: Abhishek Gupta • MahaRERA Registration: A0311 72501659<br>
              Shop No. 2, 321 R.B. Marg, Abdul Rauf Manzil, Opposite Piramal Aranya, Mazgaon, Mumbai – 400010<br>
              Direct Lines: +91 86555 88880 / +91 96199 77171 | Designated Email: kloudrealty@gmail.com
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `;
  },

  /**
   * Generates a reassuring acknowledgment email sent to the client
   */
  generateClientAcknowledgmentHtml(lead: Lead): string {
    const isLoan = lead.serviceVertical === 'Finance & Home Loan';
    const isReg = lead.serviceVertical === 'Client Registration';
    const isSiteVisit = Boolean(lead.isSiteVisit);
    
    let serviceTitle: string = lead.serviceVertical;
    if (isSiteVisit) serviceTitle = `Site Visit Arrangement (${lead.propertyTitle || 'Property Selection'})`;
    else if (isLoan) serviceTitle = 'Home Loan & Property Financing Advisory';
    else if (isReg) serviceTitle = 'Client Registration & Professional Advisory';

    return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Acknowledgement: Your Enquiry with KLOUD REALTY [${lead.id}]</title>
</head>
<body style="margin: 0; padding: 0; background-color: #080c14; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #f3f4f6;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #080c14; padding: 30px 15px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; width: 100%; background-color: #121824; border: 1px solid rgba(200, 164, 93, 0.4); border-radius: 8px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
          
          <!-- Header -->
          <tr>
            <td style="padding: 24px 30px; background: linear-gradient(135deg, #182232 0%, #0d131d 100%); border-bottom: 2px solid #C8A45D;">
              <h1 style="margin: 0; font-size: 20px; font-weight: 700; color: #C8A45D;">
                KLOUD <span style="color: #01B6E5;">REALTY</span>
              </h1>
              <p style="margin: 4px 0 0 0; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: #9ca3af;">
                The Place to Find Your Place • Mazgaon, Mumbai
              </p>
            </td>
          </tr>

          <!-- Message Body -->
          <tr>
            <td style="padding: 26px 30px;">
              <h2 style="margin: 0 0 12px 0; font-size: 17px; color: #ffffff;">Dear ${lead.fullName},</h2>
              <p style="margin: 0 0 14px 0; font-size: 13.5px; color: #d1d5db; line-height: 1.6;">
                Thank you for contacting <strong>KLOUD REALTY</strong>. Your enquiry regarding <strong>${serviceTitle}</strong> has been successfully received by our advisory desk.
              </p>
              <div style="background-color: #0b1019; border-left: 3px solid #C8A45D; padding: 12px 16px; margin-bottom: 18px; border-radius: 0 4px 4px 0;">
                <p style="margin: 0 0 4px 0; font-size: 11px; color: #9ca3af; text-transform: uppercase; letter-spacing: 1px;">Your Reference Tracking ID:</p>
                <p style="margin: 0; font-size: 17px; font-family: monospace; color: #C8A45D; font-weight: 700;">${lead.id}</p>
              </div>
              <p style="margin: 0 0 14px 0; font-size: 13px; color: #9ca3af; line-height: 1.6;">
                Our principal advisory team led by Abhishek Gupta is reviewing your parameters. We will contact you via your preferred channel (${lead.preferredContactMethod || 'Phone Call'}) within 24 business hours with curated options and guidance.
              </p>
              <p style="margin: 0; font-size: 13px; color: #9ca3af; line-height: 1.6;">
                For immediate priority assistance or to arrange an in-person meeting at our Mazgaon office, please reach our advisory desk at <a href="tel:8655588880" style="color: #C8A45D; text-decoration: none; font-weight: 600;">+91 86555 88880</a> or <a href="tel:9619977171" style="color: #C8A45D; text-decoration: none; font-weight: 600;">+91 96199 77171</a>.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 18px 30px; background-color: #0a0e16; border-top: 1px solid #1f293d; font-size: 11px; color: #6b7280; text-align: center; line-height: 1.6;">
              <strong>KLOUD REALTY</strong> • MahaRERA Registration: A0311 72501659<br>
              Shop No. 2, 321 R.B. Marg, Abdul Rauf Manzil, Opposite Piramal Aranya, Mazgaon, Mumbai – 400010<br>
              Phone: +91 86555 88880 / +91 96199 77171 | Email: kloudrealty@gmail.com
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `;
  },

  /**
   * Dispatches the emails via backend serverless endpoint or fallback outbox logging
   */
  async sendNotificationAndAcknowledgment(lead: Lead): Promise<{
    success: boolean;
    dispatchId: string;
    deliveryStatus: 'SENT' | 'SIMULATED' | 'FAILED';
    error?: string;
  }> {
    const dispatchId = `DISP-${Date.now()}`;
    const subject = this.getSubjectLine(lead);
    const ownerHtml = this.generateOwnerEmailHtml(lead);
    const clientHtml = this.generateClientAcknowledgmentHtml(lead);

    let status: 'SENT' | 'SIMULATED' | 'FAILED' = 'SIMULATED';
    let errorMessage: string | undefined;

    // 1. Attempt sending via local/production API endpoint
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lead,
          subject,
          ownerEmail: OWNER_DESIGNATED_EMAIL,
          clientEmail: lead.email,
          ownerHtml,
          clientHtml
        })
      });

      if (response.ok) {
        const json = await response.json();
        status = json.simulated ? 'SIMULATED' : 'SENT';
      } else {
        const errJson = await response.json().catch(() => null);
        errorMessage = errJson?.error || `Server responded with status ${response.status}`;
        status = 'FAILED';
      }
    } catch (err: any) {
      // In static or client-only preview without serverless runtime
      status = 'SIMULATED';
      errorMessage = err?.message;
    }

    // 2. Record in persistent outbox log for Admin Dashboard audit
    const record: EmailDispatchRecord = {
      id: dispatchId,
      leadId: lead.id,
      recipient: OWNER_DESIGNATED_EMAIL,
      clientEmail: lead.email,
      subject,
      enquiryType: lead.serviceVertical,
      status,
      timestamp: new Date().toISOString(),
      ownerHtmlSnippet: ownerHtml,
      clientHtmlSnippet: clientHtml,
      error: errorMessage
    };

    this.saveDispatchRecord(record);

    console.info(`[KLOUD REALTY EMAIL ENGINE] ${status}: Lead ${lead.id} routed to ${OWNER_DESIGNATED_EMAIL}. Subject: "${subject}".`);

    return { success: status !== 'FAILED', dispatchId, deliveryStatus: status, error: errorMessage };
  }
};
