const INTEGRATIONS = [
    { id: 1, name: 'Razorpay', emoji: '₹', bg: '#f1f5ff', description: 'Secure payment gateway for bookings & artisan sales.', category: 'payments', badge: 'official', rating: 4.8, installs: 12450, href: 'integration-detail.html' },
    { id: 2, name: 'Google Maps', emoji: '🗺', bg: '#fef9c3', description: 'Embed destination maps and route navigation for travelers.', category: 'maps', badge: 'official', rating: 4.9, installs: 18200, href: '#' },
    { id: 3, name: 'WhatsApp Business', emoji: '💬', bg: '#f0fdf4', description: 'Send booking confirmations and artisan alerts.', category: 'communication', badge: 'official', rating: 4.7, installs: 9870, href: '#' },
    { id: 4, name: 'Google Analytics', emoji: '📊', bg: '#ffe4e6', description: 'Track tourist behavior and conversion insights.', category: 'analytics', badge: 'official', rating: 4.8, installs: 14110, href: '#' },
    { id: 5, name: 'Slack', emoji: '🔴', bg: '#fff1f2', description: 'Receive booking alerts in your team Slack channels.', category: 'communication', badge: 'community', rating: 4.5, installs: 7800, href: '#' },
    { id: 6, name: 'GitHub', emoji: '🐙', bg: '#f1f5f9', description: 'Sync deployment logs and platform updates.', category: 'other', badge: 'official', rating: 4.6, installs: 5300, href: '#' },
    { id: 7, name: 'Google Drive', emoji: '☁', bg: '#eff6ff', description: 'Store eco certificates and artisan documentation.', category: 'storage', badge: 'official', rating: 4.7, installs: 8400, href: '#' },
    { id: 8, name: 'Zapier', emoji: '⚡', bg: '#fffbeb', description: 'Connect EcoKumari to 3000+ apps automatically.', category: 'other', badge: 'official', rating: 4.4, installs: 11600, href: '#' },
    { id: 9, name: 'Figma', emoji: '🎨', bg: '#fdf4ff', description: 'Embed tourism branding assets and design handoffs.', category: 'storage', badge: 'community', rating: 4.3, installs: 3200, href: '#' },
    { id: 10, name: 'Tally', emoji: '🧾', bg: '#f0fdf4', description: 'Manage tribal income records & tax compliance reports.', category: 'government', badge: 'official', rating: 4.6, installs: 4100, href: '#' },
    { id: 11, name: 'Zoom', emoji: '📹', bg: '#eff6ff', description: 'Schedule virtual artisan workshops and review meetings.', category: 'communication', badge: 'official', rating: 4.5, installs: 6200, href: '#' },
    { id: 12, name: 'Mailchimp', emoji: '📢', bg: '#fff7ed', description: 'Send eco-tourism campaigns and newsletters to subscribers.', category: 'marketing', badge: 'official', rating: 4.4, installs: 5900, href: '#' },
    { id: 13, name: 'Stripe', emoji: '💳', bg: '#f5f3ff', description: 'International payment processing for premium eco stays.', category: 'payments', badge: 'official', rating: 4.7, installs: 7400, href: '#' },
    { id: 14, name: 'Twilio SMS', emoji: '📱', bg: '#f0fdf4', description: 'Send SMS alerts for bookings and artisan order updates.', category: 'communication', badge: 'official', rating: 4.6, installs: 5100, href: '#' },
    { id: 15, name: 'Mapbox', emoji: '📍', bg: '#fffbeb', description: 'Advanced custom map rendering for eco destinations.', category: 'maps', badge: 'community', rating: 4.4, installs: 3600, href: '#' },
    { id: 16, name: 'Dropbox', emoji: '📦', bg: '#eff6ff', description: 'Cloud storage for tourism permit files and certificates.', category: 'storage', badge: 'community', rating: 4.2, installs: 2800, href: '#' },
    { id: 17, name: 'Mixpanel', emoji: '📈', bg: '#fdf4ff', description: 'Track user journeys and funnel analytics for platform growth.', category: 'analytics', badge: 'official', rating: 4.5, installs: 4900, href: '#' },
    { id: 18, name: 'GSTN API', emoji: '🏛', bg: '#f0fdf4', description: 'Verify GST numbers for registered eco tourism businesses.', category: 'government', badge: 'official', rating: 4.7, installs: 3300, href: '#' },
    { id: 19, name: 'PayU', emoji: '💰', bg: '#ffe4e6', description: 'Alternative payment gateway popular in rural tourism segments.', category: 'payments', badge: 'community', rating: 4.3, installs: 2100, href: '#' },
    { id: 20, name: 'Hotjar', emoji: '🔥', bg: '#fff7ed', description: 'Heatmaps and session recordings for UI research.', category: 'analytics', badge: 'community', rating: 4.2, installs: 3800, href: '#' },
    { id: 21, name: 'HubSpot', emoji: '🎯', bg: '#fff7ed', description: 'CRM for managing tour operators and institutional leads.', category: 'marketing', badge: 'official', rating: 4.4, installs: 5600, href: '#' },
    { id: 22, name: 'Paytm', emoji: '🟣', bg: '#f5f3ff', description: 'Paytm wallet support for quick eco stay checkout.', category: 'payments', badge: 'community', rating: 4.1, installs: 6800, href: '#' },
    { id: 23, name: 'HERE Maps', emoji: '🗾', bg: '#fef9c3', description: 'Offline-first maps for remote tribal and eco zones.', category: 'maps', badge: 'community', rating: 4.3, installs: 1900, href: '#' },
    { id: 24, name: 'OneDrive', emoji: '🔵', bg: '#eff6ff', description: 'Microsoft cloud storage integration for government partners.', category: 'storage', badge: 'official', rating: 4.3, installs: 2600, href: '#' },
];

