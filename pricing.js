document.addEventListener('DOMContentLoaded', () => {
    // Billing Toggle Logic
    const billingToggle = document.getElementById('billingToggle');
    const proPrice = document.getElementById('proPrice');
    const monthlyLabel = document.getElementById('monthlyLabel');
    const annualLabel = document.getElementById('annualLabel');

    if (billingToggle) {
        billingToggle.addEventListener('click', () => {
            const isAnnual = billingToggle.classList.toggle('annual');

            if (isAnnual) {
                // Annual Prices
                proPrice.innerText = '799';
                proPrice.style.transform = 'scale(1.1)';
                setTimeout(() => proPrice.style.transform = 'scale(1)', 200);

                annualLabel.classList.add('active');
                monthlyLabel.classList.remove('active');
            } else {
                // Monthly Prices
                proPrice.innerText = '999';
                proPrice.style.transform = 'scale(1.1)';
                setTimeout(() => proPrice.style.transform = 'scale(1)', 200);

                monthlyLabel.classList.add('active');
                annualLabel.classList.remove('active');
            }
        });

        // Set initial state
        monthlyLabel.classList.add('active');
    }

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all items
            faqItems.forEach(i => i.classList.remove('active'));

            // Toggle clicked item
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // Smooth scroll for anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
