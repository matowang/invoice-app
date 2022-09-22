/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

import companyDetails from "../fixtures/company-details.json";

Cypress.Commands.add("signup and login", (user) => {
	it("cannot access without login", () => {
		cy.clearCookies();
		cy.visit("http://localhost:3000/company-details");
		cy.location("pathname").should("eq", "/login");
	});

	it("signup and login", () => {
		cy.visit("http://localhost:3000/signup");
		cy.get('[data-test="name"]').type(user.name);
		cy.get('[data-test="email"]').type(user.email);
		cy.get('[data-test="password"]').type(user.password);
		cy.get('[data-test="confirm-password"]').type(user.password);
		cy.get('[data-test="submit-sign-up"]').click();

		cy.location("pathname").should("eq", "/login");

		cy.get('[data-test="submit-login"]');
		cy.get('[data-test="email"]').type(user.email);
		cy.get('[data-test="password"]').type(user.password);
		cy.get('[data-test="submit-login"]').click();

		cy.location("pathname").should("eq", "/company-details");

		cy.get('[data-test="company-name"]').type(companyDetails.name);
		cy.get('[data-test="company-address"]').type(companyDetails.address);
		cy.get('[data-test="company-vat"]').type(companyDetails.vatNumber);
		cy.get('[data-test="company-reg-number"]').type(companyDetails.regNumber);
		cy.get('[data-test="company-iban"]').type(companyDetails.iban);
		cy.get('[data-test="company-swift"]').type(companyDetails.swift);
		cy.get('[data-test="submit-company-details"]').click();

		cy.location("pathname").should("eq", "/");
	});
});

Cypress.Commands.add("login", ({ email, password }) => {
	cy.clearCookie("token");
	cy.visit("http://localhost:3000/login");

	cy.get('[data-test="email"]').should("be.visible");
	cy.get('[data-test="email"]').type(email);
	cy.get('[data-test="password"]').type(password);
	cy.get('[data-test="submit-login"]').click();

	cy.location("pathname").should("eq", "/");
	cy.getCookie("token").should("exist");
});
