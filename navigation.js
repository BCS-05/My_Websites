// navigation.js - Handles navigation logic across all pages

const API_BASE_URL = 'http://localhost:5000/api';

// Check authentication status and update UI
async function checkAuthAndUpdateUI() {
    const sessionToken = localStorage.getItem('clinTechSessionToken');
    const userData = JSON.parse(localStorage.getItem('clinTechUser') || sessionStorage.getItem('clinTechUser') || 'null');

    if (sessionToken && userData) {
        try {
            const response = await fetch(`${API_BASE_URL}/check-auth?session_token=${sessionToken}`);

            if (response.ok) {
                const data = await response.json();
                if (data.authenticated) {
                    // User is logged in
                    updateUIForLoggedInUser(data.user);
                    return true;
                }
            }
        } catch (error) {
            console.error('Auth check failed:', error);
            // Fallback to local data
            if (userData) {
                updateUIForLoggedInUser(userData);
                return true;
            }
        }
    }

    // User is not logged in
    updateUIForGuest();
    return false;
}

function updateUIForLoggedInUser(user) {
    // Hide Get Started button
    if ($('#loginBtnNav').length) $('#loginBtnNav').hide();
    if ($('#authButtons').length) $('#authButtons').hide();

    // Show user profile
    if ($('#userProfile').length) $('#userProfile').show();

    // Update user info
    if ($('#userNameNav').length) $('#userNameNav').text(`Hi, ${user.fullname}`);
    if ($('#userInitial').length) $('#userInitial').text(user.fullname.charAt(0).toUpperCase());

    // Update navigation menu for logged in user
    updateNavigationForLoggedInUser();
}

function updateUIForGuest() {
    // Show Get Started button
    if ($('#loginBtnNav').length) $('#loginBtnNav').show();
    if ($('#authButtons').length) $('#authButtons').show();

    // Hide user profile
    if ($('#userProfile').length) $('#userProfile').hide();

    // Update navigation menu for guest
    updateNavigationForGuest();
}

function updateNavigationForLoggedInUser() {
    // Update courses link to go directly to courses page
    $('a[onclick*="navigateToCourses"]').attr('href', 'courses.html').removeAttr('onclick');
    $('a:contains("Courses")').attr('href', 'courses.html').removeAttr('onclick');

    // Update My Courses link
    $('a:contains("My Courses")').attr('href', 'courses.html').removeAttr('onclick');
}

function updateNavigationForGuest() {
    // Update courses link to use the navigation function
    $('a[href="courses.html"]').attr('href', 'javascript:void(0);').attr('onclick', 'navigateToCourses()');
    $('a:contains("Courses")').attr('href', 'javascript:void(0);').attr('onclick', 'navigateToCourses()');
}

// Main navigation function for courses
async function navigateToCourses() {
    const isAuthenticated = await checkAuthAndUpdateUI();

    if (isAuthenticated) {
        // User is logged in, go directly to courses
        window.location.href = 'courses.html';
    } else {
        // User is not logged in, redirect to login with return URL
        const currentPage = window.location.pathname;
        window.location.href = `login.html?redirect=${encodeURIComponent('courses.html')}`;
    }
}

// Logout function
async function logout() {
    const sessionToken = localStorage.getItem('clinTechSessionToken');

    if (sessionToken) {
        try {
            await fetch(`${API_BASE_URL}/logout`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ session_token: sessionToken })
            });
        } catch (error) {
            console.error('Logout error:', error);
        }
    }

    // Clear local data
    localStorage.removeItem('clinTechSessionToken');
    localStorage.removeItem('clinTechUser');
    sessionStorage.removeItem('clinTechUser');

    // Redirect to home page
    window.location.href = 'index.html';
}

// Initialize navigation on page load
$(document).ready(function () {
    checkAuthAndUpdateUI();
});