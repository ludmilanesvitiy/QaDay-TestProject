import { When, Then, Given } from 'cucumber';
import { LoginPage } from '../pages/login.page';
import { expect } from 'chai';
import { browser, ExpectedConditions as EC } from 'protractor';


const loginPage: LoginPage = new LoginPage();

Given('User open login page', () => {
  return loginPage.open();
});

When('User click on Login button', () => {
  return loginPage.clickOnLogin();
});

Then('Passport popup opened', async() => {
  await browser.wait(EC.visibilityOf(loginPage.passportPopup), 5000);
  return expect(await loginPage.passportPopup.isDisplayed()).to.be.true;
});

When('User enter login and password', async() => {
  return loginPage.enterLoginPass();
});

When('User click Go button', async() => {
  await loginPage.clickOnGo();
  return loginPage.waitForLoading();
});

Then('User see main page as logged in user', async() => {
  return expect(await loginPage.brandingHeaderBlock.getText()).to.contain('Привіт, firstQA')
});
