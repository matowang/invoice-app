const dayjs = require("dayjs");

describe("/invoices", () => {
	it("reset", () => {
		cy.request(`http://localhost:3139/reset`);
	});

	it("has all fields", () => {
		cy.login({ email: "fake_user5@officehourtesting.com", password: "123456" });
		cy.visit("/invoices");

		cy.get('[data-test="invoices-table"]').should("be.visible");
		//cells
		cy.get('[data-test="invoice-number"]').should("be.visible");
		cy.get('[data-test="invoice-company"]').should("be.visible");
		cy.get('[data-test="invoice-date"]').should("be.visible");
		cy.get('[data-test="invoice-project"]');
		cy.get('[data-test="invoice-price"]').should("be.visible");
		cy.get('[data-test="invoice-actions"]').should("be.visible");

		//fields
		cy.get(`[data-test="due-date-header"]`).should("be.visible");
		cy.get(`[data-test="creation-date-header"]`).should("be.visible");
		cy.get(`[data-test="company-name-header"]`).should("be.visible");
		cy.get(`[data-test="total-header"]`).should("be.visible");

		//has 10 rows
		cy.get(`[data-test^=invoice-row]`).should("have.length", 10);
	});

	it("can't access while not logged in", () => {
		cy.visit("/invoices");

		//fields
		cy.get(`[data-test="due-date-header"]`).should("not.exist");
		cy.get(`[data-test="creation-date-header"]`).should("not.exist");
		cy.get(`[data-test="company-name-header"]`).should("not.exist");
		cy.get(`[data-test="total-header"]`).should("not.exist");

		cy.get('[data-test="invoices-table"]').should("not.exist");

		//cells
		cy.get('[data-test="invoice-number"]').should("not.exist");
		cy.get('[data-test="invoice-company"]').should("not.exist");
		cy.get('[data-test="invoice-date"]').should("not.exist");
		cy.get('[data-test="invoice-project"]').should("not.exist");
		cy.get('[data-test="invoice-price"]').should("not.exist");
		cy.get('[data-test="invoice-actions"]').should("not.exist");

		//has 10 rows
		cy.get(`[data-test^=invoice-row]`).should("have.length", 0);

		cy.location("pathname").should("eq", "/login");
	});

	it("show error when no internet", () => {
		cy.login({ email: "fake_user5@officehourtesting.com", password: "123456" });
		cy.intercept(
			{
				method: "GET",
				url: "http://localhost:3139/invoices*",
			},
			(req) => {
				req.destroy();
			}
		);
		cy.visit("/invoices");

		cy.get(`[data-test="invoices-fetch-error"]`, { timeout: 10000 }).should("be.visible");
	});
	it("show empty message when no items", () => {
		cy.login({ email: "fake_user5@officehourtesting.com", password: "123456" });
		cy.intercept(
			{
				method: "GET",
				url: "http://localhost:3139/invoices*",
			},
			{
				statusCode: 201,
				body: {
					invoices: [],
				},
			}
		);
		cy.visit("/invoices");

		cy.get(`[data-test="empty-placeholder"]`).should("be.visible");
	});

	it("has all row cells", () => {
		cy.login({ email: "fake_user5@officehourtesting.com", password: "123456" });
		cy.visit("/invoices");

		let token;

		let invoices;

		cy.getCookie("token").then((c) => {
			// save cookie until we need it
			token = c.value;
			cy.request({
				url: `http://localhost:3139/invoices`,
				headers: { "x-access-token": token },
				// auth: {
				// 	Bearer: token,
				// },
			}).then((res) => {
				invoices = res.body.invoices;
			});
		});

		cy.wrap(new Array({ length: 10 })).each((e, i) => {
			cy.get(`[data-test="invoice-row-${invoices[i].invoice.id}"]`)
				.get(`[data-test="invoice-number"]`)
				.should("exist");
			cy.get(`[data-test="invoice-row-${invoices[i].invoice.id}"]`)
				.get(`[data-test="invoice-company"]`)
				.should("exist");
			cy.get(`[data-test="invoice-row-${invoices[i].invoice.id}"]`)
				.get(`[data-test="invoice-date"]`)
				.should("exist");
			cy.get(`[data-test="invoice-row-${invoices[i].invoice.id}"]`)
				.get(`[data-test="invoice-project"]`)
				.should("exist");
			cy.get(`[data-test="invoice-row-${invoices[i].invoice.id}"]`)
				.get(`[data-test="invoice-price"]`)
				.should("exist");
			cy.get(`[data-test="invoice-row-${invoices[i].invoice.id}"]`)
				.get(`[data-test="invoice-actions"]`)
				.should("exist");
		});

		cy.visit("/invoices?page=2");

		cy.wrap(new Array({ length: 10 })).each((e, i) => {
			i += 10;
			cy.get(`[data-test="invoice-row-${invoices[i].invoice.id}"]`)
				.get(`[data-test="invoice-number"]`)
				.should("exist");
			cy.get(`[data-test="invoice-row-${invoices[i].invoice.id}"]`)
				.get(`[data-test="invoice-company"]`)
				.should("exist");
			cy.get(`[data-test="invoice-row-${invoices[i].invoice.id}"]`)
				.get(`[data-test="invoice-date"]`)
				.should("exist");
			cy.get(`[data-test="invoice-row-${invoices[i].invoice.id}"]`)
				.get(`[data-test="invoice-project"]`)
				.should("exist");
			cy.get(`[data-test="invoice-row-${invoices[i].invoice.id}"]`)
				.get(`[data-test="invoice-price"]`)
				.should("exist");
			cy.get(`[data-test="invoice-row-${invoices[i].invoice.id}"]`)
				.get(`[data-test="invoice-actions"]`)
				.should("exist");
		});
	});

	it("headers can work and refresh queries", () => {
		cy.login({ email: "fake_user5@officehourtesting.com", password: "123456" });
		cy.visit("/invoices");
		cy.get(`[data-test="due-date-header"]`).click();
		cy.url().should("include", "sortBy=dueDate");
		cy.url().should("include", "sortOrder=asc");
		cy.reload();
		cy.url().should("include", "sortBy=dueDate");
		cy.url().should("include", "sortOrder=asc");
		cy.get(`[data-test="due-date-header"]`).click();
		cy.url().should("include", "sortBy=dueDate");
		cy.url().should("include", "sortOrder=desc");
		cy.reload();
		cy.url().should("include", "sortBy=dueDate");
		cy.url().should("include", "sortOrder=desc");
		cy.get(`[data-test="due-date-header"]`).click();
		cy.url().should("not.include", "sortBy");
		cy.url().should("not.include", "sortOrder");

		cy.get(`[data-test="creation-date-header"]`).click();
		cy.url().should("include", "sortBy=creationDate");
		cy.url().should("include", "sortOrder=asc");
		cy.reload();
		cy.url().should("include", "sortBy=creationDate");
		cy.url().should("include", "sortOrder=asc");
		cy.get(`[data-test="creation-date-header"]`).click();
		cy.url().should("include", "sortBy=creationDate");
		cy.url().should("include", "sortOrder=desc");
		cy.reload();
		cy.url().should("include", "sortBy=creationDate");
		cy.url().should("include", "sortOrder=desc");
		cy.get(`[data-test="creation-date-header"]`).click();
		cy.url().should("not.include", "sortBy");
		cy.url().should("not.include", "sortOrder");

		cy.get(`[data-test="company-name-header"]`).click();
		cy.url().should("include", "sortBy=companyName");
		cy.url().should("include", "sortOrder=asc");
		cy.reload();
		cy.url().should("include", "sortBy=companyName");
		cy.url().should("include", "sortOrder=asc");
		cy.get(`[data-test="company-name-header"]`).click();
		cy.url().should("include", "sortBy=companyName");
		cy.url().should("include", "sortOrder=desc");
		cy.reload();
		cy.url().should("include", "sortBy=companyName");
		cy.url().should("include", "sortOrder=desc");
		cy.get(`[data-test="company-name-header"]`).click();
		cy.url().should("not.include", "sortBy");
		cy.url().should("not.include", "sortOrder");

		cy.get(`[data-test="total-header"]`).click();
		cy.url().should("include", "sortBy=total");
		cy.url().should("include", "sortOrder=asc");
		cy.reload();
		cy.url().should("include", "sortBy=total");
		cy.url().should("include", "sortOrder=asc");
		cy.get(`[data-test="total-header"]`).click();
		cy.url().should("include", "sortBy=total");
		cy.url().should("include", "sortOrder=desc");
		cy.reload();
		cy.url().should("include", "sortBy=total");
		cy.url().should("include", "sortOrder=desc");
		cy.get(`[data-test="total-header"]`).click();
		cy.url().should("not.include", "sortBy");
		cy.url().should("not.include", "sortOrder");
	});

	it("query params sorting", () => {
		cy.login({ email: "fake_user5@officehourtesting.com", password: "123456" });
		cy.visit("/invoices");

		let token;

		cy.getCookie("token").then((c) => {
			// save cookie until we need it
			token = c.value;
			cy.request({
				url: `http://localhost:3139/invoices?limit=10&sortBy=price&sort=asc`,
				headers: { "x-access-token": token },
			}).then((res) => {
				const invoices = res.body.invoices;

				cy.get(`[data-test="total-header"]`).click();

				cy.url().should("include", "sortBy=total");
				cy.url().should("include", "sortOrder=asc");

				cy.get(`[data-test="invoices-table"]`)
					.get(`[data-test^=invoice-row]`)
					.each((e, i) => {
						console.log(invoices);
						cy.wrap(e)
							.find(`[data-test="invoice-number"]`)
							.contains(`${invoices[i].invoice.invoice_number}`)
							.should("be.visible");
						cy.wrap(e)
							.find(`[data-test="invoice-company"]`)
							.contains(`${invoices[i].client.companyDetails.name}`)
							.should("be.visible");
						cy.wrap(e)
							.find(`[data-test="invoice-date"]`)
							.then((e) => dayjs(e.text()).format("DD/MM/YYYY"))
							.should("eq", `${dayjs(invoices[i].invoice.date).format("DD/MM/YYYY")}`);
						cy.wrap(e)
							.find(`[data-test="invoice-due-date"]`)
							.then((e) => dayjs(e.text()).format("DD/MM/YYYY"))
							.should("eq", `${dayjs(invoices[i].invoice.dueDate).format("DD/MM/YYYY")}`);
						if (invoices[i].invoice.projectCode)
							cy.wrap(e)
								.find(`[data-test="invoice-project"]`)
								.contains(`${invoices[i].invoice.projectCode}`)
								.should("be.visible");
						cy.wrap(e)
							.find(`[data-test="invoice-price"]`)
							.contains(`${invoices[i].invoice.value}`)
							.should("be.visible");
					});

				cy.reload();

				cy.get(`[data-test="invoices-table"]`)
					.get(`[data-test^=invoice-row]`)
					.each((e, i) => {
						cy.wrap(e)
							.find(`[data-test="invoice-number"]`)
							.contains(`${invoices[i].invoice.invoice_number}`)
							.should("be.visible");

						/**
						 * USES TOO MUCH MEMORY SO COMMENTED OUT
						 */

						// cy.wrap(e)
						// 	.find(`[data-test="invoice-company"]`)
						// 	.contains(`${invoices[i].client.companyDetails.name}`)
						// 	.should("be.visible");
						// cy.wrap(e)
						// 	.find(`[data-test="invoice-date"]`)
						// 	.then((e) => dayjs(e.text()).format("DD/MM/YYYY"))
						// 	.should("eq", `${dayjs(invoices[i].invoice.date).format("DD/MM/YYYY")}`);
						// cy.wrap(e)
						// 	.find(`[data-test="invoice-due-date"]`)
						// 	.then((e) => dayjs(e.text()).format("DD/MM/YYYY"))
						// 	.should("eq", `${dayjs(invoices[i].invoice.dueDate).format("DD/MM/YYYY")}`);
						// if (invoices[i].invoice.projectCode)
						// 	cy.wrap(e)
						// 		.find(`[data-test="invoice-project"]`)
						// 		.contains(`${sortByTotal[i].invoice.projectCode}`)
						// 		.should("be.visible");
						// cy.wrap(e)
						// 	.find(`[data-test="invoice-price"]`)
						// 	.contains(`${invoices[i].invoice.value}`)
						// 	.should("be.visible");
					});

				//Total desc
				cy.request({
					url: `http://localhost:3139/invoices?limit=10&sortBy=price&sort=desc`,
					headers: { "x-access-token": token },
				}).then((res) => {
					const invoices = res.body.invoices;
					cy.get(`[data-test="total-header"]`).click();

					cy.url().should("include", "sortBy=total");
					cy.url().should("include", "sortOrder=desc");

					cy.get(`[data-test="invoices-table"]`)
						.get(`[data-test^=invoice-row]`)
						.each((e, i) => {
							cy.wrap(e)
								.find(`[data-test="invoice-number"]`)
								.contains(`${invoices[i].invoice.invoice_number}`)
								.should("be.visible");
							// cy.wrap(e)
							// 	.find(`[data-test="invoice-company"]`)
							// 	.contains(`${invoices[i].client.companyDetails.name}`)
							// 	.should("be.visible");
							// cy.wrap(e)
							// 	.find(`[data-test="invoice-date"]`)
							// 	.then((e) => dayjs(e.text()).format("DD/MM/YYYY"))
							// 	.should("eq", `${dayjs(invoices[i].invoice.date).format("DD/MM/YYYY")}`);
							// cy.wrap(e)
							// 	.find(`[data-test="invoice-due-date"]`)
							// 	.then((e) => dayjs(e.text()).format("DD/MM/YYYY"))
							// 	.should("eq", `${dayjs(invoices[i].invoice.dueDate).format("DD/MM/YYYY")}`);
							// if (invoices[i].invoice.projectCode)
							// 	cy.wrap(e)
							// 		.find(`[data-test="invoice-project"]`)
							// 		.contains(`${invoices[i].invoice.projectCode}`)
							// 		.should("be.visible");
							// cy.wrap(e)
							// 	.find(`[data-test="invoice-price"]`)
							// 	.contains(`${invoices[i].invoice.value}`)
							// 	.should("be.visible");
						});
				});
				//Not more sorting
				cy.request({
					url: `http://localhost:3139/invoices`,
					headers: { "x-access-token": token },
				}).then((res) => {
					const invoices = res.body.invoices;
					cy.get(`[data-test="total-header"]`).click();

					cy.url().should("not.include", "sortBy");
					cy.url().should("not.include", "sortOrder");

					cy.get(`[data-test="invoices-table"]`)
						.get(`[data-test^=invoice-row]`)
						.each((e, i) => {
							cy.wrap(e)
								.find(`[data-test="invoice-number"]`)
								.contains(`${invoices[i].invoice.invoice_number}`)
								.should("be.visible");
							// cy.wrap(e)
							// 	.find(`[data-test="invoice-company"]`)
							// 	.contains(`${invoices[i].client.companyDetails.name}`)
							// 	.should("be.visible");
							// cy.wrap(e)
							// 	.find(`[data-test="invoice-date"]`)
							// 	.then((e) => dayjs(e.text()).format("DD/MM/YYYY"))
							// 	.should("eq", `${dayjs(invoices[i].invoice.date).format("DD/MM/YYYY")}`);
							// cy.wrap(e)
							// 	.find(`[data-test="invoice-due-date"]`)
							// 	.then((e) => dayjs(e.text()).format("DD/MM/YYYY"))
							// 	.should("eq", `${dayjs(invoices[i].invoice.dueDate).format("DD/MM/YYYY")}`);
							// if (invoices[i].invoice.projectCode)
							// 	cy.wrap(e)
							// 		.find(`[data-test="invoice-project"]`)
							// 		.contains(`${invoices[i].invoice.projectCode}`)
							// 		.should("be.visible");
							// cy.wrap(e)
							// 	.find(`[data-test="invoice-price"]`)
							// 	.contains(`${invoices[i].invoice.value}`)
							// 	.should("be.visible");
						});
				});
			});
		});

		it("can use actions", () => {
			cy.login({ email: EXISTING_USER_EMAIL, password: EXISTING_USER_PASSWORD });

			cy.get(`[data-test*="invoice-row"]:first`).click();
			cy.get(`[data-test="submit-invoice"]`).should("be.visible");

			cy.visit("/invoices");
			cy.get(`[data-test="invoice-actions"]:first`).click();
			cy.get(`[data-test="edit-invoice"]`).click();
			cy.get(`[data-test="submit-invoice"]`).should("be.visible");

			cy.get(`[data-test="invoice-actions"]:first`).click();
			cy.get(`[data-test="print-invoice"]`).click();
			cy.location("pathname").should("eq", "/invoices/*/view");
		});

		// {
		// 	id: string;
		// 	user_id: string;
		// 	date: number;
		// 	dueDate: number;
		// 	invoice_number: string;
		// 	client_id: string;
		// 	projectCode?: string;
		// 	meta?: Record<string, any>;
		// 	value: number;
		// };

		// “total” for sorting by price
		// “dueDate” for sorting by the due date
		// “creationDate” for sorting by the date of creation
		// “companyName” for sorting by the companyName
	});
});
