# Email Reuse & Role Isolation – Test Cases
**Training Platform App**

| Aspect | Details |
|--------|---------|
| **Application Type** | Web / Mobile Platform |
| **Module** | Authentication, Role Management, Account Handling |
| **Testing Types** | Functional, Security, Role-based Access |
| **Platforms** | Web (Chrome, Firefox, Safari, Edge), Mobile (iOS, Android) |
| **Date Created** | March 2026 |

---

## 1. EMAIL REUSE SCENARIOS

### 1.1 Email Registration & Account Linking
#### TC_ER_001: Prevent Duplicate Email Registration
- **Priority:** High
- **Precondition:** Email already registered with Role A (Student)
- **Test Steps:**
  1. Login with existing email (student@example.com) - Student role
  2. Logout
  3. Attempt to register new account with same email (student@example.com)
  4. Select Role B (Instructor) during registration
- **Expected Result:** 
  - Registration fails with error: "Email already registered"
  - User is directed to login screen
  - No duplicate account is created
- **Test Data:** student@example.com
- **Platform:** Web, Mobile

#### TC_ER_002: Case-Insensitive Email Validation
- **Priority:** High
- **Precondition:** Account exists with email student@example.com
- **Test Steps:**
  1. Attempt to register with email STUDENT@EXAMPLE.COM
  2. Attempt to register with email Student@Example.com
  3. Attempt to register with email StUdEnt@ExAmPlE.cOm
- **Expected Result:** 
  - All attempts are rejected (case-insensitive matching)
  - System treats all variations as same email
  - Consistent error message for all attempts
- **Platform:** Web, Mobile

#### TC_ER_003: Multiple Role Assignment via Same Email
- **Priority:** High
- **Precondition:** User registered as Student with email user@example.com
- **Test Steps:**
  1. Admin attempts to create new account with same email user@example.com
  2. Admin selects role as Instructor
  3. Admin clicks "Create Account"
- **Expected Result:**
  - System prevents duplicate email registration
  - Error: "This email is already associated with another account"
  - Admin account creation fails
  - Original Student account remains unchanged
- **Platform:** Web

#### TC_ER_004: Email Change and Reuse
- **Priority:** High
- **Precondition:** 
  - Account A: email1@example.com (Student role)
  - Account B: email2@example.com (Instructor role)
- **Test Steps:**
  1. Login to Account A (Student)
  2. Navigate to Account Settings
  3. Change email to email3@example.com
  4. Verify email change
  5. Login to Account B (Instructor)
  6. Navigate to Account Settings
  7. Attempt to change email to email1@example.com (original email from Account A)
- **Expected Result:**
  - Step 4: Email change successful
  - Step 7: Change fails with error "Email already in use"
  - Account B email remains as email2@example.com
- **Platform:** Web, Mobile

#### TC_ER_005: Soft Delete and Email Reuse
- **Priority:** Medium
- **Precondition:** User account with email deleted@example.com is soft-deleted (deactivated)
- **Test Steps:**
  1. Verify account deleted@example.com is deactivated/soft-deleted
  2. Attempt to register new account with email deleted@example.com
  3. Provide all required registration details
  4. Submit registration form
- **Expected Result:**
  - Registration is rejected (email still reserved)
  - Error: "This email cannot be used. Please contact support if needed"
  - Soft-deleted email is not freed for reuse
- **Platform:** Web, Mobile

#### TC_ER_006: Permanent Delete and Email Reuse
- **Priority:** Medium
- **Precondition:** User account with email purged@example.com is permanently deleted (hard delete)
- **Test Steps:**
  1. Verify account purged@example.com is permanently deleted from system
  2. Attempt to register new account with email purged@example.com
  3. Complete registration with different details
- **Expected Result:**
  - Registration is allowed (email is available)
  - New account is created successfully
  - Original user data is not affiliated with new account
- **Platform:** Web, Mobile

---

## 2. ROLE ISOLATION SCENARIOS

### 2.1 Role-Based Data Access
#### TC_RI_001: Student Cannot Access Instructor Dashboard
- **Priority:** High (Security)
- **Precondition:** Student account (student@example.com) exists and logged in
- **Test Steps:**
  1. Login as Student (student@example.com)
  2. Attempt to access instructor dashboard URL directly: /dashboard/instructor
  3. Attempt to navigate via browser history to instructor page
  4. Check API calls to instructor endpoints
- **Expected Result:**
  - Access denied with 403 Forbidden or redirect to student dashboard
  - Unauthorized error message displayed
  - No instructor data is loaded or visible
  - API returns 403/401 error
- **Platform:** Web, Mobile

