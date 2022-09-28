import { TableCell, TableRow } from "@mui/material";
import React, { ReactNode } from "react";

interface FillTableProps {
	rows: number;
	cols: number;
	children: ReactNode;
	"data-test"?: string;
}

const FillTable = ({ rows, cols, children, "data-test": dataTest }: FillTableProps) => (
	<>
		{Array.from(Array(rows)).map((t, row) => (
			<TableRow key={`empty-row-${row}`} data-test={dataTest}>
				{Array.from(Array(cols)).map((t, col) => (
					<TableCell key={`fill-table-${col}`}>{children}</TableCell>
				))}
			</TableRow>
		))}
	</>
);
export default FillTable;
