// Utility Functions
const utils = {
    // Format date for display
    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    },

    // Format time
    formatTime(timeString) {
        return timeString;
    },

    // Show alert message
    showAlert(message, type = 'info') {
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
        alertDiv.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        
        const container = document.querySelector('.container-fluid') || document.querySelector('.container') || document.body;
        container.insertBefore(alertDiv, container.firstChild);
        
        setTimeout(() => {
            alertDiv.remove();
        }, 5000);
    },

    // Redirect to page
    redirect(url) {
        window.location.href = url;
    },

    // Get URL parameters
    getUrlParams() {
        const params = new URLSearchParams(window.location.search);
        const result = {};
        for (const [key, value] of params.entries()) {
            result[key] = value;
        }
        return result;
    },

    // Validate email
    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    },

    // Validate phone
    validatePhone(phone) {
        const re = /^[0-9]{10,}$/;
        return re.test(phone);
    },

    // Generate star rating HTML
    generateStars(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        let starsHTML = '';
        
        for (let i = 0; i < fullStars; i++) {
            starsHTML += '<i class="bi bi-star-fill text-warning"></i>';
        }
        
        if (hasHalfStar) {
            starsHTML += '<i class="bi bi-star-half text-warning"></i>';
        }
        
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
        for (let i = 0; i < emptyStars; i++) {
            starsHTML += '<i class="bi bi-star text-warning"></i>';
        }
        
        return starsHTML;
    },

    // Check authentication and redirect if needed
    requireAuth(requiredRole = null) {
        if (!authManager.isAuthenticated()) {
            utils.redirect('login.html');
            return false;
        }
        
        if (requiredRole) {
            if (requiredRole === 'admin' && !authManager.isAdmin()) {
                utils.redirect('index.html');
                return false;
            }
            if (requiredRole === 'provider' && !authManager.isServiceProvider()) {
                utils.redirect('index.html');
                return false;
            }
            if (requiredRole === 'customer' && !authManager.isCustomer()) {
                utils.redirect('index.html');
                return false;
            }
        }
        
        return true;
    }
};



