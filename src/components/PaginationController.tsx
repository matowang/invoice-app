import {
	Pagination,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from "@mui/material";
import { useRouter } from "next/router";
import { ChangeEvent, ReactNode } from "react";

interface TableHeaderProps {
	children: ReactNode;
	pageLimit: number;
	headFields: { name: string; label: string }[];
}

const DataTableHead = ({ children, pageLimit = 10, headFields }: TableHeaderProps) => {
	const router = useRouter();

	const handlePageChange = (event: ChangeEvent<unknown>, page: number) => {
		router.push({
			pathname: router.pathname,
			query: { ...router.query, page: page },
		});
	};

	return (
		<TableHead>
			<TableRow>
				{headFields.map((field, i) => (
					<TableCell component='th' className='font-bold' key={`field-${field.name}-${i}`}>
						TableHeader
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	);
};
export default DataTableHead;
