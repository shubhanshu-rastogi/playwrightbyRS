const { test, expect } = require('@playwright/test');
const {HomePage} = require('../page-objects/HomePage')
const {SignupPage} = require('../page-objects/SignupPage')
const user = require('../data/userData.json')

test('Register User', async ({page})=>{

const home = new HomePage(page);
const signup = new SignupPage(page);

  await home.open();
  await home.verifyHomePage();
  await home.handleConsent();
  await home.clickSignupLogin();

  await signup.verifySignupForm();
  await signup.enterBasicInfo(user.firstName, user.email);
  await signup.submitForm();

  await signup.verifyAccountInformationHeader();
  await signup.fillAccountDetails(user);
  await signup.createAccount();
  await signup.verifyAccountCreated();
  await signup.continueToHome();
  await signup.verifyLoggedInAs(user.firstName);
  await signup.deleteAccount();
  await signup.verifyAccountDeleted();

})