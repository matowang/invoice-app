import { faker } from "@faker-js/faker";

describe("populate data", () => {
	it("reset", () => {
		cy.request(`http://localhost:3139/reset`);
	});

	it("populate", () => {
		cy.login({ email: "fake_user5@officehourtesting.com", password: "123456" });
		const clients = [];
		for (let i = 0; i < 22; i++) {
			clients.push({
				email: `${faker.internet.email()}`,
				name: `${faker.name.firstName()}`,
				companyDetails: {
					name: `${faker.company.companyName()}`,
					vatNumber: `${faker.datatype.number({ min: 100, max: 99999 })}`,
					regNumber: `${faker.datatype.number({ min: 100, max: 99999 })}`,
					iban: `${faker.datatype.number({ min: 100, max: 99999 })}`,
					swift: `${faker.datatype.number({ min: 100, max: 99999 })}`,
					address: `${faker.address.streetAddress(true)}`,
				},
			});
		}

		const invoices = [];
		for (let i = 0; i < 48; i++) {
			invoices.push({
				//user_id: "222",
				invoice_number: `${faker.datatype.number({ min: 1000, max: 9999 })}`,
				//client_id: clients[faker.datatype.number({ min: 0, max: clients.length - 1 })],
				date: `${faker.datatype.number({ min: 1650000000000, max: 1660000000000 })}`,
				dueDate: `${faker.datatype.number({ min: 1650000000000, max: 1660000000000 })}`,
				projectCode: faker.datatype.string(5),
				meta: {
					items: [
						...Array.from({ length: faker.datatype.number({ min: 1, max: 12 }) }, () => ({
							value: faker.datatype.number({ min: 1, max: 99999 }),
							description: faker.lorem.sentences(1),
						})),
					],
				},
				value: faker.datatype.number({ min: 10, max: 999999 }),
				createdAt: `${faker.datatype.number({ min: 1650000000000, max: 1660000000000 })}`,
				//id: "82401f60-cfe6-416c-af36-b707dcc9aa6f",
			});
		}

		cy.writeFile("cypress/fixtures/user-invoices.json", invoices);
		cy.writeFile("cypress/fixtures/user-clients.json", clients);

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
});
