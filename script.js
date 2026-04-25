document.addEventListener('DOMContentLoaded', () => {
    // ── FAQ Accordion ──────────────────────────────────────────────
    document.querySelectorAll('.faq-item').forEach(item => {
        const btn = item.querySelector('.faq-q, .faq-question');
        if (!btn) return;
        btn.addEventListener('click', () => {
            const isOpen = item.classList.contains('open') || item.classList.contains('active');
            document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open', 'active'));
            if (!isOpen) item.classList.add('open', 'active');
            if (window.lucide) lucide.createIcons();
        });
    });

    // ── Smooth Scroll for anchor links ───────────────────────────
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const target = document.querySelector(a.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // ── Navbar scroll effect ──────────────────────────────────────
    const navbar = document.getElementById('navbar') || document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            navbar.classList.toggle('scrolled', window.scrollY > 40);
        });
    }

    // ── Hamburger / mobile nav ────────────────────────────────────
    const hamburger = document.getElementById('hamburger') || document.querySelector('.hamburger, .mobile-menu-toggle');
    const navLinks = document.getElementById('navLinks') || document.querySelector('.nav-links');
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('open');
            hamburger.classList.toggle('active');
        });
        // Close on outside click
        document.addEventListener('click', e => {
            if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('open');
                hamburger.classList.remove('active');
            }
        });
    }

    // ── Stakeholder tabs ─────────────────────────────────────────
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
            btn.classList.add('active');
            const target = document.getElementById('tab-' + btn.dataset.tab);
            if (target) target.classList.add('active');
            if (window.lucide) lucide.createIcons();
        });
    });

    // ── CTA / email form ─────────────────────────────────────────
    ['ctaForm', 'cta-form'].forEach(id => {
        const form = document.getElementById(id) || document.querySelector('.' + id);
        if (form) {
            form.addEventListener('submit', e => {
                e.preventDefault();
                window.location.href = 'signup.html';
            });
        }
    });

    // ── Premium Parallax Micro-interactions ─────────────────────
    document.addEventListener('mousemove', (e) => {
        const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
        const moveY = (e.clientY - window.innerHeight / 2) * 0.01;

        document.querySelectorAll('.floating-widget, .dot-pattern').forEach(el => {
            const speed = el.classList.contains('w-1') ? 2 : el.classList.contains('w-2') ? 1.5 : 1;
            el.style.transform = `translate(${moveX * speed}px, ${moveY * speed}px)`;
        });
    });

    // ── Intersection Observer – premium fade-in ───────────────────
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fadeInUp');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll(
        '.feature-card, .stay-card, .product-card, .problem-card, .ai-card, .stat-pill, .partner-chip'
    ).forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });

    // ── Booking modal (stays page) ────────────────────────────────
    const modal = document.getElementById('bookingModal');
    const modalCls = document.getElementById('modalClose');
    document.querySelectorAll('.book-btn, .btn-sm-green').forEach(btn => {
        btn.addEventListener('click', e => {
            if (modal) { e.preventDefault(); modal.classList.add('open'); }
        });
    });
    if (modalCls) modalCls.addEventListener('click', () => modal.classList.remove('open'));
    if (modal) modal.addEventListener('click', e => { if (e.target === modal) modal.classList.remove('open'); });

    // ── Stays search/filter ───────────────────────────────────────
    const filterBtns = document.querySelectorAll('.filter-pill');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const cat = btn.dataset.cat;
            document.querySelectorAll('.stay-card[data-cat], .product-card[data-cat]').forEach(card => {
                card.style.display = (cat === 'all' || card.dataset.cat === cat) ? '' : 'none';
            });
        });
    });
});

/* Fade-in CSS injected by JS if not in stylesheet */
(function () {
    if (!document.getElementById('fade-style')) {
        const s = document.createElement('style');
        s.id = 'fade-style';
        s.textContent = `
      .fade-on-scroll { opacity:0; transform:translateY(22px); transition:opacity .5s ease, transform .5s ease; }
      .fade-on-scroll.visible { opacity:1; transform:translateY(0); }
    `;
        document.head.appendChild(s);
    }
})();