let filteredData = [...INTEGRATIONS];

const grid = document.getElementById('intGrid');
const gridCount = document.getElementById('gridCount');
const noResults = document.getElementById('noResults');
const noResultsQuery = document.getElementById('noResultsQuery');

function renderGrid(data) {
    grid.innerHTML = '';
    if (data.length === 0) {
        noResults.style.display = 'block';
        grid.style.display = 'none';
        gridCount.textContent = '0 integrations';
        noResultsQuery.textContent = document.getElementById('intSearch').value;
        lucide.createIcons();
        return;
    }
    noResults.style.display = 'none';
    grid.style.display = 'grid';
    gridCount.textContent = `${data.length} integration${data.length !== 1 ? 's' : ''}`;

    data.forEach(item => {
        const card = document.createElement('a');
        card.href = item.href;
        card.className = 'int-card';
        card.innerHTML = `
            <div style="display:flex; align-items:center; gap:0.85rem;">
                <div class="int-card-logo" style="background:${item.bg};">${item.emoji}</div>
                <div class="int-card-info">
                    <h4>${item.name}</h4>
                    <div style="display:flex; gap:0.5rem; align-items:center; margin-top:2px;">
                        <span class="cat-tag">${formatCategory(item.category)}</span>
                        <span class="${item.badge === 'official' ? 'badge-official' : 'badge-community'}">${item.badge === 'official' ? 'Official' : 'Community'}</span>
                    </div>
                </div>
            </div>
            <p class="int-card-desc" style="font-size:0.8rem; color:var(--muted); line-height:1.5; margin:0;">${item.description}</p>
            <div class="int-card-footer">
                <div class="int-card-rating">⭐ ${item.rating} · ${(item.installs / 1000).toFixed(1)}k installs</div>
                <button class="btn-connect" onclick="event.preventDefault();">Connect</button>
            </div>
        `;
        grid.appendChild(card);
    });
    lucide.createIcons();
}

function formatCategory(cat) {
    const map = { payments: 'Payments', communication: 'Communication', maps: 'Maps', storage: 'Storage', analytics: 'Analytics', marketing: 'Marketing', government: 'Govt', other: 'Other' };
    return map[cat] || cat;
}

function applyFilters() {
    const query = document.getElementById('intSearch').value.toLowerCase();
    const activeCat = document.querySelector('.cat-item.active')?.getAttribute('data-cat') || 'all';
    const sort = document.getElementById('sortSelect').value;

    let result = INTEGRATIONS.filter(item => {
        const matchCat = activeCat === 'all' || item.category === activeCat;
        const matchSearch = item.name.toLowerCase().includes(query) || item.description.toLowerCase().includes(query) || item.category.toLowerCase().includes(query);
        return matchCat && matchSearch;
    });

    if (sort === 'popular') result.sort((a, b) => b.installs - a.installs);
    else if (sort === 'rating') result.sort((a, b) => b.rating - a.rating);

    filteredData = result;
    renderGrid(filteredData);
}

// Search
document.getElementById('intSearch').addEventListener('input', (e) => {
    document.getElementById('clearSearch').style.display = e.target.value ? 'flex' : 'none';
    applyFilters();
});

document.getElementById('clearSearch').addEventListener('click', () => {
    document.getElementById('intSearch').value = '';
    document.getElementById('clearSearch').style.display = 'none';
    applyFilters();
});

// Category clicks
document.querySelectorAll('.cat-item').forEach(item => {
    item.addEventListener('click', () => {
        document.querySelectorAll('.cat-item').forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        applyFilters();
    });
});

// Sort
document.getElementById('sortSelect').addEventListener('change', applyFilters);

// Modal
const modal = document.getElementById('requestModal');
document.getElementById('requestIntBtn').addEventListener('click', () => modal.style.display = 'flex');
document.getElementById('closeModal').addEventListener('click', () => modal.style.display = 'none');
modal.addEventListener('click', (e) => { if (e.target === modal) modal.style.display = 'none'; });

document.getElementById('requestForm').addEventListener('submit', (e) => {
    e.preventDefault();
    modal.innerHTML = `
        <div class="modal-card" style="text-align:center; padding: 4rem 2rem;">
            <div style="font-size:3rem;margin-bottom:1rem;">🙌</div>
            <h3>Integration Requested!</h3>
            <p style="color:var(--muted); margin-top:0.5rem;">We'll review your request and notify you via email.</p>
            <button onclick="document.getElementById('requestModal').style.display='none'" class="btn-connect" style="margin-top:2rem; padding: 0.75rem 2rem;">Done</button>
        </div>`;
    lucide.createIcons();
});

// Keyboard shortcut '/'
document.addEventListener('keydown', (e) => {
    if (e.key === '/' && document.activeElement.tagName !== 'INPUT') {
        e.preventDefault();
        document.getElementById('intSearch').focus();
    }
});

// Init
renderGrid(INTEGRATIONS);
