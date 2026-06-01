// ===== CURSOR =====
    const cursor = document.getElementById('cursor');
    const ring = document.getElementById('cursorRing');
    document.addEventListener('mousemove', e => {
      cursor.style.left = e.clientX - 6 + 'px';
      cursor.style.top  = e.clientY - 6 + 'px';
      ring.style.left   = e.clientX - 18 + 'px';
      ring.style.top    = e.clientY - 18 + 'px';
    });

    // ===== TYPED EFFECT =====
    const roles = ['Full Stack Developer', 'MCA Student', 'Problem Solver', 'Web Designer', 'Tech Enthusiast'];
    let ri = 0, ci = 0, deleting = false;
    const el = document.getElementById('typed-role');
    function typeEffect() {
      const word = roles[ri];
      if (!deleting) {
        el.textContent = word.slice(0, ++ci);
        if (ci === word.length) { deleting = true; setTimeout(typeEffect, 1400); return; }
      } else {
        el.textContent = word.slice(0, --ci);
        if (ci === 0) { deleting = false; ri = (ri + 1) % roles.length; }
      }
      setTimeout(typeEffect, deleting ? 60 : 90);
    }
    typeEffect();

    // ===== MOBILE MENU =====
    function toggleMenu() {
      const m = document.getElementById('mobile-menu');
      m.classList.toggle('hidden');
      m.classList.toggle('flex');
    }

    // ===== SCROLL ANIMATIONS =====
    const fadeEls = document.querySelectorAll('.fade-up');
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
      });
    }, { threshold: 0.15 });
    fadeEls.forEach(el => obs.observe(el));

    // ===== SKILL BARS =====
    const barObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.querySelectorAll('.skill-bar-fill').forEach(bar => {
            bar.style.width = bar.dataset.width + '%';
          });
          barObs.unobserve(e.target);
        }
      });
    }, { threshold: 0.3 });
    document.getElementById('skills').querySelectorAll('.tab-content').forEach(t => barObs.observe(t));

    // ===== TABS =====
    function switchTab(name, btn) {
      document.querySelectorAll('.tab-content').forEach(t => t.classList.add('hidden'));
      document.querySelectorAll('.tab-btn').forEach(b => { b.classList.remove('active'); b.classList.add('text-slate-500'); });
      document.getElementById('tab-' + name).classList.remove('hidden');
      btn.classList.add('active'); btn.classList.remove('text-slate-500');
      // trigger skill bars for the newly visible tab
      document.getElementById('tab-' + name).querySelectorAll('.skill-bar-fill').forEach(bar => {
        bar.style.width = bar.dataset.width + '%';
      });
    }
    // init first tab bars
    setTimeout(() => {
      document.getElementById('tab-frontend').querySelectorAll('.skill-bar-fill').forEach(bar => {
        bar.style.width = bar.dataset.width + '%';
      });
    }, 600);

    // ===== COUNTER ANIMATION =====
    function animateCounter(id, target, decimals = 0, duration = 1500) {
      const el = document.getElementById(id);
      let start = null;
      function step(ts) {
        if (!start) start = ts;
        const prog = Math.min((ts - start) / duration, 1);
        const val = prog * target;
        el.textContent = decimals ? val.toFixed(1) : Math.floor(val);
        if (prog < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }
    const aboutObs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        animateCounter('stat-projects', 5);
        animateCounter('stat-skills', 12);
        animateCounter('stat-cgpa', 8.5, 1);
        animateCounter('stat-commits', 120);
        aboutObs.unobserve(entries[0].target);
      }
    }, { threshold: 0.3 });
    aboutObs.observe(document.getElementById('about'));

    // ===== MODAL =====
    function openModal(title, body) {
      document.querySelector('#modal-box h3').textContent = title;
      document.getElementById('modal-body').textContent = body;
      document.getElementById('modal-overlay').classList.add('open');
    }
    function closeModal() { document.getElementById('modal-overlay').classList.remove('open'); }
    document.getElementById('modal-overlay').addEventListener('click', e => {
      if (e.target === document.getElementById('modal-overlay')) closeModal();
    });

    // ===== TOAST =====
    function showToast(msg) {
      const t = document.getElementById('toast');
      t.textContent = msg;
      t.classList.add('show');
      setTimeout(() => t.classList.remove('show'), 3000);
    }

    // ===== CONTACT FORM =====
    function sendMessage() {
      const name = document.getElementById('form-name').value.trim();
      const email = document.getElementById('form-email').value.trim();
      const msg = document.getElementById('form-msg').value.trim();
      if (!name || !email || !msg) { showToast('⚠ Please fill all fields'); return; }
      if (!/\S+@\S+\.\S+/.test(email)) { showToast('⚠ Invalid email address'); return; }
      document.getElementById('form-name').value = '';
      document.getElementById('form-email').value = '';
      document.getElementById('form-msg').value = '';
      showToast('✓ Message sent! I\'ll reply soon 🚀');
    }

    // ===== DOWNLOAD CV =====
    function downloadCV() { showToast('📄 CV download started!'); }

    // ===== BACK TO TOP =====
    const backBtn = document.getElementById('back-top');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) { backBtn.style.opacity = '1'; backBtn.style.pointerEvents = 'all'; }
      else { backBtn.style.opacity = '0'; backBtn.style.pointerEvents = 'none'; }
    });

    // ===== ACTIVE NAV ON SCROLL =====
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
      let cur = '';
      sections.forEach(s => { if (window.scrollY >= s.offsetTop - 100) cur = s.id; });
      document.querySelectorAll('.nav-link').forEach(l => {
        l.style.color = l.getAttribute('href') === '#' + cur ? 'var(--accent)' : '';
      });
    });