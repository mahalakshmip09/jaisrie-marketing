# ☀ Jaisrie Marketing — Solar Energy Solutions Website

Professional website for **Jaisrie Marketing**, Sivakasi, Tamil Nadu.  
Built with HTML + CSS + JS (vanilla) and React + Node.js + Express.

---

## 📁 Project Structure

```
jaisrie-marketing/
├── index.html       ← Static HTML (plain version)
├── style.css        ← All CSS styles
├── script.js        ← Vanilla JavaScript (navbar, counter, slider, form)
├── App.jsx          ← React version of the full site
├── main.jsx         ← React entry point (for Vite)
├── vite.config.js   ← Vite build config (React)
├── server.js        ← Node.js + Express backend (contact form API)
├── package.json     ← npm dependencies & scripts
└── README.md        ← This file
```

---

## 🚀 Option 1 — Plain HTML (No Server Needed)

Just open `index.html` in your browser — no installation required.

```bash
open index.html
# or double-click index.html in your file explorer
```

---

## 🖥 Option 2 — Node.js Server (with Contact Form API)

### Prerequisites
- Node.js v18+ ([nodejs.org](https://nodejs.org))

### Setup

```bash
# Install dependencies
npm install

# Configure environment (optional — needed for email sending)
# Create a .env file:
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-gmail@gmail.com
SMTP_PASS=your-app-password        # Gmail App Password, not your login password
OWNER_EMAIL=jaisriemarketing@gmail.com
PORT=3000

# Run the server
npm start
# → http://localhost:3000

# Development mode (auto-restart on file changes)
npm run dev
```

> **Gmail App Password**: Go to Google Account → Security → 2-Step Verification → App Passwords → generate one for "Mail".

---

## ⚛️ Option 3 — React (with Vite)

```bash
# Install dependencies
npm install

# Start React dev server
npm run react-dev
# → http://localhost:5173

# Build for production
npm run react-build
# Output goes to /dist folder

# Preview production build
npm run react-preview
```

### Deploy React build + Node.js together

1. Run `npm run react-build` → generates `/dist`
2. In `server.js`, change static path to serve `/dist` instead of root
3. Run `npm start`

---

## 🌐 Deployment Options

| Platform       | Command                              |
|----------------|--------------------------------------|
| **Vercel**     | `vercel deploy` (React static)       |
| **Netlify**    | Drag & drop `/dist` folder           |
| **GitHub Pages** | Push `index.html` + assets to repo |
| **Railway/Render** | `npm start` (Node.js server)     |

---

## 📞 Contact

**Jaisrie Marketing**  
Sivakasi, Tamil Nadu  
📞 +91 96294 55664 | +91 95857 55665  
✉️ jaisriemarketing@gmail.com

---

© 2026 Jaisrie Marketing. All Rights Reserved.
