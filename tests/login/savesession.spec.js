// File: tests/login/saveSession.spec.js
import { test } from '@playwright/test';
import { login } from './possitive. helper.js'; // ✅ Import your login function

test('Save login session state', async ({ page }) => {
  await login(page);
  console.log('✅ Session saved to auth/userSession.json');
});
