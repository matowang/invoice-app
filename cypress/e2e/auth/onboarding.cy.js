describe("/company-details", () => {
	const NEW_USER_NAME = `Onboarding New User E2E`;
	const NEW_USER_PASSWORD = "Test01$";
	const NEW_USER_EMAIL = `onboarding-new-user-e2e@test.com`;

	const ONBOARDING_COMPANY_NAME = "Onboading";
	const ONBOARDING_COMPANY_ADDRESS = "Earth";
	const ONBOARDING_COMPANY_VAT = "123141";
	const ONBOARDING_COMPANY_REG = "13214123";
	const ONBOARDING_COMPANY_IBAN = "IGNBRO1321321421421";
	const ONBOARDING_COMPANY_SWIFT = "IGNROBU";

	it("reset", () => {
		cy.request(`http://localhost:3139/reset`);
	});

	it("cannot access company details when logged in", () => {
		cy.clearCookies();
		cy.visit("http://localhost:3000/company-details");
		cy.location("pathname").should("eq", "/login");
	});

	it("after signup and login, will see company details", () => {
		cy.clearCookies();
		cy.visit("http://localhost:3000/signup");
		cy.get('[data-test="name"]').type(`${NEW_USER_NAME}`);
		cy.get('[data-test="email"]').type(`${NEW_USER_EMAIL}`);
		cy.get('[data-test="password"]').type(`${NEW_USER_PASSWORD}`);
		cy.get('[data-test="confirm-password"]').type(`${NEW_USER_PASSWORD}`);
		cy.get('[data-test="submit-sign-up"]').click();

		// wait for redirect to login first
		cy.location("pathname").should("eq", "/login");

		// navigate to refresh and clear cy bug with detached email element
		cy.visit("http://localhost:3000/");
		cy.location("pathname").should("eq", "/login");

		cy.get('[data-test="email"]').type(`${NEW_USER_EMAIL}`);
		cy.get('[data-test="password"]').type(`${NEW_USER_PASSWORD}`);
		cy.get('[data-test="submit-login"]').click();

		cy.location("pathname").should("eq", "/company-details");

		cy.visit("http://localhost:3000/signup");
		cy.location("pathname").should("eq", "/company-details");

		cy.visit("http://localhost:3000/");
		cy.location("pathname").should("eq", "/company-details");
	});

	it("can fill in values the first time", () => {
		cy.clearCookies();
		cy.visit("http://localhost:3000/login");
		cy.get('[data-test="email"]').type(`${NEW_USER_EMAIL}`);
		cy.get('[data-test="password"]').type(`${NEW_USER_PASSWORD}`);
		cy.get('[data-test="submit-login"]').click();

		// refresh to avoid cy detached errors
		cy.location("pathname").should("eq", "/company-details");
		cy.visit("http://localhost:3000/company-details");

		cy.get('[data-test="submit-company-details"]').click();
		cy.get('[data-test="company-name"]').should("have.length", 1);
		cy.get('[data-test="company-address"]').should("have.length", 1);
		cy.get('[data-test="company-vat"]').should("have.length", 1);
		cy.get('[data-test="company-reg-number"]').should("have.length", 1);

		cy.get('[data-test="company-name"]').type(`${ONBOARDING_COMPANY_NAME}`);
		cy.get('[data-test="company-address"]').type(`${ONBOARDING_COMPANY_ADDRESS}`);
		cy.get('[data-test="company-vat"]').type(`${ONBOARDING_COMPANY_VAT}`);
		cy.get('[data-test="company-reg-number"]').type(`${ONBOARDING_COMPANY_REG}`);
		cy.get('[data-test="company-iban"]').type(`${ONBOARDING_COMPANY_IBAN}`);
		cy.get('[data-test="company-swift"]').type(`${ONBOARDING_COMPANY_SWIFT}`);
		cy.get('[data-test="submit-company-details"]').click();

		cy.location("pathname").should("eq", "/");
	});

	it("can update company details after initial submission", () => {
		cy.clearCookies();
		cy.visit("http://localhost:3000/login");
		cy.get('[data-test="email"]').type(`${NEW_USER_EMAIL}`);
		cy.get('[data-test="password"]').type(`${NEW_USER_PASSWORD}`);
		cy.get('[data-test="submit-login"]').click();
		cy.location("pathname").should("eq", "/");

		cy.visit("http://localhost:3000/company-details");

		cy.get('[data-test="company-name"]').should("have.value", `${ONBOARDING_COMPANY_NAME}`);
		cy.get('[data-test="company-address"]').should("have.value", `${ONBOARDING_COMPANY_ADDRESS}`);
		cy.get('[data-test="company-vat"]').should("have.value", `${ONBOARDING_COMPANY_VAT}`);
		cy.get('[data-test="company-reg-number"]').should("have.value", `${ONBOARDING_COMPANY_REG}`);
		cy.get('[data-test="company-iban"]').should("have.value", `${ONBOARDING_COMPANY_IBAN}`);
		cy.get('[data-test="company-swift"]').should("have.value", `${ONBOARDING_COMPANY_SWIFT}`);

		cy.get('[data-test="company-name"]').clear().type(`new ${ONBOARDING_COMPANY_NAME}`);
		cy.get('[data-test="company-address"]').clear().type(`updated ${ONBOARDING_COMPANY_ADDRESS}`);
		cy.get('[data-test="company-vat"]').clear().type(`updated ${ONBOARDING_COMPANY_VAT}`);
		cy.get('[data-test="company-reg-number"]').clear().type(`updated ${ONBOARDING_COMPANY_REG}`);
		cy.get('[data-test="company-iban"]').clear().type(`updated ${ONBOARDING_COMPANY_IBAN}`);
		cy.get('[data-test="company-swift"]').clear().type(`updated ${ONBOARDING_COMPANY_SWIFT}`);
		cy.get('[data-test="submit-company-details"]').click();

		cy.location("pathname").should("eq", "/company-details");

		cy.get(`[data-test='success-message']`).should("have.length", 1);
	});
});
