import { test, expect } from '@playwright/test';

test('Playwright special locators',async({page})=>{

    await page.goto('https://rahulshettyacademy.com/angularpractice/');
    await page.getByLabel('Check me out if you Love IceCreams!').click();
    await page.locator('[name="name"]').first().fill('John Doe');
    //await page.getByLabel('Email').fill('Shubhanshu');
    await page.getByPlaceholder('Password').fill('123456');  
    await page.getByLabel('Gender').selectOption('Male');
    await page.getByLabel('Employed').check();
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.getByText('Success! The Form has been submitted successfully!')).toBeVisible();
    await page.getByRole('link',{name:'Shop'}).click();
    await page.locator('app-card').filter({hasText : 'Nokia Edge'}).getByRole("button").click();













})

