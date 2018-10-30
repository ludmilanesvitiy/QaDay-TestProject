const config = require('dotenv');
const obj = config.load({path: './.env'});
import { $, $$, browser, by, element, ElementArrayFinder, ElementFinder } from 'protractor';
import { HttpClient } from 'protractor-http-client';

import { headersPost, requestPayloadIssue } from '../support/http.helper';

export class CommonPage {
  loginBtn: ElementFinder = $('input[value*="Sign in"]');
  loginInput: ElementFinder = $('#login_field');
  passwordInput: ElementFinder = $('#password');
  countIssues: ElementFinder = $('a[href*="issues"] .Counter');
  newIssueBtn: ElementFinder = element(by.linkText('New issue'));
  submitNewIssueBtn: ElementFinder = element(by.buttonText('Submit new issue'));
  titleIssue: ElementFinder = $('#issue_title');
  bodyIssue: ElementFinder = $('#issue_body');
  pagination: ElementFinder = $('.pagination');
  issuesList: ElementArrayFinder = $$('.Box-row');

  login() {
    browser.get('/login');
    this.loginInput.clear();
    this.loginInput.sendKeys(process.env.GITHUBUSER);
    this.passwordInput.clear();
    this.passwordInput.sendKeys(process.env.GITHUBPASS);
    return this.loginBtn.click();
  }

  createIssueByUI(issueName: string, amount: number) {
    for (let i = 0; i < amount; i++) {
      this.newIssueBtn.click();
      browser.sleep(2000);
      this.titleIssue.sendKeys(issueName + i);
      this.bodyIssue.sendKeys('Description for ' + issueName + i);
      this.submitNewIssueBtn.click();
      this.navigateToIssuesPage();
    }
  }

  getIssuesNumber() {
    return this.countIssues.getText();
  }

  navigateToIssuesPage() {
    browser.get('/ludmilanesvitiy/QaDay-TestProject/issues');
    return browser.sleep(4000);
  }

  getPaginationPage(pageNumber: string): ElementFinder {
    return this.pagination.element(by.linkText(pageNumber))
  };

  getIssuesListLength() {
    return this.issuesList.count();
  };

  async createIssueByAPI(issueName: string, amount: number) {
    for (let i = 0; i < amount; i++) {
      const http = new HttpClient(browser.baseUrl);
      const headers = await headersPost();
      const requestPayload = requestPayloadIssue(issueName + i, issueName + 'description');

      const responseCreateIssues = await http.post('/ludmilanesvitiy/QaDay-TestProject/issues', requestPayload, headers);

      console.log(`responseCreateIssues ${i} StatusCode: ${responseCreateIssues.statusCode}`);
    }
  }

  async removeIssue(arrayIDs: Array<string>) {
    const http = new HttpClient(browser.baseUrl);
    const headers = await headersPost(' ');

    const responseCreateIssues = await http.get(`/notifications/thread_subscription?repository_id=154346457&thread_class=Issue&thread_id=${arrayIDs[0]}`, headers);

    console.log('responseCreateIssues StatusCode: ' + responseCreateIssues.statusCode);

    return responseCreateIssues;
  }
}
