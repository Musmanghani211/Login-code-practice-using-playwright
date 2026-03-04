import{test,expect}from'@playwright/test';
import {login} from '../login/possitive.js';
test('verify the user is able to see social media links', async ({page}) => {
    await login(page);
    // Verify the presence of social media links
    const facebookLink = page.locator('.social_twitter');
    const twitterLink = page.locator('.social_facebook');
    const linkedinLink = page.locator('.social_linkedin');
    
    await expect(facebookLink).toBeVisible();
    await expect(twitterLink).toBeVisible();
    await expect(linkedinLink).toBeVisible();
});

test('Verify LinkedIn link opens correct URL', async ({ page, context }) => {
  await login(page);
  const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    page.locator('a[href="https://www.linkedin.com/company/sauce-labs/"]').click()
  ]);
  await newPage.waitForLoadState();
  expect(newPage.url()).toContain('linkedin.com/company/sauce-labs');
});

test('Verify Twitter link opens correct URL', async ({ page, context }) => {
  await login(page);
  const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    page.locator('a[href="https://twitter.com/saucelabs"]').click()
  ]);
  await newPage.waitForLoadState();
  expect(newPage.url()).toContain('x.com/saucelabs');
});

test('Verify Facebook link opens correct URL', async ({ page, context }) => {
  await login(page);
  const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    page.locator('a[href="https://www.facebook.com/saucelabs"]').click()
  ]);
  await newPage.waitForLoadState();
  expect(newPage.url()).toContain('facebook.com/saucelabs');
});