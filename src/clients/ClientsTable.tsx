import {
	TableContainer,
	Paper,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	Skeleton,
	IconButton,
	Menu,
	MenuItem,
} from "@mui/material";
import TableRowStatusMessage from "../components/TableRowStatusMessage";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Link from "next/link";
import DataTableHeadController from "../components/DataTableHeadController";

import { ClientDTO } from "../api/clients";
import { useMenuOpen } from "../hooks/useMenuOpen";
import { useState } from "react";

interface ClientsTableProps {
	clients?: ClientDTO[];
	loading: boolean;
	errorMessage?: string;
}

const ClientsTable = ({ clients, loading, errorMessage }: ClientsTableProps) => {
	const { menuOpen, menuAnchorEl, handleMenuClick, handleMenuClose } = useMenuOpen();
	const [currentMenuId, setCurrentMenuId] = useState<string | null>(null);
	const headFields = [
		{ name: "clientName", label: "Client Name" },
		{ name: "companyName", label: "Company" },
		{ name: "invoicesCount", label: "Invoices Count" },
		{ name: "total", label: "Total Billed" },
	];
	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 650 }} aria-label='client table' data-test='clients-table'>
				<TableHead>
					<TableRow>
						<DataTableHeadController
							headFields={headFields}
							RenderCell={(props) => (
								<TableCell
									{...props}
									align={props.index === 0 ? "left" : "right"}
									component='th'
									className='font-bold'
								/>
							)}
						/>
						<TableCell />
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
						<TableRowStatusMessage colSpan={headFields.length + 1} status='empty'>
							<span data-test='empty-placeholder'>No Clients to Show.</span>
						</TableRowStatusMessage>
					) : (
						clients?.map((client) => (
							<Link href={`/clients/${client.id}`} key={client.id}>
								<TableRow hover data-test={`client-row-${client.id}`}>
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
												setCurrentMenuId(client.id);
											}}
										>
											<MoreVertIcon />
										</IconButton>
										<Menu
											anchorEl={menuAnchorEl}
											open={menuOpen && client.id === currentMenuId}
											onClose={handleMenuClose}
										>
											<Link href={`/clients/${client.id}`}>
												<MenuItem onClick={handleMenuClose}>Edit Client</MenuItem>
											</Link>
											<Link href={`/clients/new`}>
												<MenuItem onClick={handleMenuClose}>Delete Client</MenuItem>
											</Link>
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
