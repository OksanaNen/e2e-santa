import { Given, When, Then, After } from "@badeball/cypress-cucumber-preprocessor";
const boxPage = require("../../fixtures/pages/boxPage.json");
const users = require("../../fixtures/users.json");

Given("userAuthor logs again in as {string} and {string}", function (login, password) {
  cy.wait(10000); // Ждём 10 секунд перед каждым тестом, чтобы обойти проблему с слишком большим кол-вом запросов к серверу  
  cy.visit("/login");
  cy.login(login, password);
});
  
When("userAuthor starts the toss", function () {
  cy.contains("Коробки").click({ force: true });
  cy.get(boxPage.box).last().click({ force: true });
  cy.contains("Перейти к жеребьевке").click({ force: true });
  cy.contains("Провести жеребьевку").click({ force: true });
  cy.contains("Да, провести жеребьевку").click({ force: true });
});
  
Then("the toss completed", function () {
  cy.contains("Жеребьевка проведена").should("exist");
  cy.clearCookies();
});

    