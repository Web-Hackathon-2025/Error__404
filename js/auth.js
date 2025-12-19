// Authentication Module
class AuthManager {
    constructor() {
        this.currentUser = this.getCurrentUser();
    }

    // Register a new user
    register(userData) {
        const users = this.getAllUsers();
        
        // Check if email already exists
        if (users.find(u => u.email === userData.email)) {
            return { success: false, message: 'Email already registered' };
        }

        // Generate unique ID
        const newUser = {
            id: Date.now().toString(),
            ...userData,
            createdAt: new Date().toISOString()
        };

        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        
        return { success: true, user: newUser };
    }

    // Login user
    login(email, password) {
        const users = this.getAllUsers();
        const user = users.find(u => u.email === email && u.password === password);
        
        if (!user) {
            return { success: false, message: 'Invalid email or password' };
        }

        // Set current user session
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUser = user;
        
        return { success: true, user: user };
    }

    // Logout user
    logout() {
        localStorage.removeItem('currentUser');
        this.currentUser = null;
    }

    // Get current logged-in user
    getCurrentUser() {
        const userStr = localStorage.getItem('currentUser');
        return userStr ? JSON.parse(userStr) : null;
    }

    // Get all users
    getAllUsers() {
        const usersStr = localStorage.getItem('users');
        return usersStr ? JSON.parse(usersStr) : [];
    }

    // Check if user is authenticated
    isAuthenticated() {
        return this.currentUser !== null;
    }

    // Check if user is admin
    isAdmin() {
        return this.currentUser && this.currentUser.role === 'admin';
    }

    // Check if user is service provider
    isServiceProvider() {
        return this.currentUser && this.currentUser.role === 'provider';
    }

    // Check if user is customer
    isCustomer() {
        return this.currentUser && this.currentUser.role === 'customer';
    }
}

// Global auth instance
const authManager = new AuthManager();

