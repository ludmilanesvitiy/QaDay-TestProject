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

 Scenario: Make a 10 blog post //TODO
  Description: As a user, I want to be able to login
    When User have created 11 blog posts
    Then User see 2 pages
    When User click on second blog page
    Then User see 1 post on the second page
