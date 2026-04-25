document.addEventListener('DOMContentLoaded', () => {
    // Navigation handling
    const navBtns = document.querySelectorAll('.nav-btn');
    const sections = document.querySelectorAll('.settings-section');

    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const sectionId = btn.getAttribute('data-section');

            // Update active button
            navBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Show relevant section
            sections.forEach(s => s.classList.remove('active'));
            const targetSection = document.getElementById(sectionId);
            if (targetSection) {
                targetSection.classList.add('active');
            }

            // Sync URL hash
            window.location.hash = sectionId;
        });
    });

    // Handle hash on load
    const currentHash = window.location.hash.replace('#', '');
    if (currentHash) {
        const targetBtn = document.querySelector(`.nav-btn[data-section="${currentHash}"]`);
        if (targetBtn) targetBtn.click();
    }

    // Bio character counter
    const bioTextarea = document.getElementById('profile-bio');
    const charCounter = document.querySelector('.char-counter');

    if (bioTextarea && charCounter) {
        const updateCounter = () => {
            const count = bioTextarea.value.length;
            charCounter.innerText = `${count} / 500`;
            if (count > 450) {
                charCounter.style.color = 'var(--error-red)';
            } else {
                charCounter.style.color = 'var(--text-secondary)';
            }
        };

        bioTextarea.addEventListener('input', updateCounter);
        updateCounter(); // Initial count
    }

    // Settings Form Mock Submission
    const forms = document.querySelectorAll('.settings-form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerText;

            submitBtn.innerText = 'Saving...';
            submitBtn.disabled = true;

            setTimeout(() => {
                submitBtn.innerText = 'Saved Successfully!';
                submitBtn.style.backgroundColor = 'var(--success-green)';

                setTimeout(() => {
                    submitBtn.innerText = originalText;
                    submitBtn.style.backgroundColor = '';
                    submitBtn.disabled = false;
                }, 2000);
            }, 1000);
        });
    });

    // Integration connect/disconnect toggle mock
    const integrationBtns = document.querySelectorAll('.integration-card button');
    integrationBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const card = this.closest('.integration-card');
            const isConnected = card.classList.contains('connected');

            if (isConnected) {
                card.classList.remove('connected');
                const badge = card.querySelector('.badge');
                if (badge) badge.remove();
                this.innerText = 'Connect';
                this.className = 'btn btn-primary btn-sm';
            } else {
                card.classList.add('connected');
                const cardTop = card.querySelector('.card-top');
                const badge = document.createElement('span');
                badge.className = 'badge badge-success';
                badge.innerText = 'Connected';
                cardTop.appendChild(badge);
                this.innerText = 'Disconnect';
                this.className = 'btn btn-outline btn-sm';
            }
        });
    });

    // API Key Copy
    const copyBtn = document.querySelector('.btn-copy');
    if (copyBtn) {
        copyBtn.addEventListener('click', () => {
            const input = copyBtn.previousElementSibling;
            input.type = 'text';
            input.select();
            document.execCommand('copy');
            input.type = 'password';

            const originalIcon = copyBtn.innerHTML;
            copyBtn.innerHTML = '<i data-lucide="check"></i>';
            lucide.createIcons();

            setTimeout(() => {
                copyBtn.innerHTML = originalIcon;
                lucide.createIcons();
            }, 2000);
        });
    }

    // Mobile Navigation (for smaller screens)
    // We can add a simple select dropdown that reflects the sidebar on mobile
    if (window.innerWidth <= 768) {
        const header = document.querySelector('.sidebar-top');
        const mobileNavSelect = document.createElement('select');
        mobileNavSelect.className = 'mobile-settings-nav';

        navBtns.forEach(btn => {
            const option = document.createElement('option');
            option.value = btn.getAttribute('data-section');
            option.text = btn.querySelector('span').innerText;
            mobileNavSelect.appendChild(option);
        });

        mobileNavSelect.addEventListener('change', (e) => {
            const targetBtn = document.querySelector(`.nav-btn[data-section="${e.target.value}"]`);
            if (targetBtn) targetBtn.click();
        });

        header.appendChild(mobileNavSelect);
    }
});
