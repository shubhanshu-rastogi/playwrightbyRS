const { test, expect } = require('@playwright/test');

test('Pick the calendat date',async ({page})=>{

await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/offers');

//const pad = (n) => n.toString().padStart(2, '0');

// Use correct values here — possibly derived from your test setup or UI state
const month = 6;
const day = 15;
const year = 2027;

const expected = `${(month)}/${(day)}/${year}`;


await page.locator('.react-date-picker').click();
await page.locator('.react-calendar__navigation__label__labelText').click();
await page.locator('.react-calendar__navigation__label__labelText').click();
await page.getByText(year).click();
await page.locator('.react-calendar__year-view__months__month').nth(Number(month)-1).click();
await page.locator("//abbr[text()='"+day+"']").click();

const monthValue = await page.locator('.react-date-picker__inputGroup__input').nth(0).inputValue();
const dayValue = await page.locator('.react-date-picker__inputGroup__input').nth(1).inputValue();
const yearValue = await page.locator('.react-date-picker__inputGroup__input').nth(2).inputValue();

const actualDate = `${monthValue}/${dayValue}/${yearValue}`;
await expect(actualDate).toEqual(expected);



})