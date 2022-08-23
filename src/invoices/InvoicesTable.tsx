import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Skeleton } from "@mui/material";
import TableRowStatusMessage from "../components/TableRowStatusMessage";

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
                        <TableCell component='th' className="font-bold">Invoice Number</TableCell>
                        <TableCell component='th' align="right" className="font-bold">Client</TableCell>
                        <TableCell component='th' align="right" className="font-bold">Due Date</TableCell>
                        <TableCell component='th' align="right" className="font-bold">Value</TableCell>
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
                            <TableRowStatusMessage colSpan={4} status='empty'>No Invoices to show</TableRowStatusMessage>
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
                    {errorMessage && <TableRowStatusMessage colSpan={4} status='error'>{errorMessage}</TableRowStatusMessage>}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default InvoicesTable;