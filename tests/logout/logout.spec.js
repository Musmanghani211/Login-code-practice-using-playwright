import {test, expect} from '@playwright/test';
import {login} from '../login/possitive.js';
test('verify the user is able to logout', async ({page}) => {
    await login(page);
    await page.click('#react-burger-menu-btn');
    await page.locator('[data-test="logout-sidebar-link"]').click();
    await expect(page.locator('.login_logo')).toBeVisible();
});