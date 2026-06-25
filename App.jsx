// App.jsx — Jaisrie Marketing | React Version
// Run: npm start  (after npm install)

import { useState, useEffect, useRef } from 'react';

/* ── DATA ── */
const SERVICES = [
  { idx: '01', icon: '🏡', title: 'Residential Solar',   desc: 'Reduce your home electricity bill with efficient rooftop solar installations tailored for Tamil Nadu\'s climate.' },
  { idx: '02', icon: '🏢', title: 'Commercial Solar',    desc: 'Solar solutions designed to lower energy costs for offices, shops, and businesses of all sizes.' },
  { idx: '03', icon: '🏭', title: 'Industrial Solar',    desc: 'Large-scale solar systems for factories and industrial power requirements with maximum ROI.' },
  { idx: '04', icon: '💧', title: 'Water Purification',  desc: 'Solar-powered water purification systems for clean, safe drinking water — even in remote areas.' },
];
const PROJECTS = [
  { tag: 'Residential', emoji: '🏡', title: 'Solar Rooftop – Home Installation',  desc: '3kW rooftop system installed in Sivakasi, reducing monthly EB bill by ₹3,500.', bg: 'residential', featured: false },
  { tag: 'Commercial',  emoji: '🏗️', title: 'Commercial Solar Plant',             desc: '25kW rooftop plant for a textile unit in Virudhunagar delivering 100+ units/day.', bg: 'commercial', featured: true },
  { tag: 'Industrial',  emoji: '⚡', title: 'Industrial Solar System',            desc: '100kW ground-mounted plant for a match factory — zero grid dependency during daylight.', bg: 'industrial', featured: false },
];
const TESTIMONIALS = [
  { initials: 'RK', name: 'Ravi Kumar',  location: 'Sivakasi',     stars: 5, text: 'Excellent solar installation service. Our EB bill reduced drastically! The team was professional and completed the work on time.' },
  { initials: 'SR', name: 'Saravanan',   location: 'Virudhunagar', stars: 5, text: 'Professional team and quick installation. Highly recommended. After-sales support is also very good.' },
  { initials: 'KA', name: 'Karthik',     location: 'Madurai',      stars: 4, text: 'Good support and affordable pricing. The solar panels have been working perfectly for 2 years without any issues.' },
];

