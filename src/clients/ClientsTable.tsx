import { TableRow, TableCell, IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Link from "next/link";

import { ClientDTO } from "../api/clients";
import { useMenuOpen } from "../hooks/useMenuOpen";
import { useState } from "react";
import DataTable from "../components/DataTable";

interface ClientsTableProps {
	clients?: ClientDTO[];
	isLoading: boolean;
	isFetching: boolean;
	errorMessage?: string;
	disableRouting?: boolean;
	totalPages?: number;
}

const fields = [
	{ name: "clientName", label: "Client Name" },
	{ name: "companyName", label: "Company" },
	{ name: "invoicesCount", label: "Invoices Count" },
	{ name: "total", label: "Total Billed" },
];

const ClientsTable = ({
	clients,
	isLoading,
	isFetching,
	errorMessage,
	disableRouting: disableRouting,
	totalPages,
}: ClientsTableProps) => {
	const { menuOpen, menuAnchorEl, handleMenuClick, handleMenuClose } = useMenuOpen();
	const [currentMenuId, setCurrentMenuId] = useState<string | null>(null);

	return (
		<DataTable
			fields={fields}
			totalPages={totalPages}
			isError={!!errorMessage}
			isLoading={isLoading}
			isFetching={isFetching}
			errorMsg={errorMessage}
			rowsData={clients}
			disableRouting={disableRouting}
		>
			{(client) => (
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
			)}
		</DataTable>
	);
};

export default ClientsTable;
