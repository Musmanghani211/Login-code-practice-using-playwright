import {test, expect} from '@playwright/test';
import {login} from '../login/possitive. helper.js';
test.use({ storageState: 'auth/userSession.json' });

test ('verify the count on cart icon', async ({page}) => {
await page.goto('https://www.saucedemo.com/inventory.html');
  await page.locator('[data-test="add-to-cart-sauce-labs-fleece-jacket"]').click();
    const cartIcon = page.locator('.shopping_cart_link');
    await expect(cartIcon).toBeVisible();
    await expect(cartIcon).toHaveText('1');
    
});

test ('verify the added product is displayed in the cart', async ({page}) => {
// await login(page);
await page.goto('https://www.saucedemo.com/inventory.html');
await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
await page.locator('.shopping_cart_link').click(); 
await expect(page.locator('.inventory_item_name')).toContainText('Sauce Labs Backpack');
});
test ('verify the user is able to add multiple products to the cart', async ({page}) => {
    // await login(page);
    await page.goto('https://www.saucedemo.com/inventory.html');
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    await page.locator('.shopping_cart_link').click();
    const cartItems = await page.$$eval('.cart_item', items => items.length);
    expect(cartItems).toBe(2);

});


test('verify the added prodcut match the price of the cart', async ({page}) => {
    // await login(page);
    await page.goto('https://www.saucedemo.com/inventory.html');
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    // await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    await page.locator('.shopping_cart_link').click();
    const productPrice = await page.locator('[data-test="inventory-item-price"]').textContent();
    expect(productPrice).toContain('$29.99'); 
});

test('verify the user is able to add and check the products on the cart', async ({page}) => {
    // await login(page);
    await page.goto('https://www.saucedemo.com/inventory.html');
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    await page.locator('.shopping_cart_link').click(); 
    const cartItems = await page.$$eval('.cart_item', items => items.length);
    expect(cartItems).toBe(2); 
    // Verify the names of the products in the cart
    const prodcutsNames = await page.locator('.inventory_item_name').allTextContents();
    expect(prodcutsNames).toContain('Sauce Labs Backpack');
    expect(prodcutsNames).toContain('Sauce Labs Bike Light');
    // await expect(page.locator('.inventory_item_name')).toContainText('Sauce Labs Backpack');
    // await expect(page.locator('.inventory_item_name')).toContainText('Sauce Labs Bike Light');
});

test('verify the user is able to remove the product from the cart', async ({page}) => {
    // await login(page);
    await page.goto('https://www.saucedemo.com/inventory.html');
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
        await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
    await page.locator('.shopping_cart_link').click();
    await page.locator('[data-test="remove-sauce-labs-backpack"]').click();
    await page.locator('[data-test="remove-sauce-labs-bolt-t-shirt"]').click();
    const cartItems = await page.$$eval('.cart_item', items => items.length);
    expect(cartItems).toBe(0); 
});

