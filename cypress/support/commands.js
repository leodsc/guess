import "cypress-wait-until";

Cypress.Commands.add("write", (text) => {
	cy.get("button").first().type(text);
})
