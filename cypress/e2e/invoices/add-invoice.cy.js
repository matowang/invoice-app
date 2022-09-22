import clients from "../../fixtures/user-clients.json";

describe("/invoices/new", () => {
	const invoice = {
		invoice_number: "4836",
		date: "12032023",
		dueDate: "12042023",
		projectCode: "sUxY6",
		meta: {
			items: [
				{
					value: 94958,
					description: "Eligendi aut vero id ea rem sed ipsa ab.",
				},
				{
					value: 45639,
					description: "Incidunt amet et nostrum quis saepe dolore magnam neque eaque.",
				},
				{
					value: 45943,
					description: "Magnam neque voluptatem et.",
				},
				{
					value: 20970,
					description:
						"Repellendus quo impedit aspernatur alias molestiae autem labore recusandae aut.",
				},
				{
					value: 87937,
					description: "Corrupti sunt consequuntur mollitia non.",
				},
			],
		},
		createdAt: "1653839527552",
	};

	invoice.value = invoice.meta.items.reduce((a, c) => a + c.value);

	it("reset", () => {
		cy.request(`http://localhost:3139/reset`);
	});

	it("populate clients", () => {
		cy.login({ email: "fake_user1@officehourtesting.com", password: "123456" });

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

	it("can navigate to new invoice page by clicking add button on dashboard", () => {
		cy.login({ email: "fake_user1@officehourtesting.com", password: "123456" });

		cy.get(`[data-test='add-invoice']`).should("be.visible").click();
		cy.location("pathname").should("eq", "/invoices/new");

		cy.get(`[data-test="invoice-date"]`).should("be.visible");
		cy.get(`[data-test="invoice-due-date"]`).should("be.visible");
		cy.get(`[data-test="invoice-number"]`).should("be.visible");
		cy.get(`[data-test="invoice-project-code"]`).should("be.visible");
		cy.get(`[data-test="invoice-item-value"]`).should("be.visible");
		cy.get(`[data-test="invoice-item-description"]`).should("be.visible");
		cy.get(`[data-test="invoice-company-id"]`).should("be.visible");
		cy.get(`[data-test="invoice-value"]`).should("be.visible");
		cy.get(`[data-test="submit-invoice"]`).should("be.visible");
	});

	it("can detect errors", () => {
		cy.login({ email: "fake_user1@officehourtesting.com", password: "123456" });
		cy.get(`[data-test='add-invoice']`).should("be.visible").click();
		cy.location("pathname").should("eq", "/invoices/new");

		cy.get(`[data-test="submit-invoice"]`).click();

		cy.get(`[data-test="invoice-date-error"]`).should("be.visible");
		cy.get(`[data-test="invoice-due-date-error"]`).should("be.visible");
		cy.get(`[data-test="invoice-number-error"]`).should("be.visible");
		cy.get(`[data-test="invoice-project-code-error"]`).should("be.visible");
		cy.get(`[data-test="invoice-item-value-error"]`).should("be.visible");
		cy.get(`[data-test="invoice-item-description-error"]`).should("be.visible");
		cy.get(`[data-test="invoice-value-error"]`).should("be.visible");
		cy.get(`[data-test="invoice-company-id-error"]`).should("be.visible");
	});

	it("can submit success", () => {
		cy.login({ email: "fake_user1@officehourtesting.com", password: "123456" });
		cy.visit("/invoices/new");

		cy.get(`[data-test="invoice-number"]`).type(`${invoice.invoice_number}`);
		cy.get(`[data-test="invoice-project-code"]`).type(`${invoice.projectCode}`);
		cy.get(`[data-test="invoice-company-id"]`).type(`{downArrow}{downArrow}{enter}`);
		cy.get(`[data-test="submit-invoice"]`).click();

		//invoice items
		cy.wrap(invoice.meta.items).each((item, i) => {
			cy.get(`[data-test="invoice-item-${i}"]`)
				.find(`[data-test="invoice-item-value"]`)
				.type(`${item.value}`);
			cy.get(`[data-test="invoice-item-${i}"]`)
				.find(`[data-test="invoice-item-description"]`)
				.type(`${item.description}`);
			if (i !== invoice.meta.items.length - 1) cy.get(`[data-test="invoice-add-item"]`).click();
		});

		cy.wrap(invoice.meta.items).each((item, i) => {
			cy.get(`[data-test="invoice-item-${i}"]`)
				.find(`[data-test="invoice-item-value"]`)
				.should("have.value", `${item.value}`);
			cy.get(`[data-test="invoice-item-${i}"]`)
				.find(`[data-test="invoice-item-description"]`)
				.should("have.value", `${item.description}`);
		});

		//Test Item Removal,
		cy.get(`[data-test="invoice-item-${2}"]`).find(`[data-test="invoice-remove-item"]`).click();

		cy.get(`[data-test="invoice-item-${2}"]`)
			.find(`[data-test="invoice-item-value"]`)
			.should("have.value", `${invoice.meta.items[3].value}`);
		cy.get(`[data-test="invoice-item-${2}"]`)
			.find(`[data-test="invoice-item-description"]`)
			.should("have.value", `${invoice.meta.items[3].description}`);
		cy.get(`[data-test="invoice-item-${3}"]`)
			.find(`[data-test="invoice-item-value"]`)
			.should("have.value", `${invoice.meta.items[4].value}`);
		cy.get(`[data-test="invoice-item-${3}"]`)
			.find(`[data-test="invoice-item-description"]`)
			.should("have.value", `${invoice.meta.items[4].description}`);

		//Check if due date can be greater
		cy.get(`[data-test="invoice-date"]`).type("12/04/2023");
		cy.get(`[data-test="invoice-due-date"]`).type("12/03/2023");
		cy.get(`[data-test="invoice-due-date-error"]`).should("be.visible");

		cy.get(`[data-test="invoice-date"]`).clear();
		cy.get(`[data-test="invoice-date"]`).type("12/03/2023");
		cy.get(`[data-test="invoice-due-date"]`).clear();
		cy.get(`[data-test="invoice-due-date"]`).type("12/03/2023");
		cy.get(`[data-test="invoice-due-date-error"]`).should("not.exist");

		cy.get(`[data-test="invoice-date"]`).clear();
		cy.get(`[data-test="invoice-date"]`).type(`${invoice.date}`);
		cy.get(`[data-test="invoice-due-date"]`).clear();
		cy.get(`[data-test="invoice-due-date"]`).type(`${invoice.dueDate}`);

		//Check No Errors
		cy.get(`[data-test="invoice-date-error"]`).should("not.exist");
		cy.get(`[data-test="invoice-due-date-error"]`).should("not.exist");
		cy.get(`[data-test="invoice-number-error"]`).should("not.exist");
		cy.get(`[data-test="invoice-project-code-error"]`).should("not.exist");
		cy.get(`[data-test="invoice-item-value-error"]`).should("not.exist");
		cy.get(`[data-test="invoice-item-description-error"]`).should("not.exist");
		cy.get(`[data-test="invoice-value-error"]`).should("not.exist");
		cy.get(`[data-test="invoice-company-id-error"]`).should("not.exist");

		//Successful Submit
		cy.get(`[data-test="submit-invoice"]`).click();
		cy.get(`[data-test="form-success"]`).should("be.visible");

		cy.get(`[data-test="invoice-date-error"]`).should("not.exist");
		cy.get(`[data-test="invoice-due-date-error"]`).should("not.exist");
		cy.get(`[data-test="invoice-number-error"]`).should("not.exist");
		cy.get(`[data-test="invoice-project-code-error"]`).should("not.exist");
		cy.get(`[data-test="invoice-item-value-error"]`).should("not.exist");
		cy.get(`[data-test="invoice-item-description-error"]`).should("not.exist");
		cy.get(`[data-test="invoice-value-error"]`).should("not.exist");
		cy.get(`[data-test="invoice-company-id-error"]`).should("not.exist");

		cy.get(`[data-test="invoice-date"]`).should("have.value", "");
		cy.get(`[data-test="invoice-due-date"]`).should("have.value", "");
		cy.get(`[data-test="invoice-number"]`).should("have.value", "");
		cy.get(`[data-test="invoice-project-code"]`).should("have.value", "");
		cy.get(`[data-test="invoice-item-value"]`).should("have.value", "");
		cy.get(`[data-test="invoice-item-description"]`).should("have.value", "");
		cy.get(`[data-test="invoice-company-id"]`).should("have.value", "");
		cy.get(`[data-test="invoice-value"]`).should("have.value", "0");
	});
});
