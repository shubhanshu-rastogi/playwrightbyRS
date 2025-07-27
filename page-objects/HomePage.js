const { test, expect } = require('@playwright/test');

exports.HomePage = class HomePage {

    constructor(page){
        this.page=page;
         this.signupLoginLink = page.locator('a[href="/login"]');
         this.homeImage = page.locator('[alt="Website for automation practice"]');
         this.consentButton = page.locator('button:has-text("Consent")');

    }

    async open(){
        await this.page.goto('http://automationexercise.com')
        await this.page.waitForLoadState('load');
    }

    async handleConsent() {
        if (await this.consentButton.isVisible()) {
        await this.consentButton.click();
    }
    }

    async verifyHomePage() {
        await expect(this.homeImage).toBeVisible();
    }

    async clickSignupLogin() {
        await this.signupLoginLink.click();
  }

}