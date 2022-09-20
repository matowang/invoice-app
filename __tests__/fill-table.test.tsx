import { Table, TableBody } from "@mui/material";
import { render } from "@testing-library/react";
import FillTable from "../src/components/FillTable";

describe("table row message", () => {
	it("renders fill properly", () => {
		const { container } = render(
			<Table>
				<TableBody>
					<FillTable cols={10} rows={20}>
						Fill
					</FillTable>
				</TableBody>
			</Table>
		);
		expect(container).toMatchSnapshot();
	});
	it("renders . properly", () => {
		const { container } = render(
			<Table>
				<TableBody>
					<FillTable cols={100} rows={200}>
						.
					</FillTable>
				</TableBody>
			</Table>
		);
		expect(container).toMatchSnapshot();
	});
});
