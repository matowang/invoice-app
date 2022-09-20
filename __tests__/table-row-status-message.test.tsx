import { render } from "@testing-library/react";
import TableRowStatusMessage from "../src/components/TableRowStatusMessage";

describe("table row message", () => {
	it("renders normal properly", () => {
		const { container } = render(<TableRowStatusMessage colSpan={5}>Status</TableRowStatusMessage>);
		expect(container).toMatchSnapshot();
	});
	it("renders empty properly", () => {
		const { container } = render(
			<TableRowStatusMessage colSpan={10} status='empty'>
				Status
			</TableRowStatusMessage>
		);
		expect(container).toMatchSnapshot();
	});
	it("renders error properly", () => {
		const { container } = render(
			<TableRowStatusMessage colSpan={3} status='error'>
				Status
			</TableRowStatusMessage>
		);
		expect(container).toMatchSnapshot();
	});
});
