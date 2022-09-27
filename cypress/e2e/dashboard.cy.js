describe("/dashboard", () => {
	const EXISTING_USER_EMAIL = "fake_user1@officehourtesting.com";
	const EXISTING_USER_PASSWORD = "123456";

	it("reset", () => {
		cy.request(`http://localhost:3139/reset`);
	});

	// it("dashboard has relevant tables", () => {
	// 	cy.get(`[data-test='clients-table']`).should("be.visible");
	// 	cy.get(`[data-test='view-all-clients']`).should("be.visible");
	// 	cy.get(`[data-test='add-client']`).should("be.visible");

	// 	cy.get(`[data-test='invoices-table']`).should("be.visible");
	// 	cy.get(`[data-test='view-all-invoices']`).should("be.visible");
	// 	cy.get(`[data-test='add-invoice']`).should("be.visible");
	// });

	// it("dashboard has relevant data for fake_user1", () => {
	// 	cy.get(`[data-test*="client-row"]`).should("have.length", 3);
	// 	cy.get(`[data-test='client-actions']`).should("have.length", 3);

	// 	cy.get(`[data-test*="client-row"]:first [data-test="client-name"]`).contains("Alice");
	// 	cy.get(`[data-test*="client-row"]:first [data-test="client-companyName"]`).contains(
	// 		"Wonderland"
	// 	);

	// 	cy.get(`[data-test*="client-row"]:nth-child(2) [data-test="client-name"]`).contains("John");
	// 	cy.get(`[data-test*="client-row"]:nth-child(2) [data-test="client-companyName"]`).contains(
	// 		"Skynet 2"
	// 	);

	// 	cy.get(`[data-test*="invoice-row"]`).should("have.length", 1);
	// 	cy.get(`[data-test='invoice-actions']`).should("have.length", 1);

	// 	cy.get(`[data-test*="invoice-row"]:first [data-test="invoice-number"]`).contains("1234");
	// 	cy.get(`[data-test*="invoice-row"]:first [data-test="invoice-company"]`).contains("Apple");
	// });

	it("can use actions", () => {
		cy.login({ email: EXISTING_USER_EMAIL, password: EXISTING_USER_PASSWORD });

		cy.get(`[data-test*="client-row"]:first`).click();
		cy.get(`[data-test="submit-client"]`).should("be.visible");

		cy.visit("/");
		cy.get(`[data-test*="client-actions"]:first`).click();
		cy.get(`[data-test*="edit-client"]`).click();
		cy.get(`[data-test="submit-client"]`).should("be.visible");
	});
});
