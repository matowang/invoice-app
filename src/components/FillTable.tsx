import { TableCell, TableRow } from "@mui/material";
import React, { ReactElement, ReactNode } from "react";

interface FillTableProps {
	rows: number;
	cols: number;
	children: ReactNode;
}

const FillTable = ({ rows, cols, children }: FillTableProps) => (
	<>
		{Array.from(Array(rows)).map((t, i) => (
			<TableRow key={`empty-row-${i}`}>
				{Array.from(Array(cols)).map((t, i) => (
					<TableCell key={`fill-table-${i}`}>{children}</TableCell>
				))}
			</TableRow>
		))}
	</>
);
export default FillTable;
