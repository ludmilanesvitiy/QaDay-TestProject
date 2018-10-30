import { browser } from 'protractor';
import { Before, AfterAll, After, setDefaultTimeout, Status } from 'cucumber';

import { CommonPage } from '../pages/common.page';
import { CustomWorld } from './types';

setDefaultTimeout(300 * 1000);

AfterAll(async() => {
  const page: CommonPage = new CommonPage();
  await page.removeIssue([]); //TODO need to get ID's list
});

Before({tags: '@Tag'}, function (this: CustomWorld) {
  return console.log('We will get custom Name for each issue' + this.nameService.getCurrentName()); //TODO each feature will have unique name, accessible for any step
});

After({tags: '@Tag or @OtherTag'}, function (this: CustomWorld) {
  return; //TODO here you can add any post-conditions, which should be done after tag @Tag or @OtherTag
});

After(function (testCase) {
  if (testCase.result.status === Status.FAILED) {
    browser.manage().logs().get('browser').then(browserLog =>
      browserLog.filter(element => element.level.value > 900)
    ).then(logs => logs && this.attach(logs.map(entry => entry.message).join(';\n'), 'text/plain'));
    return browser.takeScreenshot().then(screenShot => this.attach(screenShot, 'image/png'));
  }
});
