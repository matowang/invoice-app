import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Skeleton, IconButton, Menu, MenuItem } from "@mui/material";
import TableRowStatusMessage from "../components/TableRowStatusMessage";
import Link from 'next/link';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { InvoiceDTO } from '../api/base';
import { useMenuOpen } from "../hooks/useMenuOpen";
import { useState } from "react";

interface InvoicesTableProps {
    invoices?: InvoiceDTO[];
    loading: boolean;
    errorMessage?: string;
}

const InvoicesTable = ({ invoices, loading, errorMessage }: InvoicesTableProps) => {
    const { menuOpen, menuAnchorEl, handleMenuClick, handleMenuClose } = useMenuOpen();
    const [currentMenuID, setCurrentMenuID] = useState<string | null>(null);
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="invoice table">
                <TableHead>
                    <TableRow>
                        <TableCell component='th' className="font-bold">Invoice Number</TableCell>
                        <TableCell component='th' align="right" className="font-bold">Client</TableCell>
                        <TableCell component='th' align="right" className="font-bold">Due Date</TableCell>
                        <TableCell component='th' align="right" className="font-bold">Value</TableCell>
                        <TableCell component='th' align="right" className="font-bold"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {loading ?
                        Array.from(Array(10)).map((e, i) => <TableRow key={i + 'inv-skel'}>
                            <TableCell><Skeleton /></TableCell>
                            <TableCell align="right"><Skeleton /></TableCell>
                            <TableCell align="right"><Skeleton /></TableCell>
                            <TableCell align="right"><Skeleton /></TableCell>
                            <TableCell align="right"><Skeleton /></TableCell>
                        </TableRow>)
                        : invoices?.length === 0 ?
                            <TableRowStatusMessage colSpan={5} status='empty'>No Invoices to show</TableRowStatusMessage>
                            : invoices?.map(({ invoice, client }) => (

                                <TableRow hover component="tr">
                                    <TableCell>
                                        <Link href={`/invoices/${invoice.id}/view`} key={invoice.id} passHref><a className="text-inherit">
                                            {invoice.invoice_number}
                                        </a></Link>
                                    </TableCell>
                                    <TableCell align="right">{client.name}</TableCell>
                                    <TableCell align="right">{invoice.date}</TableCell>
                                    <TableCell align="right">{invoice.value}</TableCell>
                                    <TableCell align="right" sx={{ p: 0 }}>
                                        <IconButton onClick={(event) => {
                                            handleMenuClick(event);
                                            setCurrentMenuID(invoice.id);
                                        }}><MoreVertIcon /></IconButton>
                                        <Menu
                                            anchorEl={menuAnchorEl}
                                            open={menuOpen && invoice.id === currentMenuID}
                                            onClose={handleMenuClose}
                                        >
                                            <MenuItem onClick={handleMenuClose}>
                                                <Link href={`/invoices/${invoice.id}/edit`}><a>Edit Invoice</a></Link>
                                            </MenuItem>
                                            <MenuItem onClick={handleMenuClose}>
                                                <Link href={`/invoices/new`}><a>Delete Invoice</a></Link>
                                            </MenuItem>
                                        </Menu>
                                    </TableCell>
                                </TableRow>
                            ))}
                    {errorMessage && <TableRowStatusMessage colSpan={4} status='error'>{errorMessage}</TableRowStatusMessage>}
                </TableBody>
            </Table>
        </TableContainer >
    )
}

export default InvoicesTable;