import { browser } from 'protractor';
import { BeforeAll, AfterAll, After, setDefaultTimeout, Status } from 'cucumber';

setDefaultTimeout(300 * 1000);

/*
BeforeAll(done => {
      done();
    });
*/

After(function(testCase) {
  if (testCase.result.status === Status.FAILED) {
    browser.manage().logs().get('browser').then(browserLog =>
        browserLog.filter(element => element.level.value > 900)
      ).then(logs => logs && this.attach(logs.map(entry => entry.message).join(';\n'), 'text/plain'));

    return browser.takeScreenshot().then(screenShot => this.attach(screenShot, 'image/png'));
  }
});
