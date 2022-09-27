describe("/login", () => {
	const EXISTING_USER_EMAIL = "fake_user1@officehourtesting.com";
	const EXISTING_USER_PASSWORD = "123456";

	it("reset", () => {
		cy.request(`http://localhost:3139/reset`);
	});

	it("redirect to login when no cookies found", () => {
		cy.clearCookies();
		cy.visit("http://localhost:3000");
		cy.location("pathname").should("eq", "/login");
	});

	it("sees error on email field when clicking login with empty form", () => {
		cy.clearCookies();
		cy.visit("http://localhost:3000/login");

		cy.get('[data-test="submit-login"]').click();
		cy.get('[data-test="email-error"]').should("be.visible");
		cy.get('[data-test="password-error"]').should("be.visible");

		cy.get('[data-test="email"]').type(`${EXISTING_USER_EMAIL}`);
		cy.get('[data-test="submit-login"]').click();

		cy.get('[data-test="email-error"]').should("have.length", 0);
		cy.get('[data-test="password-error"]').should("be.visible");
	});

	it("fields can trigger submit when pressing enter", () => {
		cy.clearCookies();
		cy.visit("http://localhost:3000/login");

		cy.get('[data-test="email"]').should("be.visible");
		cy.get('[data-test="email"]').type(`${EXISTING_USER_EMAIL}{enter}`);
		cy.get('[data-test="email-error"]').should("have.length", 0);
		cy.get('[data-test="password-error"]').should("be.visible");
	});

	it("logs in succesfully", () => {
		cy.clearCookies();
		cy.visit("http://localhost:3000/login");

		cy.get('[data-test="email"]').should("be.visible");
		cy.get('[data-test="email"]').type(`${EXISTING_USER_EMAIL}`);
		cy.get('[data-test="password"]').type(`${EXISTING_USER_PASSWORD}`);
		cy.get('[data-test="submit-login"]').click();

		cy.location("pathname").should("eq", "/");
	});

	it("cannot access login when user is logged in", () => {
		cy.clearCookies();
		cy.visit("http://localhost:3000");

		cy.get('[data-test="email"]').should("be.visible");
		cy.get('[data-test="email"]').type(`${EXISTING_USER_EMAIL}`);
		cy.get('[data-test="password"]').type(`${EXISTING_USER_PASSWORD}`);
		cy.get('[data-test="submit-login"]').click();

		cy.location("pathname").should("eq", "/");

		cy.visit("/login");

		cy.location("pathname").should("eq", "/");
	});

	it("wrong email or password", () => {
		cy.visit("http://localhost:3000");

		cy.get('[data-test="email"]').should("be.visible");
		cy.get('[data-test="email"]').type(`${EXISTING_USER_EMAIL}`);
		cy.get('[data-test="password"]').type(`wrong password`);
		cy.get('[data-test="submit-login"]').click();

		cy.get('[data-test="form-error"]').should("be.visible");
		cy.location("pathname").should("eq", "/login");

		cy.get('[data-test="email"]').should("be.visible");
		cy.get('[data-test="email"]').clear();
		cy.get('[data-test="email"]').type(`wrong email`);
		cy.get('[data-test="password"]').clear();
		cy.get('[data-test="password"]').type(`${EXISTING_USER_PASSWORD}`);
		cy.get('[data-test="submit-login"]').click();

		cy.get('[data-test="form-error"]').should("be.visible");
		cy.location("pathname").should("eq", "/login");

		cy.get('[data-test="email"]').should("be.visible");
		cy.get('[data-test="email"]').clear();
		cy.get('[data-test="email"]').type(`${EXISTING_USER_EMAIL}`);
		cy.get('[data-test="password"]').clear();
		cy.get('[data-test="password"]').type(`${EXISTING_USER_PASSWORD}`);
		cy.get('[data-test="submit-login"]').click();

		cy.location("pathname").should("eq", "/");
	});

	it("check form error", () => {
		cy.visit("http://localhost:3000");

		cy.intercept(
			{
				method: "POST",
				url: "http://localhost:3139/login*",
			},
			{
				statusCode: 500,
			}
		);

		cy.get('[data-test="email"]').should("be.visible");
		cy.get('[data-test="email"]').type(`${EXISTING_USER_EMAIL}`);
		cy.get('[data-test="password"]').type(`${EXISTING_USER_PASSWORD}`);
		cy.get('[data-test="submit-login"]').click();

		cy.get('[data-test="form-error"]').should("be.visible");
		cy.location("pathname").should("eq", "/login");

		cy.intercept("POST", "http://localhost:3139/login*", (req) => req.continue());

		cy.get('[data-test="submit-login"]').click();
		cy.location("pathname").should("eq", "/");

		cy.get('[data-test="invoice-number"]').should("be.visible");
	});

	it("button cannot be double clicked", () => {
		cy.visit("http://localhost:3000");

		cy.intercept("POST", "http://localhost:3139/login*", cy.spy().as("loginAPI"));

		cy.get('[data-test="email"]').should("be.visible");
		cy.get('[data-test="email"]').type(`${EXISTING_USER_EMAIL}`);
		cy.get('[data-test="password"]').type(`wrong`);
		cy.get('[data-test="submit-login"]').click();
		cy.get('[data-test="submit-login"]').should("be.disabled");

		cy.get("@loginAPI").its("callCount").should("eq", 1);
		cy.location("pathname").should("eq", "/login");
	});
});
