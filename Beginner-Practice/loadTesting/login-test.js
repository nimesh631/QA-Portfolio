import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 50,
  duration: '1m',
};

export default function () {
  const loginRes = http.post(
    'https://dummyjson.com/auth/login',
    JSON.stringify({
      username: 'emilys',
      password: 'emilyspass',
    }),
    { headers: { 'Content-Type': 'application/json' } }
  );

  // ADD THIS — log failures so we can see what error comes back
  if (loginRes.status !== 200) {
    console.log(`❌ Login failed | Status: ${loginRes.status} | Body: ${loginRes.body}`);
  }

  check(loginRes, {
    'login status is 200': (r) => r.status === 200,
    'accessToken received': (r) => r.json('accessToken') !== undefined,
  });

  const token = loginRes.json('accessToken');

  const profileRes = http.get(
    'https://dummyjson.com/auth/me',
    { headers: { Authorization: `Bearer ${token}` } }
  );

  if (profileRes.status !== 200) {
    console.log(`❌ Profile failed | Status: ${profileRes.status} | Body: ${profileRes.body}`);
  }

  check(profileRes, {
    'profile status is 200': (r) => r.status === 200,
    'got username': (r) => r.json('username') !== undefined,
  });

  sleep(1);

 
}