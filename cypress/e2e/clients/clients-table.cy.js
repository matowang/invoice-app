describe("/clients", () => {
	it("has all fields", () => {
		cy.visit("/invoices");
		cy.get('[data-test="client-name"');
		cy.get('[data-test="client-companyName"');
		cy.get('[data-test="client-totalBilled’"');
		cy.get('[data-test="client-invoicesCount’"');
		cy.get('[data-test="client-actions"');
	});
});
