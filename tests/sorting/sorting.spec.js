import { test, expect } from '@playwright/test';
import { login } from '../login/possitive.js';

test('user is able to sort by name in decending order', async ({ page }) => {
    await login(page);
  await page.locator('[data-test="product-sort-container"]').selectOption('za');

  const productNames = await page.$$eval('.inventory_item_name', items =>
    items.map(item => item.textContent.trim())
  );

  // Step 5: Sort a copy in descending order for comparison
  const sortedNames = [...productNames].sort((a, b) => b.localeCompare(a));

  // Product names on the page should be sorted in Z to A order.
  expect(productNames).toEqual(sortedNames);
});

test('user is able to sort by price in high to low order', async ({ page }) => {

    await login(page);
    await page.locator('[data-test="product-sort-container"]').selectOption('hilo');
    const productPrices = await page.$$eval('.inventory_item_price', items =>
        items.map(item => parseFloat(item.textContent.replace('$', '')))
    );
    // Step 5: Sort a copy in descending order for comparison
    const sortedPrices = [...productPrices].sort((a, b) => b - a);
    // Product prices on the page should be sorted in high to low order.   
    expect(productPrices).toEqual(sortedPrices);

});

test('user is able to sort by price in low to high order', async ({ page }) => {

    await login(page);
    await page.locator('[data-test="product-sort-container"]').selectOption('lohi');
    const productPrices = await page.$$eval('.inventory_item_price', items =>
        items.map(item => parseFloat(item.textContent.replace('$', '')))
    );
    // Step 5: Sort a copy in descending order for comparison
    const sortedPrices = [...productPrices].sort((a, b) => a - b);
    // Product prices on the page should be sorted in low to high order.   
    expect(productPrices).toEqual(sortedPrices);

});