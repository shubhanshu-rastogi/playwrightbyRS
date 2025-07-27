const { test, expect } = require('@playwright/test');

exports.LoginPage=class LoginPage {
    constructor(page){
        this.page=page;
        this.loginEmail = page.locator('[data-qa="login-email"]');
        this.loginPassword = page.locator('[data-qa="login-password"]');
        this.loginButton = page.locator('[data-qa="login-button"]');
        this.logoutLink = page.locator('[href="/logout"]');
    }

    async login(email,password){
        await this.loginEmail.fill(email);
        await this.loginPassword.fill(password);
        await this.loginButton.click();
    }

    async verifyLoggedInAs (firstName){
        await this.logoutLink.waitFor();
        await expect(this.page.locator(`text=Logged in as ${firstName}`)).toBeVisible();
    }
}