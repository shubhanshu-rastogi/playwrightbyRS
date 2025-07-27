const { test, expect } = require('@playwright/test');

test ('Login User with correct email and password', async ({page})=>{

// 1. Launch browser
// 2. Navigate to url 'http://automationexercise.com'

await page.goto('http://automationexercise.com')

// 3. Verify that home page is visible successfully

await expect(page.locator('[alt="Website for automation practice"]')).toBeVisible()

const consentButton = page.locator('button:has-text("Consent")');
if (await consentButton.isVisible()) {
  await consentButton.click();
  console.log("✅ Consent dialog handled.");
}
// 4. Click on 'Signup / Login' button

await page.locator('a[href="/login"]').click()

// 5. Verify 'Login to your account' is visible

await expect(page.locator('.signup-form')).toBeVisible()

// 6. Enter correct email address and password
const firstName='shubhanshu'
await page.locator('[data-qa="login-email"]').fill('shubhanshu@live.com')
await page.locator('[data-qa="login-password"]').fill('India@123')

// 7. Click 'login' button

await page.locator('[data-qa="login-button"]').click()

// 8. Verify that 'Logged in as username' is visible

await page.locator('[href="/logout"]').waitFor();
await expect(page.locator('text=Logged in as '+firstName)).toBeVisible();

// 9. Click 'Delete Account' button

await page.locator('[href="/delete_account"]').click()

// 10. Verify that 'ACCOUNT DELETED!' is visible

await expect(
  page.locator('h2 b').filter({ hasText: 'Account Deleted!' })
).toBeVisible();

})