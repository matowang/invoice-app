import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { render } from "@testing-library/react";
import InvoiceForm from "../src/invoices/InvoiceForm";

const values = {
	invoice_number: "12eeqe",
	clientCompany: {
		id: "1644482524339",
		companyName: "Skynet 2",
	},
	date: 1662048000000,
	dueDate: 1662134400000,
	projectCode: "Project Water",
	meta: {
		items: [
			{
				description: "Water Plants",
				value: 800,
			},
		],
	},
	value: 800,
};

const companyNames = [
	{
		id: "1644482450322",
		companyName: "Apple",
	},
	{
		id: "1644482524339",
		companyName: "Skynet 2",
	},
	{
		id: "1644482579284",
		companyName: "Wonderland",
	},
	{
		id: "a16642d8-609e-4a4d-9712-21044e02c62f",
		companyName: "RUST",
	},
	{
		id: "f865babc-88ad-4259-805d-f93b6e69cb5d",
		companyName: "GRAP",
	},
	{
		id: "74cce102-4fc5-4196-8a34-7628ce0be320",
		companyName: "VOSA",
	},
];

describe("invoice form", () => {
	it("renders empty properly", () => {
		const { container } = render(
			<LocalizationProvider dateAdapter={AdapterDayjs}>
				<InvoiceForm clientsCompanyNames={[]} />
			</LocalizationProvider>
		);
		expect(container).toMatchSnapshot();
	});

	it("renders happy properly", () => {
		const { container } = render(
			<LocalizationProvider dateAdapter={AdapterDayjs}>
				<InvoiceForm defaultValues={values} clientsCompanyNames={companyNames} />
			</LocalizationProvider>
		);
		expect(container).toMatchSnapshot();
	});

	it("renders disabled properly", () => {
		const { container } = render(
			<LocalizationProvider dateAdapter={AdapterDayjs}>
				<InvoiceForm
					defaultValues={values}
					clientsCompanyNames={companyNames}
					disabled
					formError={"Something wrong"}
				/>
			</LocalizationProvider>
		);
		expect(container).toMatchSnapshot();
	});
	it("renders isLoadingClientsCompanyNames properly", () => {
		const { container } = render(
			<LocalizationProvider dateAdapter={AdapterDayjs}>
				<InvoiceForm
					clientsCompanyNames={[]}
					isLoadingClientsCompanyNames
					formError={"Something wrong"}
				/>
			</LocalizationProvider>
		);
		expect(container).toMatchSnapshot();
	});
});
