// Cosmic Coffee JavaScript

// Navigation and Section Management
function showSection(sectionName) {
    // Hide all sections
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Show target section
    const targetSection = document.getElementById(sectionName + '-section');
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    // Update navigation
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    
    const activeLink = document.querySelector(`[onclick="showSection('${sectionName}')"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Menu Category Management
function showMenuCategory(categoryName) {
    // Hide all menu categories
    const categories = document.querySelectorAll('.menu-category');
    categories.forEach(category => {
        category.classList.remove('active');
    });
    
    // Show target category
    const targetCategory = document.getElementById(categoryName + '-menu');
    if (targetCategory) {
        targetCategory.classList.add('active');
    }
    
    // Update menu tabs
    const menuTabs = document.querySelectorAll('.menu-tab');
    menuTabs.forEach(tab => {
        tab.classList.remove('active');
    });
    
    const activeTab = document.querySelector(`[onclick="showMenuCategory('${categoryName}')"]`);
    if (activeTab) {
        activeTab.classList.add('active');
    }
}

// Web Ring Navigation
function navigateWebRing(direction) {
    const sites = [
        '../index.html',
        '../freddies-bar/index.html',
        '#', // Current site (Cosmic Coffee)
        '../acosta-store/index.html',
        '../downtown-contracts/index.html'
    ];
    
    const currentIndex = 2; // Cosmic Coffee is at index 2
    let targetIndex;
    
    if (direction === 'prev') {
        targetIndex = currentIndex === 0 ? sites.length - 1 : currentIndex - 1;
    } else if (direction === 'next') {
        targetIndex = currentIndex === sites.length - 1 ? 0 : currentIndex + 1;
    }
    
    if (sites[targetIndex] !== '#') {
        window.location.href = sites[targetIndex];
    }
}

// Loyalty System Integration
class CoffeeRewardsManager {
    constructor() {
        this.pointsPerDollar = 20; // 20 points per SC spent
        this.loadLoyaltyData();
    }
    
    loadLoyaltyData() {
        try {
            this.loyaltyData = JSON.parse(localStorage.getItem('kingWashLoyalty')) || {
                totalPoints: 0,
                currentTier: 'Cosmic Explorer',
                totalSpent: 0,
                visits: 0,
                rewards: []
            };
        } catch (error) {
            console.error('Error loading loyalty data:', error);
            this.loyaltyData = {
                totalPoints: 0,
                currentTier: 'Cosmic Explorer',
                totalSpent: 0,
                visits: 0,
                rewards: []
            };
        }
    }
    
    saveLoyaltyData() {
        try {
            localStorage.setItem('kingWashLoyalty', JSON.stringify(this.loyaltyData));
        } catch (error) {
            console.error('Error saving loyalty data:', error);
        }
    }
    
    addPurchase(amount, itemName) {
        const points = Math.floor(amount * this.pointsPerDollar);
        this.loyaltyData.totalPoints += points;
        this.loyaltyData.totalSpent += amount;
        this.loyaltyData.visits += 1;
        
        // Add to purchase history
        const purchase = {
            date: new Date().toISOString(),
            location: 'Cosmic Coffee',
            item: itemName,
            amount: amount,
            points: points
        };
        
        if (!this.loyaltyData.purchases) {
            this.loyaltyData.purchases = [];
        }
        this.loyaltyData.purchases.push(purchase);
        
        // Update tier
        this.updateTier();
        
        // Save data
        this.saveLoyaltyData();
        
        // Show confirmation
        this.showPurchaseConfirmation(points, itemName);
        
        return points;
    }
    
    updateTier() {
        const spent = this.loyaltyData.totalSpent;
        if (spent >= 10000) {
            this.loyaltyData.currentTier = 'Galactic Emperor';
        } else if (spent >= 5000) {
            this.loyaltyData.currentTier = 'Stellar Navigator';
        } else if (spent >= 2000) {
            this.loyaltyData.currentTier = 'Cosmic Voyager';
        } else if (spent >= 500) {
            this.loyaltyData.currentTier = 'Space Cadet';
        } else {
            this.loyaltyData.currentTier = 'Cosmic Explorer';
        }
    }
    
    showPurchaseConfirmation(points, itemName) {
        // Create confirmation modal
        const modal = document.createElement('div');
        modal.className = 'loyalty-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>🌟 Purchase Confirmed!</h3>
                </div>
                <div class="modal-body">
                    <p><strong>${itemName}</strong></p>
                    <p>You earned <span class="points-earned">${points} points</span></p>
                    <p>Total Points: <span class="total-points">${this.loyaltyData.totalPoints}</span></p>
                    <p>Current Tier: <span class="current-tier">${this.loyaltyData.currentTier}</span></p>
                </div>
                <div class="modal-footer">
                    <button onclick="closeLoyaltyModal()" class="modal-btn">Close</button>
                </div>
            </div>
        `;
        
        // Add modal styles
        const style = document.createElement('style');
        style.textContent = `
            .loyalty-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 10000;
                backdrop-filter: blur(10px);
            }
            .modal-content {
                background: linear-gradient(135deg, #2D1B69, #4A90E2);
                border-radius: 20px;
                padding: 2rem;
                max-width: 400px;
                width: 90%;
                text-align: center;
                border: 2px solid #FFD700;
                box-shadow: 0 0 30px rgba(255, 215, 0, 0.5);
            }
            .modal-header h3 {
                color: #FFD700;
                font-size: 1.5rem;
                margin-bottom: 1rem;
            }
            .modal-body p {
                margin-bottom: 0.5rem;
                color: #F5F5DC;
            }
            .points-earned {
                color: #FFD700;
                font-weight: bold;
                font-size: 1.2rem;
            }
            .total-points, .current-tier {
                color: #4A90E2;
                font-weight: bold;
            }
            .modal-btn {
                background: #FFD700;
                color: #1A1A2E;
                border: none;
                padding: 0.8rem 2rem;
                border-radius: 25px;
                font-weight: bold;
                cursor: pointer;
                margin-top: 1rem;
                transition: all 0.3s ease;
            }
            .modal-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 5px 15px rgba(255, 215, 0, 0.4);
            }
        `;
        
        document.head.appendChild(style);
        document.body.appendChild(modal);
        
        // Auto-close after 5 seconds
        setTimeout(() => {
            if (document.body.contains(modal)) {
                document.body.removeChild(modal);
            }
        }, 5000);
    }
}

