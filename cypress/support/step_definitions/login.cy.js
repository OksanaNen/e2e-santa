import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
const generalElements = require("../../fixtures/pages/general.json");

Given("user1 visits website", function () {
  cy.visit("/login");
});
When("user1 logins in {string} and {string}", function (login, password) {
  cy.login(login, password);
});
Then("user1 is on the page", function () {
  cy.get(generalElements.websiteName).should('be.visible');
  cy.clearCookies();
});

Given("user2 visits website", function () {
  cy.visit("/login");
});
When("user2 logins in {string} and {string}", function (login, password) {
  cy.login(login, password);
}); 
Then("user2 is on the page", function () {
  cy.get(generalElements.websiteName).should('be.visible');
  cy.clearCookies();
});

Given("user3 visits website", function () {
  cy.visit("/login");
});
When("user3 logins in {string} and {string}", function (login, password) {
  cy.login(login, password);
}); 
Then("user3 is on the page", function () {
  cy.get(generalElements.websiteName).should('be.visible');
  cy.clearCookies();
});

Given("user4 visits website", function () {
  cy.visit("/login");
});
When("user4 logins in {string} and {string}", function (login, password) {
  cy.login(login, password);
}); 
Then("user4 is on the page", function () {
  cy.get(generalElements.websiteName).should('be.visible');
  cy.clearCookies();
});

Given("user5 visits website", function () {
  cy.visit("/login");
});
When("user5 logins in {string} and {string}", function (login, password) {
  cy.login(login, password);
}); 
Then("user5 is on the page", function () {
  cy.get(generalElements.websiteName).should('be.visible');
  cy.clearCookies();
});

Given("user6 visits website", function () {
  cy.visit("/login");
});
When("user6 logins in {string} and {string}", function (login, password) {
  cy.login(login, password);
}); 
Then("user6 is on the page", function () {
  cy.get(generalElements.websiteName).should('be.visible');
  cy.clearCookies();
});

Given("user7 visits website", function () {
  cy.visit("/login");
});
When("user7 logins in {string} and {string}", function (login, password) {
  cy.login(login, password);
}); 
Then("user7 is on the page", function () {
  cy.get(generalElements.websiteName).should('be.visible');
  cy.clearCookies();
});

Given("user8 visits website", function () {
  cy.visit("/login");
});
When("user8 logins in {string} and {string}", function (login, password) {
  cy.login(login, password);
}); 
Then("user8 is on the page", function () {
  cy.get(generalElements.websiteName).should('be.visible');
  cy.clearCookies();
});

Given("user9 visits website", function () {
  cy.visit("/login");
});
When("user9 logins in {string} and {string}", function (login, password) {
  cy.login(login, password);
}); 
Then("user9 is on the page", function () {
  cy.get(generalElements.websiteName).should('be.visible');
  cy.clearCookies();
});

Given("user10 visits website", function () {
  cy.visit("/login");
});
When("user10 logins in {string} and {string}", function (login, password) {
  cy.login(login, password);
}); 
Then("user10 is on the page", function () {
  cy.get(generalElements.websiteName).should('be.visible');
  cy.clearCookies();
});


