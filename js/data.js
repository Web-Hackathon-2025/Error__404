// Data Management Module
class DataManager {
    constructor() {
        this.initializeData();
    }

    // Initialize default data if not exists
    initializeData() {
        // Initialize users if empty
        if (!localStorage.getItem('users')) {
            const defaultUsers = [
                {
                    id: '1',
                    name: 'Admin User',
                    email: 'admin@karigar.com',
                    password: 'admin123',
                    role: 'admin',
                    createdAt: new Date().toISOString()
                },
                {
                    id: '2',
                    name: 'John Customer',
                    email: 'customer@test.com',
                    password: 'customer123',
                    role: 'customer',
                    phone: '1234567890',
                    location: 'Downtown',
                    createdAt: new Date().toISOString()
                },
                {
                    id: '3',
                    name: 'Ahmed Plumber',
                    email: 'provider@test.com',
                    password: 'provider123',
                    role: 'provider',
                    phone: '9876543210',
                    location: 'Downtown',
                    createdAt: new Date().toISOString()
                }
            ];
            localStorage.setItem('users', JSON.stringify(defaultUsers));
        }

        // Initialize service providers if empty
        if (!localStorage.getItem('serviceProviders')) {
            const defaultProviders = [
                {
                    id: '3',
                    userId: '3',
                    businessName: 'Ahmed Plumbing Services',
                    category: 'Plumbing',
                    services: ['Pipe Repair', 'Leak Fixing', 'Installation'],
                    pricing: {
                        'Pipe Repair': 500,
                        'Leak Fixing': 300,
                        'Installation': 800
                    },
                    description: 'Expert plumber with 10 years of experience',
                    availability: {
                        monday: ['09:00-12:00', '14:00-18:00'],
                        tuesday: ['09:00-12:00', '14:00-18:00'],
                        wednesday: ['09:00-12:00', '14:00-18:00'],
                        thursday: ['09:00-12:00', '14:00-18:00'],
                        friday: ['09:00-12:00', '14:00-18:00'],
                        saturday: ['09:00-14:00'],
                        sunday: []
                    },
                    rating: 4.5,
                    totalReviews: 12,
                    location: 'Downtown',
                    status: 'approved'
                }
            ];
            localStorage.setItem('serviceProviders', JSON.stringify(defaultProviders));
        }

        // Initialize bookings if empty
        if (!localStorage.getItem('bookings')) {
            localStorage.setItem('bookings', JSON.stringify([]));
        }

        // Initialize reviews if empty
        if (!localStorage.getItem('reviews')) {
            localStorage.setItem('reviews', JSON.stringify([]));
        }
    }

    // Service Provider Methods
    getServiceProviders() {
        const providersStr = localStorage.getItem('serviceProviders');
        return providersStr ? JSON.parse(providersStr) : [];
    }

    getServiceProviderById(id) {
        const providers = this.getServiceProviders();
        return providers.find(p => p.id === id || p.userId === id);
    }

    getServiceProviderByUserId(userId) {
        const providers = this.getServiceProviders();
        return providers.find(p => p.userId === userId);
    }

    saveServiceProvider(provider) {
        const providers = this.getServiceProviders();
        const index = providers.findIndex(p => p.id === provider.id || p.userId === provider.userId);
        
        if (index >= 0) {
            providers[index] = provider;
        } else {
            providers.push(provider);
        }
        
        localStorage.setItem('serviceProviders', JSON.stringify(providers));
        return provider;
    }

    // Booking Methods
    getBookings() {
        const bookingsStr = localStorage.getItem('bookings');
        return bookingsStr ? JSON.parse(bookingsStr) : [];
    }

    getBookingById(id) {
        const bookings = this.getBookings();
        return bookings.find(b => b.id === id);
    }

    getBookingsByCustomerId(customerId) {
        const bookings = this.getBookings();
        return bookings.filter(b => b.customerId === customerId);
    }

    getBookingsByProviderId(providerId) {
        const bookings = this.getBookings();
        return bookings.filter(b => b.providerId === providerId);
    }

    createBooking(bookingData) {
        const bookings = this.getBookings();
        const newBooking = {
            id: Date.now().toString(),
            ...bookingData,
            status: 'requested',
            createdAt: new Date().toISOString()
        };
        
        bookings.push(newBooking);
        localStorage.setItem('bookings', JSON.stringify(bookings));
        return newBooking;
    }

    updateBooking(bookingId, updates) {
        const bookings = this.getBookings();
        const index = bookings.findIndex(b => b.id === bookingId);
        
        if (index >= 0) {
            bookings[index] = { ...bookings[index], ...updates };
            localStorage.setItem('bookings', JSON.stringify(bookings));
            return bookings[index];
        }
        
        return null;
    }

    // Review Methods
    getReviews() {
        const reviewsStr = localStorage.getItem('reviews');
        return reviewsStr ? JSON.parse(reviewsStr) : [];
    }

    getReviewsByProviderId(providerId) {
        const reviews = this.getReviews();
        return reviews.filter(r => r.providerId === providerId);
    }

    createReview(reviewData) {
        const reviews = this.getReviews();
        const newReview = {
            id: Date.now().toString(),
            ...reviewData,
            createdAt: new Date().toISOString()
        };
        
        reviews.push(newReview);
        localStorage.setItem('reviews', JSON.stringify(reviews));
        
        // Update provider rating
        this.updateProviderRating(reviewData.providerId);
        
        return newReview;
    }

    updateProviderRating(providerId) {
        const reviews = this.getReviewsByProviderId(providerId);
        if (reviews.length === 0) return;
        
        const totalRating = reviews.reduce((sum, r) => sum + r.rating, 0);
        const avgRating = totalRating / reviews.length;
        
        const provider = this.getServiceProviderById(providerId);
        if (provider) {
            provider.rating = parseFloat(avgRating.toFixed(1));
            provider.totalReviews = reviews.length;
            this.saveServiceProvider(provider);
        }
    }

    // Search and Filter Methods
    searchProviders(query, category = null, location = null) {
        let providers = this.getServiceProviders().filter(p => p.status === 'approved');
        
        if (query) {
            const lowerQuery = query.toLowerCase();
            providers = providers.filter(p => 
                p.businessName.toLowerCase().includes(lowerQuery) ||
                p.category.toLowerCase().includes(lowerQuery) ||
                p.services.some(s => s.toLowerCase().includes(lowerQuery))
            );
        }
        
        if (category) {
            providers = providers.filter(p => p.category.toLowerCase() === category.toLowerCase());
        }
        
        if (location) {
            providers = providers.filter(p => p.location.toLowerCase().includes(location.toLowerCase()));
        }
        
        return providers;
    }

    // Check availability conflict
    checkAvailabilityConflict(providerId, date, timeSlot) {
        const bookings = this.getBookings();
        return bookings.some(b => 
            b.providerId === providerId &&
            b.date === date &&
            b.timeSlot === timeSlot &&
            (b.status === 'requested' || b.status === 'confirmed')
        );
    }
}

// Global data manager instance
const dataManager = new DataManager();

