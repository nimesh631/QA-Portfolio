# Bug Test Cases – QCommerce Platform

**Application Type:** Web / Mobile App  
**Module:** Cart, Order, Product  
**Testing Type:** Functional, Bug Verification  

---

## BUG_101
**Title:** Verify coupon discount updates correctly after removing product from cart  
**Precondition:** Cart contains at least two products with applied coupon code  

**Test Steps:**
1. Add at least two products to the cart (within coupon limit)
2. Apply coupon code
3. Observe discount distribution on products
4. Remove one product from the cart
5. Observe discount distribution on remaining products

**Expected Result:**
- Coupon discount updates correctly based on remaining products
- Discount is allocated correctly to remaining products after removal

**Actual Result:**
- Discount from removed product was being added to another product incorrectly

**Status:** Fixed  
**Severity:** High  
**Priority:** High  
**Date:** Reported: 3/30/2026 | Updated: 3/31/2026

---

## BUG_102
**Title:** Verify checkout is blocked when product category is inactive  
**Precondition:** Product is added to cart and category is set to inactive  

**Test Steps:**
1. Add a product to cart (e.g., Driller)
2. Go to Admin Panel → Categories
3. Set product category status to Inactive
4. Go back to user cart
5. Attempt to checkout

**Expected Result:**
- Product should not be purchasable if inactive
- Checkout should be blocked for inactive products
- Warning message should be displayed in cart

**Actual Result:**
- Checkout is allowed even when category is inactive

**Status:** New  
**Severity:** High  
**Priority:** High  
**Date:** Reported: 3/6/2026

---

## BUG_103
**Title:** Verify refund rejection reason is displayed to user  
**Precondition:** User has requested refund and admin has rejected with reason  

**Test Steps:**
1. Order a product
2. Cancel order from user or admin
3. Request refund from cancelled tab
4. Admin rejects refund and enters rejection reason
5. Check user app for rejection reason

**Expected Result:**
- Rejection reason should be displayed to user in order/refund section

**Actual Result:**
- Rejection reason is not displayed

**Status:** New  
**Severity:** High  
**Priority:** High  
**Date:** Reported: 3/4/2026

---

## BUG_104
**Title:** Verify product variants are displayed and can be ordered  
**Precondition:** Products with variants exist in catalog  

**Test Steps:**
1. Navigate to home page (web and app)
2. Open a product with variants
3. Verify if variants are displayed
4. Repeat for multiple products with variants

**Expected Result:**
- Product variants should be displayed if available
- Variants should be selectable for ordering

**Actual Result:**
- Variants were not shown in some products

**Status:** Fixed  
**Severity:** High  
**Priority:** High  
**Date:** Reported: 3/6/2026
