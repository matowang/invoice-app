describe("/clients/new access", () => {
	it("reset", () => {
		cy.request(`http://localhost:3139/reset`);
	});

	it("cannot access /clients/new if not logged in", () => {
		cy.clearCookies();
		cy.visit("http://localhost:3000/clients/new");

		cy.location("pathname").should("eq", "/login");
	});
});

describe("/clients/*", () => {
	const EXISTING_USER_EMAIL = "fake_user1@officehourtesting.com";
	const EXISTING_USER_PASSWORD = "123456";

	const NEW_CLIENT_DETAILS = {
		email: "tony.stark@starkindustries.com",
		name: "Tony Stark",
		companyName: "Stark Industries",
		companyAddress: "Stark Tower, New York City, USA",
		vat: "241421",
		reg: "321451",
		iban: "12314151534312321",
		swift: "ST12321",
	};

	beforeEach(() => {
		cy.clearCookies();
		cy.visit("http://localhost:3000/login");

		cy.get('[data-test="email"]').should("be.visible");
		cy.get('[data-test="email"]').type(`${EXISTING_USER_EMAIL}`);
		cy.get('[data-test="password"]').type(`${EXISTING_USER_PASSWORD}`);
		cy.get('[data-test="submit-login"]').click();

		cy.location("pathname").should("eq", "/");
	});

	it("can navigate to new client page by clicking add button on dashboard", () => {
		cy.get(`[data-test='add-client']`).should("be.visible").click();
		cy.location("pathname").should("eq", "/clients/new");

		cy.get(`[data-test="client-email"]`).should("be.visible");
		cy.get(`[data-test="client-name"]`).should("be.visible");
		cy.get(`[data-test="client-company-name"]`).should("be.visible");
		cy.get(`[data-test="client-company-address"]`).should("be.visible");
		cy.get(`[data-test="client-company-vat"]`).should("be.visible");
		cy.get(`[data-test="client-company-reg"]`).should("be.visible");
		cy.get(`[data-test="client-company-iban"]`).should("be.visible");
		cy.get(`[data-test="client-company-swift"]`).should("be.visible");
		cy.get(`[data-test="submit-client"]`).should("be.visible");
	});

	it("shows common errors in form", () => {
		cy.get(`[data-test='add-client']`).should("be.visible").click();
		cy.location("pathname").should("eq", "/clients/new");

		cy.get(`[data-test='submit-client']`).should("be.visible").click();

		// empty form
		cy.get(`[data-test="client-email-error"]`).should("be.visible");
		cy.get(`[data-test="client-name-error"]`).should("be.visible");
		cy.get(`[data-test="client-company-name-error"]`).should("be.visible");
		cy.get(`[data-test="client-company-address-error"]`).should("be.visible");
		cy.get(`[data-test="client-company-vat-error"]`).should("be.visible");
		cy.get(`[data-test="client-company-reg-error"]`).should("be.visible");
		//cy.get(`[data-test="client-company-iban-error"]`).should('be.visible')
		//cy.get(`[data-test="client-company-swift-error"]`).should('be.visible')

		// form with valid email and vat
		cy.get(`[data-test="client-email"]`).type("tony.stark@starkindustries.com");
		cy.get(`[data-test="client-company-vat"]`).type("1234");

		cy.get(`[data-test="client-email-error"]`).should("have.length", 0);
		cy.get(`[data-test="client-name-error"]`).should("be.visible");
		cy.get(`[data-test="client-company-name-error"]`).should("be.visible");
		cy.get(`[data-test="client-company-address-error"]`).should("be.visible");
		cy.get(`[data-test="client-company-vat-error"]`).should("have.length", 0);
		cy.get(`[data-test="client-company-reg-error"]`).should("be.visible");
		//cy.get(`[data-test="client-company-iban-error"]`).should('be.visible')
		//cy.get(`[data-test="client-company-swift-error"]`).should('be.visible')
	});

	it("creates new client", () => {
		cy.get(`[data-test='add-client']`).should("be.visible").click();
		cy.location("pathname").should("eq", "/clients/new");

		// NEW_CLIENT_DETAILS
		cy.get(`[data-test="client-email"]`).clear().type(NEW_CLIENT_DETAILS.email);
		cy.get(`[data-test="client-name"]`).clear().type(NEW_CLIENT_DETAILS.name);
		cy.get(`[data-test="client-company-name"]`).clear().type(NEW_CLIENT_DETAILS.companyName);
		cy.get(`[data-test="client-company-address"]`).clear().type(NEW_CLIENT_DETAILS.companyAddress);
		cy.get(`[data-test="client-company-vat"]`).clear().type(NEW_CLIENT_DETAILS.vat);
		cy.get(`[data-test="client-company-reg"]`).clear().type(NEW_CLIENT_DETAILS.reg);
		cy.get(`[data-test="client-company-iban"]`).clear().type(NEW_CLIENT_DETAILS.iban);
		cy.get(`[data-test="client-company-swift"]`).clear().type(NEW_CLIENT_DETAILS.swift);

		cy.intercept({
			method: "POST",
			url: "/graphql",
		}).as("apiClientsCreate");

		cy.get(`[data-test='submit-client']`).should("be.visible").click();

		cy.wait("@apiClientsCreate");

		cy.get(`[data-test="form-success"]`).should("be.visible").should("not.be.empty");

		cy.get(`[data-test="client-email"]`).should("be.visible").should("be.empty");
		cy.get(`[data-test="client-name"]`).should("be.visible").should("be.empty");
		cy.get(`[data-test="client-company-name"]`).should("be.visible").should("be.empty");
		cy.get(`[data-test="client-company-address"]`).should("be.visible").should("be.empty");
		cy.get(`[data-test="client-company-vat"]`).should("be.visible").should("be.empty");
		cy.get(`[data-test="client-company-reg"]`).should("be.visible").should("be.empty");
		cy.get(`[data-test="client-company-iban"]`).should("be.visible").should("be.empty");
		cy.get(`[data-test="client-company-swift"]`).should("be.visible").should("be.empty");

		cy.location("pathname").should("eq", "/clients/new");
	});

	it("can see the newly created client in the dashboard list", () => {
		cy.get(`[data-test*="client-row"]`).should("have.length", 4);
	});

	it("can edit existing client", () => {
		cy.get(`[data-test*="client-row"]`).first().click();
		cy.get(`[data-test="client-email"]`).clear().type(`u_${NEW_CLIENT_DETAILS.email}`);
		cy.get(`[data-test="client-name"]`).clear().type(`updated ${NEW_CLIENT_DETAILS.name}`);
		cy.get(`[data-test="client-company-name"]`)
			.clear()
			.type(`updated ${NEW_CLIENT_DETAILS.companyName}`);
		cy.get(`[data-test="client-company-address"]`)
			.clear()
			.type(`updated ${NEW_CLIENT_DETAILS.companyAddress}`);
		cy.get(`[data-test="client-company-vat"]`).clear().type(`updated ${NEW_CLIENT_DETAILS.vat}`);
		cy.get(`[data-test="client-company-reg"]`).clear().type(`updated ${NEW_CLIENT_DETAILS.reg}`);
		cy.get(`[data-test="client-company-iban"]`).clear().type(`updated ${NEW_CLIENT_DETAILS.iban}`);
		cy.get(`[data-test="client-company-swift"]`)
			.clear()
			.type(`updated ${NEW_CLIENT_DETAILS.swift}`);

		cy.intercept({
			method: "PUT",
			url: "/clients",
		}).as("apiClientsUpdate");

		cy.get(`[data-test='submit-client']`).should("be.visible").click();

		cy.wait("@apiClientsUpdate");

		cy.get(`[data-test="form-success"]`).should("be.visible").should("not.be.empty");

		cy.location("pathname").should("not.eq", "/");

		cy.visit("http://localhost:3000/");

		cy.get(`[data-test*="client-row"]:first [data-test="client-name"]`).contains(
			`updated ${NEW_CLIENT_DETAILS.name}`
		);
		cy.get(`[data-test*="client-row"]:first [data-test="client-companyName"]`).contains(
			`updated ${NEW_CLIENT_DETAILS.companyName}`
		);
	});
});
