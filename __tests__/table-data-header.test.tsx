import { Table, TableHead, TableRow } from "@mui/material";
import { render } from "@testing-library/react";
import DataTableHeader from "../src/components/DataTable/DataTableHeaderField";

describe("table row message", () => {
	it("renders sortable properly", () => {
		const { container } = render(
			<Table>
				<TableHead>
					<TableRow>
						<DataTableHeader data-test='test'>Matthew</DataTableHeader>
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
						<DataTableHeader sortOrder='asc' data-test='test'>
							Matthew
						</DataTableHeader>
					</TableRow>
				</TableHead>
			</Table>
		);
		expect(container).toMatchSnapshot();
	});
});
