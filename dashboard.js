document.addEventListener('DOMContentLoaded', () => {
    // Sidebar Collapse Logic
    const sidebar = document.querySelector('.sidebar');
    const collapseBtn = document.querySelector('.collapse-btn');
    const mainContainer = document.querySelector('.main-container');

    if (collapseBtn) {
        collapseBtn.addEventListener('click', () => {
            sidebar.classList.toggle('collapsed');

            // Re-size charts if necessary (mock charts for now)
            const charts = document.querySelectorAll('svg');
            charts.forEach(chart => {
                // In a real app with Chart.js, we would call chart.resize()
            });
        });
    }

    // Keyboard Shortcuts (⌘K for Search)
    document.addEventListener('keydown', (e) => {
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
            e.preventDefault();
            document.querySelector('.search-input-wrapper input').focus();
        }
    });

    // Sidebar Active State Toggle
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function (e) {
            navItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Mobile Bottom Nav Active State
    const bottomNavItems = document.querySelectorAll('.bottom-nav a');
    bottomNavItems.forEach(item => {
        item.addEventListener('click', function (e) {
            bottomNavItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Real-time Update Indicator Mock
    const stats = document.querySelectorAll('.stat-value');
    setInterval(() => {
        const randomIndex = Math.floor(Math.random() * stats.length);
        const stat = stats[randomIndex];
        // Only update certain stats for realism
        if (stat.innerText.includes('h') || stat.innerText.length > 3) return;

        const currentValue = parseInt(stat.innerText);
        if (!isNaN(currentValue)) {
            const newValue = currentValue + (Math.random() > 0.5 ? 1 : -1);
            if (newValue > 0) {
                stat.style.transition = 'color 0.3s';
                stat.style.color = '#6366f1';
                stat.innerText = newValue;
                setTimeout(() => {
                    stat.style.color = '';
                }, 1000);
            }
        }
    }, 5000);

    // Notification Mock
    const notificationBtn = document.querySelector('.header-btn');
    if (notificationBtn) {
        notificationBtn.addEventListener('click', () => {
            const dot = notificationBtn.querySelector('.notification-dot');
            if (dot) dot.style.display = 'none';
            alert('Recent Notifications:\n1. Task assigned: Update lake maps\n2. Deadline approaching: Website Redesign\n3. New message from Sarah');
        });
    }
});
