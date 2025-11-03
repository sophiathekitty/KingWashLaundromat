// Downtown Contracts Office JavaScript

// Sample contracts data (including the one from README)
const sampleContracts = [
    {
        id: 'HAULING-001',
        type: 'hauling',
        title: 'Emergency Supply Delivery',
        description: 'A partnered station has not been able to supply one of its customers due to a shortage. They have requested that we will fill the gap and deliver the order as soon as possible. Accepting this contract will require collateral and said collateral will be forfeit if you fail to complete the assignment in time.',
        payment: 700000,
        reputation: 0,
        failPenalty: 'None',
        collateral: 500,
        distance: 1420,
        duration: '01 h 00 min',
        status: 'available'
    },
    {
        id: 'REPAIR-001',
        type: 'repair',
        title: 'King Wash Equipment Maintenance',
        description: 'Regular maintenance required for washing machines and dryer systems at King Wash Laundromat. Includes diagnostic checks, filter replacement, and calibration of control systems.',
        payment: 15000,
        reputation: 50,
        failPenalty: '2000 SC',
        collateral: 1000,
        distance: 150,
        duration: '02 h 30 min',
        status: 'available'
    },
    {
        id: 'MUNICIPAL-001',
        type: 'municipal',
        title: 'Infrastructure Assessment',
        description: 'Grindstone Municipal Building requires comprehensive infrastructure assessment of power grid, water systems, and communication networks. Report must be submitted to colony administration.',
        payment: 250000,
        reputation: 100,
        failPenalty: '10000 SC',
        collateral: 5000,
        distance: 2500,
        duration: '04 h 00 min',
        status: 'available'
    },
    {
        id: 'MUNICIPAL-002',
        type: 'municipal',
        title: 'Downtown Security Patrol',
        description: 'Regular security patrol of Downtown Grindstone district including all business establishments. Coordinate with local businesses and file incident reports to municipal office.',
        payment: 45000,
        reputation: 25,
        failPenalty: '5000 SC',
        collateral: 2000,
        distance: 800,
        duration: '03 h 00 min',
        status: 'available'
    },
    {
        id: 'REPAIR-002',
        type: 'repair',
        title: 'Freddie\'s Bar HVAC System',
        description: 'Climate control system at Freddie\'s Bar requires repair and upgrade. Must ensure proper ventilation for both main bar area and basement nightclub.',
        payment: 35000,
        reputation: 75,
        failPenalty: '3000 SC',
        collateral: 2500,
        distance: 300,
        duration: '01 h 45 min',
        status: 'available'
    }
];

// Sample jobs data
const sampleJobs = [
    {
        id: 'JOB-001',
        title: 'Night Shift Laundry Attendant',
        company: 'King Wash Laundromat',
        category: 'maintenance',
        salary: '2500-3000 SC/month',
        description: 'Looking for a reliable night shift attendant to oversee laundry operations, assist customers, and maintain arcade equipment during evening hours.',
        requirements: 'Basic mechanical knowledge, customer service experience preferred, must be available nights and weekends',
        contact: 'Visit King Wash or apply online',
        posted: new Date('2025-10-28').toISOString()
    },
    {
        id: 'JOB-002',
        title: 'Bartender',
        company: 'Freddie\'s Bar',
        category: 'food-service',
        salary: '2200-2800 SC/month + tips',
        description: 'Experienced bartender needed for busy downtown establishment. Must be able to work both upstairs bar and basement nightclub.',
        requirements: 'Previous bartending experience, knowledge of cocktails, able to work late hours',
        contact: 'Apply in person at Freddie\'s Bar',
        posted: new Date('2025-10-30').toISOString()
    },
    {
        id: 'JOB-003',
        title: 'Store Clerk',
        company: 'Acosta Store',
        category: 'retail',
        salary: '2000-2400 SC/month',
        description: '24/7 convenience store seeking part-time and full-time clerks. Must be comfortable working alone during night shifts.',
        requirements: 'Basic math skills, inventory management experience helpful, flexible schedule required',
        contact: 'Stop by Acosta Store or call during business hours',
        posted: new Date('2025-11-01').toISOString()
    },
    {
        id: 'JOB-004',
        title: 'Barista',
        company: 'Cosmic Coffee',
        category: 'food-service',
        salary: '2100-2600 SC/month',
        description: 'Coffee enthusiast wanted for artisanal coffee shop. Must be passionate about quality coffee and customer service.',
        requirements: 'Barista experience preferred, latte art skills a plus, morning availability essential',
        contact: 'Apply at Cosmic Coffee with resume',
        posted: new Date('2025-10-25').toISOString()
    },
    {
        id: 'JOB-005',
        title: 'Security Guard',
        company: 'Downtown Grindstone Security',
        category: 'security',
        salary: '3000-3500 SC/month',
        description: 'Security personnel needed for downtown district patrol. Responsible for ensuring safety of businesses and residents.',
        requirements: 'Security certification, physical fitness, clean background check, own transportation',
        contact: 'Contact Downtown Contracts for application',
        posted: new Date('2025-10-20').toISOString()
    }
];

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    loadContracts();
    loadJobs();
    updateStatusCounts();
    loadDeliveryContracts();
});

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

