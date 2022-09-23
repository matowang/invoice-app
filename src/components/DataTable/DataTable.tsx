import {
	Table,
	TableHead,
	TableProps,
	TableRow,
	TableBody,
	Pagination,
	PaginationItem,
	Skeleton,
	Paper,
	TableContainer,
	TableCell,
} from "@mui/material";

import DataTableHeadController from "./DataTableHeadController";
import PaginationController from "./PaginationController";
import DataTableHeader from "./DataTableHeader";

import FillTable from "../FillTable";
import TableRowStatusMessage from "../TableRowStatusMessage";

import { ReactNode } from "react";

export type DataTableField = {
	name: string;
	label: string;
	isSortable: boolean;
	"data-test"?: string;
};

export type Row = {
	label: ReactNode;
	"data-test"?: string;
};

export type Cell = {
	label: ReactNode;
	"data-test"?: string;
};

interface RowProps {
	onClick?: () => void;
	"data-test"?: string;
}

interface DataTableProps<TData> {
	rowsData?: TData[];
	isLoading: boolean;
	isFetching?: boolean;
	isError: boolean;
	errorMsg: ReactNode;
	tableProps?: TableProps<React.ElementType>;
	fields: DataTableField[]; // null represents placeholder fields
	disableRouting?: boolean;
	totalPages?: number;
	pageLimit?: number;
	rowProps: (data: TData) => RowProps;
	rowDataTransform: (data: TData) => Cell[];
	renderRowActions?: (data: TData) => ReactNode;
}

const DataTable = <TData extends unknown>({
	rowsData,
	tableProps,
	isLoading,
	isFetching,
	isError,
	errorMsg,
	fields,
	disableRouting,
	totalPages,
	pageLimit = 10,
	rowProps,
	rowDataTransform,
	renderRowActions,
}: DataTableProps<TData>) => {
	const cols = renderRowActions ? fields.length + 1 : fields.length;
	return (
		<TableContainer component={Paper}>
			<Table {...tableProps}>
				<TableHead>
					<TableRow>
						<DataTableHeadController
							headFields={fields}
							disableRouting={disableRouting}
							renderCell={({ field, onClick, sortOrder }) => (
								<DataTableHeader
									field={field}
									onClick={onClick}
									sortOrder={sortOrder}
									key={field.name}
								/>
							)}
						/>
						{renderRowActions && <TableCell />}
					</TableRow>
				</TableHead>
				<TableBody>
					{isError ? (
						<TableRowStatusMessage colSpan={cols} status='error'>
							{errorMsg}
						</TableRowStatusMessage>
					) : isLoading ? (
						<FillTable
							data-test='loading-overlay'
							rows={pageLimit - (rowsData?.length || 0)}
							cols={cols}
						>
							<Skeleton />
						</FillTable>
					) : rowsData && rowsData.length > 0 ? (
						<>
							{rowsData.map((item, i) => (
								<TableRow hover key={i} {...rowProps(item)}>
									{rowDataTransform(item).map((cell, i) => (
										<TableCell align={i ? "right" : "left"} key={i}>
											<span data-test={cell["data-test"]}>{cell.label}</span>
										</TableCell>
									))}
									{renderRowActions && (
										<TableCell sx={{ p: 0 }} align='right'>
											{renderRowActions(item)}
										</TableCell>
									)}
								</TableRow>
							))}
							<FillTable rows={pageLimit - (rowsData.length || 0)} cols={cols}>
								.
							</FillTable>
						</>
					) : (
						<TableRowStatusMessage colSpan={cols} status='empty'>
							<span data-test='empty-placeholder'>No data to show.</span>
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
					) : totalPages && totalPages > 1 ? (
						<PaginationController totalPages={totalPages}>
							{({ handlePageChange, page, totalPages }) => (
								<Pagination
									renderItem={(item) => (
										<PaginationItem {...item} date-test={`page-${item.page}`} />
									)}
									count={totalPages}
									page={page}
									onChange={(e, page) => handlePageChange(page)}
								/>
							)}
						</PaginationController>
					) : undefined}
				</div>
			)}
		</TableContainer>
	);
};

export default DataTable;
