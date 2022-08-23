import { TableCell, TableRow } from "@mui/material";
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';

interface TableRowErrorProps {
    colSpan?: number;
    errorMessage?: string
}

const TableRowError = ({ colSpan, errorMessage }: TableRowErrorProps) => (
    <TableRow>
        <TableCell align="center" colSpan={colSpan} className="text-red-500 py-32">
            <div className="flex items-center gap-2 justify-center">
                <ErrorOutlineOutlinedIcon />{errorMessage ?? "Something went wrong."}
            </div>
        </TableCell>
    </TableRow>
);
export default TableRowError;