// Load and display contracts
function loadContracts() {
    const contractsGrid = document.getElementById('contracts-grid');
    const allContracts = [...sampleContracts, ...getDeliveryContracts()];
    
    contractsGrid.innerHTML = allContracts.map(contract => createContractCard(contract)).join('');
}

// Create contract card HTML
function createContractCard(contract) {
    return `
        <div class="contract-card ${contract.type}" onclick="showContractDetails('${contract.id}')">
            <div class="contract-header">
                <span class="contract-type ${contract.type}">${contract.type}</span>
                <div class="contract-payment">${contract.payment.toLocaleString()} SC</div>
            </div>
            <h3 class="contract-title">${contract.title}</h3>
            <p class="contract-description">${contract.description.substring(0, 150)}...</p>
            <div class="contract-details">
                <div class="contract-detail">
                    <div class="label">Distance</div>
                    <div class="value">${contract.distance} m</div>
                </div>
                <div class="contract-detail">
                    <div class="label">Duration</div>
                    <div class="value">${contract.duration}</div>
                </div>
                <div class="contract-detail">
                    <div class="label">Collateral</div>
                    <div class="value">${contract.collateral} SC</div>
                </div>
                <div class="contract-detail">
                    <div class="label">Status</div>
                    <div class="value">${contract.status}</div>
                </div>
            </div>
        </div>
    `;
}

// Load delivery contracts from Acosta Store
function loadDeliveryContracts() {
    const deliveryContracts = JSON.parse(localStorage.getItem('deliveryContracts') || '[]');
    return deliveryContracts.map(order => ({
        id: order.orderId,
        type: 'delivery',
        title: `Acosta Store Delivery - ${order.items.length} items`,
        description: `Delivery contract for order from Acosta Store. Items: ${order.items.map(item => `${item.quantity}x ${item.name}`).join(', ')}.`,
        payment: Math.floor(order.totalAmount * 0.15), // 15% delivery fee
        reputation: 10,
        failPenalty: '1000 SC',
        collateral: 100,
        distance: 250,
        duration: '30 min',
        status: order.status || 'pending',
        orderData: order
    }));
}

// Get delivery contracts
function getDeliveryContracts() {
    return loadDeliveryContracts();
}

// Filter contracts
function filterContracts(type) {
    // Update filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    const allContracts = [...sampleContracts, ...getDeliveryContracts()];
    const filteredContracts = type === 'all' 
        ? allContracts 
        : allContracts.filter(contract => contract.type === type);
    
    const contractsGrid = document.getElementById('contracts-grid');
    contractsGrid.innerHTML = filteredContracts.map(contract => createContractCard(contract)).join('');
}

