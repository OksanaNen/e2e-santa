import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { faker } from "@faker-js/faker";
const boxPage = require("../../fixtures/pages/boxPage.json");
const dashboardPage = require("../../fixtures/pages/dashboardPage.json");
const generalElements = require("../../fixtures/pages/general.json");
const menu = require("../../fixtures/pages/menu.json");

let newBoxName = faker.word.noun({ length: { min: 5, max: 10 } });
let maxAmount = 50;
let currency = "Евро";

Given("userAuthor is on secret santa login page", function () {
  cy.visit("/login");
});

When("userAuthor logs in as {string} and {string}", function (login, password) {
  cy.login(login, password);
});

Then("userAuthor is created a box", function () {
  cy.contains("Создать коробку").click();
  cy.get(boxPage.boxNameField).type(newBoxName);
  cy.get(boxPage.boxKeyField).invoke("val").then(text => {
    key = text;
    Cypress.env("key", text);
  });    
  cy.get(generalElements.arrowRight).click();
  cy.get(boxPage.sixthIcon).click();
  cy.get(generalElements.arrowRight).click();
  cy.get(boxPage.giftPriceToggle).check({force: true});
  cy.get(boxPage.maxAnount).type(maxAmount);
  cy.get(boxPage.currency).select(currency);
  cy.get(generalElements.arrowRight).click();
  cy.wait(1000); // Необходимо дождаться ответа от сервера
  cy.get(generalElements.arrowRight).click();
  cy.get(dashboardPage.createdBoxName).should("have.text", newBoxName);
  cy.get(menu.menuBoxes)
    .invoke("text")
    .then((text) => {
      expect(text).to.include("Участники");
      expect(text).to.include("Моя карточка");
      expect(text).to.include("Подопечный");
    });
  });
