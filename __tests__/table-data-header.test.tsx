import { render } from "@testing-library/react";
import DataTableHeader from "../src/components/DataTable/DataTableHeader";

describe("table row message", () => {
	it("renders sortable properly", () => {
		const { container } = render(
			<DataTableHeader
				field={{ isSortable: true, label: "Test", name: "test", "data-test": "test" }}
				sortOrder='asc'
			/>
		);
		expect(container).toMatchSnapshot();
	});
	it("renders non-sortable properly", () => {
		const { container } = render(
			<DataTableHeader
				field={{ isSortable: false, label: "Test", name: "test", "data-test": "test" }}
			/>
		);
		expect(container).toMatchSnapshot();
	});
});
