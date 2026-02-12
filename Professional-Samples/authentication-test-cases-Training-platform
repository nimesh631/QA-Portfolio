# Authentication & Login – Test Cases – Training Platform App
**Application Type:** Web Application  
**Module:** Authentication/Login  
**Testing Type:** Functional, UI/UX, Integration  

---

## TC_AUTH_LOGIN_001
**Title:** Verify that invalid or unregistered users cannot log in  
**Precondition:** User is on the Sign In page  

**Test Steps:**
1. Open https://example.com/login
2. Enter invalid credentials
3. Click Sign In

**Expected Result:**
- App should not allow login
- Error message **"Your credentials are incorrect"** should be displayed

**Actual Result:**
- App displayed **"Invalid credentials"**

**Status:** Pass  
**Severity:** High  
**Priority:** High  

---

## TC_AUTH_LOGIN_002
**Title:** Verify email field format validation  
**Precondition:** User is on the Sign In page  

**Test Steps:**
1. Open login page
2. Enter invalid email formats: testuser, user@, user.com
3. Click Sign In

**Expected Result:**
- Validation message **"Please enter a valid email address"** is displayed

**Actual Result:**
- App displays validation message for email

**Status:** Pass  
**Severity:** High  
**Priority:** High  

---

## TC_AUTH_LOGIN_003
**Title:** Verify minimum character limit for password field  
**Precondition:** User is on the Sign In page  

**Test Steps:**
1. Open login page
2. Enter valid email and password less than 6 characters
3. Click Sign In

**Expected Result:**
- Validation message **"Password must be at least 6 characters"** is displayed

**Actual Result:**
- App displays validation message for password

**Status:** Pass  
**Severity:** High  
**Priority:** High  

---

## TC_AUTH_LOGIN_005
**Title:** Verify toggle between hide and show for password field using eye icon  
**Precondition:** User is on the Sign In page  

**Test Steps:**
1. Open login page
2. Enter email and password
3. Click eye icon to toggle password visibility

**Expected Result:**
- User should be able to toggle password visibility

**Actual Result:**
- Eye icon works correctly

**Status:** Pass  
**Severity:** High  
**Priority:** High  

---

## TC_AUTH_LOGIN_006
**Title:** Verify "Customizing Your Profile" navigation for new users signing in via Google  
**Precondition:** User is on the Sign In page  

**Test Steps:**
1. Open login page
2. Click Google icon
3. Select Google account

**Expected Result:**
- User should be navigated to the profile setup page

**Actual Result:**
- Navigates to profile customization page

**Status:** Pass  
**Severity:** High  
**Priority:** High  

---

## TC_AUTH_PROFILE_008
**Title:** Verify DOB field has minimum age validation  
**Precondition:** User is on Profile Customization page  

**Test Steps:**
1. Navigate to profile setup
2. Enter DOB less than minimum age (e.g., 2025/01/01)
3. Click Continue

**Expected Result:**
- Shows validation error for age

**Actual Result:**
- DOB validation error displayed

**Status:** Blocked  
**Severity:** High  
**Priority:** High  

---

## TC_AUTH_PROFILE_010
**Title:** Verify Username handles empty input  
**Precondition:** User is on Profile Customization page  

**Test Steps:**
1. Leave username empty
2. Click Continue

**Expected Result:**
- Validation message **"Please enter your username"** displayed

**Actual Result:**
- Validation message displayed

**Status:** Pass  
**Severity:** High  
**Priority:** High  

---

## TC_AUTH_CONSENT_013
**Title:** Verify parental consent is sent to parent's email  
**Precondition:** User is on Parental Consent page  

**Test Steps:**
1. Enter parent's email
2. Click Send Consent

**Expected Result:**
- Consent email should be sent successfully

**Actual Result:**
- Consent email sent

**Status:** Pass  
**Severity:** High  
**Priority:** Medium  

---

## TC_AUTH_LOGIN_028
**Title:** Verify password field maximum character limit  
**Precondition:** User is on Sign In page  

**Test Steps:**
1. Enter password with 256 characters
2. Click Sign In

**Expected Result:**
- Should not allow extremely long passwords (>50 characters)

**Actual Result:**
- Validation message displayed

**Status:** Pass  
**Severity:** High  
**Priority:** High  

---

## TC_AUTH_LOGIN_046
**Title:** Verify user can sign in using Apple ID and multiple Google accounts to access same account  
**Precondition:** User has Apple ID and multiple Google accounts  

**Test Steps:**
1. Sign up using Apple ID
2. Connect multiple Google accounts
3. Logout and login again with each account

**Expected Result:**
- All login methods should open same user account

**Actual Result:**
- All login methods open same account

**Status:** Pass  
**Severity:** High  
**Priority:** High  

---

## TC_AUTH_UI_047
**Title:** Verify UI elements are visible and readable in Dark Mode  
**Precondition:** Dark mode enabled in app settings  

**Test Steps:**
1. Navigate to login page
2. Check text, buttons, icons, and inputs for visibility

**Expected Result:**
- All elements should be clearly visible and usable

**Actual Result:**
- UI elements visible and usable

**Status:** Pass  
**Severity:** Medium  
**Priority:** Medium