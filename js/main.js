// HostelEase — Main JavaScript

document.addEventListener('DOMContentLoaded', () => {

  // ── SCROLL REVEAL ──
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in-view');
        revealObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => revealObserver.observe(el));

  // ── MODAL ──
  const modal = document.getElementById('authModal');
  window.openModal = function(tab = 'signin') {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    if (tab) switchModalTab(tab);
  };
  window.closeModal = function() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  };
  modal?.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  window.switchModalTab = function(tab) {
    document.querySelectorAll('.modal-tab').forEach(t => {
      t.classList.toggle('active', t.dataset.tab === tab);
    });
    document.querySelectorAll('.modal-panel').forEach(p => {
      p.classList.toggle('active', p.id === 'modal-' + tab);
    });
  };

  // ── ABOUT ROOM TABS ──
  window.switchAboutTab = function(id) {
    document.querySelectorAll('.room-tab-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.tab === id);
    });
    document.querySelectorAll('.room-tab-panel').forEach(p => {
      p.classList.toggle('active', p.id === 'rtab-' + id);
    });
  };

  // ── COUNTER ANIMATION ──
  function animateCounters() {
    document.querySelectorAll('[data-count]').forEach(el => {
      const target = parseInt(el.dataset.count, 10);
      const duration = 1800;
      const step = target / (duration / 16);
      let current = 0;
      const timer = setInterval(() => {
        current += step;
        if (current >= target) { current = target; clearInterval(timer); }
        el.textContent = Math.floor(current).toLocaleString();
      }, 16);
    });
  }
  const statsSection = document.getElementById('stats-section');
  if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        animateCounters();
        statsObserver.disconnect();
      }
    }, { threshold: 0.3 });
    statsObserver.observe(statsSection);
  }

  // ── ACTIVE NAV LINK ──
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-links > li[data-section]');
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        navItems.forEach(li => {
          li.classList.toggle('active', li.dataset.section === e.target.id);
        });
      }
    });
  }, { threshold: 0.4 });
  sections.forEach(s => sectionObserver.observe(s));

  // ── FORM SUBMISSION FEEDBACK ──
  document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('[type=submit], button:last-child');
      const original = btn.textContent;
      btn.textContent = 'Submitting…';
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = '✓ Submitted!';
        btn.style.background = '#27ae60';
        setTimeout(() => {
          btn.textContent = original;
          btn.disabled = false;
          btn.style.background = '';
          form.reset();
        }, 2500);
      }, 1000);
    });
  });

  // ── NOTICE BAND DISMISS ──
  const noticeBand = document.getElementById('noticeBand');
  const noticeClose = document.getElementById('noticeClose');
  noticeClose?.addEventListener('click', () => {
    noticeBand.style.maxHeight = noticeBand.offsetHeight + 'px';
    requestAnimationFrame(() => {
      noticeBand.style.transition = 'max-height 0.4s ease, opacity 0.3s ease';
      noticeBand.style.maxHeight = '0';
      noticeBand.style.overflow = 'hidden';
      noticeBand.style.opacity = '0';
    });
  });

});