/* ── COMPONENTS ── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header style={{
      position:'fixed',top:0,left:0,right:0,zIndex:1000,
      background: scrolled ? 'rgba(10,14,20,0.96)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(245,197,24,0.12)' : 'none',
      transition: 'all 0.3s ease',
    }}>
      <div style={{ maxWidth:1160, margin:'0 auto', padding:'0 24px', display:'flex', alignItems:'center', justifyContent:'space-between', height:72 }}>
        <a href="#home" style={{ display:'flex', alignItems:'center', gap:10, fontFamily:'Syne,sans-serif', fontSize:'1.6rem', fontWeight:800, color:'#e8eaf2', textDecoration:'none' }}>
          <span style={{ fontSize:'1.8rem', filter:'drop-shadow(0 0 8px #f5c518)' }}>☀</span>
          Jaisrie<span style={{ color:'#f5c518' }}>.</span>
        </a>
        {/* Desktop nav */}
        <nav style={{ display:'flex', alignItems:'center', gap:32 }} className="desktop-nav">
          {['home','about','services','projects','testimonials'].map(id => (
            <a key={id} href={`#${id}`} onClick={() => setOpen(false)} style={{ fontFamily:'DM Sans,sans-serif', fontSize:'0.9rem', color:'#8b95aa', textDecoration:'none', textTransform:'capitalize', transition:'color .2s' }}
              onMouseEnter={e => e.target.style.color='#f5c518'} onMouseLeave={e => e.target.style.color='#8b95aa'}>
              {id}
            </a>
          ))}
          <a href="#contact" style={{ background:'linear-gradient(135deg,#f5c518,#ff8c00)', color:'#0a0e14', padding:'10px 22px', borderRadius:50, fontFamily:'Syne,sans-serif', fontWeight:700, fontSize:'0.9rem', textDecoration:'none' }}>
            Get Quote
          </a>
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  const [counts, setCounts] = useState({ installs: 0, years: 0, satisfaction: 0 });
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        const targets = { installs: 500, years: 10, satisfaction: 98 };
        const duration = 1800;
        const keys = Object.keys(targets);
        keys.forEach(key => {
          const step = targets[key] / (duration / 16);
          let cur = 0;
          const timer = setInterval(() => {
            cur = Math.min(cur + step, targets[key]);
            setCounts(prev => ({ ...prev, [key]: Math.floor(cur) }));
            if (cur >= targets[key]) clearInterval(timer);
          }, 16);
        });
        observer.disconnect();
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="home" style={{ position:'relative', minHeight:'100vh', display:'flex', alignItems:'center', overflow:'hidden', background:'radial-gradient(ellipse 80% 80% at 60% 40%, #1a2a0a 0%, #0a0e14 70%)' }}>
      {/* Animated sun */}
      <div style={{ position:'absolute', right:-80, top:'50%', transform:'translateY(-50%)', width:600, height:600, pointerEvents:'none' }}>
        <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:140, height:140, background:'radial-gradient(circle,#fff8d0,#f5c518,#ff8c00)', borderRadius:'50%', boxShadow:'0 0 80px 40px rgba(245,197,24,.35),0 0 160px 80px rgba(255,140,0,.15)', animation:'pulse 4s ease-in-out infinite' }} />
        {[240,380,520].map((size,i) => (
          <div key={i} style={{ position:'absolute', top:'50%', left:'50%', width:size, height:size, border:`1.5px solid rgba(245,197,24,${[0.4,0.2,0.1][i]})`, borderRadius:'50%', transform:'translate(-50%,-50%)', animation:`spin-slow ${[20,35,50][i]}s linear infinite ${i===1?'reverse':''}` }} />
        ))}
      </div>

      <div style={{ position:'relative', zIndex:1, maxWidth:1160, margin:'0 auto', padding:'120px 24px 60px' }} ref={ref}>
        <span style={{ display:'inline-block', fontSize:12, fontWeight:600, letterSpacing:3, textTransform:'uppercase', color:'#f5c518', background:'rgba(245,197,24,.18)', border:'1px solid rgba(245,197,24,.12)', padding:'5px 16px', borderRadius:50, marginBottom:24, fontFamily:'DM Sans,sans-serif' }}>
          Tamil Nadu's Trusted Solar Partner
        </span>
        <h1 style={{ fontFamily:'Syne,sans-serif', fontSize:'clamp(2.8rem,6vw,5rem)', fontWeight:800, lineHeight:1.0, marginBottom:24, color:'#e8eaf2' }}>
          Power Your Future<br/>
          <span style={{ background:'linear-gradient(135deg,#f5c518,#ff8c00)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>With Solar Energy</span>
        </h1>
        <p style={{ fontSize:'1.1rem', color:'#8b95aa', maxWidth:520, marginBottom:40, lineHeight:1.7, fontFamily:'DM Sans,sans-serif' }}>
          Affordable installation solutions for homes, businesses & industries across South Tamil Nadu. Cut your EB bill — harness the sun.
        </p>
        <div style={{ display:'flex', gap:16, flexWrap:'wrap', marginBottom:60 }}>
          <a href="#contact" style={{ display:'inline-flex', padding:'14px 28px', background:'linear-gradient(135deg,#f5c518,#ff8c00)', color:'#0a0e14', borderRadius:50, fontFamily:'Syne,sans-serif', fontWeight:700, fontSize:'0.95rem', textDecoration:'none', boxShadow:'0 4px 24px rgba(245,197,24,.3)', transition:'transform .2s' }}
            onMouseEnter={e => e.currentTarget.style.transform='translateY(-2px)'} onMouseLeave={e => e.currentTarget.style.transform=''}>
            Get Free Quote
          </a>
          <a href="#services" style={{ display:'inline-flex', padding:'14px 28px', background:'transparent', color:'#e8eaf2', borderRadius:50, fontFamily:'Syne,sans-serif', fontWeight:600, fontSize:'0.95rem', textDecoration:'none', border:'1.5px solid rgba(245,197,24,.12)', transition:'all .2s' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor='#f5c518'; e.currentTarget.style.color='#f5c518'; }} onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(245,197,24,.12)'; e.currentTarget.style.color='#e8eaf2'; }}>
            Explore Services ↓
          </a>
        </div>
        <div style={{ display:'flex', gap:48, paddingTop:40, borderTop:'1px solid rgba(245,197,24,.12)' }}>
          {[{num:counts.installs, suffix:'+', label:'Installations'},{num:counts.years, suffix:'+', label:'Years Experience'},{num:counts.satisfaction, suffix:'%', label:'Satisfaction'}].map(s => (
            <div key={s.label}>
              <div style={{ fontFamily:'Syne,sans-serif', fontSize:'2.2rem', fontWeight:800, color:'#f5c518', lineHeight:1 }}>{s.num}{s.suffix}</div>
              <div style={{ fontSize:'0.8rem', color:'#8b95aa', marginTop:4, fontFamily:'DM Sans,sans-serif' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes pulse { 0%,100%{transform:translate(-50%,-50%) scale(1)} 50%{transform:translate(-50%,-50%) scale(1.05)} }
        @keyframes spin-slow { to{transform:translate(-50%,-50%) rotate(360deg)} }
      `}</style>
    </section>
  );
}

function Services() {
  return (
    <section id="services" style={{ padding:'100px 0', background:'#0a0e14' }}>
      <div style={{ maxWidth:1160, margin:'0 auto', padding:'0 24px' }}>
        <SectionHead label="What We Do" title="Our Solar Services" desc="From rooftop homes to industrial parks — we design, install and maintain solar systems of every scale." />
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:24 }}>
          {SERVICES.map(s => (
            <div key={s.idx} style={{ position:'relative', background:'#1a2235', border:'1px solid rgba(245,197,24,.12)', borderRadius:16, padding:'40px 36px', transition:'all .3s', overflow:'hidden' }}
              onMouseEnter={e => { e.currentTarget.style.transform='translateY(-6px)'; e.currentTarget.style.borderColor='#f5c518'; e.currentTarget.style.boxShadow='0 20px 60px rgba(245,197,24,.1)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform=''; e.currentTarget.style.borderColor='rgba(245,197,24,.12)'; e.currentTarget.style.boxShadow=''; }}>
              <span style={{ position:'absolute', top:24, right:28, fontFamily:'Syne,sans-serif', fontSize:'3.5rem', fontWeight:800, color:'#f5c518', opacity:0.06 }}>{s.idx}</span>
              <div style={{ fontSize:'2.2rem', marginBottom:20, width:64, height:64, display:'flex', alignItems:'center', justifyContent:'center', background:'rgba(245,197,24,.18)', borderRadius:16, border:'1px solid rgba(245,197,24,.12)' }}>{s.icon}</div>
              <h3 style={{ fontFamily:'Syne,sans-serif', fontSize:'1.3rem', fontWeight:700, marginBottom:12, color:'#e8eaf2' }}>{s.title}</h3>
              <p style={{ color:'#8b95aa', fontSize:'0.95rem', lineHeight:1.6, marginBottom:20, fontFamily:'DM Sans,sans-serif' }}>{s.desc}</p>
              <span style={{ color:'#f5c518', fontSize:'0.85rem', fontWeight:600 }}>Learn More →</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [fields, setFields] = useState({ name:'', phone:'', email:'', service:'', message:'' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const e = {};
    if (!fields.name.trim() || fields.name.length < 2) e.name = 'Please enter your full name.';
    if (!fields.phone.trim() || !/^[6-9]\d{9}$/.test(fields.phone.replace(/[\s+\-]/g,''))) e.phone = 'Please enter a valid 10-digit mobile number.';
    if (fields.email && !/\S+@\S+\.\S+/.test(fields.email)) e.email = 'Invalid email address.';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 1800));
    setLoading(false);
    setSuccess(true);
    setFields({ name:'', phone:'', email:'', service:'', message:'' });
  };

  const inp = (id, type='text', placeholder='') => (
    <div style={{ marginBottom:24 }}>
      <label style={{ display:'block', fontSize:'0.85rem', fontWeight:600, color:'#8b95aa', marginBottom:8, textTransform:'uppercase', letterSpacing:'0.5px', fontFamily:'DM Sans,sans-serif' }}>{id.charAt(0).toUpperCase()+id.slice(1)}</label>
      <input type={type} value={fields[id]} placeholder={placeholder}
        onChange={e => setFields(p => ({...p,[id]:e.target.value}))}
        style={{ width:'100%', padding:'13px 16px', background:'#141b28', border:`1.5px solid ${errors[id]?'#ff4d4d':'rgba(245,197,24,.12)'}`, borderRadius:8, color:'#e8eaf2', fontSize:'0.95rem', fontFamily:'DM Sans,sans-serif', outline:'none' }} />
      {errors[id] && <span style={{ fontSize:'0.8rem', color:'#ff4d4d', marginTop:4, display:'block' }}>{errors[id]}</span>}
    </div>
  );

  return (
    <section id="contact" style={{ padding:'100px 0', background:'#0a0e14' }}>
      <div style={{ maxWidth:1160, margin:'0 auto', padding:'0 24px', display:'grid', gridTemplateColumns:'1fr 1.3fr', gap:80, alignItems:'start' }}>
        <div>
          <span style={{ display:'inline-block', fontSize:12, fontWeight:600, letterSpacing:3, textTransform:'uppercase', color:'#f5c518', background:'rgba(245,197,24,.18)', border:'1px solid rgba(245,197,24,.12)', padding:'5px 16px', borderRadius:50, marginBottom:12, fontFamily:'DM Sans,sans-serif' }}>Reach Us</span>
          <h2 style={{ fontFamily:'Syne,sans-serif', fontSize:'2.5rem', fontWeight:800, marginBottom:16, color:'#e8eaf2' }}>Let's Talk Solar</h2>
          <p style={{ color:'#8b95aa', marginBottom:40, lineHeight:1.7, fontFamily:'DM Sans,sans-serif' }}>Get a free consultation and custom quote for your property. Our experts will assess your needs and recommend the best system.</p>
          {[
            { icon:'📞', label:'Call Us', lines: ['+91 96294 55664', '+91 95857 55665'] },
            { icon:'✉️', label:'Email Us', lines: ['jaisriemarketing@gmail.com'] },
            { icon:'📍', label:'Visit Us', lines: ['Sivakasi, Tamil Nadu'] },
          ].map(item => (
            <div key={item.label} style={{ display:'flex', gap:16, alignItems:'flex-start', padding:20, background:'#1a2235', border:'1px solid rgba(245,197,24,.12)', borderRadius:8, marginBottom:16 }}>
              <span style={{ fontSize:'1.4rem' }}>{item.icon}</span>
              <div>
                <div style={{ fontSize:'0.85rem', color:'#8b95aa', textTransform:'uppercase', letterSpacing:1, marginBottom:4, fontFamily:'DM Sans,sans-serif' }}>{item.label}</div>
                {item.lines.map(l => <div key={l} style={{ color:'#e8eaf2', fontSize:'0.95rem', fontFamily:'DM Sans,sans-serif' }}>{l}</div>)}
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} noValidate style={{ background:'#1a2235', border:'1px solid rgba(245,197,24,.12)', borderRadius:16, padding:40 }}>
          {inp('name','text','Ravi Kumar')}
          {inp('phone','tel','+91 98765 43210')}
          {inp('email','email','you@example.com')}
          <div style={{ marginBottom:24 }}>
            <label style={{ display:'block', fontSize:'0.85rem', fontWeight:600, color:'#8b95aa', marginBottom:8, textTransform:'uppercase', letterSpacing:'0.5px', fontFamily:'DM Sans,sans-serif' }}>Service</label>
            <select value={fields.service} onChange={e => setFields(p => ({...p,service:e.target.value}))}
              style={{ width:'100%', padding:'13px 16px', background:'#141b28', border:'1.5px solid rgba(245,197,24,.12)', borderRadius:8, color:'#e8eaf2', fontSize:'0.95rem', fontFamily:'DM Sans,sans-serif', outline:'none', appearance:'none' }}>
              <option value="">Select a service</option>
              {['Residential Solar','Commercial Solar','Industrial Solar','Water Purification'].map(o => <option key={o}>{o}</option>)}
            </select>
          </div>
          <div style={{ marginBottom:24 }}>
            <label style={{ display:'block', fontSize:'0.85rem', fontWeight:600, color:'#8b95aa', marginBottom:8, textTransform:'uppercase', letterSpacing:'0.5px', fontFamily:'DM Sans,sans-serif' }}>Message</label>
            <textarea rows={4} value={fields.message} onChange={e => setFields(p => ({...p,message:e.target.value}))}
              placeholder="Tell us about your requirement…"
              style={{ width:'100%', padding:'13px 16px', background:'#141b28', border:'1.5px solid rgba(245,197,24,.12)', borderRadius:8, color:'#e8eaf2', fontSize:'0.95rem', fontFamily:'DM Sans,sans-serif', outline:'none', resize:'vertical' }} />
          </div>
          <button type="submit" disabled={loading}
            style={{ width:'100%', padding:'15px', background:'linear-gradient(135deg,#f5c518,#ff8c00)', color:'#0a0e14', border:'none', borderRadius:8, fontFamily:'Syne,sans-serif', fontWeight:700, fontSize:'1rem', cursor:loading?'not-allowed':'pointer', opacity:loading?0.7:1, transition:'opacity .2s' }}>
            {loading ? 'Sending…' : 'Send Message'}
          </button>
          {success && <div style={{ marginTop:16, padding:16, background:'rgba(80,200,80,.1)', border:'1px solid rgba(80,200,80,.3)', borderRadius:8, color:'#7ddb7d', textAlign:'center', fontFamily:'DM Sans,sans-serif' }}>✅ Thank you! We'll get back to you within 24 hours.</div>}
        </form>
      </div>
    </section>
  );
}

function SectionHead({ label, title, desc }) {
  return (
    <div style={{ textAlign:'center', marginBottom:64 }}>
      <span style={{ display:'inline-block', fontSize:12, fontWeight:600, letterSpacing:3, textTransform:'uppercase', color:'#f5c518', background:'rgba(245,197,24,.18)', border:'1px solid rgba(245,197,24,.12)', padding:'5px 16px', borderRadius:50, marginBottom:12, fontFamily:'DM Sans,sans-serif' }}>{label}</span>
      <h2 style={{ fontFamily:'Syne,sans-serif', fontSize:'clamp(2rem,4vw,3rem)', fontWeight:800, color:'#e8eaf2', marginBottom:16 }}>{title}</h2>
      {desc && <p style={{ color:'#8b95aa', maxWidth:520, margin:'0 auto', fontFamily:'DM Sans,sans-serif', fontSize:'1.05rem' }}>{desc}</p>}
    </div>
  );
}

/* ── APP ── */
export default function App() {
  return (
    <div style={{ background:'#0a0e14', minHeight:'100vh' }}>
      <Navbar />
      <Hero />
      {/* About */}
      <section id="about" style={{ padding:'100px 0', background:'#0f1420' }}>
        <div style={{ maxWidth:1160, margin:'0 auto', padding:'0 24px', display:'grid', gridTemplateColumns:'1fr 1.4fr', gap:80, alignItems:'center' }}>
          <div style={{ background:'#1a2235', border:'1px solid rgba(245,197,24,.12)', borderRadius:16, padding:'48px 40px', textAlign:'center' }}>
            <div style={{ width:100, height:100, background:'rgba(245,197,24,.18)', border:'1px solid rgba(245,197,24,.12)', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 24px', fontSize:'2.5rem' }}>☀</div>
            <p style={{ fontFamily:'Syne,sans-serif', fontSize:'1.3rem', fontWeight:700, color:'#e8eaf2', lineHeight:1.4 }}>Illuminating Tamil Nadu<br/>since 2014</p>
          </div>
          <div>
            <span style={{ display:'inline-block', fontSize:12, fontWeight:600, letterSpacing:3, textTransform:'uppercase', color:'#f5c518', background:'rgba(245,197,24,.18)', border:'1px solid rgba(245,197,24,.12)', padding:'5px 16px', borderRadius:50, marginBottom:12, fontFamily:'DM Sans,sans-serif' }}>Who We Are</span>
            <h2 style={{ fontFamily:'Syne,sans-serif', fontSize:'2.5rem', fontWeight:800, color:'#e8eaf2', marginBottom:16 }}>Jaisrie Marketing</h2>
            <p style={{ color:'#8b95aa', marginBottom:16, fontFamily:'DM Sans,sans-serif', lineHeight:1.7 }}>We are a trusted solar and water purification solutions provider based in Sivakasi, Tamil Nadu. We specialize in designing and installing reliable solar power systems for residential, commercial, and industrial customers across South Tamil Nadu.</p>
            <p style={{ color:'#8b95aa', marginBottom:28, fontFamily:'DM Sans,sans-serif', lineHeight:1.7 }}>Our mission is to provide clean, renewable energy solutions that help customers reduce electricity bills and move towards a sustainable future.</p>
            <div style={{ display:'flex', flexWrap:'wrap', gap:10, marginBottom:28 }}>
              {['✓ Certified Installers','✓ 5-Year Warranty','✓ Free Consultation','✓ EMI Available'].map(f => (
                <span key={f} style={{ padding:'8px 16px', background:'#1a2235', border:'1px solid rgba(245,197,24,.12)', borderRadius:50, fontSize:'0.85rem', fontWeight:500, color:'#f5c518', fontFamily:'DM Sans,sans-serif' }}>{f}</span>
              ))}
            </div>
            <a href="#contact" style={{ display:'inline-flex', padding:'14px 28px', background:'linear-gradient(135deg,#f5c518,#ff8c00)', color:'#0a0e14', borderRadius:50, fontFamily:'Syne,sans-serif', fontWeight:700, textDecoration:'none' }}>Talk to an Expert</a>
          </div>
        </div>
      </section>
      <Services />
      {/* Testimonials */}
      <section id="testimonials" style={{ padding:'100px 0', background:'#0f1420' }}>
        <div style={{ maxWidth:1160, margin:'0 auto', padding:'0 24px' }}>
          <SectionHead label="Happy Customers" title="What People Say" />
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:24 }}>
            {TESTIMONIALS.map(t => (
              <div key={t.name} style={{ background:'#1a2235', border:'1px solid rgba(245,197,24,.12)', borderRadius:16, padding:'36px 32px' }}>
                <div style={{ color:'#f5c518', fontSize:'1.1rem', letterSpacing:2, marginBottom:16 }}>{'★'.repeat(t.stars)}{'☆'.repeat(5-t.stars)}</div>
                <p style={{ color:'#8b95aa', fontSize:'0.95rem', lineHeight:1.7, marginBottom:24, fontStyle:'italic', fontFamily:'DM Sans,sans-serif' }}>"{t.text}"</p>
                <div style={{ display:'flex', alignItems:'center', gap:14 }}>
                  <div style={{ width:44, height:44, borderRadius:'50%', background:'linear-gradient(135deg,#f5c518,#ff8c00)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'Syne,sans-serif', fontWeight:700, color:'#0a0e14', fontSize:'0.85rem' }}>{t.initials}</div>
                  <div>
                    <strong style={{ display:'block', fontSize:'0.95rem', color:'#e8eaf2', fontFamily:'DM Sans,sans-serif' }}>{t.name}</strong>
                    <span style={{ fontSize:'0.8rem', color:'#8b95aa', fontFamily:'DM Sans,sans-serif' }}>{t.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Contact />
      {/* Footer */}
      <footer style={{ background:'#0f1420', borderTop:'1px solid rgba(245,197,24,.12)' }}>
        <div style={{ maxWidth:1160, margin:'0 auto', padding:'64px 24px 48px', display:'grid', gridTemplateColumns:'2fr 1fr 1fr', gap:60 }}>
          <div>
            <div style={{ display:'flex', alignItems:'center', gap:10, fontFamily:'Syne,sans-serif', fontSize:'1.6rem', fontWeight:800, color:'#e8eaf2', marginBottom:8 }}>
              <span style={{ fontSize:'1.8rem' }}>☀</span> Jaisrie<span style={{ color:'#f5c518' }}>.</span>
            </div>
            <p style={{ color:'#8b95aa', fontSize:'0.9rem', lineHeight:1.6, fontFamily:'DM Sans,sans-serif' }}>Solar & Water Purifier Solutions<br/>Sivakasi, Tamil Nadu</p>
          </div>
          <div>
            <h5 style={{ fontFamily:'Syne,sans-serif', fontSize:'0.85rem', fontWeight:700, textTransform:'uppercase', letterSpacing:2, color:'#8b95aa', marginBottom:16 }}>Quick Links</h5>
            {['about','services','projects','contact'].map(l => (
              <a key={l} href={`#${l}`} style={{ display:'block', color:'#8b95aa', fontSize:'0.9rem', marginBottom:10, textDecoration:'none', textTransform:'capitalize', fontFamily:'DM Sans,sans-serif' }}>{l}</a>
            ))}
          </div>
          <div>
            <h5 style={{ fontFamily:'Syne,sans-serif', fontSize:'0.85rem', fontWeight:700, textTransform:'uppercase', letterSpacing:2, color:'#8b95aa', marginBottom:16 }}>Contact</h5>
            {['+91 96294 55664','+91 95857 55665','jaisriemarketing@gmail.com'].map(c => (
              <div key={c} style={{ color:'#8b95aa', fontSize:'0.9rem', marginBottom:10, fontFamily:'DM Sans,sans-serif' }}>{c}</div>
            ))}
          </div>
        </div>
        <div style={{ borderTop:'1px solid rgba(245,197,24,.12)', padding:'20px 24px', textAlign:'center' }}>
          <p style={{ color:'#8b95aa', fontSize:'0.85rem', fontFamily:'DM Sans,sans-serif' }}>© 2026 Jaisrie Marketing. All Rights Reserved. | Made with ☀️ in Tamil Nadu</p>
        </div>
      </footer>
    </div>
  );
}
