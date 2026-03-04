import { test } from '@playwright/test';
import { login } from './possitive. helper.js';

test('verify user can login successfully', async ({ page }) => {
  await login(page);
});