// Show contract details modal
function showContractDetails(contractId) {
    const allContracts = [...sampleContracts, ...getDeliveryContracts()];
    const contract = allContracts.find(c => c.id === contractId);
    
    if (!contract) return;
    
    const modal = document.getElementById('contract-modal');
    const title = document.getElementById('contract-modal-title');
    const body = document.getElementById('contract-modal-body');
    const acceptBtn = document.getElementById('accept-contract-btn');
    
    title.textContent = contract.title;
    acceptBtn.setAttribute('data-contract-id', contractId);
    
    body.innerHTML = `
        <div class="contract-full-details">
            <div class="contract-info-grid">
                <div class="info-item">
                    <strong>Contract Type:</strong>
                    <span class="contract-type ${contract.type}">${contract.type.toUpperCase()}</span>
                </div>
                <div class="info-item">
                    <strong>Payment:</strong>
                    <span class="payment-amount">${contract.payment.toLocaleString()} SC</span>
                </div>
                <div class="info-item">
                    <strong>Reputation Reward:</strong>
                    <span>${contract.reputation || 0}</span>
                </div>
                <div class="info-item">
                    <strong>Fail Penalty:</strong>
                    <span>${contract.failPenalty || 'None'}</span>
                </div>
                <div class="info-item">
                    <strong>Required Collateral:</strong>
                    <span>${contract.collateral} SC</span>
                </div>
                <div class="info-item">
                    <strong>Distance:</strong>
                    <span>${contract.distance} m</span>
                </div>
                <div class="info-item">
                    <strong>Estimated Duration:</strong>
                    <span>${contract.duration}</span>
                </div>
                <div class="info-item">
                    <strong>Status:</strong>
                    <span class="status-${contract.status}">${contract.status.toUpperCase()}</span>
                </div>
            </div>
            
            <div class="contract-description-full">
                <h4>Description:</h4>
                <p>${contract.description}</p>
            </div>
            
            ${contract.orderData ? `
                <div class="order-details">
                    <h4>Order Details:</h4>
                    <div class="order-items">
                        ${contract.orderData.items.map(item => `
                            <div class="order-item">
                                <span>${item.quantity}x ${item.name}</span>
                                <span>${item.total.toLocaleString()} SC</span>
                            </div>
                        `).join('')}
                    </div>
                    <div class="order-total">
                        <strong>Order Total: ${contract.orderData.totalAmount.toLocaleString()} SC</strong>
                    </div>
                    <div class="delivery-address">
                        <strong>Delivery Address:</strong> ${contract.orderData.deliveryAddress}
                    </div>
                </div>
            ` : ''}
        </div>
    `;
    
    modal.classList.add('show');
    modal.style.display = 'flex';
}

// Close contract modal
function closeContractModal() {
    const modal = document.getElementById('contract-modal');
    modal.classList.remove('show');
    modal.style.display = 'none';
}

// Accept contract
function acceptContract() {
    const contractId = document.getElementById('accept-contract-btn').getAttribute('data-contract-id');
    const allContracts = [...sampleContracts, ...getDeliveryContracts()];
    const contract = allContracts.find(c => c.id === contractId);
    
    if (!contract) return;
    
    // Simulate contract acceptance
    alert(`Contract "${contract.title}" accepted!\n\nPayment: ${contract.payment.toLocaleString()} SC\nCollateral Required: ${contract.collateral} SC\n\nContract details have been added to your active contracts.`);
    
    // If it's a delivery contract, mark as accepted
    if (contract.orderData) {
        const deliveryContracts = JSON.parse(localStorage.getItem('deliveryContracts') || '[]');
        const orderIndex = deliveryContracts.findIndex(order => order.orderId === contractId);
        if (orderIndex !== -1) {
            deliveryContracts[orderIndex].status = 'accepted';
            localStorage.setItem('deliveryContracts', JSON.stringify(deliveryContracts));
        }
    }
    
    closeContractModal();
    loadContracts(); // Reload to show updated status
    updateStatusCounts();
}

// Load and display jobs
function loadJobs() {
    const jobsGrid = document.getElementById('jobs-grid');
    jobsGrid.innerHTML = sampleJobs.map(job => createJobCard(job)).join('');
}

