describe("/clients", () => {
	it("reset", () => {
		cy.request(`http://localhost:3139/reset`);
	});
	it("has all fields", () => {
		cy.login({ email: "fake_user5@officehourtesting.com", password: "123456" });

		cy.visit("/clients");

		cy.get('[data-test="client-name"]').should("be.visible");
		cy.get('[data-test="client-companyName"]').should("be.visible");
		cy.get('[data-test="client-totalBilled"]').should("be.visible");
		cy.get('[data-test="client-invoicesCount"]').should("be.visible");
		cy.get('[data-test="client-actions"]').should("be.visible");
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
