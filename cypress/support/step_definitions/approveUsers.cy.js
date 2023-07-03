import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { faker } from "@faker-js/faker";
const inviteeDashboardPage = require("../../fixtures/pages/inviteeDashboardPage.json");
const inviteeBoxPage = require("../../fixtures/pages/inviteeBoxPage.json");
const generalElements = require("../../fixtures/pages/general.json");

let wishes = faker.word.noun() + faker.word.adverb() + faker.word.adjective();

Given("user is on secret santa login page", function () {
    cy.wait(10000); // Ждём 10 секунд перед каждым тестом, чтобы обойти проблему с слишком большим кол-вом запросов к серверу
    const inviteLink = Cypress.env("inviteLink");
    cy.visit(inviteLink);
});

When("users logs in as {string} and {string} + users approved",
  function (login, password) {
    cy.get(generalElements.submitButton).click();
    cy.contains("войдите").click();
    cy.login(login, password);
    cy.contains("Создать карточку участника").should("exist");
    cy.get(generalElements.submitButton).click();
    cy.get(generalElements.arrowRight).click();
    cy.get(generalElements.arrowRight).click();
    cy.get(inviteeBoxPage.wishesInput).type(wishes);
    cy.get(generalElements.arrowRight).click();
    cy.get(inviteeDashboardPage.noticeForInvitee)
      .invoke("text")
      .then((text) => {
       expect(text).to.contain("Это — анонимный чат с вашим Тайным Сантой");
    });
});

Then("Clear cookies again", function () {
    cy.clearCookies();
  });

