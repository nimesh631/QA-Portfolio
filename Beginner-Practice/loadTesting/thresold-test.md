# K6 Threshold Test

## Overview
A k6 load test with defined performance thresholds. Tests login and profile authentication with 10 virtual users over 30 seconds, and generates an HTML report upon completion.

## Configuration

```javascript
export const options = {
  vus: 10,           // 10 virtual users
  duration: '30s',   // 30 seconds duration
  thresholds: {
    http_req_duration: ['p(95)<500'],      // 95th percentile latency < 500ms
    http_req_failed: ['rate<0.05'],        // Failed requests < 5%
    checks: ['rate>0.95'],                 // Check pass rate > 95%
  },
};
```

## Thresholds Explained

| Threshold | Criteria | Meaning |
|-----------|----------|---------|
| `http_req_duration` | `p(95)<500` | 95% of requests must complete in under 500ms |
| `http_req_failed` | `rate<0.05` | Less than 5% of requests should fail |
| `checks` | `rate>0.95` | More than 95% of checks should pass |

## Test Flow

### 1. Login Request
- **Endpoint:** `POST https://dummyjson.com/auth/login`
- **Credentials:** 
  - Username: `emilys`
  - Password: `emilyspass`
- **Content-Type:** `application/json`

**Checks:**
- ✓ Login status is 200
- ✓ Access token received

```javascript
const loginRes = http.post(
  'https://dummyjson.com/auth/login',
  JSON.stringify({
    username: 'emilys',
    password: 'emilyspass',
  }),
  { headers: { 'Content-Type': 'application/json' } }
);
```

### 2. Profile Request
- **Endpoint:** `GET https://dummyjson.com/auth/me`
- **Authorization:** Bearer token from login response

**Checks:**
- ✓ Profile status is 200
- ✓ Username field exists

```javascript
const profileRes = http.get(
  'https://dummyjson.com/auth/me',
  { headers: { Authorization: `Bearer ${token}` } }
);
```

## Think Time
- 1 second sleep between iterations

## Report Generation

This test automatically generates an HTML report file (`report.html`) after the test completes using the k6-reporter library.

```javascript
export function handleSummary(data) {
  return {
    "report.html": htmlReport(data),
  };
}
```

## Dependencies
- `k6/http` - HTTP module
- `k6` - Check and sleep functions
- `k6-reporter` - HTML report generation

## Running the Test

```bash
k6 run thresold-test.js
```

The test will:
1. Run 10 concurrent users for 30 seconds
2. Verify all threshold criteria are met
3. Generate `report.html` with detailed results

## Metrics Collected
- HTTP request duration (latency percentiles)
- Request success/failure rate
- Check pass/fail rates
- Virtual user performance data
