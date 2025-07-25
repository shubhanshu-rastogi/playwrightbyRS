const {test, expect} = require('@playwright/test');

test('browser context  playwright test',async ({browser}) =>{
    
    const context= await browser.newContext();
    const page=await context.newPage();

    const username=page.locator('#username');
    const password=page.locator("[name='password']");

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    await console.log(await page.title())
    await username.fill('rahulshetty')
    await password.fill('learning')
    await page.locator("[name='signin']").click()
    const errorMsg=await page.locator("[style='display: block;']").textContent()
    //console.log(errorMsg);
    await expect(page.locator("[style='display: block;']")).toContainText('Incorrect');
    await username.fill('')
    await username.fill('rahulshettyacademy')
    await page.locator("[name='signin']").click()
    const firstTitle= await page.locator(".card-title a").first().textContent();
    const secondTitle=await page.locator(".card-title a").nth(1).textContent();

    console.log(`fist title is ${firstTitle} and second title is ${secondTitle}`)

    const allText=await page.locator(".card-title a").allTextContents();

    console.log(allText);

})

test('Page playwright test',async ({page}) =>{
    await page.goto("https://google.com")
    console.log(await page.title())
    await expect(page).toHaveTitle("Google");

})

test('new Login practise',async ({page})=>{
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/')
    const username=page.locator('#username');
    const password=page.locator("[name='password']");
    const blinkingText=page.locator("[href*='documents-request']")
    await username.fill('rahulshetty')
    await password.fill('learning')
    const selectDropdown=  page.locator('select.form-control')
    await selectDropdown.selectOption('Consultant')
    await page.locator('.radiotextsty').last().click()
    await page.locator('#okayBtn').click()
    //await page.pause()
    expect(await page.locator('.radiotextsty').last().isChecked()).toBeTruthy()
    await expect(page.locator('.radiotextsty').last()).toBeChecked()
    await expect(blinkingText).toHaveAttribute('class','blinkingText')

})

test('@Child window concept',async ({browser})=>{
    const context= await browser.newContext();
    const page=await context.newPage();
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/')
    const documentLink=page.locator("[href*='documents-request']")

    const [newPage]=await Promise.all([
      context.waitForEvent('page'),
      documentLink.click(),
    ])

    const text = await newPage.locator('.red').textContent();
    console.log(text);

    const email=text.split('at').at(1).split('with').at(0).trim();

    await page.locator('#username').fill(email)

    
    
})