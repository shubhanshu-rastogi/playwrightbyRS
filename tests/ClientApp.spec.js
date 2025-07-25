const { test, expect } = require('@playwright/test');
const { log } = require('console');

test.only('WC client App login', async ({ page }) => {
  const email = 'ras@live.com';
  const productName = 'ZARA COAT 3';

  await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
  await page.locator('#userEmail').fill(email);
  await page.locator('#userPassword').fill('India@123');
  await page.locator('#login').click();
  await page.waitForLoadState('networkidle');

  const products = page.locator('.card-body');
  const count = await products.count();

  for (let i = 0; i < count; i++) {
    const product = products.nth(i);
    const name = await product.locator('b').textContent();

    if (name?.trim() === productName) {
      await product.locator('text=Add To Cart').click(); // Match exact case
      break;
    }
  }

  await page.locator("[routerlink*='cart']").click();
  await page.locator("div li").first().waitFor();
  const isProductVisible = await page.locator(`h3:has-text("${productName}")`).isVisible();
  expect(isProductVisible).toBeTruthy();

  await page.locator('text=Checkout').click();
  await page.locator('[placeholder="Select Country"]').waitFor();
  await page.locator('[placeholder="Select Country"]').pressSequentially("ind");

  //await page.pause();

  const countries = page.locator(".ta-item");
  const contCount = await countries.count();

  for (let j = 0; j < contCount; j++) {
    const countryName = await countries.nth(j).textContent();
    if (countryName?.trim() === "India") {
      await countries.nth(j).click();
      break;
    }
  }

  await expect(page.locator(".user__name input[type='text']").first()).toHaveValue(email);
  await page.locator('input.input.txt.text-validated').first().fill('1111222233334444');

  await page.locator('.action__submit').click();
  await page.waitForLoadState('networkidle');

  // ✅ Safe order ID extraction
  const rawOrderText = await page.locator('label.ng-star-inserted').textContent();
  const orderId = rawOrderText?.replace('|', '').replace('|', '').trim() || '';
  log(`Order ID is ${orderId}`);

  await page.locator('button[routerlink*="myorders"]').click();
  await page.locator('tbody tr').first().waitFor();

  const orderCount = await page.locator('tbody tr th').count();
  let orderFound = false;

  for (let i = 0; i < orderCount; i++) {
    const orderText = await page.locator('tbody tr th').nth(i).textContent();
    if (orderText?.trim() === orderId) {
      orderFound = true;
      break;
    }
  }

  expect(orderFound).toBeTruthy();
});