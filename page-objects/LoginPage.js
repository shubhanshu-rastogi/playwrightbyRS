const { test, expect } = require('@playwright/test');
const ElementUtils = require('../utils/ElementUtils');

exports.LoginPage=class LoginPage {
    constructor(page, utils=new ElementUtils()){
        this.page=page;
        this.utils=utils;
        this.loginEmail = page.locator('[data-qa="login-email"]');
        this.loginPassword = page.locator('[data-qa="login-password"]');
        this.loginButton = page.locator('[data-qa="login-button"]');
        this.logoutLink = page.locator('[href="/logout"]');
    }

    async login(email,password){
        await this.utils.typeText(this.loginEmail, email);
        await this.utils.typeText(this.loginPassword, password);
        await this.utils.clickElement(this.loginButton);
    }

    async verifyLoggedInAs (firstName){
        await this.logoutLink.waitFor();
        await expect(this.page.locator(`text=Logged in as ${firstName}`)).toBeVisible();
    }
}