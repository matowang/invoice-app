import clients from "../../fixtures/user-clients.json";

describe("/clients", () => {
	it("reset", () => {
		cy.request(`http://localhost:3139/reset`);
	});

	it("populate clients", () => {
		cy.login({ email: "fake_user5@officehourtesting.com", password: "123456" });

		let token;

		cy.getCookie("token")
			.should("exist")
			.then((c) => {
				// save cookie until we need it
				token = c.value;
			});

		cy.wrap(clients).each((client) => {
			cy.request({
				method: "POST",
				url: "http://localhost:3139/clients",
				body: client,
				headers: { "x-access-token": token },
			});
		});
	});

	it("has all fields", () => {
		cy.login({ email: "fake_user5@officehourtesting.com", password: "123456" });

		cy.visit("/clients");

		cy.get('[data-test="loading-overlay"]').should("be.visible");

		cy.get('[data-test="clients-table"]').should("be.visible");
		cy.get(`[data-test*="client-row"]`).should("have.length", 10);

		cy.get('[data-test="client-name"]').should("be.visible").should("have.length", 10);
		cy.get('[data-test="client-companyName"]').should("be.visible").should("have.length", 10);
		cy.get('[data-test="client-totalBilled"]').should("be.visible").should("have.length", 10);
		cy.get('[data-test="client-invoicesCount"]').should("be.visible").should("have.length", 10);
		cy.get('[data-test="client-actions"]').should("be.visible").should("have.length", 10);
	});

	it("show empty message when no items", () => {
		cy.login({ email: "fake_user5@officehourtesting.com", password: "123456" });
		cy.intercept(
			{
				method: "POST",
				url: "http://localhost:3139/graphql*",
			},
			{
				statusCode: 201,
				body: {
					data: { clients: { results: [] } },
				},
			}
		);
		cy.visit("/clients");

		cy.get(`[data-test="empty-placeholder"]`).should("be.visible");
	});

	it("show error when no internet", () => {
		cy.login({ email: "fake_user5@officehourtesting.com", password: "123456" });
		cy.intercept(
			{
				method: "POST",
				url: "http://localhost:3139/graphql*",
			},
			(req) => {
				req.destroy();
			}
		);
		cy.visit("/clients");

		cy.get(`[data-test="clients-fetch-error"]`, { timeout: 10000 }).should("be.visible");
	});

	it("can use actions", () => {
		cy.login({ email: "fake_user5@officehourtesting.com", password: "123456" });

		cy.get(`[data-test*="client-row"]:first`).click();
		cy.get(`[data-test="submit-client"]`).should("be.visible");

		cy.visit("/clients");
		cy.get(`[data-test*="client-actions"]:first`).click();
		cy.get(`[data-test*="edit-client"]`).click();
		cy.get(`[data-test="submit-client"]`).should("be.visible");
	});
});