// Close loyalty modal function
function closeLoyaltyModal() {
    const modal = document.querySelector('.loyalty-modal');
    if (modal) {
        document.body.removeChild(modal);
    }
}

// Initialize rewards manager
let coffeeRewards;

// Menu Ordering System
function orderItem(itemName, price) {
    if (!coffeeRewards) {
        coffeeRewards = new CoffeeRewardsManager();
    }
    
    // Add to cart (simplified - could expand to full cart system)
    const confirmed = confirm(`Order ${itemName} for ${price} SC?\n\nThis will earn you ${Math.floor(price * 20)} loyalty points!`);
    
    if (confirmed) {
        coffeeRewards.addPurchase(price, itemName);
    }
}

// Add click handlers to menu items
function initializeMenuOrdering() {
    // Add click handlers to all menu items
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        const itemName = item.querySelector('h4').textContent;
        const priceText = item.querySelector('.price').textContent;
        const price = parseInt(priceText.replace(' SC', ''));
        
        // Add order button
        const orderButton = document.createElement('button');
        orderButton.textContent = 'Order Now';
        orderButton.className = 'order-button';
        orderButton.onclick = () => orderItem(itemName, price);
        
        // Style the button
        orderButton.style.cssText = `
            background: var(--cosmic-secondary);
            color: var(--cosmic-dark);
            border: none;
            padding: 0.5rem 1rem;
            border-radius: 20px;
            font-weight: bold;
            cursor: pointer;
            margin-top: 0.5rem;
            transition: all 0.3s ease;
            width: 100%;
        `;
        
        item.appendChild(orderButton);
        
        // Add hover effect
        orderButton.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 5px 15px rgba(255, 215, 0, 0.4)';
        });
        
        orderButton.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
}

// Study Space Reservation System
function reserveStudyPod() {
    const hours = prompt('How many hours would you like to reserve a study pod? (Max 4 hours)');
    if (hours && parseInt(hours) <= 4) {
        alert(`Study pod reserved for ${hours} hour(s)!\n\nYour reservation includes:\n- Private soundproof space\n- High-speed Wi-Fi\n- Climate control\n- Power outlets\n\nPlease arrive within 15 minutes of your start time.`);
    } else if (hours) {
        alert('Maximum reservation is 4 hours. Please choose a shorter duration.');
    }
}

// Event RSVP System
function rsvpEvent(eventName) {
    const confirmed = confirm(`RSVP for "${eventName}"?\n\nWe'll send you a confirmation and reminder.`);
    if (confirmed) {
        alert(`You're registered for "${eventName}"!\n\nWe'll see you there! Check your email for confirmation details.`);
    }
}

