// ── script.js — Jaisrie Marketing ──

document.addEventListener('DOMContentLoaded', () => {

  // ── 1. NAVBAR SCROLL ──
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  });

  // ── 2. HAMBURGER MENU ──
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });
  // Close menu on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });

  // ── 3. COUNTER ANIMATION ──
  const counters = document.querySelectorAll('.stat-num');
  const animateCounter = (el) => {
    const target = +el.dataset.target;
    const duration = 1800;
    const step = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) { current = target; clearInterval(timer); }
      el.textContent = Math.floor(current);
    }, 16);
  };

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => counterObserver.observe(c));

  // ── 4. SCROLL REVEAL ──
  const fadeEls = document.querySelectorAll(
    '.service-card, .project-card, .testi-card, .contact-item, .about-card, .about-text'
  );
  fadeEls.forEach(el => el.classList.add('fade-in'));

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  fadeEls.forEach(el => revealObserver.observe(el));

  // ── 5. TESTIMONIALS SLIDER ──
  const track   = document.getElementById('testimonialsTrack');
  const cards   = track.querySelectorAll('.testi-card');
  const prevBtn = document.getElementById('testiPrev');
  const nextBtn = document.getElementById('testiNext');
  let current   = 0;

  const getVisible = () => {
    if (window.innerWidth < 768) return 1;
    if (window.innerWidth < 1024) return 2;
    return 3;
  };

  const updateSlider = () => {
    const visible = getVisible();
    const maxIdx  = Math.max(0, cards.length - visible);
    current = Math.min(current, maxIdx);
    const pct = (100 / visible) * current;
    track.style.transform = `translateX(-${pct}%)`;
  };

  prevBtn.addEventListener('click', () => { current = Math.max(0, current - 1); updateSlider(); });
  nextBtn.addEventListener('click', () => {
    const maxIdx = Math.max(0, cards.length - getVisible());
    current = Math.min(maxIdx, current + 1);
    updateSlider();
  });
  window.addEventListener('resize', updateSlider);

  // Auto-advance
  setInterval(() => {
    const maxIdx = Math.max(0, cards.length - getVisible());
    current = current >= maxIdx ? 0 : current + 1;
    updateSlider();
  }, 5000);

  // ── 6. CONTACT FORM VALIDATION & SUBMIT ──
  const form       = document.getElementById('contactForm');
  const submitBtn  = document.getElementById('submitBtn');
  const btnText    = submitBtn.querySelector('.btn-text');
  const btnLoading = submitBtn.querySelector('.btn-loading');
  const formSuccess = document.getElementById('formSuccess');

  const showError = (fieldId, errId, msg) => {
    document.getElementById(fieldId).classList.add('error');
    document.getElementById(errId).textContent = msg;
  };
  const clearErrors = () => {
    form.querySelectorAll('input, select, textarea').forEach(el => el.classList.remove('error'));
    form.querySelectorAll('.form-error').forEach(el => el.textContent = '');
    formSuccess.classList.add('hidden');
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearErrors();

    const name  = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email').value.trim();
    let valid   = true;

    if (!name || name.length < 2) {
      showError('name', 'nameError', 'Please enter your full name.'); valid = false;
    }
    if (!phone || !/^[6-9]\d{9}$/.test(phone.replace(/[\s+\-]/g,''))) {
      showError('phone', 'phoneError', 'Please enter a valid 10-digit mobile number.'); valid = false;
    }
    if (email && !/\S+@\S+\.\S+/.test(email)) {
      document.getElementById('email').classList.add('error'); valid = false;
    }

    if (!valid) return;

    // Simulate sending
    btnText.classList.add('hidden');
    btnLoading.classList.remove('hidden');
    submitBtn.disabled = true;

    await new Promise(r => setTimeout(r, 1800));

    btnText.classList.remove('hidden');
    btnLoading.classList.add('hidden');
    submitBtn.disabled = false;
    formSuccess.classList.remove('hidden');
    form.reset();

    // In production, replace the timeout above with a real fetch:
    // await fetch('/api/contact', { method: 'POST', headers:{'Content-Type':'application/json'},
    //   body: JSON.stringify({ name, phone, email, ... }) });
  });

  // ── 7. SMOOTH ACTIVE NAV HIGHLIGHT ──
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav-links a:not(.nav-cta)');

  const activeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        links.forEach(l => l.style.color = '');
        const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
        if (active) active.style.color = 'var(--accent)';
      }
    });
  }, { threshold: 0.4 });
  sections.forEach(s => activeObserver.observe(s));

});
