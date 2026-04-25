document.addEventListener('DOMContentLoaded', () => {

    // ── Filter Logic ──────────────────────────────────────────────
    const filterBtns = document.querySelectorAll('.filter-btn');
    const entries = document.querySelectorAll('.release-entry:not(.hidden-entry)');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            entries.forEach(entry => {
                const tags = entry.getAttribute('data-tags') || '';
                if (filter === 'all') {
                    entry.classList.remove('filtered-out');
                } else {
                    const sections = entry.querySelectorAll('[data-type]');
                    let hasMatch = false;
                    sections.forEach(s => {
                        if (s.getAttribute('data-type') === filter) hasMatch = true;
                    });
                    entry.classList.toggle('filtered-out', !hasMatch);
                }
            });

            lucide.createIcons();
        });
    });

    // ── Load More ─────────────────────────────────────────────────
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    const hiddenEntries = document.querySelectorAll('.hidden-entry');
    let loaded = false;

    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            if (!loaded) {
                hiddenEntries.forEach(entry => {
                    entry.style.display = 'block';
                    entry.classList.add('release-entry');
                });
                loadMoreBtn.innerHTML = '<i data-lucide="check"></i> All releases loaded';
                loadMoreBtn.disabled = true;
                loadMoreBtn.style.color = 'var(--muted)';
                loaded = true;
                lucide.createIcons();
            }
        });
    }

    // ── Subscribe Form ────────────────────────────────────────────
    const subscribeForm = document.getElementById('subscribeForm');
    if (subscribeForm) {
        subscribeForm.addEventListener('submit', e => {
            e.preventDefault();
            const email = document.getElementById('subEmail').value;
            const btn = subscribeForm.querySelector('button');
            const originalText = btn.innerText;

            btn.innerText = 'Subscribing...';
            btn.disabled = true;

            setTimeout(() => {
                subscribeForm.innerHTML = `
                    <div style="display:flex; align-items:center; gap:0.75rem; color:#a5b4fc; font-weight:700; padding:0.5rem 0;">
                        <span style="font-size:1.5rem;">✅</span>
                        <span>Subscribed! We'll notify ${email} on every release.</span>
                    </div>
                `;
            }, 800);
        });
    }

    // ── Keyboard shortcut: 'F' to focus filter ───────────────────
    document.addEventListener('keydown', e => {
        if (e.key === 'f' && document.activeElement.tagName !== 'INPUT') {
            filterBtns[0]?.focus();
        }
    });

    // ── Scroll-spy: animate entries on scroll ─────────────────────
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.release-entry').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateX(-16px)';
            el.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            observer.observe(el);
        });
    }
});
