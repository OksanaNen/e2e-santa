import { Given, Then } from "@badeball/cypress-cucumber-preprocessor";


Given("userAuthor logs in for delete as {string} and {string}", function (login, password) {
  cy.visit("/login");
  cy.login(login, password);
});

Then("delete a box", function () {
    const key = Cypress.env("key");
    cy.request({
      failOnStatusCode: false,
      method: "DELETE",
      headers: { 
      Cookie: "jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQ5NTU2ODcsImlhdCI6MTY4NzQwNDI5OSwiZXhwIjoxNjg5OTk2Mjk5fQ.s8798J-2NfyF1qvzNjR48u7nStrj_aAYEiZt26yHrz0; refresh=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQ5NTU2ODcsImlhdCI6MTY4NzQwNDI5OSwiZXhwIjoxNjkyNTg4Mjk5fQ.vqhBFxYf6_Z2NxfOAUy4etrphOt_H8DCGg4nw082JnQ"
      },
      url: `https://santa-secret.ru/api/box/${key}`
    }).should((response) => {
      expect(response.status).to.eq(200);
      });
});