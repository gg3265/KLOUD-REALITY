// Serverless Function: api/send-email.ts
// Compatible with Vercel, Netlify, or Node backend runtimes
// Safely reads RESEND_API_KEY from server environment variables without frontend exposure

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  const { lead, subject, ownerEmail, clientEmail, ownerHtml, clientHtml } = req.body || {};

  if (!lead || !lead.fullName) {
    return res.status(400).json({ error: 'Invalid lead payload. Full name is required.' });
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const ownerRecipient = process.env.LEAD_NOTIFICATION_EMAIL || process.env.KLOUD_REALTY_NOTIFICATION_EMAIL || ownerEmail || 'kloudrealty@gmail.com';
  const defaultFrom = process.env.RESEND_FROM_EMAIL || 'KLOUD REALTY Portal <onboarding@resend.dev>';

  // If RESEND_API_KEY is configured on the server
  if (resendApiKey) {
    try {
      // 1. Send Notification to Owner
      const ownerRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: defaultFrom,
          to: [ownerRecipient],
          subject: subject || `[KLOUD REALTY] New Lead from ${lead.fullName}`,
          html: ownerHtml
        })
      });

      const ownerData = await ownerRes.json();

      // 2. Send Acknowledgment to Client if valid client email provided
      let clientData = null;
      const isValidClientEmail = clientEmail && typeof clientEmail === 'string' && clientEmail.includes('@') && clientEmail.toLowerCase() !== 'not provided';

      if (isValidClientEmail && clientHtml && ownerRes.ok) {
        try {
          const clientRes = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${resendApiKey}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              from: defaultFrom,
              to: [clientEmail],
              subject: `Acknowledgement: Your Enquiry with KLOUD REALTY [${lead.id}]`,
              html: clientHtml
            })
          });
          clientData = await clientRes.json();
        } catch (clientErr) {
          console.warn('Client acknowledgment dispatch warning:', clientErr);
        }
      }

      if (!ownerRes.ok) {
        console.error('Resend dispatch API error:', ownerData);
        return res.status(ownerRes.status || 500).json({
          success: false,
          error: ownerData?.message || 'Failed to dispatch email via Resend',
          details: ownerData
        });
      }

      return res.status(200).json({
        success: true,
        provider: 'Resend',
        deliveryStatus: 'SENT',
        ownerMessageId: ownerData?.id,
        clientMessageId: clientData?.id
      });
    } catch (err: any) {
      console.error('Resend dispatch network error:', err);
      return res.status(500).json({
        success: false,
        error: 'Email service error',
        details: err?.message
      });
    }
  }

  // Fallback when RESEND_API_KEY is not yet added to server environment variables
  console.info(`[SERVER DISPATCH LOG] New lead received for ${ownerRecipient}:`, {
    leadId: lead.id,
    name: lead.fullName,
    vertical: lead.serviceVertical,
    project: lead.propertyTitle || 'N/A',
    timestamp: new Date().toISOString()
  });

  return res.status(200).json({
    success: true,
    simulated: true,
    deliveryStatus: 'SIMULATED',
    message: 'Enquiry received and logged to server. Set RESEND_API_KEY in environment for live external SMTP/API dispatch.'
  });
}
