const { test, expect } = require('@playwright/test');
const config = require('../config/env.config');
const ElementUtils = require('../utils/ElementUtils');


exports.HomePage = class HomePage {

    constructor(page, utils = new ElementUtils){
        this.page=page;
        this.utils=utils;
         this.signupLoginLink = page.locator('a[href="/login"]');
         this.homeImage = page.locator('[alt="Website for automation practice"]');
         this.consentButton = page.locator('button:has-text("Consent")');

    }

    async open(){
        await this.page.goto(config.baseURL);
        await this.page.waitForLoadState('load');
    }

  
    async handleConsent() {
        if (await this.utils.isVisible(this.consentButton)) {
        await this.utils.clickElement(this.consentButton);
    }
  }

    async verifyHomePage() {
        await expect(this.homeImage).toBeVisible();
    }

    async clickSignupLogin() {
        await this.utils.clickElement(this.signupLoginLink);
  }

}