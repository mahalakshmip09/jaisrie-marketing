// ══════════════════════════════════════════
//  script.js — Jaisrie Marketing
// ══════════════════════════════════════════

//SLIDER IMAGE
  let cur = 0;
  const sl    = document.getElementById('sl');
  const dots  = document.querySelectorAll('.dot');

  function go(n) {
    cur = (n + 3) % 3;                              // wrap around 0-1-2
    sl.style.transform = `translateX(-${cur * 100 / 3}%)`; // slide left
    dots.forEach((d, i) => d.classList.toggle('on', i === cur)); // update dots
  }

  // Arrow buttons
  document.getElementById('prev').onclick = () => go(cur - 1);
  document.getElementById('next').onclick = () => go(cur + 1);

  // Dot click → go to that slide
  dots.forEach(d => d.onclick = () => go(+d.dataset.i));

  // Auto-play every 4 seconds
  setInterval(() => go(cur + 1), 4000);
// SLIDER IMAGE END FUNCTION



document.addEventListener('DOMContentLoaded', () => {

  // ── 1. NAVBAR SCROLL EFFECT ──
  const navbar = document.getElementById('navbar');
  const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 60);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ── 2. HAMBURGER TOGGLE ──
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });

  // ── 3. ANIMATED COUNTERS ──
  const counterEls = document.querySelectorAll('.stat-num');
  let countersStarted = false;

  const runCounters = () => {
    if (countersStarted) return;
    countersStarted = true;
    counterEls.forEach(el => {
      const target = +el.dataset.target;
      const duration = 2000;
      const step = target / (duration / 16);
      let current = 0;
      const timer = setInterval(() => {
        current = Math.min(current + step, target);
        el.textContent = Math.floor(current);
        if (current >= target) clearInterval(timer);
      }, 16);
    });
  };

  const heroSection = document.getElementById('home');
  const counterObserver = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) { runCounters(); counterObserver.disconnect(); }
  }, { threshold: 0.4 });
  if (heroSection) counterObserver.observe(heroSection);

  // ── 4. SCROLL REVEAL (fade-in) ──
  const fadeEls = document.querySelectorAll('.fade-in');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger children inside same parent
        const siblings = [...entry.target.parentElement.querySelectorAll('.fade-in:not(.visible)')];
        const idx = siblings.indexOf(entry.target);
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, idx * 90);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.10 });

  fadeEls.forEach(el => revealObserver.observe(el));

  // ── 5. ACTIVE NAV LINK ──
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a:not(.nav-cta)');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navAnchors.forEach(a => {
          const isActive = a.getAttribute('href') === `#${entry.target.id}`;
          a.style.color = isActive ? 'var(--red)' : '';
        });
      }
    });
  }, { threshold: 0.4 });
  sections.forEach(s => sectionObserver.observe(s));

  // ── 6. CONTACT FORM VALIDATION & SUBMIT ──
  const form       = document.getElementById('contactForm');
  const submitBtn  = document.getElementById('submitBtn');
  const btnText    = document.getElementById('btnText');
  const btnLoad    = document.getElementById('btnLoad');
  const formSuccess = document.getElementById('formSuccess');

  const clearErrors = () => {
    form.querySelectorAll('input, select, textarea').forEach(el => el.classList.remove('error'));
    form.querySelectorAll('.form-error').forEach(el => el.textContent = '');
    formSuccess.classList.add('hidden');
  };

  const showErr = (fieldId, errId, msg) => {
    document.getElementById(fieldId).classList.add('error');
    const errEl = document.getElementById(errId);
    if (errEl) errEl.textContent = msg;
  };

  const validate = ({ name, phone, email }) => {
    let ok = true;
    if (!name || name.trim().length < 2) {
      showErr('name', 'nameError', 'Please enter your full name.'); ok = false;
    }
    const ph = phone.replace(/[\s+\-()]/g, '');
    if (!phone || !/^[6-9]\d{9}$/.test(ph)) {
      showErr('phone', 'phoneError', 'Enter a valid 10-digit mobile number.'); ok = false;
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      document.getElementById('email').classList.add('error'); ok = false;
    }
    return ok;
  };

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      clearErrors();

      const data = {
        name:    document.getElementById('name').value.trim(),
        phone:   document.getElementById('phone').value.trim(),
        email:   document.getElementById('email').value.trim(),
        service: document.getElementById('service').value,
        message: document.getElementById('message').value.trim(),
      };

      if (!validate(data)) return;

      // Loading state
      btnText.classList.add('hidden');
      btnLoad.classList.remove('hidden');
      submitBtn.disabled = true;

      // Simulate API — replace with real endpoint
      await new Promise(r => setTimeout(r, 1800));

      btnText.classList.remove('hidden');
      btnLoad.classList.add('hidden');
      submitBtn.disabled = false;

      formSuccess.classList.remove('hidden');
      form.reset();

      // Scroll to success message
      formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

const res = await fetch('https://formspree.io/f/xdayenwq', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data),
});
      
      /*
      // REAL SUBMISSION — uncomment when server is ready:
      try {
        const res = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        const json = await res.json();
        if (json.success) { formSuccess.classList.remove('hidden'); form.reset(); }
        else { alert('Something went wrong. Please call us directly.'); }
      } catch {
        alert('Network error. Please call us at 96294 55664.');
      } finally {
        btnText.classList.remove('hidden');
        btnLoad.classList.add('hidden');
        submitBtn.disabled = false;
      }
      */
    });
  }

  // ── 7. SMOOTH SCROLL for anchor links ──
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

});
