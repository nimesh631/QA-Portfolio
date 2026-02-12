# Authentication & Security – Test Cases
**Application Type:** Web Application  
**Module:** Sign In / Session Management  
**Testing Type:** Security, Functional, Authorization  

---

## TC_AUTH_SEC_001
**Title:** Verify email field handles SQL injection  
**Precondition:** User is on the Sign In page  

**Test Steps:**
1. Enter `' OR 1=1 --` in the email field  
2. Enter a valid password  
3. Click the Sign In button  

**Expected Result:**
- System should not expose any user data  
- Input should be rejected  
- Error message such as **"Invalid email address"** should be displayed  

**Actual Result:**
- Application displays an invalid email error message  

**Status:** Pass  
**Severity:** Critical  
**Priority:** Critical  

---

## TC_AUTH_SEC_002
**Title:** Verify password field handles SQL injection  
**Precondition:** User is on the Sign In page  

**Test Steps:**
1. Enter `' OR 1=1 --` in the password field  
2. Enter a valid user email  
3. Click the Sign In button  

**Expected Result:**
- System should reject malicious input  
- Error message such as **"Incorrect credentials"** should be displayed  

**Actual Result:**
- Application displays an incorrect credential error message  

**Status:** Pass  
**Severity:** Critical  
**Priority:** Critical  

---

## TC_AUTH_ROLE_003
**Title:** Verify only authorized user role can access the User Dashboard  
**Precondition:** User is on the Sign In page  

**Test Steps:**
1. Open the User Portal (e.g., `https://user.sampleapp.com`)  
2. Enter Admin credentials  
3. Click Sign In  

**Expected Result:**
- Admin credentials should be rejected  
- Error message such as **"Access denied for this role"** should be displayed  

**Actual Result:**
- System displays an access denied message  

**Status:** Pass  
**Severity:** Critical  
**Priority:** Critical  

---

## TC_AUTH_SEC_004
**Title:** Verify unauthorized access to protected pages is blocked  
**Precondition:** User is not logged in  

**Test Steps:**
1. Manually enter protected URLs in the browser:
   - `/users`
   - `/dashboard`
   - `/settings`
2. Observe application behavior  

**Expected Result:**
- User should be redirected to the Sign In page  
- Protected content should not be accessible  

**Actual Result:**
- User is redirected to the Sign In page  

**Status:** Pass  
**Severity:** Critical  
**Priority:** Critical  

---

## TC_AUTH_SESS_005
**Title:** Verify user remains logged in after page refresh  
**Precondition:** User is logged in  

**Test Steps:**
1. Login with valid credentials  
2. Refresh the browser page  

**Expected Result:**
- User remains logged in  
- User stays on the correct dashboard  

**Actual Result:**
- User remains logged in  

**Status:** Pass  
**Severity:** Medium  
**Priority:** High  

---

## TC_AUTH_SESS_006
**Title:** Verify logout functionality works correctly  
**Precondition:** User is logged in  

**Test Steps:**
1. Click Logout  
2. Press browser back button  
3. Try to access dashboard URL manually  

**Expected Result:**
- User should be logged out  
- Access to protected pages should be blocked  
- User should be redirected to Sign In page  

**Actual Result:**
- Logout works as expected  

**Status:** Pass  
**Severity:** High  
**Priority:** High  

---

## TC_AUTH_SESS_007
**Title:** Verify session consistency across multiple tabs  
**Precondition:** User is logged in  

**Test Steps:**
1. Login in Tab 1  
2. Open the application in Tab 2  
3. Logout from Tab 1  
4. Try to interact with the app in Tab 2  

**Expected Result:**
- Tab 2 should require re-login  
- No actions should be allowed without authentication  

**Actual Result:**
- Tab 2 requires login  

**Status:** Pass  
**Severity:** High  
**Priority:** High  
