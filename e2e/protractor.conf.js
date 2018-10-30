const fs = require('fs');
const path = require('path');
const mkdirp  = require('mkdirp');
const cucumberHtmlReporter = require('cucumber-html-reporter');

const options = {
  theme: 'bootstrap',
  jsonDir: './e2e-reports/json',
  output: './e2e-reports/html/cucumber_reporter.html',
  ignoreBadJsonFile: true,
  reportSuiteAsScenarios: true,
};

exports.config = {
  allScriptsTimeout: 11000,
  baseUrl: 'https://github.com',
  specs: [
    '**/*.feature'
  ],
  capabilities: {
    'browserName': 'chrome'
  },
  directConnect: true,
  cucumberOpts: {
    format: 'json:e2e/reports/json/results.json',
    require: [
      'step_definitions/*.steps.ts',
      'support/*.ts'
    ],
    tags: "~@Ignore",
  },
  framework: 'custom',
  frameworkPath: require.resolve('protractor-cucumber-framework'),

  onPrepare: () => {
    require('ts-node').register({
      project: require('path').join(__dirname, './tsconfig.json')
    });
    const chai = require('chai');
    const chaiAsPromised = require('chai-as-promised');
    chai.use(chaiAsPromised);
    browser.driver.manage().window().setSize(1280, 1024);
    browser.waitForAngularEnabled(false);
  },

  beforeLaunch: () => {
    rimraf(path.resolve(process.cwd(), './e2e/reports/html'));
    rimraf(path.resolve(process.cwd(), './e2e/downloads'));
    generateDirs();
  },

  afterLaunch: function() {
    new Promise(() => cucumberHtmlReporter.generate(options));
  }
};

function rimraf(dir_path) {
  if (fs.existsSync(dir_path)) {
    fs.readdirSync(dir_path).forEach(entry => {
      const entry_path = path.join(dir_path, entry);
      if (fs.lstatSync(entry_path).isDirectory()) {
        rimraf(entry_path);
      } else {
        fs.unlinkSync(entry_path);
      }
    });
    fs.rmdirSync(dir_path);
  }
}

function generateDirs() {
  const jsonReports = path.join(process.cwd(), '/e2e/reports/json');
  const htmlReports = path.join(process.cwd(), '/e2e/reports/html');
  if (!fs.existsSync(jsonReports)) {
    mkdirp.sync(jsonReports);
  }
  if (!fs.existsSync(htmlReports)) {
    mkdirp.sync(htmlReports);
  }
}
