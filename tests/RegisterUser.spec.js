const { test, expect } = require('@playwright/test');

test('Register User', async ({page})=>{

//Launch browser
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

// 5. Verify 'New User Signup!' is visible

await expect(page.locator('.signup-form')).toBeVisible()

// 6. Enter name and email address

await page.getByPlaceholder('Name').fill('Shubhanshu')
await page.locator('[data-qa="signup-email"]').fill('shubhanshu@live.com');

// 7. Click 'Signup' button

await page.getByRole('button',{name :'Signup'}).click()

// 8. Verify that 'ENTER ACCOUNT INFORMATION' is visible

//await page.waitForLoadState('networkidle');
await page.locator('text="Enter Account Information"').waitFor();

await expect(page.locator('h2 b').first()).toBeVisible();
await expect(page.locator('h2 b').first()).toHaveText('Enter Account Information');


// 9. Fill details: Title, Name, Email, Password, Date of birth

await page.getByLabel('Mr.').click()
await page.getByLabel('password').fill('India@123')
await page.selectOption('#days', '22');
await page.selectOption('#months', 'June');    // May (check actual values in HTML)
await page.selectOption('#years', '1983');

// 10. Select checkbox 'Sign up for our newsletter!'

await page.getByLabel('Sign up for our newsletter!').click()

// 11. Select checkbox 'Receive special offers from our partners!'

await page.getByLabel('Receive special offers from our partners!').click()

// 12. Fill details: First name, Last name, Company, Address, Address2, Country, State, City, Zipcode, Mobile Number

const firstName='shubhanshu'

await page.locator('#first_name').fill(firstName);
await page.locator('#last_name').fill('Rastogi');
await page.locator('#company').fill('JP Morgan');
await page.locator('#address1').fill('45 Turn');
await page.locator('#address2').fill('Croydon')
await page.selectOption('#country','United States')
await page.locator('#state').fill('Arizona')
await page.locator('[name="city"]').fill('NYC')
await page.locator('#zipcode').fill('CR05NY')
await page.locator('#mobile_number').fill('9891864123')

// 13. Click 'Create Account button'

await page.getByRole('button', {name:'create account'}).click()

// 14. Verify that 'ACCOUNT CREATED!' is visible

await page.waitForLoadState('load');

// [type="submit"]


await expect(
  page.locator('h2 b').filter({ hasText: 'Account Created!' })
).toBeVisible();

// 15. Click 'Continue' button

await page.locator('[data-qa="continue-button"]').click()

// 16. Verify that 'Logged in as username' is visible

await expect(page.locator('text=Logged in as '+firstName)).toBeVisible();

// 17. Click 'Delete Account' button

await page.locator('[href="/delete_account"]').click()

// 18. Verify that 'ACCOUNT DELETED!' is visible and click 'Continue' button

await expect(page.locator('h2 b')).toBeVisible();
const deletedText = await page.locator('h2 b').textContent();
expect(deletedText.trim()).toBe('Account Deleted!');

})