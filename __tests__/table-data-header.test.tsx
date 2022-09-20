import { Table, TableHead, TableRow } from "@mui/material";
import { render } from "@testing-library/react";
import DataTableHeader from "../src/components/DataTable/DataTableHeader";

describe("table row message", () => {
	it("renders sortable properly", () => {
		const { container } = render(
			<Table>
				<TableHead>
					<TableRow>
						<DataTableHeader
							field={{ isSortable: true, label: "Test", name: "test", "data-test": "test" }}
							sortOrder='asc'
						/>
					</TableRow>
				</TableHead>
			</Table>
		);
		expect(container).toMatchSnapshot();
	});
	it("renders non-sortable properly", () => {
		const { container } = render(
			<Table>
				<TableHead>
					<TableRow>
						<DataTableHeader
							field={{ isSortable: false, label: "Test", name: "test", "data-test": "test" }}
						/>
					</TableRow>
				</TableHead>
			</Table>
		);
		expect(container).toMatchSnapshot();
	});
});