#### TC_RI_002: Instructor Cannot Access Admin Panel
- **Priority:** High (Security)
- **Precondition:** Instructor account (instructor@example.com) exists and logged in
- **Test Steps:**
  1. Login as Instructor
  2. Attempt to access admin panel URL: /admin
  3. Attempt to access user management page: /admin/users
  4. Try API call to admin endpoints directly
- **Expected Result:**
  - Access denied with appropriate error
  - Redirect to instructor home/dashboard
  - Admin panel UI elements not visible
  - API returns 403 Forbidden
- **Platform:** Web, Mobile

#### TC_RI_003: Student Cannot View Other Students' Submissions
- **Priority:** High (Security)
- **Precondition:** 
  - Student A (studentA@example.com)
  - Student B (studentB@example.com)
  - Both enrolled in same course
- **Test Steps:**
  1. Login as Student A
  2. Navigate to course submissions page
  3. Attempt to view Student B's submission details
  4. Try to access submission via direct URL: /submissions/{studentB_id}
  5. Intercept API request for other student's data
- **Expected Result:**
  - Student A can only view own submissions
  - Viewing Student B's submission fails (404 or 403)
  - No student data is leaked through API responses
  - Error: "You don't have permission to view this submission"
- **Platform:** Web, Mobile

#### TC_RI_004: Role-Based Course Enrollment Restrictions
- **Priority:** High
- **Precondition:** Instructor account (instructor@example.com) logged in
- **Test Steps:**
  1. Login as Instructor
  2. Attempt to enroll self in a course as Student
  3. Attempt to change role to Student through UI/API
  4. Try updating user role in account settings
- **Expected Result:**
  - User role cannot be changed via UI
  - API rejects role change requests
  - Enrollment/role change fails with appropriate error
  - User remains as Instructor
- **Platform:** Web, Mobile

#### TC_RI_005: Unauthorized Grade Modification
- **Priority:** High (Security)
- **Precondition:** 
  - Student (student@example.com) logged in
  - Quiz/assignment with grade exists
- **Test Steps:**
  1. Login as Student
  2. Locate submitted assignment with grade
  3. Attempt to modify grade value in UI (if visible)
  4. Intercept and modify API request to update grade
  5. Send modified PUT request to grade endpoint
- **Expected Result:**
  - Student cannot modify own grades through UI
  - API request to modify grades is rejected (403)
  - Grade remains unchanged
  - Audit log records the unauthorized attempt
- **Platform:** Web, Mobile

#### TC_RI_006: Admin-Only Operations
- **Priority:** High (Security)
- **Precondition:** Non-Admin user (student or instructor) logged in
- **Test Steps:**
  1. Login as Instructor
  2. Attempt to delete user account: /admin/users/{userId}/delete
  3. Attempt to view audit logs: /admin/audit
  4. Attempt to modify system settings: /admin/settings
- **Expected Result:**
  - All admin operations denied
  - Appropriate error responses (403, 404)
  - No user data deleted or modified
  - Admin functions not visible in UI
- **Platform:** Web

### 2.2 Role-Based Feature Access
#### TC_RI_007: Grade Submission Role Restriction
- **Priority:** High
- **Precondition:** 
  - Student (student@example.com) 
  - Instructor (instructor@example.com)
  - Same course enrollment
- **Test Steps:**
  1. Login as Student
  2. Navigate to assignment/quiz
  3. Attempt to submit grades for assignment
  4. Try accessing grade submission interface
- **Expected Result:**
  - Grade submission option is not visible to Student
  - Student cannot access grade input fields
  - If attempted via API, request returns 403 Forbidden
  - Only Instructor can submit grades
- **Platform:** Web, Mobile

#### TC_RI_008: User Management Access Control
- **Priority:** High
- **Precondition:** Student (student@example.com) logged in
- **Test Steps:**
  1. Login as Student
  2. Navigate to user management section
  3. Attempt to access /users or /manage-users page
  4. Try API call: GET /api/users?role=all
- **Expected Result:**
  - User management page not accessible
  - Redirected to home/restricted area message
  - API returns 403 Unauthorized
  - User list not retrieved or displayed
- **Platform:** Web, Mobile

#### TC_RI_009: Report Generation Role-Based Access
- **Priority:** Medium
- **Precondition:** Multiple roles (Student, Instructor, Admin)
- **Test Steps:**
  1. Login as Student
  2. Attempt to generate class performance report
  3. Login as Instructor
  4. Attempt to generate student grades report
  5. Attempt to export system-wide analytics
