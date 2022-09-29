import { TableCell } from "@mui/material";

import ArrowCircleUpOutlinedIcon from "@mui/icons-material/ArrowCircleUpOutlined";
import ArrowCircleDownOutlinedIcon from "@mui/icons-material/ArrowCircleDownOutlined";

import { SortOrder } from "../../api/base";
import { MouseEventHandler, ReactNode, useState } from "react";

export interface DataTableHeaderProps {
	onClick?: MouseEventHandler<HTMLTableCellElement>;
	sortOrder?: SortOrder;
	children: ReactNode;
	"data-test"?: string;
}

const DataTableHeader = ({
	"data-test": dataTest,
	children,
	onClick,
	sortOrder,
}: DataTableHeaderProps) => (
	<TableCell
		onClick={onClick}
		align='right'
		component='th'
		className='font-bold cursor-pointer group'
		data-test={dataTest}
	>
		<span className={`flex content-center relative justify-end group-first:justify-start`}>
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
				{children}
			</div>
		</span>
	</TableCell>
);

export default DataTableHeader;
