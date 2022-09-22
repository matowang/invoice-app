describe("/invoices", () => {
	beforeEach(() => {
		// before each test, we can automatically preserve the
		// 'session_id' and 'remember_token' cookies. this means they
		// will not be cleared before the NEXT test starts.
		//
		// the name of your cookies will likely be different
		// this is an example
		Cypress.Cookies.preserveOnce("token", "remember_token");
	});
	it("reset", () => {
		cy.request(`http://localhost:3139/reset`);
	});
	it("login", () => {
		cy.login({ email: "fake_user5@officehourtesting.com", password: "123456" });
	});

	it("has all fields", () => {
		cy.visit("/invoices");
		cy.get('[data-test="invoice-number"]');
		cy.get('[data-test="invoice-company"]');
		cy.get('[data-test="invoice-date"]');
		cy.get('[data-test="invoice-project"]');
		cy.get('[data-test="invoice-price"]');
		cy.get('[data-test="invoice-actions"]');
	});
});