- **Expected Result:**
  - Step 2: Feature not visible, access denied
  - Step 4: Can generate course-level reports only
  - Step 5: Access denied for Instructor
  - Each role can generate only permitted report types
- **Platform:** Web

#### TC_RI_010: Content Modification by Role
- **Priority:** High
- **Precondition:** 
  - Course content created by Instructor
  - Student enrolled in course
- **Test Steps:**
  1. Login as Student
  2. Attempt to edit course material, lessons, or quiz
  3. Attempt to delete course content
  4. Login as Instructor
  5. Edit course material successfully
- **Expected Result:**
  - Step 2-3: Edit/Delete options not available
  - Student cannot modify course content via UI or API
  - Step 5: Instructor can modify course content
  - Changes are saved and audit log updated
- **Platform:** Web

---

## 3. CROSS-ROLE SCENARIOS

### 3.1 Privilege Escalation Tests
#### TC_CR_001: Privilege Escalation via Role Parameter
- **Priority:** Critical (Security)
- **Precondition:** Student account (student@example.com) logged in, with valid auth token
- **Test Steps:**
  1. Login as Student
  2. Capture authentication token from browser/login response
  3. Modify API request to include role parameter: ?role=admin
  4. Send request with modified role parameter
  5. Attempt POST request to admin endpoint with modified token
- **Expected Result:**
  - API ignores client-side role parameter
  - Server validates role from token, not request
  - Request processed with Student role privileges
  - Admin operation fails with 403 Forbidden
- **Platform:** Web, Mobile

#### TC_CR_002: Token Manipulation for Role Change
- **Priority:** Critical (Security)
- **Precondition:** Valid student authentication token
- **Test Steps:**
  1. Login as Student, capture JWT token
  2. Decode JWT token
  3. Modify role claim in token (student → admin)
  4. Re-encode token and update in browser/app storage
  5. Attempt to access admin features with modified token
- **Expected Result:**
  - Modified token is rejected by server
  - Token signature validation fails
  - Access denied with 401 Unauthorized
  - Suspicious activity logged
- **Platform:** Web, Mobile

#### TC_CR_003: Session Hijacking Between Roles
- **Priority:** Critical (Security)
- **Precondition:** 
  - Student session active (Session_ID_Student)
  - Attacker captures session ID
- **Test Steps:**
  1. Student (student@example.com) logs in, session created
  2. Attacker obtains Student's session ID
  3. Attacker uses Student's session ID to make API calls
  4. Attacker attempts to escalate privileges with hijacked session
- **Expected Result:**
  - Session should be invalidated after role change attempt
  - API validates session ownership with email/user ID
  - Suspicious activity triggers re-authentication
  - Session audit log updated
- **Platform:** Web, Mobile

### 3.2 Multi-User/Multi-Role Testing
#### TC_CR_004: Same Email, Multiple Roles (Concurrent Sessions)
- **Priority:** High
- **Precondition:** System allows same user with multiple roles (if applicable)
- **Test Steps:**
  1. User (user@example.com) is assigned Student role
  2. Admin creates second profile with same email for Instructor role
  3. User attempts to login with single set of credentials
  4. System attempts to create concurrent sessions
- **Expected Result:**
  - System either:
    - Option A: Prevents duplicate email registration
    - Option B: Allows multiple roles but manages sessions separately
  - Clear session management and role context
  - No data mixing between roles
  - User must choose role explicitly on login
- **Platform:** Web, Mobile

#### TC_CR_005: Role Switching Session Invalidation
- **Priority:** High
- **Precondition:** User has multiple roles in system
- **Test Steps:**
  1. Login as Instructor
  2. Access instructor-only content
  3. Switch to Student role (if allowed)
  4. Verify previous Instructor session invalidated
  5. Attempt to access Instructor content
- **Expected Result:**
  - Previous role session is terminated
  - User now has only Student privileges
  - Instructor-level data is no longer accessible
  - New session created for Student role
- **Platform:** Web

#### TC_CR_006: Logout from One Role Affects Other Roles
- **Priority:** High
- **Precondition:** User with multiple roles has concurrent sessions
- **Test Steps:**
  1. User logged in as both Student and Instructor (if supported)
  2. Logout from Student session
  3. Verify Instructor session still active
  4. Logout from Instructor session
  5. Verify both sessions are terminated
- **Expected Result:**
  - Logout from one role terminates only that session
  - Other role sessions remain active
  - Upon complete logout, all sessions terminated
  - Cookies/tokens for all roles deleted
- **Platform:** Web, Mobile

---

## 4. EMAIL VERIFICATION & ACCOUNT SECURITY

