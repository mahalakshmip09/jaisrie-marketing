// server.js — Jaisrie Marketing | Node.js + Express Backend
// Usage: npm install && node server.js
// Serves the static frontend + handles the contact form API

const express    = require('express');
const path       = require('path');
const nodemailer = require('nodemailer');

const app  = express();
const PORT = process.env.PORT || 3000;

// ── MIDDLEWARE ──
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from current directory (index.html, style.css, script.js)
app.use(express.static(path.join(__dirname)));

// ── CORS (for dev) ──
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

// ── NODEMAILER CONFIG ──
// Replace with real SMTP credentials or use a service like Gmail, Brevo, or SendGrid
const transporter = nodemailer.createTransport({
  host:   process.env.SMTP_HOST   || 'smtp.gmail.com',
  port:   Number(process.env.SMTP_PORT)  || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER || 'your-email@gmail.com',
    pass: process.env.SMTP_PASS || 'your-app-password',
  },
});

// ── INPUT VALIDATION ──
const validate = ({ name, phone }) => {
  const errors = {};
  if (!name || name.trim().length < 2)
    errors.name = 'Please provide a valid name.';
  if (!phone || !/^[6-9]\d{9}$/.test(phone.replace(/[\s+\-]/g, '')))
    errors.phone = 'Please provide a valid 10-digit Indian mobile number.';
  return errors;
};

// ── API ROUTES ──

/**
 * POST /api/contact
 * Body: { name, phone, email?, service?, message? }
 * Sends notification email to business owner
 */
app.post('/api/contact', async (req, res) => {
  try {
    const { name, phone, email = '', service = 'Not specified', message = '' } = req.body;

    const errors = validate({ name, phone });
    if (Object.keys(errors).length > 0)
      return res.status(422).json({ success: false, errors });

    // Email to business
    const mailOptions = {
      from:    `"Jaisrie Marketing Website" <${process.env.SMTP_USER || 'your-email@gmail.com'}>`,
      to:      process.env.OWNER_EMAIL || 'jaisriemarketing@gmail.com',
      subject: `📩 New Lead: ${name} — ${service}`,
      html: `
        <div style="font-family:sans-serif;max-width:560px;margin:0 auto;background:#f9f9f9;border-radius:10px;overflow:hidden;">
          <div style="background:linear-gradient(135deg,#f5c518,#ff8c00);padding:28px 32px;">
            <h2 style="margin:0;color:#0a0e14;font-size:1.4rem;">New Enquiry — Jaisrie Marketing</h2>
          </div>
          <div style="padding:32px;">
            <table style="width:100%;border-collapse:collapse;">
              ${[['Name',name],['Phone',phone],['Email',email||'—'],['Service',service],['Message',message||'—']]
                .map(([k,v]) => `<tr><td style="padding:10px 0;font-weight:600;color:#555;width:120px">${k}</td><td style="padding:10px 0;color:#222">${v}</td></tr>`)
                .join('')}
            </table>
          </div>
          <div style="background:#eee;padding:16px 32px;font-size:0.8rem;color:#888;">
            Sent from jaisriemarketing.com on ${new Date().toLocaleString('en-IN',{timeZone:'Asia/Kolkata'})}
          </div>
        </div>
      `,
    };

    // Auto-reply to visitor
    if (email) {
      const replyOptions = {
        from:    `"Jaisrie Marketing" <${process.env.SMTP_USER || 'your-email@gmail.com'}>`,
        to:      email,
        subject: 'Thank you for contacting Jaisrie Marketing!',
        html: `
          <div style="font-family:sans-serif;max-width:560px;margin:0 auto;">
            <div style="background:linear-gradient(135deg,#f5c518,#ff8c00);padding:28px 32px;border-radius:10px 10px 0 0;">
              <h2 style="margin:0;color:#0a0e14;">Thank you, ${name}! ☀️</h2>
            </div>
            <div style="background:#fff;padding:32px;border:1px solid #eee;border-radius:0 0 10px 10px;">
              <p>We have received your enquiry for <strong>${service}</strong> and our team will contact you within 24 hours.</p>
              <p>For urgent queries, call us at <a href="tel:9629455664">+91 96294 55664</a>.</p>
              <p style="color:#888;font-size:0.85rem;margin-top:32px;">Jaisrie Marketing, Sivakasi, Tamil Nadu</p>
            </div>
          </div>
        `,
      };
      // Non-blocking
      transporter.sendMail(replyOptions).catch(err => console.error('Auto-reply error:', err));
    }

    await transporter.sendMail(mailOptions);
    return res.json({ success: true, message: 'Your message has been sent successfully.' });

  } catch (err) {
    console.error('Contact API error:', err);
    return res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
  }
});

/**
 * GET /api/health
 * Health check endpoint
 */
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString(), app: 'Jaisrie Marketing' });
});

// Fallback — serve index.html for all unknown routes (SPA support)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// ── START ──
app.listen(PORT, () => {
  console.log(`\n☀  Jaisrie Marketing server running at http://localhost:${PORT}\n`);
});

module.exports = app;
