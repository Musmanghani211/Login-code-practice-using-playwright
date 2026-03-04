// ✅ File: tests/login/positive.spec.js
import { test, expect } from '@playwright/test';
import path from 'path';

// Exportable login function
export async function login(page) {
  await page.goto('https://www.saucedemo.com/');
  await expect(page).toHaveTitle('Swag Labs');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
  await expect(page.locator('.title')).toHaveText('Product');

 await page.context().storageState({ path: path.join('auth', 'userSession.json') });

}

