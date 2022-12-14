import { Table, TableBody } from "@mui/material";
import { render } from "@testing-library/react";
import TableRowStatusMessage from "../src/components/TableRowStatusMessage";

describe("table row message", () => {
	it("renders empty properly", () => {
		const { container } = render(
			<Table>
				<TableBody>
					<TableRowStatusMessage colSpan={10} status='empty'>
						Status
					</TableRowStatusMessage>
				</TableBody>
			</Table>
		);
		expect(container).toMatchSnapshot();
	});
	it("renders error properly", () => {
		const { container } = render(
			<Table>
				<TableBody>
					<TableRowStatusMessage colSpan={3} status='error'>
						Status
					</TableRowStatusMessage>
				</TableBody>
			</Table>
		);
		expect(container).toMatchSnapshot();
	});
});