// Create job card HTML
function createJobCard(job) {
    const postedDate = new Date(job.posted).toLocaleDateString();
    
    return `
        <div class="job-card">
            <div class="job-header">
                <h3 class="job-title">${job.title}</h3>
                <div class="job-company">${job.company}</div>
            </div>
            <div class="job-category">${job.category.replace('-', ' ')}</div>
            <div class="job-salary">${job.salary}</div>
            <div class="job-description">${job.description}</div>
            ${job.requirements ? `
                <div class="job-requirements">
                    <h4>Requirements:</h4>
                    <p>${job.requirements}</p>
                </div>
            ` : ''}
            <div class="job-contact">
                📞 ${job.contact}
            </div>
            <div class="job-posted">Posted: ${postedDate}</div>
        </div>
    `;
}

// Filter jobs
function filterJobs() {
    const filter = document.getElementById('job-filter').value;
    const filteredJobs = filter === 'all' 
        ? sampleJobs 
        : sampleJobs.filter(job => job.category === filter);
    
    const jobsGrid = document.getElementById('jobs-grid');
    jobsGrid.innerHTML = filteredJobs.map(job => createJobCard(job)).join('');
}

// Show post job modal
function showPostJobModal() {
    const modal = document.getElementById('post-job-modal');
    modal.classList.add('show');
    modal.style.display = 'flex';
}

// Close post job modal
function closePostJobModal() {
    const modal = document.getElementById('post-job-modal');
    modal.classList.remove('show');
    modal.style.display = 'none';
    document.getElementById('job-form').reset();
}

// Submit new job
function submitJob() {
    const form = document.getElementById('job-form');
    const formData = new FormData(form);
    
    // Validate required fields
    const requiredFields = ['job-title', 'company-name', 'job-category', 'job-salary', 'job-description', 'job-contact'];
    const isValid = requiredFields.every(fieldId => {
        const field = document.getElementById(fieldId);
        return field.value.trim() !== '';
    });
    
    if (!isValid) {
        alert('Please fill in all required fields.');
        return;
    }
    
    const newJob = {
        id: 'JOB-' + Date.now(),
        title: document.getElementById('job-title').value,
        company: document.getElementById('company-name').value,
        category: document.getElementById('job-category').value,
        salary: document.getElementById('job-salary').value,
        description: document.getElementById('job-description').value,
        requirements: document.getElementById('job-requirements').value,
        contact: document.getElementById('job-contact').value,
        posted: new Date().toISOString()
    };
    
    // Add to jobs array (in a real app, this would be saved to a database)
    sampleJobs.unshift(newJob);
    
    // Reload jobs display
    loadJobs();
    updateStatusCounts();
    
    // Show success message
    alert(`Job posting created successfully!\n\nTitle: ${newJob.title}\nCompany: ${newJob.company}\n\nPosting fee: 100 SC has been charged to your account.`);
    
    closePostJobModal();
}

// Update status counts
function updateStatusCounts() {
    const activeContracts = [...sampleContracts, ...getDeliveryContracts()].filter(c => c.status === 'available' || c.status === 'pending');
    const jobOpenings = sampleJobs.length;
    const pendingDeliveries = getDeliveryContracts().filter(c => c.status === 'pending').length;
    
    document.getElementById('active-contracts-count').textContent = activeContracts.length;
    document.getElementById('job-openings-count').textContent = jobOpenings;
    document.getElementById('pending-deliveries-count').textContent = pendingDeliveries;
}

// Close modals when clicking outside
window.onclick = function(event) {
    const contractModal = document.getElementById('contract-modal');
    const jobModal = document.getElementById('post-job-modal');
    
    if (event.target === contractModal) {
        closeContractModal();
    }
    if (event.target === jobModal) {
        closePostJobModal();
    }
}

