import { Button, TableCell, TableRow } from "@mui/material";
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { ReactNode } from "react";

interface TableRowErrorProps {
    colSpan?: number;
    children?: ReactNode,
    status?: TableStatus;
}

type TableStatus = ('error' | 'empty' | 'default');

const TableStatusColor: Record<TableStatus, string> = {
    error: 'text-red-500',
    empty: 'text-neutral-500',
    default: 'text-neutral-700',
}

const TableStatusIcon: Record<TableStatus, ReactNode> = {
    error: <ErrorOutlineOutlinedIcon />,
    empty: <HelpOutlineOutlinedIcon />,
    default: <InfoOutlinedIcon />
}

const TableRowStatusMessage = ({ colSpan, children, status = 'default' }: TableRowErrorProps) => (
    <TableRow>
        <TableCell align="center" colSpan={colSpan} className={`${TableStatusColor[status]} py-32`}>
            <div className="flex items-center gap-2 justify-center">
                {TableStatusIcon[status]}<div>{children ?? "Something went wrong."}</div>
            </div>
        </TableCell>
    </TableRow>
);
export default TableRowStatusMessage;