import { $, browser, by, element, ElementFinder, ExpectedConditions as EC } from 'protractor';

export class LoginPage {
  loginBtn: ElementFinder = $('.user_menu .first');
  passportPopup: ElementFinder = $('.popup.login');
  loginInput: ElementFinder = $('fieldset input[name*="login"]');
  passwordInput: ElementFinder = $('fieldset input[name*="pass"]');
  goBtn: ElementFinder = $('.form input[type*="submit"]');
  brandingHeaderBlock: ElementFinder = $('div[class*="Branding_header"]');

  open() {
    browser.get('https://www.i.ua/');
  }

  clickOnLogin() {
    this.loginBtn.click()
  }

  async enterLoginPass() {
    await this.loginInput.clear();
    await this.loginInput.sendKeys('testfirst@i.ua');
    await this.passwordInput.clear();
    await this.passwordInput.sendKeys('testfirst1');
  }

  waitForLoading() {
    return browser.wait(EC.visibilityOf(this.brandingHeaderBlock), 5000);
  }

  clickOnGo() {
    this.goBtn.click();
  }
}
