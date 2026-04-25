document.addEventListener('DOMContentLoaded', () => {
    // Search focus on '/' key
    const searchInput = document.getElementById('helpSearch');
    if (searchInput) {
        document.addEventListener('keydown', (e) => {
            if (e.key === '/' && document.activeElement !== searchInput) {
                e.preventDefault();
                searchInput.focus();
            }
        });
    }

    // TOC Active State on Scroll
    const tocLinks = document.querySelectorAll('#toc a');
    const sections = document.querySelectorAll('h2[id], p[id]');

    if (tocLinks.length > 0) {
        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (window.scrollY >= sectionTop - 120) {
                    current = section.getAttribute('id');
                }
            });

            tocLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').substring(1) === current) {
                    link.classList.add('active');
                }
            });
        });
    }

    // Feedback Mock
    const feedbackBtns = document.querySelectorAll('.feedback-btns button');
    const feedbackSection = document.querySelector('.article-feedback');

    feedbackBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            feedbackSection.innerHTML = `
                <div class="feedback-thanks" style="animation: fadeIn 0.3s ease-out">
                    <p style="color: var(--success-green)">Thank you for your feedback!</p>
                </div>
            `;
        });
    });

    // Mock Search Results (Optional for demo)
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const val = e.target.value.toLowerCase();
            // This is where real search indexing logic would go
            // For now, it's a visual placeholder
        });
    }

    // Popular Searches Pill Click
    const pills = document.querySelectorAll('.pill-btn');
    pills.forEach(pill => {
        pill.addEventListener('click', () => {
            if (searchInput) {
                searchInput.value = pill.innerText;
                searchInput.focus();
            }
        });
    });
});
