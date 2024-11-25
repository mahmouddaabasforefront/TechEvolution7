import { test, expect } from '@playwright/test';
import { AxeBuilder } from '@axe-core/playwright';

test('accept cookies', async ({ page }) => {
    await page.goto('https://www.forefront.se/');
  
    await page.locator('a').getByText("Acceptera", {exact: true}).click();
    await page.locator('a').getByText("Acceptera", {exact: true}).isHidden();
  });

test('goto about us', async ({ page }) => {
  await page.goto('https://www.forefront.se/');

  //await page.click('a[href="/om-oss"]');
  await page.locator('nav').getByRole('link', { name: 'Om oss' }).click();

  await expect(page).toHaveURL('https://www.forefront.se/om-oss');
});

test('fill form', async ({ page }) => {
  await page.goto('https://www.forefront.se/kontakt');

  await page.fill('input[name="Namn"]', 'Mahmoud Daabas');
  await page.fill('input[name="E-post"]', 'mahmoud.daabas@forefront.se');
  expect(await page.inputValue('input[name="Namn"]')).toBe('Mahmoud Daabas');
  expect(await page.inputValue('input[name="E-post"]')).toBe('mahmoud.daabas@forefront.se');
});

test('find and goto karriär', async ({ page }) => {
  await page.goto('https://www.forefront.se/');

  const textLocator = page.locator('nav').getByText('Karriär');
  await expect(textLocator).toBeVisible();

  await page.locator('nav').getByRole('link', { name: 'Karriär' }).click();
  await expect(page).toHaveURL('https://www.forefront.se/karriar');
});

test('goto us version', async ({ page }) => {
    await page.goto('https://www.forefront.se/');
    
    await page.getByText('SE', {exact: true}).click();
    await page.getByText('USA').click();
    await expect(page).toHaveURL('https://www.forefrontconsulting.us/');
});
