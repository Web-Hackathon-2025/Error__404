# Quick Start Guide - Karigar

## 🚀 Getting Started in 3 Steps

### Step 1: Open the Application
Simply open `index.html` in any modern web browser (Chrome, Firefox, Edge, Safari).

**No installation or server required!**

### Step 2: Try Demo Accounts
The application comes with pre-configured demo accounts:

#### Customer Account
- **Email**: `customer@test.com`
- **Password**: `customer123`
- **What you can do**: Browse services, book providers, leave reviews

#### Service Provider Account
- **Email**: `provider@test.com`
- **Password**: `provider123`
- **What you can do**: Manage profile, handle booking requests

#### Admin Account
- **Email**: `admin@karigar.com`
- **Password**: `admin123`
- **What you can do**: Approve providers, manage users, moderate content

### Step 3: Explore Features

#### As a Customer:
1. Login with customer account
2. Go to "Browse Services"
3. Search for a service provider
4. Click "View Details" on any provider
5. Select service, date, and time
6. Submit booking request
7. Check your dashboard for booking status

#### As a Service Provider:
1. Login with provider account
2. Go to Provider Dashboard
3. Create/Edit your service profile
4. Set your services, pricing, and availability
5. View and manage incoming booking requests
6. Accept/Reject requests
7. Mark completed services

#### As an Admin:
1. Login with admin account
2. View all users and providers
3. Approve pending service providers
4. Monitor all bookings
5. Moderate reviews

## 📋 Complete User Flow Example

### Booking a Service (Customer Journey)

1. **Browse Services**
   - Navigate to "Browse Services"
   - Use search or filters to find a provider
   - Click "View Details" on a provider card

2. **Book Service**
   - Select a service from the dropdown
   - Choose an available date
   - Pick a time slot
   - Add optional notes
   - Submit booking request

3. **Track Booking**
   - Go to Customer Dashboard
   - View booking status (Requested → Confirmed → Completed)
   - After completion, leave a review

### Managing Requests (Provider Journey)

1. **Create Profile**
   - Login as provider
   - Fill in business details
   - Add services and pricing
   - Set availability schedule
   - Save profile

2. **Handle Requests**
   - View incoming booking requests
   - Accept or reject requests
   - For confirmed bookings, mark as completed when done

3. **Monitor Performance**
   - View booking statistics
   - Check reviews and ratings
   - Update profile as needed

## 🎯 Key Features to Try

### Search & Filter
- Search by service name or provider name
- Filter by category (Plumbing, Electrical, etc.)
- Filter by location

### Booking Workflow
- Request → Confirmed → Completed
- Cancellation at any stage
- Availability conflict prevention

### Reviews & Ratings
- Leave reviews after service completion
- Automatic rating calculation
- View all reviews on provider profiles

### Admin Functions
- Approve new service providers
- View platform statistics
- Moderate reviews
- Monitor all activity

## 💡 Tips

1. **Data Persistence**: All data is stored in browser LocalStorage. Clearing browser data will reset everything.

2. **Multiple Accounts**: You can register multiple accounts to test different roles.

3. **Availability**: Providers must set availability before customers can book. Time slots are checked for conflicts.

4. **Profile Approval**: New provider profiles need admin approval before they appear in listings.

5. **Reviews**: Only completed bookings can be reviewed. Each booking can only be reviewed once.

## 🐛 Troubleshooting

**Issue**: Can't see any service providers
- **Solution**: Login as admin and approve pending providers, or create a new provider account and set up a profile

**Issue**: Can't book a service
- **Solution**: Make sure you're logged in as a customer, and the provider has set their availability

**Issue**: Booking status not updating
- **Solution**: Refresh the page or check if you're logged in with the correct account

**Issue**: Can't login
- **Solution**: Use the demo accounts or register a new account

## 📱 Browser Compatibility

Works best on:
- Chrome (recommended)
- Firefox
- Edge
- Safari

Requires JavaScript enabled and LocalStorage support.

---

**Enjoy exploring Karigar! 🛠️**

