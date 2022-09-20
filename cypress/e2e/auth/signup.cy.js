describe("/signup", () => {
	const EXISTING_USER_EMAIL = "fake_user1@officehourtesting.com";
	const EXISTING_USER_PASSWORD = "123456";

	const NEW_USER_NAME = `First New User E2E`;
	const NEW_USER_PASSWORD = "Test01$";
	const NEW_USER_EMAIL = `first-new-user-e2e@test.com`;

	it("reset", () => {
		cy.request(`http://localhost:3139/reset`);
	});

	it("cannot access singup when logged in", () => {
		cy.clearCookies();
		cy.visit("http://localhost:3000/login");

		cy.get('[data-test="email"]').type(`${EXISTING_USER_EMAIL}`);
		cy.get('[data-test="password"]').type(`${EXISTING_USER_PASSWORD}`);
		cy.get('[data-test="submit-login"]').click();

		cy.location("pathname").should("eq", "/");

		cy.visit("http://localhost:3000/signup");

		cy.location("pathname").should("eq", "/");
	});

	it("can access signup", () => {
		cy.clearCookies();
		cy.visit("http://localhost:3000/signup");
		cy.location("pathname").should("eq", "/signup");
	});

	it("can register new user", () => {
		cy.clearCookies();
		cy.visit("http://localhost:3000/signup");
		cy.get('[data-test="name"]').type(`${NEW_USER_NAME}`);
		cy.get('[data-test="email"]').type(`${NEW_USER_EMAIL}`);
		cy.get('[data-test="password"]').type(`${NEW_USER_PASSWORD}`);
		cy.get('[data-test="confirm-password"]').type(`${NEW_USER_PASSWORD}`);
		cy.get('[data-test="submit-sign-up"]').click();

		cy.location("pathname").should("eq", "/login");
	});

	it("gets error when user email already used by another account", () => {
		cy.clearCookies();
		cy.visit("http://localhost:3000/signup");
		cy.get('[data-test="name"]').type(`${NEW_USER_NAME}`);
		cy.get('[data-test="email"]').type(`${NEW_USER_EMAIL}`);
		cy.get('[data-test="password"]').type(`${NEW_USER_PASSWORD}`);
		cy.get('[data-test="confirm-password"]').type(`${NEW_USER_PASSWORD}`);
		cy.get('[data-test="submit-sign-up"]').click();

		cy.get('[data-test="form-error"]').should("have.length", 1);
	});

	it("shows field errors", () => {
		cy.clearCookies();
		cy.visit("http://localhost:3000/signup");
		cy.get('[data-test="submit-sign-up"]').click();
		cy.get('[data-test="name-error"]').should("have.length", 1);
		cy.get('[data-test="email-error"]').should("have.length", 1);
		cy.get('[data-test="password-error"]').should("have.length", 1);

		cy.get('[data-test="submit-sign-up"]').click();
		cy.get('[data-test="name"]').type(`${NEW_USER_NAME}`);
		cy.get('[data-test="name-error"]').should("have.length", 0);
		cy.get('[data-test="email-error"]').should("have.length", 1);
		cy.get('[data-test="password-error"]').should("have.length", 1);

		const TEST_PASSWORD = `12345678$&!MAb_`;
		cy.get('[data-test="password"]').type(TEST_PASSWORD);
		cy.get('[data-test="submit-sign-up"]').click();
		cy.get('[data-test="confirm-password-error"]').should("have.length", 1);

		cy.get('[data-test="confirm-password"]').type(`Not password`);
		cy.get('[data-test="submit-sign-up"]').click();
		cy.get('[data-test="confirm-password-error"]').should("have.length", 1);

		cy.get('[data-test="confirm-password"]').clear();
		cy.get('[data-test="confirm-password"]').type(TEST_PASSWORD);
		cy.get('[data-test="submit-sign-up"]').click();
		cy.get('[data-test="confirm-password-error"]').should("have.length", 0);
	});

	it(`shows form error when api is not reachable`, () => {
		cy.clearCookies();
		cy.visit("http://localhost:3000/signup");
		cy.get('[data-test="name"]').type(`${NEW_USER_NAME}`);
		cy.get('[data-test="email"]').type(`different1_${NEW_USER_EMAIL}`);
		cy.get('[data-test="password"]').type(`${NEW_USER_PASSWORD}`);
		cy.get('[data-test="confirm-password"]').type(`${NEW_USER_PASSWORD}`);

		cy.intercept(
			{
				method: "POST",
				url: "/register",
				hostname: "localhost",
			},
			(req) => {
				req.destroy();
			}
		);

		cy.get('[data-test="submit-sign-up"]').click();

		cy.get('[data-test="form-error"]').should("have.length", 1);
	});
});