// Search Functionality
function initializeSearch() {
    // Create search bar
    const searchContainer = document.createElement('div');
    searchContainer.className = 'search-container';
    searchContainer.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 1001;
    `;
    
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search menu...';
    searchInput.className = 'search-input';
    searchInput.style.cssText = `
        padding: 0.5rem 1rem;
        border: 1px solid var(--cosmic-secondary);
        border-radius: 20px;
        background: rgba(26, 26, 46, 0.9);
        color: var(--cosmic-light);
        backdrop-filter: blur(10px);
        width: 200px;
        transition: all 0.3s ease;
    `;
    
    searchInput.addEventListener('input', function(e) {
        searchMenu(e.target.value);
    });
    
    searchContainer.appendChild(searchInput);
    document.body.appendChild(searchContainer);
}

function searchMenu(query) {
    const menuItems = document.querySelectorAll('.menu-item');
    const lowercaseQuery = query.toLowerCase();
    
    menuItems.forEach(item => {
        const itemName = item.querySelector('h4').textContent.toLowerCase();
        const itemDescription = item.querySelector('p').textContent.toLowerCase();
        
        if (itemName.includes(lowercaseQuery) || itemDescription.includes(lowercaseQuery)) {
            item.style.display = 'block';
            item.style.opacity = '1';
        } else {
            item.style.display = query ? 'none' : 'block';
            item.style.opacity = query ? '0' : '1';
        }
    });
}

// Community Integration
function checkCommunityStatus() {
    // Check for King Wash loyalty membership
    try {
        const loyaltyData = JSON.parse(localStorage.getItem('kingWashLoyalty'));
        if (loyaltyData && loyaltyData.totalPoints > 0) {
            // Add member benefits notification
            const membershipNotice = document.createElement('div');
            membershipNotice.className = 'membership-notice';
            membershipNotice.innerHTML = `
                <div class="notice-content">
                    <span class="notice-icon">👑</span>
                    <span class="notice-text">King Wash Member Benefits Active!</span>
                    <span class="notice-points">${loyaltyData.totalPoints} Points Available</span>
                </div>
            `;
            
            membershipNotice.style.cssText = `
                position: fixed;
                bottom: 20px;
                left: 20px;
                background: linear-gradient(135deg, #FFD700, #FFA500);
                color: #1A1A2E;
                padding: 1rem;
                border-radius: 10px;
                box-shadow: 0 5px 15px rgba(255, 215, 0, 0.3);
                z-index: 1000;
                font-weight: bold;
                cursor: pointer;
                transition: all 0.3s ease;
            `;
            
            membershipNotice.onclick = () => {
                showSection('community');
            };
            
            document.body.appendChild(membershipNotice);
        }
    } catch (error) {
        console.log('No loyalty data found');
    }
}

// Animation and Effects
function initializeAnimations() {
    // Parallax effect for hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero-section');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
    
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.feature-card, .info-card, .menu-item, .event-card, .partner-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Cosmic effects
function createCosmicEffects() {
    // Create floating cosmic particles
    const particleContainer = document.createElement('div');
    particleContainer.className = 'cosmic-particles';
    particleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        overflow: hidden;
    `;
    
    // Create particles
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'cosmic-particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 1}px;
            height: ${Math.random() * 4 + 1}px;
            background: ${Math.random() > 0.5 ? '#FFD700' : '#4A90E2'};
            border-radius: 50%;
            opacity: ${Math.random() * 0.8 + 0.2};
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: cosmic-float ${Math.random() * 10 + 10}s linear infinite;
        `;
        
        particleContainer.appendChild(particle);
    }
    
    // Add particle animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes cosmic-float {
            0% {
                transform: translateY(100vh) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-10vh) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(particleContainer);
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all systems
    initializeMenuOrdering();
    initializeSearch();
    checkCommunityStatus();
    initializeAnimations();
    createCosmicEffects();
    
    // Add event listeners for study space reservations
    document.addEventListener('click', function(e) {
        if (e.target.textContent === 'Reserve Pod') {
            reserveStudyPod();
        }
    });
    
    // Add event RSVP handlers
    const eventCards = document.querySelectorAll('.event-card');
    eventCards.forEach(card => {
        const rsvpButton = document.createElement('button');
        rsvpButton.textContent = 'RSVP';
        rsvpButton.className = 'rsvp-button';
        rsvpButton.style.cssText = `
            background: var(--cosmic-accent);
            color: white;
            border: none;
            padding: 0.5rem 1rem;
            border-radius: 15px;
            cursor: pointer;
            margin-top: 0.5rem;
            font-weight: bold;
            transition: all 0.3s ease;
        `;
        
        const eventName = card.querySelector('h3').textContent;
        rsvpButton.onclick = () => rsvpEvent(eventName);
        
        card.querySelector('.event-info').appendChild(rsvpButton);
    });
    
    // Initialize rewards manager
    coffeeRewards = new CoffeeRewardsManager();
    
    console.log('🌟 Cosmic Coffee website initialized successfully!');
    console.log('☕ All systems operational - ready to serve the galaxy!');
});

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Alt + M for menu
    if (e.altKey && e.key === 'm') {
        showSection('menu');
    }
    // Alt + S for study space
    if (e.altKey && e.key === 's') {
        showSection('study');
    }
    // Alt + E for events
    if (e.altKey && e.key === 'e') {
        showSection('events');
    }
    // Alt + C for community
    if (e.altKey && e.key === 'c') {
        showSection('community');
    }
});

// Export functions for global access
window.showSection = showSection;
window.showMenuCategory = showMenuCategory;
window.navigateWebRing = navigateWebRing;
window.orderItem = orderItem;
window.reserveStudyPod = reserveStudyPod;
window.rsvpEvent = rsvpEvent;
window.closeLoyaltyModal = closeLoyaltyModal;