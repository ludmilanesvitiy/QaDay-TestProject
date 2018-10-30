@Tag
Feature: Pagination feature
  Background: Log in to the github with 1-factor authentication
    Given User logged in and open issues page

  Scenario: Add 30 issues and check github pagination, using UI
  Description: As a user, I want to be able to navigate through the pages with issues
    Given User have created "30" issues through the UI
    And User see 2 pages
    When User click on "2" page
    Then User see "5" issues
    When User click on "1" page
    Then User see "25" issues

  @Ignore
  Scenario: Add 30 issues and check github pagination, using API call
  Description: As a user, I want to be able to navigate through the pages with issues
    When User have created "30" issues through the API call
    Then User see 2 pages
    When User click on "2" page
    Then User see "5" issues
    When User click on "1" page
    Then User see "25" issues
