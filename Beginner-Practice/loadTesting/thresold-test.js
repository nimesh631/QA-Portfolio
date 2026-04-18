import http from 'k6/http';
import { check, sleep } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export const options = {
  vus: 10,
  duration: '30s',
  thresholds: {
    http_req_duration: ['p(95)<500'],
    http_req_failed: ['rate<0.05'],
    checks: ['rate>0.95'],
  },
};

// Generates report.html after test finishes
export function handleSummary(data) {
  return {
    "report.html": htmlReport(data),
  };
}

export default function () {
  const loginRes = http.post(
    'https://dummyjson.com/auth/login',
    JSON.stringify({
      username: 'emilys',
      password: 'emilyspass',
    }),
    { headers: { 'Content-Type': 'application/json' } }
  );

  check(loginRes, {
    'login status is 200': (r) => r.status === 200,
    'accessToken received': (r) => r.json('accessToken') !== undefined,
  });

  const token = loginRes.json('accessToken');

  const profileRes = http.get(
    'https://dummyjson.com/auth/me',
    { headers: { Authorization: `Bearer ${token}` } }
  );

  check(profileRes, {
    'profile status is 200': (r) => r.status === 200,
    'got username': (r) => r.json('username') !== undefined,
  });

  sleep(1);
}