#### TC_ES_001: Email Verification Before Role Assignment
- **Priority:** High (Security)
- **Precondition:** New user registration initiated
- **Test Steps:**
  1. Register new account with email newuser@example.com
  2. Select role as Instructor
  3. Submit registration
  4. Email verification not completed
  5. Attempt to login with unverified email
- **Expected Result:**
  - User cannot login until email verified
  - Email verification link sent to newuser@example.com
  - Account in "pending verification" state
  - Role assignment held until verification complete
- **Platform:** Web, Mobile

#### TC_ES_002: Email Verification Token Expiration
- **Priority:** High (Security)
- **Precondition:** Email verification link generated but expired (48+ hours)
- **Test Steps:**
  1. User receives verification email
  2. Wait for verification token to expire
  3. Click expired verification link
  4. Attempt to verify email account
- **Expected Result:**
  - Token validation fails (expired)
  - Error: "Verification link has expired"
  - User directed to request new verification link
  - Account remains unverified
- **Platform:** Web, Mobile

#### TC_ES_003: Password Reset Email Role Verification
- **Priority:** High (Security)
- **Precondition:** User email compromised, password reset requested
- **Test Steps:**
  1. User (user@example.com, Instructor role) requests password reset
  2. Attacker intercepts email with reset link
  3. Attacker clicks reset link
  4. Attacker resets password and gains account
  5. Original user attempts to login with old password
- **Expected Result:**
  - Password reset link includes role/account verification
  - Reset can only be confirmed from verified user
  - Audit log tracks password reset
  - Original user notified of account change
  - Additional verification steps for sensitive changes
- **Platform:** Web, Mobile

---

## 5. DATA ISOLATION TESTS

#### TC_DI_001: Database Query Isolation
- **Priority:** Critical (Security)
- **Precondition:** Backend database queries use role-based filtering
- **Test Steps:**
  1. Capture database queries from Student account access
  2. Inspect query for role-based WHERE clause
  3. Example: SELECT * FROM submissions WHERE user_id = ? AND role = 'student'
  4. Verify filtering logic is applied at database level
- **Expected Result:**
  - Queries include role-based filtering
  - No raw access to all user data
  - Database applies row-level security
  - Query logs show proper filtering applied
- **Platform:** Backend/API

#### TC_DI_002: API Response Data Filtering
- **Priority:** High (Security)
- **Precondition:** API endpoint returns user/role-based data
- **Test Steps:**
  1. Login as Student
  2. Call API: GET /api/courses
  3. Inspect JSON response for data fields
  4. Verify response contains only Student-accessible courses
  5. Verify no instructor-only course data included
- **Expected Result:**
  - API returns only role-appropriate data
  - Sensitive fields not included (admin notes, grades not for student)
  - Response structure consistent but filtered
  - No hidden data in response
- **Platform:** Web, Mobile

#### TC_DI_003: Batch Operation Role Filtering
- **Priority:** High (Security)
- **Precondition:** Batch API operation available
- **Test Steps:**
  1. Login as Student as Student role
  2. Call batch API: GET /api/batch?users=user1,user2,user3
  3. Request includes users from multiple roles
  4. Inspect batch response data
- **Expected Result:**
  - Only currently logged-in student's data returned
  - Batch request filtered by role authorization
  - Unauthorized user data excluded from response
  - Error for inaccessible users in batch
- **Platform:** API

---

## 6. EDGE CASES & ERROR HANDLING

#### TC_EC_001: Inactive User Email Reuse
- **Priority:** Medium
- **Precondition:** 
  - User account deactivated by Admin
  - Email: inactive@example.com
- **Test Steps:**
  1. Verify account with email inactive@example.com is deactivated
  2. Attempt to register new account with inactive@example.com
  3. Register with different role (e.g., Instructor if original was Student)
- **Expected Result:**
  - Registration rejected (email reserved)
  - Error: "Email associated with inactive account"
  - New account not created
  - Admin can reactivate original account if needed
- **Platform:** Web, Mobile

#### TC_EC_002: Rapidly Switching Roles (Race Condition)
- **Priority:** Medium
- **Precondition:** User account with multiple roles
- **Test Steps:**
  1. Open two browser tabs/windows
  2. Login to Tab A as Instructor
  3. Simultaneous: Tab B, login same user as Student
  4. Tab A: Access instructor content
  5. Tab B: Access student content simultaneously
- **Expected Result:**
  - Both sessions maintain separate role contexts
  - Data isolation preserved across sessions
  - No data corruption or mixing
  - Session state properly managed
- **Platform:** Web

