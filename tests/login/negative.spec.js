import { test, expect } from 'playwright/test';

test.beforeEach('before each test',async({page})=>{
    await page.goto('https://www.saucedemo.com/');
    await expect(page).toHaveTitle('Swag Labs');
});

test('verify the user is unable to login without entering email and password',async({page}) => {

    await expect(page).toHaveTitle('Swag Labs');
    await page.click('#login-button');
    await expect(page.locator('[data-test="error"]')).toContainText('Username is required');

});

test('verify the user is unable to login with invalid email',async({page}) => {

    await expect(page).toHaveTitle('Swag Labs');
    await page.fill('#user-name', 'invalid_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    //bugy error message
    await expect(page.locator('[data-test="error"]')).toContainText('Username and password do not match any user in this service');

});

test('verify the user is unable to login wihtout enterinng username',async({page})=>{
    await expect(page).toHaveTitle('Swag Labs');
    await page.fill('#user-name', '');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    await expect(page.locator('[data-test="error"]')).toContainText('Username is required');
})

test('verify the user is unable to loginn without entering password',async({page})=>{
    await expect(page).toHaveTitle('Swag Labs');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', '');
    await page.click('#login-button');
    await expect(page.locator('[data-test="error"]')).toContainText('Password is required');
});

test('verify the user is unable to login with invalid password', async({page})=>{
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'invalid_password');
    await page.click('#login-button'); 
    await expect(page.locator('[data-test="error"]')).toContainText('Username and password do not match any user in this service');
});

test('verify the user is unable to login with locked out user', async({page})=>{
    await page.fill('#user-name', 'locked_out_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    await expect(page.locator('[data-test="error"]')).toContainText('Sorry, this user has been locked ou');
});

test('verify the user is unable to login with incorrect credentials', async({page})=>{
await page.fill('#user-name', 'incorrect_user');
await page.fill('#password', 'incorrect_password');
await page.click('#login-button');
//bugy error message
await expect(page.locator('[data-test="error"]')).toContainText('Username and password do not match any user in this service');
await page.screenshot({path: 'images/incorrect_credentials.png', fullPage: true});
});

