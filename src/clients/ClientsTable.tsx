import {
	TableContainer,
	Paper,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	Typography,
	Skeleton,
	IconButton,
	Menu,
	MenuItem,
} from "@mui/material";
import TableRowStatusMessage from "../components/TableRowStatusMessage";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Link from "next/link";

import { ClientDTO } from "../api/base";
import { useMenuOpen } from "../hooks/useMenuOpen";
import { useState } from "react";

interface ClientsTableProps {
	clients?: ClientDTO[];
	loading: boolean;
	errorMessage?: string;
}

const ClientsTable = ({
	clients,
	loading,
	errorMessage,
}: ClientsTableProps) => {
	const { menuOpen, menuAnchorEl, handleMenuClick, handleMenuClose } =
		useMenuOpen();
	const [currentMenuID, setCurrentMenuID] = useState<string | null>(null);
	return (
		<TableContainer component={Paper}>
			<Table
				sx={{ minWidth: 650 }}
				aria-label='client table'
				data-test='clients-table'
			>
				<TableHead>
					<TableRow>
						<TableCell component='th' className='font-bold'>
							Client Name
						</TableCell>
						<TableCell component='th' align='right' className='font-bold'>
							Company
						</TableCell>
						<TableCell component='th' align='right' className='font-bold'>
							Invoices Count
						</TableCell>
						<TableCell component='th' align='right' className='font-bold'>
							Total Billed
						</TableCell>
						<TableCell
							component='th'
							align='right'
							className='font-bold'
						></TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{loading ? (
						Array.from(Array(10)).map((e, i) => (
							<TableRow data-test='loading-overlay' key={i + "cli-skel"}>
								<TableCell>
									<Skeleton />
								</TableCell>
								<TableCell align='right'>
									<Skeleton />
								</TableCell>
								<TableCell align='right'>
									<Skeleton />
								</TableCell>
								<TableCell align='right'>
									<Skeleton />
								</TableCell>
								<TableCell align='right'>
									<Skeleton />
								</TableCell>
							</TableRow>
						))
					) : clients?.length === 0 ? (
						<TableRowStatusMessage colSpan={6} status='empty'>
							<span data-test='empty-placeholder'>No Clients to Show.</span>
						</TableRowStatusMessage>
					) : (
						clients?.map((client) => (
							<Link href={`/clients/${client.id}`}>
								<TableRow
									key={client.id}
									hover
									data-test={`client-row-${client.id}`}
								>
									<TableCell component='th' data-test='client-name'>
										{client.name}
									</TableCell>
									<TableCell align='right' data-test='client-companyName'>
										{client.companyDetails.name}
									</TableCell>
									<TableCell align='right' data-test='client-invoicesCount'>
										{client.invoicesCount}
									</TableCell>
									<TableCell align='right' data-test='client-totalBilled'>
										{client.totalBilled}
									</TableCell>
									<TableCell align='right' sx={{ p: 0 }}>
										<IconButton
											data-test='client-actions'
											onClick={(event) => {
												handleMenuClick(event);
												setCurrentMenuID(client.id);
											}}
										>
											<MoreVertIcon />
										</IconButton>
										<Menu
											anchorEl={menuAnchorEl}
											open={menuOpen && client.id === currentMenuID}
											onClose={handleMenuClose}
										>
											<MenuItem onClick={handleMenuClose}>
												<Link href={`/clients/${client.id}`}>
													<a>Edit Client</a>
												</Link>
											</MenuItem>
											<MenuItem onClick={handleMenuClose}>
												<Link href={`/clients/new`}>
													<a>Delete Client</a>
												</Link>
											</MenuItem>
										</Menu>
									</TableCell>
								</TableRow>
							</Link>
						))
					)}
					{errorMessage && (
						<TableRowStatusMessage colSpan={5} status='error'>
							<span date-test='clients-fetch-error'>{errorMessage}</span>
						</TableRowStatusMessage>
					)}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default ClientsTable;
