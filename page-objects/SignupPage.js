const { expect } = require('@playwright/test');

exports.SignupPage = class SignupPage {
  constructor(page) {
    this.page = page;
    this.signupForm = page.locator('.signup-form');
    this.nameInput = page.getByPlaceholder('Name');
    this.emailInput = page.locator('[data-qa="signup-email"]');
    this.signupButton = page.getByRole('button', { name: 'Signup' });
    this.accountInfoHeader = page.locator('h2 b').filter({ hasText: 'Enter Account Information' });
    this.mrRadio = page.getByLabel('Mr.');
    this.passwordInput = page.getByLabel('password');
    this.createAccountButton = page.getByRole('button', { name: 'create account' });
    this.accountCreatedHeader = page.locator('h2 b').filter({ hasText: 'Account Created!' });
    this.continueButton = page.locator('[data-qa="continue-button"]');
    this.deleteAccountLink = page.locator('[href="/delete_account"]');
    this.accountDeletedHeader = page.locator('h2 b').filter({ hasText: 'Account Deleted!' });
  }

  async verifySignupForm() {
    await expect(this.signupForm).toBeVisible();
  }

  async enterBasicInfo(name, email) {
    await this.nameInput.fill(name);
    await this.emailInput.fill(email);
  }

  async submitForm() {
    await this.signupButton.click();
    await this.accountInfoHeader.waitFor();
  }

  async verifyAccountInformationHeader() {
    await expect(this.accountInfoHeader).toBeVisible();
  }

  async fillAccountDetails(user) {
    await this.mrRadio.click();
    await this.passwordInput.fill(user.password);
    await this.page.selectOption('#days', '22');
    await this.page.selectOption('#months', 'June');
    await this.page.selectOption('#years', '1983');
    await this.page.getByLabel('Sign up for our newsletter!').click();
    await this.page.getByLabel('Receive special offers from our partners!').click();
    await this.page.locator('#first_name').fill(user.firstName);
    await this.page.locator('#last_name').fill(user.lastName);
    await this.page.locator('#company').fill(user.company);
    await this.page.locator('#address1').fill(user.address1);
    await this.page.locator('#address2').fill(user.address2);
    await this.page.selectOption('#country', user.country);
    await this.page.locator('#state').fill(user.state);
    await this.page.locator('[name="city"]').fill(user.city);
    await this.page.locator('#zipcode').fill(user.zipcode);
    await this.page.locator('#mobile_number').fill(user.mobile);
  }

  async createAccount() {
    await this.createAccountButton.click();
  }

  async verifyAccountCreated() {
    await expect(this.accountCreatedHeader).toBeVisible();
  }

  async continueToHome() {
    await this.continueButton.click();
  }

  async verifyLoggedInAs(name) {
    await expect(this.page.locator(`text=Logged in as ${name}`)).toBeVisible();
  }

  async deleteAccount() {
    await this.deleteAccountLink.click();
  }

  async verifyAccountDeleted() {
    await expect(this.accountDeletedHeader).toBeVisible();
  }
};