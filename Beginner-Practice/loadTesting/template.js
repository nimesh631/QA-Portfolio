
// For a Real Project — Only Change These 3 Things
// 1. Base URL
// javascript// Demo
// const BASE_URL = 'https://dummyjson.com';

// // Real project
// const BASE_URL = 'https://staging-api.yourapp.com';
// 2. Credentials
// javascript// Demo
// const CREDENTIALS = {
//   username: 'emilys',
//   password: 'emilyspass',
// };

// // Real project — ask backend dev for test credentials
// const CREDENTIALS = {
//   email: 'testuser@yourapp.com',  // field name might be email not username
//   password: 'Test@1234',
// };
// 3. Token field name
// javascript// Different APIs use different names — confirm with backend dev
// const token = loginRes.json('accessToken');  // DummyJSON
// const token = loginRes.json('token');         // some APIs
// const token = loginRes.json('access_token'); // some APIs
// const token = loginRes.json('jwt');          // some APIs

// Real Project Checklist

import http from 'k6/http';
import { check, sleep } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

// =============================================
// CONFIG — Change these for every project
// =============================================
const BASE_URL = 'https://your-staging-api.com';  // change this

const CREDENTIALS = {
  username: 'testuser',   // change this
  password: 'testpass',   // change this
};

// =============================================
// TEST OPTIONS — Adjust load as needed
// =============================================
export const options = {
  vus: 10,
  duration: '30s',
  thresholds: {
    http_req_duration: ['p(95)<500'],
    http_req_failed: ['rate<0.05'],
    checks: ['rate>0.95'],
  },
};

// =============================================
// HTML REPORT — Auto generated after test
// =============================================
export function handleSummary(data) {
  return {
    "report.html": htmlReport(data),
  };
}

// =============================================
// TEST FLOW
// =============================================
export default function () {

  // Step 1 — Login
  const loginRes = http.post(
    `${BASE_URL}/auth/login`,          // change endpoint if different
    JSON.stringify(CREDENTIALS),
    { headers: { 'Content-Type': 'application/json' } }
  );

  if (loginRes.status !== 200) {
    console.log(`❌ Login failed | Status: ${loginRes.status} | Body: ${loginRes.body}`);
  }

  check(loginRes, {
    'login status is 200': (r) => r.status === 200,
    'accessToken received': (r) => r.json('accessToken') !== undefined,
  });

  // Step 2 — Extract token
  // Change 'accessToken' to whatever your API returns
  // Common names: 'token', 'access_token', 'jwt', 'accessToken'
  const token = loginRes.json('accessToken');

  // Step 3 — Authenticated request
  const profileRes = http.get(
    `${BASE_URL}/auth/me`,             // change to your protected endpoint
    { headers: { Authorization: `Bearer ${token}` } }
  );

  if (profileRes.status !== 200) {
    console.log(`❌ Request failed | Status: ${profileRes.status} | Body: ${profileRes.body}`);
  }

  check(profileRes, {
    'profile status is 200': (r) => r.status === 200,
    'got username': (r) => r.json('username') !== undefined,
  });

  sleep(1);
}

