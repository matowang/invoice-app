import { Button } from '@mui/material';
import Link from 'next/link';
import type { NextPage } from 'next';

import AuthGuard from '../src/user/AuthGuard';

import InvoicesTableContainer from '../src/invoices/InvoicesTableContainer';
import ClientsTableContainer from '../src/clients/ClientsTableContainer';

const Dashboard: NextPage = () => {
	return (
		<AuthGuard>
			<div className="grid grid-cols-1 xl:grid-cols-2 my-20" >
				<section>
					<header className='flex justify-between items-end'>
						<h2 className='m-0'>Clients</h2>
						<div>
							<Link href="/add-client"><a className="no-underline">
								<Button variant="outlined">Add Client</Button>
							</a></Link>
							<Link href="/clients"><a className="no-underline">
								<Button variant="outlined">See all</Button>
							</a></Link>
						</div>
					</header>
					<ClientsTableContainer page={1} />
				</section >
				<section>
					<header className='flex justify-between items-end'>
						<h2 className='m-0'>Invoices</h2>
						<div>
							<Link href="/add-invoice"><a className="no-underline">
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


export default Dashboard;
