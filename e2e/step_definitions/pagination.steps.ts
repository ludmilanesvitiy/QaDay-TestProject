import { When, Then, Given } from 'cucumber';
import { browser, ExpectedConditions as EC } from 'protractor';
import { expect } from 'chai';

import { CommonPage } from '../pages/common.page';
import { CustomWorld } from '../support/types';

const page: CommonPage = new CommonPage();

Given(/^User logged in and open issues page$/, () => {
  page.login();
  return page.navigateToIssuesPage();
});

Given(/^User have created "(.*)" issues through the UI$/, async function (this: CustomWorld, amountOfIssues: number) {
  return page.getIssuesNumber().then((issuesNumber) => {
    let issuesNumberToNumber = Number(issuesNumber);
    if (issuesNumberToNumber < amountOfIssues) {
      return page.createIssueByUI(this.nameService.getCurrentName(), (amountOfIssues - issuesNumberToNumber));
    }
  });
});

Given(/^User see 2 pages$/, () => {
  page.navigateToIssuesPage();
  return expect(page.pagination.isDisplayed()).to.eventually.be.true;
});

When(/^User click on "(.*)" page$/, (pageNumber: string) => {
  browser.wait(EC.elementToBeClickable(page.getPaginationPage(pageNumber)), 7000);
  return page.getPaginationPage(pageNumber).click();
});

Then(/^User see "(.*)" issues$/, (issuesAmount: number) => {
  browser.sleep(3000);
  return expect(page.getIssuesListLength()).to.eventually.equal(Number(issuesAmount));
});

When(/^User have created "(.*)" issues through the API call$/, async function (this: CustomWorld, amountOfIssues: number) {
  return page.getIssuesNumber().then((issuesNumber) => {
    let issuesNumberToNumber = Number(issuesNumber);
    if (issuesNumberToNumber < amountOfIssues) {
      return page.createIssueByAPI(this.nameService.getCurrentName(), (amountOfIssues - issuesNumberToNumber));
    }
  });
});
