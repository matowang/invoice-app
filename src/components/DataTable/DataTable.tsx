import {
	Table,
	TableHead,
	TableProps,
	TableRow,
	TableBody,
	Pagination,
	Skeleton,
	Paper,
	TableContainer,
} from "@mui/material";

import DataTableHeadController from "./DataTableHeadController";
import PaginationController from "./PaginationController";
import DataTableHeader from "./DataTableHeader";

import FillTable from "../FillTable";
import TableRowStatusMessage from "../TableRowStatusMessage";

import { ReactNode } from "react";

export type DataTableField = { name: string; label: string; isSortable: boolean };

interface DataTableProps<TData> {
	rowsData?: TData[];
	children: (rowItem: TData) => ReactNode;
	isLoading: boolean;
	isFetching?: boolean;
	isError: boolean;
	errorMsg: ReactNode;
	tableProps?: TableProps<React.ElementType>;
	fields: (DataTableField | null)[]; // null represents placeholder fields
	disableRouting?: boolean;
	totalPages?: number;
	pageLimit?: number;
}

const DataTable = <TData extends unknown>({
	rowsData,
	children,
	tableProps,
	isLoading,
	isFetching,
	isError,
	errorMsg,
	fields,
	disableRouting,
	totalPages,
	pageLimit = 10,
}: DataTableProps<TData>) => {
	return (
		<TableContainer component={Paper}>
			<Table {...tableProps}>
				<TableHead>
					<TableRow>
						<DataTableHeadController
							headFields={fields}
							disableRouting={disableRouting}
							renderCell={({ field, onClick, sortOrder, index }) => (
								<DataTableHeader
									field={field}
									onClick={onClick}
									sortOrder={sortOrder}
									index={index}
								/>
							)}
						/>
					</TableRow>
				</TableHead>
				<TableBody>
					{isError ? (
						<TableRowStatusMessage colSpan={5} status='error'>
							{errorMsg}
						</TableRowStatusMessage>
					) : isLoading ? (
						<FillTable
							data-test='loading-overlay'
							rows={pageLimit - (rowsData?.length || 0)}
							cols={fields.length}
						>
							<Skeleton />
						</FillTable>
					) : rowsData && rowsData.length > 0 ? (
						<>
							{rowsData.map((item) => children(item))}
							<FillTable rows={pageLimit - (rowsData.length || 0)} cols={fields.length}>
								.
							</FillTable>
						</>
					) : (
						<TableRowStatusMessage colSpan={fields.length} status='empty'>
							<span data-test='empty-placeholder'>No Clients to Show.</span>
						</TableRowStatusMessage>
					)}
				</TableBody>
			</Table>
			{!disableRouting && (
				<div className='flex justify-center m-2'>
					{isLoading ? (
						<div className='flex gap-2'>
							<Skeleton variant='circular' height={30} width={30} />
							<Skeleton variant='circular' height={30} width={30} />
							<Skeleton variant='circular' height={30} width={30} />
						</div>
					) : (
						<PaginationController totalPages={totalPages}>
							{({ handlePageChange, page, totalPages }) => (
								<Pagination
									count={totalPages}
									page={page}
									onChange={(e, page) => handlePageChange(page)}
								/>
							)}
						</PaginationController>
					)}
				</div>
			)}
		</TableContainer>
	);
};

export default DataTable;
