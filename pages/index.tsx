import LoginFormContainer from '../src/user/LoginFormContainer';

import { Container, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';

const axios = require('axios').default; //remove this to use only client side

import { AxiosError } from 'axios';
import type { GetServerSideProps, NextPage } from 'next';


interface HomeProps {
	clients: any[];
	invoices: any[];
}

const Home: NextPage<HomeProps> = ({ clients, invoices }) => {
	console.log(clients);
	return <div className='my-40 mx-20 flex justify-center relative'>
		<div className='max-w-md w-full'>
			<LoginFormContainer />
		</div>
	</div>
	return (
		<Container maxWidth='md' >
			<h1>Invoice App</h1>
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
			<TableContainer component={Paper} sx={{ mt: 5 }}>
				<Table sx={{ minWidth: 650 }} aria-label="invoice table">
					<TableHead>
						<TableRow>
							<TableCell component='th'>Invoice Number</TableCell>
							<TableCell component='th' align="right">Client</TableCell>
							<TableCell component='th' align="right">Due Date</TableCell>
							<TableCell component='th' align="right">Bill</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{invoices.map(({ invoice, client }) => (
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
					</TableBody>
				</Table>
			</TableContainer>
		</Container>
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
		console.log(clientsRes.data);
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


export default Home;
