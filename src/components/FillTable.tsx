import { TableCell, TableRow } from "@mui/material";
import React, { ReactNode } from "react";

interface FillTableProps {
	rows: number;
	cols: number;
	children: ReactNode;
}

const FillTable = ({ rows, cols, children }: FillTableProps) => (
	<>
		{Array.from(Array(rows)).map((t, row) => (
			<TableRow key={`empty-row-${row}`}>
				{Array.from(Array(cols)).map((t, col) => (
					<TableCell key={`fill-table-${col}`}>{children}</TableCell>
				))}
			</TableRow>
		))}
	</>
);
export default FillTable;