#### TC_EC_003: Email Special Characters in Role System
- **Priority:** Low
- **Precondition:** Special characters in email address
- **Test Steps:**
  1. Register with email: user+tag@example.com (with +)
  2. Register with email: user.name@sub.example.com (multiple dots)
  3. Attempt to assign different roles to variations
  4. Verify system treats variations correctly
- **Expected Result:**
  - Email parsing handles special characters
  - Email variations treated as distinct (depending on system design)
  - Consistent role assignment regardless of format
  - No parsing errors or security issues
- **Platform:** Web, Mobile

#### TC_EC_004: Null/Empty Role Assignment
- **Priority:** Medium (Security)
- **Precondition:** API testing with malicious payloads
- **Test Steps:**
  1. API call with role = null
  2. API call with role = "" (empty string)
  3. API call with role = undefined
  4. API call without role parameter
- **Expected Result:**
  - API rejects requests with missing/invalid role
  - Returns 400 Bad Request or 403 Forbidden
  - Default role not assigned
  - Error message provided
- **Platform:** API

#### TC_EC_005: Unicode Email Addresses
- **Priority:** Low
- **Precondition:** Email with Unicode/international characters
- **Test Steps:**
  1. Register with email: user@例え.jp (Japanese domain)
  2. Register with email: café@example.com (accented character)
  3. Assign role to these accounts
  4. Verify email validation and role assignment
- **Expected Result:**
  - Email validation handles Unicode correctly
  - Role assignment works with international emails
  - Email verification functions properly
  - No encoding/decoding issues
- **Platform:** Web, Mobile

---

## 7. REGULATORY & COMPLIANCE SCENARIOS

#### TC_RC_001: GDPR Data Access by Role
- **Priority:** High (Compliance)
- **Precondition:** User personal data stored in system
- **Test Steps:**
  1. User requests to download personal data (GDPR Article 15)
  2. Verify data returned matches user's role context
  3. Ensure no data from other roles/users included
  4. Verify audit trail for data access request
- **Expected Result:**
  - Only user's own personal data exported
  - No cross-role or other user data included
  - Data export completed within compliance window
  - Audit log records data access request
- **Platform:** Web

#### TC_RC_002: Audit Trail Role-Based Changes
- **Priority:** High (Compliance)
- **Precondition:** Role change or privilege modification
- **Test Steps:**
  1. Admin changes user role from Student to Instructor
  2. Review audit log entry for this change
  3. Verify log includes: user, action, timestamp, role before/after, admin who made change
- **Expected Result:**
  - Audit entry created
  - All required fields populated
  - Timestamp accurate
  - Non-repudiation maintained (cannot deny action)
- **Platform:** Backend

#### TC_RC_003: User Deletion and Email Cleanup
- **Priority:** Medium (Compliance)
- **Precondition:** User account with multiple roles to be deleted
- **Test Steps:**
  1. Admin initiated user account deletion
  2. All related role assignments deleted
  3. Email marked as available/unavailable per policy
  4. Related data (submissions, profile) handled per policy
- **Expected Result:**
  - Account completely deleted
  - Role assignments removed
  - Email either available for reuse or reserved per policy
  - Residual data handling per compliance requirements
- **Platform:** Web

---

## Test Execution Summary

| Category | Total TCs | Priority High | Priority Medium | Priority Low |
|----------|-----------|---|---|---|
| Email Reuse | 6 | 5 | 1 | - |
| Role Isolation | 9 | 9 | - | - |
| Cross-Role | 6 | 4 | 2 | - |
| Email/Security | 3 | 3 | - | - |
| Data Isolation | 3 | 3 | - | - |
| Edge Cases | 5 | 1 | 3 | 1 |
| Compliance | 3 | 2 | 1 | - |
| **TOTAL** | **35** | **27** | **7** | **1** |

---

## Testing Tools & Resources

### Recommended Tools:
- **Functional Testing:** Selenium, Cypress, Playwright
- **API Testing:** Postman, REST Client, SoapUI
- **Security Testing:** Burp Suite, OWASP ZAP, SQL Map
- **Database Testing:** SQL Profiler, MySQL Workbench
- **Performance:** JMeter (load testing of multi-role scenarios)
- **Mobile Testing:** Appium, XCTest, Espresso

### Test Data Requirements:
- Min 3-5 test accounts per role (Student, Instructor, Admin, etc.)
- Email addresses with various formats (@, +, special chars)
- Historical data for deprecated/deleted accounts
- Sandbox database with sample courses, submissions, grades

### Security Considerations:
- Run tests on isolated test environment
- Use VPN for remote testing if applicable
- Document all test credentials securely
- Rotate test data regularly
- Avoid using production data in security tests

