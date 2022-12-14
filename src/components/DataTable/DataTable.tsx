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

import DataTableHeader from "./DataTableHeaderField";

import FillTable from "../FillTable";
import TableRowStatusMessage from "../TableRowStatusMessage";

import { ReactNode } from "react";
import { SortOrder } from "../../api/base";

export interface DataTableField {
	name: string;
	label: string;
	isSortable: boolean;
	"data-test"?: string;
}

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
	fields: DataTableField[];
	sortBy?: string;
	sortOrder?: SortOrder;
	disableRouting?: boolean;
	totalPages?: number;
	pageLimit?: number;
	rowProps: (data: TData) => RowProps;
	rowDataTransform: (data: TData) => Cell[];
	renderRowActions?: (data: TData) => ReactNode;
	renderHeader?: () => ReactNode;
	onClickField?: (field: DataTableField) => void;
	onChangePage?: (page: number) => void;
	page: number;
}

const DataTable = <TData extends unknown>({
	rowsData,
	tableProps,
	isLoading,
	isFetching,
	isError,
	errorMsg,
	fields,
	sortBy,
	sortOrder,
	disableRouting,
	totalPages,
	pageLimit = 10,
	rowProps,
	rowDataTransform,
	renderRowActions,
	renderHeader,
	onClickField,
	onChangePage,
	page,
}: DataTableProps<TData>) => {
	const cols = renderRowActions ? fields.length + 1 : fields.length;
	return (
		<TableContainer component={Paper}>
			{renderHeader && renderHeader()}
			<Table {...tableProps}>
				<TableHead>
					<TableRow>
						{fields.map((field) => (
							<DataTableHeader
								onClick={() => field.isSortable && onClickField?.(field)}
								sortOrder={field.isSortable && field.name === sortBy ? sortOrder : undefined}
								key={field.name}
								data-test={field["data-test"]}
							>
								{field.label}
							</DataTableHeader>
						))}
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
					) : totalPages && totalPages > 1 && onChangePage ? (
						<Pagination
							renderItem={(item) => <PaginationItem {...item} data-test={`page-${item.page}`} />}
							count={totalPages}
							page={page}
							onChange={(e, page) => onChangePage(page)}
						/>
					) : undefined}
				</div>
			)}
		</TableContainer>
	);
};

export default DataTable;
