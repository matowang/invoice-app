import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button } from '@mui/material';

const axios = require('axios').default; //remove this to use only client side

import { AxiosError } from 'axios';
import type { GetServerSideProps, NextPage } from 'next';
import Link from 'next/link';

import AuthGuard from '../src/user/AuthGuard';

import InvoicesTableContainer from '../src/invoices/InvoicesTableContainer';

interface DashboardProps {
	clients: any[];
	invoices: any[];
}

const Dashboard: NextPage<DashboardProps> = ({ clients, invoices }) => {
	return (
		<AuthGuard>
			<div className="grid grid-cols-1 xl:grid-cols-2 my-20" >
				<TableContainer component={Paper} sx={{ mt: 9 }}>
					<Table sx={{ minWidth: 650 }} aria-label="client table">
						<TableHead>
							<TableRow>
								<TableCell>Client Name</TableCell>
								<TableCell align="right">Email</TableCell>
								<TableCell align="right">Company</TableCell>
								<TableCell align="right">Total Billed</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{clients.map((client) => (
								<TableRow
									key={client.id}
									sx={{}}
								>
									<TableCell component="th">
										{client.name}
									</TableCell>
									<TableCell component="th" align="right">{client.email}</TableCell>
									<TableCell component="th" align="right">{client.companyDetails.name}</TableCell>
									<TableCell component="th" align="right">{client.totalBilled}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
				<section>
					<header className='flex justify-between items-end'>
						<h2 className='m-0'>Invoices</h2>
						<div>
							<Link href="/invoices"><a className="no-underline">
								<Button variant="outlined">Add Invoice</Button>
							</a></Link>
							<Link href="/invoices"><a className="no-underline">
								<Button variant="outlined">See all</Button>
							</a></Link>
						</div>
					</header>
					<InvoicesTableContainer page={1} />
				</section >
			</div>
		</AuthGuard>
	)
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	let clientsRes: any;
	let invoicesRes: any;
	try {
		const dbInstance = axios.create({
			baseURL: 'http://localhost:3139',
			headers: { 'x-access-token': '555' }
		});

		clientsRes = await dbInstance.get('/clients');
		invoicesRes = await dbInstance.get('/invoices?limit=10');
	} catch (e) {
		if (e instanceof AxiosError)
			console.error(e.message);
		else {
			console.log(e);
		}
	}
	return {
		props: {
			clients: clientsRes.data.clients,
			invoices: invoicesRes.data.invoices
		}
	}
}


export default Dashboard;
