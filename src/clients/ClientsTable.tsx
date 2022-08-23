import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Skeleton } from "@mui/material";
import TableRowStatusMessage from "../components/TableRowStatusMessage";

import { ClientDTO } from '../api/base';

interface ClientsTableProps {
    clients?: ClientDTO[];
    loading: boolean;
    errorMessage?: string;
}

const ClientsTable = ({ clients, loading, errorMessage }: ClientsTableProps) => {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="client table">
                <TableHead>
                    <TableRow>
                        <TableCell component='th'>Client Name</TableCell>
                        <TableCell component='th' align="right">Email</TableCell>
                        <TableCell component='th' align="right">Company</TableCell>
                        <TableCell component='th' align="right">Total Billed</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {loading ?
                        Array.from(Array(10)).map((e, i) => <TableRow key={i + 'cli-skel'}>
                            <TableCell><Skeleton /></TableCell>
                            <TableCell align="right"><Skeleton /></TableCell>
                            <TableCell align="right"><Skeleton /></TableCell>
                            <TableCell align="right"><Skeleton /></TableCell>
                        </TableRow>)
                        : clients?.length === 0 ?
                            <TableRowStatusMessage colSpan={4} status='empty'>No Clients to Show.</TableRowStatusMessage>
                            : clients?.map((client) => (
                                <TableRow key={client.id}
                                >
                                    <TableCell component="th">
                                        {client.name}
                                    </TableCell>
                                    <TableCell align="right">{client.email}</TableCell>
                                    <TableCell align="right">{client.companyDetails.name}</TableCell>
                                    <TableCell align="right">{client.totalBilled}</TableCell>
                                </TableRow>
                            ))}
                    {errorMessage && <TableRowStatusMessage colSpan={4} status='error'>{errorMessage}</TableRowStatusMessage>}
                </TableBody>
            </Table>
        </TableContainer >
    )
}

export default ClientsTable;