import { TableCell } from "@mui/material";

import ArrowCircleUpOutlinedIcon from "@mui/icons-material/ArrowCircleUpOutlined";
import ArrowCircleDownOutlinedIcon from "@mui/icons-material/ArrowCircleDownOutlined";

import { DataTableField } from "./DataTable";
import { SortOrder } from "../../api/base";
import { MouseEventHandler } from "react";

export interface DataTableHeaderProps {
	onClick?: MouseEventHandler<HTMLTableCellElement>;
	field: DataTableField;
	sortOrder?: SortOrder;
}

const DataTableHeader = ({ field, onClick, sortOrder }: DataTableHeaderProps) => (
	<TableCell
		onClick={onClick}
		align='right'
		component='th'
		className='font-bold cursor-pointer group'
		data-test={field["data-test"]}
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
				{field.label}
			</div>
		</span>
	</TableCell>
);

export default DataTableHeader;
