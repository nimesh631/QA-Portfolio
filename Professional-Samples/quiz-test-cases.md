# Quiz Platform – QA Test Cases
**Training Platform App**

| Aspect | Details |
|--------|---------|
| **Application Type** | Web App / Quiz Platform |
| **Module** | Quiz Attempt, Leaderboard, Stats, AI Generation |
| **Testing Types** | Functional, UI, Data Consistency, API |
| **Platforms** | Web (Chrome, Firefox, Safari, Edge) |
| **Date Created** | April 2026 |

---

## 1. QUIZ SCORING & CALCULATION

### 1.1 Score Calculation
#### TC_QUIZ_SCORE_001: Verify Quiz Score Calculation Based on Correct Answers
- **Priority:** High
- **Severity:** High
- **Precondition:** Quiz contains 5 questions
- **Test Steps:**
  1. Attempt quiz
  2. Answer 3 questions correctly
  3. Submit quiz
- **Expected Result:**
  - Score is displayed as 3/5 (60%)
  - Score calculation is accurate
- **Actual Result:** Score calculated correctly as 3/5 (60%)
- **Status:** Pass
- **Platform:** Web

---

## 2. QUIZ MODIFICATION & CONSISTENCY

### 2.1 Score Consistency
#### TC_QUIZ_EDIT_002: Verify Score Consistency After Quiz Questions Are Modified
- **Priority:** High
- **Severity:** High
- **Precondition:** Quiz initially contains 5 questions
- **Test Steps:**
  1. Attempt quiz and score 3/5
  2. Edit quiz to reduce questions to 2
  3. Reattempt quiz and score 1/2
  4. Check leaderboard
- **Expected Result:**
  - Scores clearly reflect their respective totals (3/5, 1/2)
  - System properly handles old vs new attempts
  - No confusion between old and new scores
- **Actual Result:** Scores displayed without denominator causing confusion
- **Status:** Fail
- **Platform:** Web

---

## 3. LEADERBOARD DISPLAY

### 3.1 Leaderboard Formatting
#### TC_LEADERBOARD_DISPLAY_003: Verify Leaderboard Displays Score with Denominator
- **Priority:** High
- **Severity:** Medium
- **Precondition:** Multiple quiz attempts with different total questions
- **Test Steps:**
  1. Attempt quiz with different question counts
  2. Navigate to leaderboard
- **Expected Result:**
  - Score displays as fraction with percentage:
    - 3/5 (60%)
    - 1/2 (50%)
  - Denominator clearly shows total questions attempted
- **Actual Result:** Only raw score + percentage shown (e.g., 3 (60%), 1 (50%))
- **Status:** Fail
- **Platform:** Web

#### TC_GLOBAL_LEADERBOARD_004: Verify Global Leaderboard Displays Aggregated User Performance
- **Priority:** Medium
- **Severity:** Medium
- **Precondition:** User has attempted multiple quizzes
- **Test Steps:**
  1. Attempt multiple quizzes
  2. Navigate to global leaderboard
- **Expected Result:**
  - Global leaderboard displays:
    - Total Score
    - Accuracy (%)
    - Number of quizzes attempted
  - Example format: Score: 12 | Accuracy: 44% | Quizzes: 8
- **Actual Result:** Display matches expected format
- **Status:** Pass
- **Platform:** Web

---

## 4. DATA CONSISTENCY & GUEST HANDLING

### 4.1 Guest User Statistics
#### TC_GUEST_STATS_005: Verify Guest User Attempts Are Handled Consistently in Statistics
- **Priority:** High
- **Severity:** High
- **Precondition:** Guest and logged-in users attempt quiz
- **Test Steps:**
  1. Attempt quiz as guest user
  2. Attempt quiz as logged-in user
  3. Check stats (average time, attempts, leaderboard)
- **Expected Result:**
  - Guest data should be consistently handled by either:
    - Being fully excluded from all metrics, OR
    - Being consistently included across all metrics
  - No inconsistent inclusion/exclusion across different views
- **Actual Result:** Guest attempts included in stats but not in leaderboard
- **Status:** Fail
- **Platform:** Web

---

## 5. API & AUTHENTICATION

### 5.1 AI Generation API Security
#### TC_AI_API_AUTH_006: Verify AI Quiz Generation API Requires Authentication
- **Priority:** High
- **Severity:** Critical
- **Precondition:** AI quiz generation feature available
- **Test Steps:**
  1. Trigger AI quiz generation
  2. Check request headers in Network tab
  3. Logout and retry API call
