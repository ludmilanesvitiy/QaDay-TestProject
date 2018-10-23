Feature: I.ua: login

  Background: Create new search
    Given User open login page

  Scenario: Login as user
  Description: As a user, I want to be able to login
    When User click on Login button
    Then Passport popup opened
    When User enter login and password
    And User click Go button
    Then User see main page as logged in user
