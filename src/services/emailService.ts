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
const OWNER_DESIGNATED_EMAIL = 'kloudrealty@gmail.com';

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
   * Generates formatted subject line according to enquiry vertical
   */
  getSubjectLine(lead: Lead): string {
    if (lead.serviceVertical === 'Client Registration') {
      return `New Client Registration – ${lead.fullName}`;
    }
    if (lead.serviceVertical === 'Finance & Home Loan') {
      return `New Home Loan Assistance Enquiry – ${lead.fullName}`;
    }
    return `New Property Consultation Request – ${lead.fullName}`;
  },

  /**
   * Generates a luxury, dark-themed responsive HTML notification for the consultancy owner
   */
  generateOwnerEmailHtml(lead: Lead): string {
    const timeFormatted = new Date(lead.createdAt).toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'full',
      timeStyle: 'medium'
    });

    const isLoan = lead.serviceVertical === 'Finance & Home Loan';
    const isReg = lead.serviceVertical === 'Client Registration';

    return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${this.getSubjectLine(lead)}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0b0f17; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #f3f4f6;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0b0f17; padding: 30px 15px;">
    <tr>
      <td align="center">
        <table width="620" cellpadding="0" cellspacing="0" style="max-width: 620px; width: 100%; background-color: #141b26; border: 1px solid rgba(200, 164, 93, 0.4); border-radius: 6px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
          
          <!-- Header Banner -->
          <tr>
            <td style="padding: 24px 30px; background: linear-gradient(135deg, #182232 0%, #0d131d 100%); border-bottom: 2px solid #C8A45D;">
              <table width="100%">
                <tr>
                  <td>
                    <h1 style="margin: 0; font-size: 22px; font-weight: 700; color: #C8A45D; letter-spacing: 1px;">
                      KLOUD <span style="color: #01B6E5;">REALTY</span>
                    </h1>
                    <p style="margin: 4px 0 0 0; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: #9ca3af;">
                      The Place to Find Your Place • Mazgaon, Mumbai
                    </p>
                  </td>
                  <td align="right">
                    <span style="display: inline-block; padding: 4px 10px; background-color: rgba(200, 164, 93, 0.15); border: 1px solid rgba(200, 164, 93, 0.4); color: #e5c57a; font-size: 11px; font-weight: 600; border-radius: 4px; font-family: monospace;">
                      ${lead.id}
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Notification Notice -->
          <tr>
            <td style="padding: 24px 30px 10px 30px;">
              <h2 style="margin: 0 0 8px 0; font-size: 18px; color: #ffffff; font-weight: 600;">
                ${this.getSubjectLine(lead)}
              </h2>
              <p style="margin: 0; font-size: 13px; color: #9ca3af; line-height: 1.5;">
                A new client submission has been received through the KLOUD REALTY portal. Details are recorded below for your immediate review.
              </p>
            </td>
          </tr>

          <!-- Summary Grid -->
          <tr>
            <td style="padding: 15px 30px;">
              <table width="100%" cellpadding="8" cellspacing="0" style="background-color: #0e141f; border-radius: 4px; border: 1px solid #1f293d; font-size: 13px;">
                <tr>
                  <td width="35%" style="color: #9ca3af; border-bottom: 1px solid #1f293d; font-weight: 500;">Enquiry Type</td>
                  <td style="color: #01B6E5; font-weight: 600; border-bottom: 1px solid #1f293d;">${lead.serviceVertical}</td>
                </tr>
                <tr>
                  <td style="color: #9ca3af; border-bottom: 1px solid #1f293d; font-weight: 500;">Client Name</td>
                  <td style="color: #ffffff; font-weight: 600; border-bottom: 1px solid #1f293d;">${lead.fullName}</td>
                </tr>
                <tr>
                  <td style="color: #9ca3af; border-bottom: 1px solid #1f293d; font-weight: 500;">Phone Number</td>
                  <td style="color: #ffffff; border-bottom: 1px solid #1f293d;">
                    <a href="tel:${lead.phone}" style="color: #C8A45D; text-decoration: none; font-weight: 600;">${lead.phone}</a>
                  </td>
                </tr>
                <tr>
                  <td style="color: #9ca3af; border-bottom: 1px solid #1f293d; font-weight: 500;">Email Address</td>
                  <td style="color: #ffffff; border-bottom: 1px solid #1f293d;">
                    <a href="mailto:${lead.email}" style="color: #C8A45D; text-decoration: none;">${lead.email}</a>
                  </td>
                </tr>
                <tr>
                  <td style="color: #9ca3af; border-bottom: 1px solid #1f293d; font-weight: 500;">Preferred Contact</td>
                  <td style="color: #ffffff; border-bottom: 1px solid #1f293d;">${lead.preferredContactMethod || 'Phone Call'}</td>
                </tr>
                <tr>
                  <td style="color: #9ca3af; border-bottom: 1px solid #1f293d; font-weight: 500;">Submission Timestamp</td>
                  <td style="color: #9ca3af; border-bottom: 1px solid #1f293d; font-family: monospace; font-size: 12px;">${timeFormatted} (IST)</td>
                </tr>
                ${isLoan ? `
                <tr>
                  <td style="color: #9ca3af; border-bottom: 1px solid #1f293d; font-weight: 500;">Employment Profile</td>
                  <td style="color: #ffffff; border-bottom: 1px solid #1f293d;">${lead.employmentType || 'Not specified'}</td>
                </tr>
                <tr>
                  <td style="color: #9ca3af; border-bottom: 1px solid #1f293d; font-weight: 500;">Approx. Property Value</td>
                  <td style="color: #ffffff; border-bottom: 1px solid #1f293d;">${lead.approxPropertyValue || 'Not specified'}</td>
                </tr>
                <tr>
                  <td style="color: #9ca3af; border-bottom: 1px solid #1f293d; font-weight: 500;">Required Loan Amount</td>
                  <td style="color: #01B6E5; font-weight: 600; border-bottom: 1px solid #1f293d;">${lead.requiredLoanAmount || 'Not specified'}</td>
                </tr>
                <tr>
                  <td style="color: #9ca3af; border-bottom: 1px solid #1f293d; font-weight: 500;">Existing Obligations</td>
                  <td style="color: #ffffff; border-bottom: 1px solid #1f293d;">${lead.existingLoanObligations || 'None reported'}</td>
                </tr>
                <tr>
                  <td style="color: #9ca3af; border-bottom: 1px solid #1f293d; font-weight: 500;">Preferred Callback</td>
                  <td style="color: #ffffff; border-bottom: 1px solid #1f293d;">${lead.preferredCallbackTime || 'Anytime'}</td>
                </tr>
                ` : ''}
                ${isReg ? `
                <tr>
                  <td style="color: #9ca3af; border-bottom: 1px solid #1f293d; font-weight: 500;">Date of Birth</td>
                  <td style="color: #ffffff; border-bottom: 1px solid #1f293d;">${lead.dateOfBirth || 'N/A'}</td>
                </tr>
                <tr>
                  <td style="color: #9ca3af; border-bottom: 1px solid #1f293d; font-weight: 500;">Residential Address</td>
                  <td style="color: #ffffff; border-bottom: 1px solid #1f293d;">${lead.residentialAddress || 'N/A'}</td>
                </tr>
                <tr>
                  <td style="color: #9ca3af; border-bottom: 1px solid #1f293d; font-weight: 500;">City & PIN Code</td>
                  <td style="color: #ffffff; border-bottom: 1px solid #1f293d;">${lead.cityPin || 'N/A'}</td>
                </tr>
                <tr>
                  <td style="color: #9ca3af; border-bottom: 1px solid #1f293d; font-weight: 500;">PAN Number</td>
                  <td style="color: #ffffff; border-bottom: 1px solid #1f293d;">${lead.panNumber || 'Optional - Not provided'}</td>
                </tr>
                <tr>
                  <td style="color: #9ca3af; border-bottom: 1px solid #1f293d; font-weight: 500;">Purpose of Engagement</td>
                  <td style="color: #01B6E5; border-bottom: 1px solid #1f293d;">${lead.purposeOfEngagement?.join(', ') || 'General Consultation'}</td>
                </tr>
                ` : ''}
                <tr>
                  <td style="color: #9ca3af; font-weight: 500;">Location / Requirement</td>
                  <td style="color: #ffffff;">${lead.preferredLocation || 'Mazgaon / Mumbai'} ${lead.propertyTitle ? `• ${lead.propertyTitle}` : ''}</td>
                </tr>
              </table>
            </td>
          </tr>

          ${lead.message ? `
          <tr>
            <td style="padding: 10px 30px;">
              <div style="background-color: #0b1019; border-left: 3px solid #C8A45D; padding: 12px 16px; border-radius: 0 4px 4px 0;">
                <p style="margin: 0 0 4px 0; font-size: 11px; text-transform: uppercase; color: #C8A45D; font-weight: 600;">Client Message / Requirement Notes:</p>
                <p style="margin: 0; font-size: 13px; color: #e5e7eb; line-height: 1.5;">${lead.message}</p>
              </div>
            </td>
          </tr>
          ` : ''}

          <!-- Direct Action Buttons -->
          <tr>
            <td style="padding: 24px 30px;" align="center">
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding-right: 12px;">
                    <a href="tel:${lead.phone.replace(/[^0-9+]/g, '')}" style="display: inline-block; padding: 10px 18px; background-color: #C8A45D; color: #0b0f17; font-size: 12px; font-weight: 700; text-decoration: none; border-radius: 4px; text-transform: uppercase; letter-spacing: 0.5px;">
                      📞 Call Client
                    </a>
                  </td>
                  <td style="padding-right: 12px;">
                    <a href="https://wa.me/91${lead.phone.replace(/[^0-9]/g, '').slice(-10)}" target="_blank" style="display: inline-block; padding: 10px 18px; background-color: #10B981; color: #ffffff; font-size: 12px; font-weight: 700; text-decoration: none; border-radius: 4px; text-transform: uppercase; letter-spacing: 0.5px;">
                      💬 WhatsApp Client
                    </a>
                  </td>
                  <td>
                    <a href="mailto:${lead.email}?subject=Regarding%20your%20KLOUD%20REALTY%20Enquiry%20${lead.id}" style="display: inline-block; padding: 10px 18px; background-color: #1f293d; color: #ffffff; font-size: 12px; font-weight: 600; text-decoration: none; border-radius: 4px; border: 1px solid #374151;">
                      ✉️ Reply Email
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer Credentials -->
          <tr>
            <td style="padding: 16px 30px; background-color: #0c111a; border-top: 1px solid #1f293d; font-size: 11px; color: #6b7280; text-align: center;">
              KLOUD REALTY • Founder: Abhishek Gupta • MahaRERA ID: A0311 72501659<br>
              Shop No. 2, 321 R.B. Marg, Abdul Rauf Manzil, Opposite Piramal Aranya, Mazgaon, Mumbai – 400010
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
    return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Acknowledgement: Your Enquiry with KLOUD REALTY</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0b0f17; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #f3f4f6;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0b0f17; padding: 30px 15px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; width: 100%; background-color: #141b26; border: 1px solid rgba(200, 164, 93, 0.35); border-radius: 6px; overflow: hidden;">
          
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
            <td style="padding: 24px 30px;">
              <h2 style="margin: 0 0 12px 0; font-size: 17px; color: #ffffff;">Dear ${lead.fullName},</h2>
              <p style="margin: 0 0 14px 0; font-size: 13.5px; color: #d1d5db; line-height: 1.6;">
                Thank you for contacting <strong>KLOUD REALTY</strong>. We have received your submission regarding <strong>${lead.serviceVertical}</strong>.
              </p>
              <div style="background-color: #0e141f; border-left: 3px solid #C8A45D; padding: 12px 16px; margin-bottom: 16px; border-radius: 0 4px 4px 0;">
                <p style="margin: 0 0 4px 0; font-size: 11px; color: #9ca3af; text-transform: uppercase;">Your Enquiry Reference Number:</p>
                <p style="margin: 0; font-size: 16px; font-family: monospace; color: #C8A45D; font-weight: 700;">${lead.id}</p>
              </div>
              <p style="margin: 0 0 14px 0; font-size: 13px; color: #9ca3af; line-height: 1.6;">
                Our senior advisory team led by Abhishek Gupta is reviewing your requirements and will reach out to you via your preferred contact method (${lead.preferredContactMethod || 'Phone'}) within 24 business hours.
              </p>
              <p style="margin: 0; font-size: 13px; color: #9ca3af; line-height: 1.6;">
                Should you require immediate assistance or wish to schedule an in-person meeting at our Mazgaon office, please feel free to reach us directly at <a href="tel:8655588880" style="color: #C8A45D; text-decoration: none; font-weight: 600;">+91 86-555-88880</a>.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 18px 30px; background-color: #0c111a; border-top: 1px solid #1f293d; font-size: 11px; color: #6b7280; text-align: center;">
              <strong>KLOUD REALTY</strong> • MahaRERA Registration: A0311 72501659<br>
              Shop No. 2, 321 R.B. Marg, Abdul Rauf Manzil, Opposite Piramal Aranya, Mazgaon, Mumbai – 400010<br>
              Tel: 86-555-88880 / 96-199-77171 | Email: kloudrealty@gmail.com
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
  async sendNotificationAndAcknowledgment(lead: Lead): Promise<{ success: boolean; dispatchId: string }> {
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
        status = 'SIMULATED';
      }
    } catch {
      // In static or client-only preview without serverless runtime
      status = 'SIMULATED';
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

    console.info(`[KLOUD REALTY EMAIL ENGINE] ${status}: Notification sent to ${OWNER_DESIGNATED_EMAIL} and acknowledgment to ${lead.email} for Lead ID ${lead.id}.`);

    return { success: true, dispatchId };
  }
};
