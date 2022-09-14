import {
	Table,
	TableCell,
	TableHead,
	TableProps,
	TableRow,
	TableBody,
	Pagination,
	Skeleton,
	Paper,
	TableContainer,
	TableRowProps,
} from "@mui/material";

import DataTableHeadController from "./DataTableHeadController";
import PaginationController from "./PaginationController";

//import LinearLoader from "./LinearLoader";
import FillTable from "./FillTable";
import TableRowStatusMessage from "./TableRowStatusMessage";

import ArrowCircleUpOutlinedIcon from "@mui/icons-material/ArrowCircleUpOutlined";
import ArrowCircleDownOutlinedIcon from "@mui/icons-material/ArrowCircleDownOutlined";

import { ReactNode } from "react";

export type DataTableField = { name: string; label: string };

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
							renderCell={({ field, onClick, sortOrder, index }) => (
								<TableCell
									onClick={onClick}
									align='right'
									component='th'
									className='font-bold cursor-pointer'
									key={field.name}
								>
									<span
										className={`flex content-center relative${index !== 0 ? " justify-end" : ""}`}
									>
										<div className='relative'>
											{sortOrder && (
												<div className='absolute left-0 -translate-x-full'>
													{sortOrder === "asc" ? (
														<ArrowCircleUpOutlinedIcon fontSize='small' />
													) : (
														<ArrowCircleDownOutlinedIcon fontSize='small' />
													)}
												</div>
											)}
											{field.label}
										</div>
									</span>
								</TableCell>
							)}
							disableRouting={disableRouting}
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
