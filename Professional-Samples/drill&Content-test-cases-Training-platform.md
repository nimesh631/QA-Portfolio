These are QA test cases for a sample Training Platform app. All data and titles are for demonstration purposes only.


# Drills & Content – Test Cases – Training Platform App
**Application Type:** Mobile App / Training Platform  
**Module:** Drills, Content Playback, Filters  
**Testing Type:** Functional, UI, Content Playback  

---

## TC_DRILL_FILTER_311
**Title:** Verify only drills matching the selected Skill are displayed  
**Precondition:** App contains content items with different skills  

**Test Steps:**
1. Navigate to any drill in the Drills tab
2. Apply the Skill filter (e.g., "footwork")
3. Observe that all displayed content matches the selected skill

**Expected Result:**
- Only drills matching the selected Skill are displayed

**Actual Result:**
- Filtering by Skill displays correct selected skill content

**Status:** Pass  
**Severity:** High  
**Priority:** High


---

## TC_DRILL_FILTER_312
**Title:** Verify only drills matching the selected Skill Level are displayed  
**Precondition:** App contains content items with different skill levels  

**Test Steps:**
1. Navigate to any drill in the Drills tab
2. Apply the Skill Level filter (e.g., "Easy")
3. Observe that all displayed content matches the selected skill level

**Expected Result:**
- Only drills matching the selected Skill Level are displayed

**Actual Result:**
- Filtering by Skill Level displays correct content

**Status:** Pass  
**Severity:** High  
**Priority:** High

---

## TC_DRILL_FILTER_313
**Title:** Verify only drills matching both selected Skill and Skill Level are displayed  
**Precondition:** App contains content items with different skills and skill levels  

**Test Steps:**
1. Navigate to any drill in the Drills tab
2. Apply the Skill filter (e.g., "Batting")
3. Apply the Skill Level filter (e.g., "Easy")
4. Observe that all displayed content matches both filters

**Expected Result:**
- Only drills matching both selected Skill and Skill Level are displayed

**Actual Result:**
- Content matching filters are only displayed

**Status:** Pass  
**Severity:** High  
**Priority:** High

---

## TC_CONTENT_PLAYBACK_315
**Title:** Verify content plays in portrait mode in full screen when auto-rotate is disabled  
**Precondition:** App contains both YouTube and uploaded video content  

**Test Steps:**
1. Open any content and play it in full-screen mode with device auto-rotate OFF
2. Rotate the device to landscape orientation
3. Observe if the video remains in portrait mode

**Expected Result:**
- Content should play in portrait mode in full screen
- Video should not rotate to landscape

**Actual Result:**
- Content remains in portrait mode

**Status:** Pass  
**Severity:** Medium  
**Priority:** Medium

---

## TC_CONTENT_PLAYBACK_316
**Title:** Verify content switches to landscape mode in full screen when device is rotated and auto-rotate is enabled  
**Precondition:** App contains both YouTube and uploaded video content  

**Test Steps:**
1. Play any content in full-screen mode with auto-rotate ON
2. Rotate the device to landscape orientation
3. Observe if the video switches to landscape mode

**Expected Result:**
- Video switches to landscape mode in full screen when device rotated

**Actual Result:**
- Works as expected

**Status:** Pass  
**Severity:** Medium  
**Priority:** Medium

---

## TC_CONTENT_PLAYBACK_317
**Title:** Verify content returns to portrait mode after exiting full screen  
**Precondition:** App contains both YouTube and uploaded video content  

**Test Steps:**
1. Play any content in full-screen mode
2. Rotate device to landscape with auto-rotate ON
3. Exit full-screen
4. Observe if content returns to portrait mode

**Expected Result:**
- Content returns to portrait mode after exiting full screen

**Actual Result:**
- Works as expected

**Status:** Pass  
**Severity:** Medium  
**Priority:** Medium

---

## TC_CONTENT_SEARCH_321
**Title:** Verify search filters content based on title  
**Precondition:** User is logged in  

**Test Steps:**
1. Navigate to a Drill/Pillar page
2. Click on Search bar
3. Enter a content title (e.g., "Vicky Proper Push Up")
4. Observe the results

**Expected Result:**
- Only matching content is displayed
- If no match, display **"No matches found, try a different search"**

**Actual Result:**
- Search works correctly; handles spaces and partial matches

**Status:** Pass  
**Severity:** High  
**Priority:** High

---

## TC_CONTENT_DISPLAY_322
**Title:** Verify Coach name and content title are displayed correctly  
**Precondition:** User is logged in  

**Test Steps:**
1. Navigate to a Drill/Pillar page
2. Select a content item
3. Observe Coach name and Content title

**Expected Result:**
- Coach name displayed for every content
- Content title matches what was added by the coach

**Actual Result:**
- Displayed correctly

**Status:** Pass  
**Severity:** High  
**Priority:** High