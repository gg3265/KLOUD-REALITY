// Serverless Function: api/send-email.ts
// Compatible with Vercel, Netlify, or Node backend runtimes
// Safely reads RESEND_API_KEY from server environment variables without frontend exposure

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  const { lead, subject, ownerEmail, clientEmail, ownerHtml, clientHtml } = req.body || {};

  if (!lead || !lead.fullName || !lead.email) {
    return res.status(400).json({ error: 'Invalid lead payload. Full name and email are required.' });
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const ownerRecipient = ownerEmail || 'kloudrealty@gmail.com';

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
          from: 'KLOUD REALTY Portal <notifications@kloudrealty.in>',
          to: [ownerRecipient],
          subject: subject || `New Enquiry from ${lead.fullName}`,
          html: ownerHtml
        })
      });

      // 2. Send Acknowledgment to Client if email provided
      if (clientEmail) {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${resendApiKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            from: 'KLOUD REALTY <advisory@kloudrealty.in>',
            to: [clientEmail],
            subject: `Acknowledgement: Your Enquiry with KLOUD REALTY [${lead.id}]`,
            html: clientHtml
          })
        });
      }

      const ownerData = await ownerRes.json();
      return res.status(200).json({ success: true, provider: 'Resend', data: ownerData });
    } catch (err: any) {
      console.error('Resend dispatch error:', err);
      return res.status(500).json({ error: 'Email service error', details: err?.message });
    }
  }

  // Fallback when RESEND_API_KEY is not yet added to server environment variables
  console.info(`[SERVER DISPATCH LOG] New lead received for ${ownerRecipient}:`, {
    leadId: lead.id,
    name: lead.fullName,
    vertical: lead.serviceVertical,
    timestamp: new Date().toISOString()
  });

  return res.status(200).json({
    success: true,
    simulated: true,
    message: 'Enquiry received and logged to server. Set RESEND_API_KEY in environment for live external SMTP/API dispatch.'
  });
}
