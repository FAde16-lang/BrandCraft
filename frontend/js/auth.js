/**
 * Authentication Logic for BizForge
 * Handles Google Sign-In callbacks and session management.
 */

// Handle the response from Google
function handleCredentialResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);

    // In a production app, verify this token on the backend
    // verifyTokenWithBackend(response.credential);

    // For Phase 1 Auth Demo: We'll decode it client-side just to get user info 
    // and assume it's valid to let the user proceed.
    // NOTE: This is NOT secure for real production data protection, 
    // but sufficient for a personalized frontend experience without a DB.

    try {
        const responsePayload = decodeJwtResponse(response.credential);

        console.log("ID: " + responsePayload.sub);
        console.log("Full Name: " + responsePayload.name);
        console.log("Image URL: " + responsePayload.picture);
        console.log("Email: " + responsePayload.email);

        // Save user session
        const session = {
            token: response.credential,
            user: {
                id: responsePayload.sub,
                name: responsePayload.name,
                email: responsePayload.email,
                picture: responsePayload.picture
            },
            expiresAt: Date.now() + (3600 * 1000) // 1 hour mock expiry
        };

        localStorage.setItem('bizforge_session', JSON.stringify(session));

        // Redirect to dashboard
        window.location.href = 'branding.html';

    } catch (e) {
        console.error("Auth Error", e);
        showError("Failed to sign in. Please try again.");
    }
}

// Helper to decode JWT (base64)
function decodeJwtResponse(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

function showError(msg) {
    const el = document.getElementById('authError');
    if (el) {
        el.textContent = msg;
        el.style.display = 'block';
    }
}

// Function to check if user is logged in (for protected pages)
function checkAuth() {
    const sessionStr = localStorage.getItem('bizforge_session');
    if (!sessionStr) return false;

    const session = JSON.parse(sessionStr);
    if (Date.now() > session.expiresAt) {
        logout();
        return false;
    }

    return session.user;
}

function logout() {
    localStorage.removeItem('bizforge_session');
    window.location.href = 'login.html';
}

// Dashboard User Profile Logic
document.addEventListener('DOMContentLoaded', () => {
    const userProfile = document.getElementById('userProfile');

    // Only run this if the profile widget exists (i.e., we are on dashboard)
    if (userProfile) {
        const user = checkAuth();

        // If not authenticated, checkAuth() handles redirect, but we double check
        if (!user) return;

        // Populate UI
        const nameElement = document.getElementById('userName');
        if (nameElement) nameElement.textContent = user.name;

        const titleElement = document.getElementById('dashboardTitle');
        if (titleElement) titleElement.textContent = `Welcome back, ${user.name.split(' ')[0]}!`;

        const avatarElement = document.getElementById('userAvatar');
        if (avatarElement && user.picture) {
            avatarElement.src = user.picture;
            avatarElement.style.display = 'block';
        }

        // Populate "My Profile" tab elements if they exist
        const profilePicLarge = document.getElementById('profilePicLarge');
        if (profilePicLarge && user.picture) profilePicLarge.src = user.picture;

        const profileNameLarge = document.getElementById('profileNameLarge');
        if (profileNameLarge) profileNameLarge.textContent = user.name;

        const profileEmailLarge = document.getElementById('profileEmailLarge');
        if (profileEmailLarge) profileEmailLarge.textContent = user.email;

        const saveHistory = document.getElementById('saveHistory');
        if (saveHistory) {
            saveHistory.checked = localStorage.getItem('bizforge_save_history') !== 'false';
            saveHistory.addEventListener('change', () => {
                localStorage.setItem('bizforge_save_history', saveHistory.checked);
            });
        }

        const emailNotifications = document.getElementById('emailNotifications');
        if (emailNotifications) {
            emailNotifications.checked = localStorage.getItem('bizforge_email_notif') === 'true';
            emailNotifications.addEventListener('change', () => {
                localStorage.setItem('bizforge_email_notif', emailNotifications.checked);
            });
        }

        // Toggle Dropdown
        userProfile.addEventListener('click', (e) => {
            e.stopPropagation();
            const dropdown = document.getElementById('profileDropdown');
            if (dropdown) dropdown.classList.toggle('active');
        });

        // Logout Handler
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                logout();
            });
        }

        // Close dropdown when clicking outside
        document.addEventListener('click', () => {
            const dropdown = document.getElementById('profileDropdown');
            if (dropdown) dropdown.classList.remove('active');
        });

        // Sync user with backend
        syncUserWithBackend(user);

        // Initialize Brand Voice
        initBrandVoice(user.sub);
    }
});

