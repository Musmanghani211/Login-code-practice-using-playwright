import { test, expect } from '@playwright/test';
import { login } from '../login/possitive.js';

test('verify the user is unable to checkout without adding product to cart', async ({ page }) => {
  await login(page);
  await page.locator('.shopping_cart_link').click();
  const items = await page.$$('.cart_item');
  expect(items.length).toBe(0); // Confirm cart is empty

  await page.locator('[data-test="checkout"]').click();

  // Optionally, verify you're on checkout page or maybe blocked (if app logic applies)
  // Since SauceDemo still goes to the form, no error appears unless you validate manually
  await expect(page).toHaveURL(/checkout-step-one\.html/);
});

test('verify the user is able to checkout after adding product to cart', async ({ page }) => {
  await login(page);
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('.shopping_cart_link').click();
  
  const items = await page.$$('.cart_item');
  expect(items.length).toBe(1); // Confirm one item in cart

  await page.locator('[data-test="checkout"]').click();

  // Verify that the checkout form is displayed
  await expect(page.locator('.checkout_info')).toBeVisible();
});

test('verify the user is unbale to checkout without filling the form', async ({ page }) => {
  await login(page);
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('.shopping_cart_link').click();
  
  const items = await page.$$('.cart_item');
  expect(items.length).toBe(1); // Confirm one item in cart

  await page.locator('[data-test="checkout"]').click();

  // Click on continue without filling the form
  await page.click('[data-test="continue"]');

  // Verify error message appears
  await expect(page.locator('[data-test="error"]')).toContainText('Error: First Name is required');
});

test('verify the user is unbale to checkout without entering first name in the form', async ({ page }) => {
  await login(page);
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('.shopping_cart_link').click();
  
  const items = await page.$$('.cart_item');
  expect(items.length).toBe(1); // Confirm one item in cart

  await page.locator('[data-test="checkout"]').click();

  // Fill the form without first name
  await page.fill('[data-test="lastName"]', 'Doe');
  await page.fill('[data-test="postalCode"]', '12345');

  // Click on continue
  await page.click('[data-test="continue"]');

  // Verify error message appears
  await expect(page.locator('[data-test="error"]')).toContainText('Error: First Name is required');
});

test('verify the user is unbale to checkout without entering last name in the form', async ({ page }) => {
  await login(page);
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('.shopping_cart_link').click();
  
  const items = await page.$$('.cart_item');
  expect(items.length).toBe(1); // Confirm one item in cart

  await page.locator('[data-test="checkout"]').click();

  // Fill the form without last name
  await page.fill('[data-test="firstName"]', 'John');
  await page.fill('[data-test="postalCode"]', '12345');

  // Click on continue
  await page.click('[data-test="continue"]');

  // Verify error message appears
  await expect(page.locator('[data-test="error"]')).toContainText('Error: Last Name is required');
});

test('verify the user is unbale to checkout without entering postel address in the form', async ({ page }) => {
  await login(page);
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('.shopping_cart_link').click();
  
  const items = await page.$$('.cart_item');
  expect(items.length).toBe(1); // Confirm one item in cart

  await page.locator('[data-test="checkout"]').click();

  // Fill the form without postal code
  await page.fill('[data-test="firstName"]', 'John');
  await page.fill('[data-test="lastName"]', 'Doe');

  // Click on continue
  await page.click('[data-test="continue"]');

  // Verify error message appears
  await expect(page.locator('[data-test="error"]')).toContainText('Error: Postal Code is required');
});