- **Expected Result:**
  - API requires valid authentication
  - Unauthorized requests return 401 status code
  - Authentication header present in all API calls
- **Actual Result:** API works without visible authentication header
- **Status:** Fail
- **Platform:** Web

---

## 6. UI & LAYOUT

### 6.1 Quiz Card Layout
#### TC_UI_CARD_LAYOUT_007: Verify Quiz Cards Maintain Consistent Layout with Long Titles
- **Priority:** Medium
- **Severity:** Medium
- **Precondition:** Multiple quiz cards displayed in grid
- **Test Steps:**
  1. Create quiz with very long title
  2. Observe card layout in grid view
  3. Verify other cards are not affected
- **Expected Result:**
  - Card height remains consistent across all cards
  - Long titles are truncated with ellipsis (...)
  - Grid layout is maintained without overflow
- **Actual Result:** Long title stretches entire row affecting other cards
- **Status:** Fail
- **Platform:** Web

---

## 7. INPUT VALIDATION

### 7.1 URL Validation
#### TC_INPUT_VALIDATION_008: Verify Source URL Field Accepts Only Valid URLs
- **Priority:** High
- **Severity:** High
- **Precondition:** Source URL input field available
- **Test Steps:**
  1. Enter valid URL (e.g., https://example.com)
  2. Verify submission succeeds
  3. Enter invalid input (e.g., "nimesh")
  4. Attempt to submit
- **Expected Result:**
  - Valid URLs are accepted and saved
  - Invalid inputs are rejected with error message
  - Clear validation feedback provided to user
- **Actual Result:** Invalid inputs accepted
- **Status:** Fail
- **Test Data:** 
  - Valid: https://example.com
  - Invalid: nimesh
- **Platform:** Web

### 7.2 Text Field Handling
#### TC_TEXT_OVERFLOW_009: Verify Long Unbroken Text Is Handled Properly in Explanation Field
- **Priority:** Medium
- **Severity:** Medium
- **Precondition:** Explanation field available
- **Test Steps:**
  1. Enter long unbroken text (no spaces)
  2. Submit and view UI
  3. Verify display on different screen sizes
- **Expected Result:**
  - Text wraps properly within field boundaries
  - UI layout remains intact
  - No overflow or layout breaking
- **Actual Result:** Text overflows and breaks layout
- **Status:** Fail
- **Platform:** Web

### 7.3 Password Field Validation
#### TC_PASSWORD_VALIDATION_010: Verify Password Field Enforces Maximum Length
- **Priority:** High
- **Severity:** High
- **Precondition:** Signup form available
- **Test Steps:**
  1. Enter password with 64 characters
  2. Attempt to submit (should succeed)
  3. Enter password with 65+ characters
  4. Attempt to submit
- **Expected Result:**
  - 64 characters are accepted and saved
  - 65+ characters are rejected with validation message
  - Clear constraint messaging displayed
- **Actual Result:** Works as expected
- **Status:** Pass
- **Test Data:**
  - Valid: 64-character password
  - Invalid: 65+ character password
- **Platform:** Web

---

## Summary

| Test Case ID | Title | Status | Priority | Severity |
|---|---|---|---|---|
| TC_QUIZ_SCORE_401 | Quiz Score Calculation | Pass | High | High |
| TC_QUIZ_EDIT_402 | Score Consistency After Modification | Fail | High | High |
| TC_LEADERBOARD_DISPLAY_403 | Leaderboard Score Display | Fail | High | Medium |
| TC_GLOBAL_LEADERBOARD_404 | Global Leaderboard Aggregation | Pass | Medium | Medium |
| TC_GUEST_STATS_405 | Guest User Statistics Consistency | Fail | High | High |
| TC_AI_API_AUTH_406 | AI API Authentication | Fail | High | Critical |
| TC_UI_CARD_LAYOUT_407 | Quiz Card Layout | Fail | Medium | Medium |
| TC_INPUT_VALIDATION_408 | Source URL Validation | Fail | High | High |
| TC_TEXT_OVERFLOW_409 | Text Overflow Handling | Fail | Medium | Medium |
| TC_PASSWORD_VALIDATION_410 | Password Maximum Length | Pass | High | High |

**Total Tests:** 10  
**Passed:** 3  
**Failed:** 7  
**Pass Rate:** 30%
