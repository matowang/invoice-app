import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Skeleton } from "@mui/material";
import TableRowError from "../components/TableRowError";

import { InvoiceDTO } from '../api/base';

interface InvoicesTableProps {
    invoices?: InvoiceDTO[];
    loading: boolean;
    errorMessage?: string;
}

const InvoicesTable = ({ invoices, loading, errorMessage }: InvoicesTableProps) => {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="invoice table">
                <TableHead>
                    <TableRow>
                        <TableCell component='th'>Invoice Number</TableCell>
                        <TableCell component='th' align="right">Client</TableCell>
                        <TableCell component='th' align="right">Due Date</TableCell>
                        <TableCell component='th' align="right">Value</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {loading ?
                        Array.from(Array(10)).map((e, i) => <TableRow key={i + 'inv-skel'}>
                            <TableCell><Skeleton /></TableCell>
                            <TableCell align="right"><Skeleton /></TableCell>
                            <TableCell align="right"><Skeleton /></TableCell>
                            <TableCell align="right"><Skeleton /></TableCell>
                        </TableRow>)
                        : invoices?.length === 0 ?
                            <TableRow>
                                <TableCell colSpan={4} className="text-center">No invoices to show.</TableCell>
                            </TableRow>
                            : invoices?.map(({ invoice, client }) => (
                                <TableRow
                                    key={invoice.id}
                                    sx={{}}
                                >
                                    <TableCell>{invoice.invoice_number}</TableCell>
                                    <TableCell align="right">{client.name}</TableCell>
                                    <TableCell align="right">{invoice.date}</TableCell>
                                    <TableCell align="right">{invoice.value}</TableCell>
                                </TableRow>
                            ))}
                    {errorMessage && <TableRowError colSpan={4} errorMessage={errorMessage} />}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default InvoicesTable;