const users = require("../fixtures/users.json");
const boxPage = require("../fixtures/pages/boxPage.json");
const generalElements = require("../fixtures/pages/general.json");
const dashboardPage = require("../fixtures/pages/dashboardPage.json");
const invitePage = require("../fixtures/pages/invitePage.json");
const inviteeBoxPage = require("../fixtures/pages/inviteeBoxPage.json");
const inviteeDashboardPage = require("../fixtures/pages/inviteeDashboardPage.json");
const menu = require("../fixtures/pages/menu.json");
import { faker } from "@faker-js/faker";

describe("user can create a box and run it", () => {
  let newBoxName = faker.word.noun({ length: { min: 5, max: 10 } });
  let wishes = faker.word.noun() + faker.word.adverb() + faker.word.adjective();
  let maxAmount = 50;
  let currency = "Евро";
  let inviteLink;

  beforeEach(() => {
    cy.wait(10000); // Ждём 10 секунд перед каждым тестом, чтобы обойти проблему с слишком большим кол-вом запросов к серверу
  });

  it("user logins and create a box", () => {
    cy.visit("/login");
    cy.login(users.userAutor.email, users.userAutor.password);
    cy.contains("Создать коробку").click();
    cy.get(boxPage.boxNameField).type(newBoxName);
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

  it("add participants", () => {
    cy.get(generalElements.submitButton).click({force: true});
    cy.get(invitePage.inviteLink)
      .invoke("text")
      .then((link) => {
        inviteLink = link;
      });
    cy.clearCookies();
  });
  
  it("approve as user1", () => {
    cy.visit(inviteLink);
    cy.get(generalElements.submitButton).click();
    cy.contains("войдите").click();
    cy.login(users.user1.email, users.user1.password);
    cy.contains("Создать карточку участника").should("exist");
    cy.get(generalElements.submitButton).click();
    cy.get(generalElements.arrowRight).click({force: true});
    cy.wait(1000); // Необходимо дождаться ответа от сервера
    cy.get(generalElements.arrowRight).click({force: true});
    cy.get(inviteeBoxPage.wishesInput).type(wishes);
    cy.get(generalElements.arrowRight).click({force: true});
    cy.get(inviteeDashboardPage.noticeForInvitee)
      .invoke("text")
      .then((text) => {
        expect(text).to.contain("Это — анонимный чат с вашим Тайным Сантой");
      });
    cy.clearCookies();
  });

  it("approve as user2", () => {
    cy.visit(inviteLink);
    cy.get(generalElements.submitButton).click({ force: true });
    cy.contains("войдите").click();
    cy.login(users.user2.email, users.user2.password);
    cy.contains("Создать карточку участника").should("exist");
    cy.get(generalElements.submitButton).click();
    cy.get(generalElements.arrowRight).click({force: true});
    cy.wait(1000); // Необходимо дождаться ответа от сервера
    cy.get(generalElements.arrowRight).click({force: true});
    cy.get(inviteeBoxPage.wishesInput).type(wishes);
    cy.get(generalElements.arrowRight).click({force: true});
    cy.get(inviteeDashboardPage.noticeForInvitee)
      .invoke("text")
      .then((text) => {
        expect(text).to.contain("Это — анонимный чат с вашим Тайным Сантой");
      });
    cy.clearCookies();
  });

  it("approve as user3", () => {
    cy.visit(inviteLink);
    cy.get(generalElements.submitButton).click();
    cy.contains("войдите").click();
    cy.login(users.user3.email, users.user3.password);
    cy.contains("Создать карточку участника").should("exist");
    cy.get(generalElements.submitButton).click();
    cy.get(generalElements.arrowRight).click({force: true});
    cy.get(generalElements.arrowRight).click({force: true});
    cy.get(inviteeBoxPage.wishesInput).type(wishes);
    cy.get(generalElements.arrowRight).click({force: true});
    cy.get(inviteeDashboardPage.noticeForInvitee)
      .invoke("text")
      .then((text) => {
        expect(text).to.contain("Это — анонимный чат с вашим Тайным Сантой");
      });
    cy.clearCookies();
  });

  it("toss", () => {
    cy.visit("/login");
    cy.login(users.userAutor.email, users.userAutor.password);
    cy.contains("Коробки").click({ force: true });
    cy.get(boxPage.box).last().click({ force: true });
    cy.contains("Перейти к жеребьевке").click({ force: true });
    cy.contains("Провести жеребьевку").click({ force: true });
    cy.contains("Да, провести жеребьевку").click({ force: true });
    cy.contains("Жеребьевка проведена").should("exist");
    cy.clearCookies();
  });

  after("delete box", () => {
    cy.visit("/login");
    cy.login(users.userAutor.email, users.userAutor.password);
    cy.get('.layout-1__header-wrapper-fixed > .layout-1__header > .header > .header__items > .layout-row-start > [href="/account/boxes"] > .header-item > .header-item__text > .txt--med').click({force: true});
    cy.get(boxPage.box).first().click({force: true});
    cy.get(
      ".layout-1__header-wrapper-fixed > .layout-1__header-secondary > .header-secondary > .header-secondary__right-item > .toggle-menu-wrapper > .toggle-menu-button > .toggle-menu-button--inner"
    ).click({force: true});
    cy.contains("Архивация и удаление").click({force: true});
    cy.get(":nth-child(2) > .form-page-group__main > .frm-wrapper > .frm").type(
      "Удалить коробку"
    );
    cy.get(".btn-service").click({force: true});
  });
});