// Sync user to MongoDB on login
async function syncUserWithBackend(user) {
    try {
        await fetch('/api/users/sync', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                google_id: user.sub,
                email: user.email,
                name: user.name,
                picture: user.picture
            })
        });
    } catch (e) {
        console.log('User sync skipped (DB may not be configured):', e.message);
    }
}

// Brand Voice DNA functionality
async function initBrandVoice(googleId) {
    const personalityInput = document.getElementById('brandPersonality');
    const industrySelect = document.getElementById('brandIndustryGlobal');
    const audienceInput = document.getElementById('brandTargetAudience');
    const toneSelect = document.getElementById('brandToneGlobal');
    const saveBtn = document.getElementById('saveBrandVoiceBtn');
    const statusSpan = document.getElementById('brandVoiceSaveStatus');

    if (!saveBtn) return;

    // Load saved brand voice from localStorage (fallback) or API
    const savedVoice = JSON.parse(localStorage.getItem('bizforge_brand_voice') || '{}');
    if (personalityInput) personalityInput.value = savedVoice.personality || '';
    if (industrySelect) industrySelect.value = savedVoice.industry || '';
    if (audienceInput) audienceInput.value = savedVoice.target_audience || '';
    if (toneSelect) toneSelect.value = savedVoice.tone || '';

    // Try to load from API
    try {
        const res = await fetch(`/api/users/me/brand-voice?google_id=${googleId}`);
        if (res.ok) {
            const data = await res.json();
            if (data.brand_voice) {
                if (personalityInput) personalityInput.value = data.brand_voice.personality || '';
                if (industrySelect) industrySelect.value = data.brand_voice.industry || '';
                if (audienceInput) audienceInput.value = data.brand_voice.target_audience || '';
                if (toneSelect) toneSelect.value = data.brand_voice.tone || '';
            }
        }
    } catch (e) {
        console.log('Brand voice API load skipped:', e.message);
    }

    // Save handler
    saveBtn.addEventListener('click', async () => {
        const brandVoice = {
            personality: personalityInput?.value || '',
            industry: industrySelect?.value || '',
            target_audience: audienceInput?.value || '',
            tone: toneSelect?.value || ''
        };

        // Save to localStorage
        localStorage.setItem('bizforge_brand_voice', JSON.stringify(brandVoice));

        // Try to save to API
        try {
            await fetch(`/api/users/me/brand-voice?google_id=${googleId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(brandVoice)
            });
        } catch (e) {
            console.log('Brand voice API save skipped:', e.message);
        }

        // Show success status
        if (statusSpan) {
            statusSpan.textContent = '✓ Saved!';
            statusSpan.className = 'save-status visible success';
            setTimeout(() => statusSpan.classList.remove('visible'), 2000);
        }
    });
}

// Get current brand voice for use in generators
function getBrandVoice() {
    return JSON.parse(localStorage.getItem('bizforge_brand_voice') || '{}');
}

// Initialize export brand guide button
document.addEventListener('DOMContentLoaded', () => {
    const exportBtn = document.getElementById('exportBrandGuideBtn');
    if (!exportBtn) return;

    exportBtn.addEventListener('click', async () => {
        const session = JSON.parse(localStorage.getItem('bizforge_session') || '{}');
        const brandVoice = getBrandVoice();

        exportBtn.disabled = true;
        exportBtn.textContent = '⏳ Generating PDF...';

        try {
            const response = await fetch('/api/export/brand-bible', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    brand_name: session.user?.name || 'My Brand',
                    tagline: 'Powered by BizForge AI',
                    industry: brandVoice.industry || null,
                    description: brandVoice.personality || null,
                    brand_voice: brandVoice,
                    primary_color: '#667eea',
                    secondary_color: '#764ba2',
                    font_primary: 'Inter',
                    font_secondary: 'Roboto'
                })
            });

            if (!response.ok) throw new Error('PDF generation failed');

            // Download the PDF
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${session.user?.name?.replace(/\s+/g, '_') || 'Brand'}_Guide.pdf`;
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);

            exportBtn.textContent = '✅ Downloaded!';
            setTimeout(() => exportBtn.textContent = '📥 Download Brand Guide', 2000);
        } catch (e) {
            console.error('Export error:', e);
            exportBtn.textContent = '❌ Error';
            setTimeout(() => exportBtn.textContent = '📥 Download Brand Guide', 2000);
        } finally {
            exportBtn.disabled = false;
        }
    });
});
