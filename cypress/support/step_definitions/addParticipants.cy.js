import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
const invitePage = require("../../fixtures/pages/invitePage.json");
const generalElements = require("../../fixtures/pages/general.json");

let inviteLink;

Given("userAuthor is in a box", function () {
  cy.get(generalElements.submitButton).click({force: true});
});
  
When("userAuthor creates invite link and gets links", function () {
  cy.get(invitePage.inviteLink)
    .invoke("text")
    .then((link) => {
      inviteLink = link;
      Cypress.env("inviteLink", link);
    });
});
  
  Then("Clear cookies", function () {
    cy.clearCookies();
});