// Add some CSS for the modal content
const additionalStyles = `
<style>
.contract-full-details {
    color: var(--text-dark);
}

.contract-info-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    margin-bottom: 2rem;
}

.info-item {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.info-item strong {
    color: var(--primary-blue);
    font-size: 0.9rem;
}

.payment-amount {
    color: var(--accent-gold);
    font-size: 1.2rem;
    font-weight: bold;
}

.status-available, .status-pending {
    color: var(--success-green);
    font-weight: bold;
}

.status-accepted {
    color: var(--primary-blue);
    font-weight: bold;
}

.contract-description-full {
    background: var(--background-light);
    padding: 1.5rem;
    border-radius: var(--border-radius);
    margin-bottom: 2rem;
}

.contract-description-full h4 {
    color: var(--primary-blue);
    margin-bottom: 1rem;
}

.order-details {
    background: var(--background-light);
    padding: 1.5rem;
    border-radius: var(--border-radius);
    border-left: 4px solid var(--success-green);
}

.order-details h4 {
    color: var(--primary-blue);
    margin-bottom: 1rem;
}

.order-items {
    margin-bottom: 1rem;
}

.order-item {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 0;
    border-bottom: 1px solid rgba(0,0,0,0.1);
}

.order-total {
    background: var(--accent-gold);
    color: white;
    padding: 1rem;
    border-radius: 8px;
    text-align: center;
    margin: 1rem 0;
}

.delivery-address {
    color: var(--text-light);
}

.job-posted {
    text-align: center;
    color: var(--text-light);
    font-size: 0.9rem;
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid var(--background-dark);
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', additionalStyles);

// Web Ring Navigation
function navigateWebRing(direction) {
    const sites = [
        '../index.html',
        '../freddies-bar/index.html',
        '../cosmic-coffee/index.html',
        '../acosta-store/index.html',
        '#' // Current site (Downtown Contracts)
    ];
    
    const currentIndex = 4; // Downtown Contracts is at index 4
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

// Add webring styles
const webringStyles = `
<style>
/* Web Ring Styles */
.webring-section {
    background: linear-gradient(135deg, var(--background-light), var(--background-medium));
    padding: 3rem 0;
    margin-top: 2rem;
    border-top: 3px solid var(--primary-blue);
}

.webring-section h3 {
    text-align: center;
    color: var(--text-primary);
    font-size: 2rem;
    margin-bottom: 2rem;
    font-weight: bold;
}

.webring-navigation {
    text-align: center;
}

.webring-controls {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    margin-bottom: 2rem;
    flex-wrap: wrap;
}

.webring-btn {
    background: var(--primary-blue);
    color: white;
    border: none;
    padding: 0.8rem 1.5rem;
    border-radius: 25px;
    cursor: pointer;
    font-weight: bold;
    transition: all 0.3s ease;
}

.webring-btn:hover {
    background: var(--primary-dark);
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(52, 152, 219, 0.3);
}

.webring-info {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--text-primary);
    font-weight: bold;
}

.webring-logo {
    font-size: 1.5rem;
}

.webring-sites {
    display: flex;
    justify-content: center;
    gap: 1rem;
    flex-wrap: nowrap;
    overflow-x: auto;
    padding: 1rem 0;
}

.ring-site {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    padding: 1rem;
    border-radius: 12px;
    text-decoration: none;
    color: var(--text-primary);
    transition: all 0.3s ease;
    border: 2px solid transparent;
    background: white;
    min-width: 100px;
    flex-shrink: 0;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.ring-site:hover {
    background: var(--background-light);
    transform: translateY(-3px);
    border-color: var(--primary-blue);
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
}

.ring-site.current {
    background: var(--background-light);
    border-color: var(--primary-blue);
    box-shadow: 0 5px 20px rgba(52, 152, 219, 0.2);
}

.site-icon {
    font-size: 1.8rem;
}

.ring-site span {
    font-size: 0.9rem;
    font-weight: 600;
    text-align: center;
}

@media (max-width: 768px) {
    .webring-controls {
        flex-direction: column;
        gap: 1rem;
    }
    
    .webring-sites {
        gap: 0.5rem;
    }
    
    .ring-site {
        min-width: 80px;
        padding: 0.8rem 0.5rem;
    }
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', webringStyles);