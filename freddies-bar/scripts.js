// Freddie's Bar JavaScript

// Navigation functions
function showSection(sectionName) {
    // Hide all sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Remove active class from all nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    // Show selected section and activate nav link
    document.getElementById(sectionName + '-section').classList.add('active');
    event.target.classList.add('active');
}

// Menu category switching
function showMenuCategory(category) {
    // Hide all menu categories
    document.querySelectorAll('.menu-category').forEach(cat => {
        cat.classList.remove('active');
    });
    
    // Remove active class from all menu tabs
    document.querySelectorAll('.menu-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Show selected category and activate tab
    document.getElementById(category + '-menu').classList.add('active');
    event.target.classList.add('active');
}

// Web ring navigation
const webRingSites = [
    { name: "King Wash Laundromat", url: "../index.html", icon: "👑" },
    { name: "Freddie's Bar", url: "#", icon: "🍺" },
    { name: "Cosmic Coffee", url: "../cosmic-coffee/index.html", icon: "☕" },
    { name: "Acosta Store", url: "../acosta-store/index.html", icon: "🛒" },
    { name: "Downtown Contracts", url: "../downtown-contracts/index.html", icon: "🏢" }
];

let currentSiteIndex = 1; // Start at Freddie's Bar (index 1)

function navigateWebRing(direction) {
    if (direction === 'next') {
        currentSiteIndex = (currentSiteIndex + 1) % webRingSites.length;
    } else {
        currentSiteIndex = (currentSiteIndex - 1 + webRingSites.length) % webRingSites.length;
    }
    
    const site = webRingSites[currentSiteIndex];
    if (site.url.startsWith('http')) {
        window.open(site.url, '_blank');
    } else if (site.url !== '#') {
        window.location.href = site.url;
    } else {
        alert(`Already at ${site.name}!`);
    }
}

// Dynamic lighting effects for nightclub section
function initNightclubEffects() {
    const clubFeatures = document.querySelectorAll('.club-feature');
    const scheduleItems = document.querySelectorAll('.schedule-item');
    
    // Add pulsing effect to club features
    clubFeatures.forEach((feature, index) => {
        feature.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 0 40px rgba(6, 182, 212, 0.6)';
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        feature.addEventListener('mouseleave', function() {
            this.style.boxShadow = '0 0 30px rgba(6, 182, 212, 0.3)';
            this.style.transform = 'translateY(-5px) scale(1)';
        });
    });
    
    // Add special effects to featured schedule item
    const featuredItem = document.querySelector('.schedule-item.featured');
    if (featuredItem) {
        setInterval(() => {
            featuredItem.style.boxShadow = '0 0 30px rgba(236, 72, 153, 0.8)';
            setTimeout(() => {
                featuredItem.style.boxShadow = '0 0 20px rgba(6, 182, 212, 0.3)';
            }, 1000);
        }, 3000);
    }
}

// Add drink ordering simulation
function orderDrink(drinkName, price) {
    const confirmation = confirm(`Order ${drinkName} for ${price} SC?`);
    if (confirmation) {
        alert(`${drinkName} ordered! Your drink will be ready at the bar shortly. Total: ${price} SC`);
        
        // If user has King Wash loyalty, add points
        const loyaltyData = JSON.parse(localStorage.getItem('kingWashLoyalty') || '{}');
        if (loyaltyData.currentTier) {
            const points = Math.floor(parseInt(price) * 0.1); // 10% of price as points
            loyaltyData.totalPoints = (loyaltyData.totalPoints || 0) + points;
            localStorage.setItem('kingWashLoyalty', JSON.stringify(loyaltyData));
            alert(`Bonus: ${points} King Wash loyalty points added to your account!`);
        }
    }
}

// Add click handlers to menu items
function initMenuInteractions() {
    document.querySelectorAll('.menu-item').forEach(item => {
        item.addEventListener('click', function() {
            const drinkName = this.querySelector('h4').textContent;
            const price = this.querySelector('.price').textContent;
            orderDrink(drinkName, price);
        });
        
        // Add hover effect
        item.addEventListener('mouseenter', function() {
            this.style.cursor = 'pointer';
            this.style.backgroundColor = '#374151';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.backgroundColor = '#1f2937';
        });
    });
}

// Event reservation system
function reserveEvent(eventName) {
    const confirmation = confirm(`Reserve spot for ${eventName}? This will add you to the guest list.`);
    if (confirmation) {
        alert(`Reservation confirmed for ${eventName}! Check in at the door with your name.`);
    }
}

// Add click handlers to event cards
function initEventInteractions() {
    document.querySelectorAll('.event-card').forEach(card => {
        card.addEventListener('click', function() {
            const eventName = this.querySelector('h3').textContent;
            reserveEvent(eventName);
        });
        
        card.addEventListener('mouseenter', function() {
            this.style.cursor = 'pointer';
        });
    });
}

// VIP table booking
function bookVIPTable() {
    const confirmation = confirm('Book VIP table for tonight? Includes bottle service and reserved seating. Cost: 500 SC');
    if (confirmation) {
        alert('VIP table reserved! Please arrive 30 minutes early for seating. A host will assist you upon arrival.');
    }
}

// Add atmosphere sounds (placeholder for future audio implementation)
function initAtmosphereEffects() {
    // This would integrate with actual audio files when available
    console.log('Atmosphere effects initialized - add background music and sound effects');
}

// Loyalty program integration
function checkLoyaltyStatus() {
    const loyaltyData = JSON.parse(localStorage.getItem('kingWashLoyalty') || '{}');
    if (loyaltyData.currentTier) {
        // Show loyalty benefits
        const benefitsElement = document.createElement('div');
        benefitsElement.className = 'loyalty-status';
        benefitsElement.innerHTML = `
            <div class="loyalty-banner">
                🎉 King Wash ${loyaltyData.currentTier} Member Benefits Active!
                <ul>
                    <li>10% off food orders</li>
                    <li>Free appetizer on laundry day</li>
                    <li>Priority seating available</li>
                    <li>Earn 50 bonus points per visit</li>
                </ul>
            </div>
        `;
        
        // Add to header
        const header = document.querySelector('.bar-header');
        header.appendChild(benefitsElement);
        
        // Style the loyalty banner
        const style = document.createElement('style');
        style.textContent = `
            .loyalty-banner {
                background: linear-gradient(45deg, #f59e0b, #dc2626);
                color: white;
                padding: 1rem;
                text-align: center;
                font-weight: bold;
                margin-top: 1rem;
                border-radius: 8px;
            }
            .loyalty-banner ul {
                list-style: none;
                display: flex;
                gap: 1rem;
                justify-content: center;
                margin-top: 0.5rem;
                flex-wrap: wrap;
            }
            .loyalty-banner li {
                background: rgba(255, 255, 255, 0.2);
                padding: 0.25rem 0.75rem;
                border-radius: 15px;
                font-size: 0.9rem;
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize all interactive features
document.addEventListener('DOMContentLoaded', function() {
    initNightclubEffects();
    initMenuInteractions();
    initEventInteractions();
    initAtmosphereEffects();
    checkLoyaltyStatus();
    
    // Add VIP booking button to nightclub section
    const nightclubSection = document.getElementById('nightclub-section');
    const vipButton = document.createElement('button');
    vipButton.textContent = 'Book VIP Table';
    vipButton.className = 'cta-button primary';
    vipButton.style.margin = '2rem auto';
    vipButton.style.display = 'block';
    vipButton.onclick = bookVIPTable;
    
    const clubInfo = nightclubSection.querySelector('.club-info');
    clubInfo.appendChild(vipButton);
});

// Add some dynamic content updates
setInterval(() => {
    // Update "now playing" or current event status
    const now = new Date();
    const hour = now.getHours();
    const day = now.getDay();
    
    let currentStatus = '';
    
    if (hour >= 21 && hour < 3 && (day === 4 || day === 5 || day === 6)) {
        currentStatus = '🎵 Underground club is LIVE! DJ spinning now!';
    } else if (hour >= 16 && hour < 2) {
        currentStatus = '🍺 Main bar is open! Happy hour specials available!';
    } else {
        currentStatus = '💤 Currently closed - see you tonight!';
    }
    
    // Update status if element exists
    const statusElement = document.getElementById('current-status');
    if (statusElement) {
        statusElement.textContent = currentStatus;
    }
}, 60000); // Update every minute