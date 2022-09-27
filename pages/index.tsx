import { Button } from "@mui/material";
import Link from "next/link";
import type { NextPage } from "next";

import AddIcon from "@mui/icons-material/Add";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";

import AuthGuard from "../src/user/AuthGuard";

import InvoicesTableContainer from "../src/invoices/InvoicesTableContainer";
import ClientsTableContainer from "../src/clients/ClientsTableContainer";
import PageContainer from "../src/components/PageContainer";

const Dashboard: NextPage = () => {
	return (
		<AuthGuard>
			<div className='grid grid-cols-1 gap-10 xl:grid-cols-[3fr_5fr] py-32 mx-10 md:mx-20'>
				<section>
					<header className='flex justify-between items-end'>
						<h2 className='m-0'>Clients</h2>
						<div className='flex gap-2'>
							<Link href='/clients'>
								<a className='no-underline'>
									<Button
										variant='outlined'
										data-test='view-all-clients'
										startIcon={<RemoveRedEyeOutlinedIcon />}
									>
										See all
									</Button>
								</a>
							</Link>
							<Link href='/clients/new'>
								<a className='no-underline'>
									<Button variant='contained' data-test='add-client' startIcon={<AddIcon />}>
										Add Client
									</Button>
								</a>
							</Link>
						</div>
					</header>
					<ClientsTableContainer query={{ page: 1 }} disableRouting />
				</section>
				<section>
					<header className='flex justify-between items-end'>
						<h2 className='m-0'>Invoices</h2>
						<div className='flex gap-2'>
							<Link href='/invoices'>
								<a className='no-underline'>
									<Button
										variant='outlined'
										data-test='view-all-invoices'
										startIcon={<RemoveRedEyeOutlinedIcon />}
									>
										See all
									</Button>
								</a>
							</Link>
							<Link href='/invoices/new'>
								<a className='no-underline'>
									<Button variant='contained' data-test='add-invoice' startIcon={<AddIcon />}>
										Add Invoice
									</Button>
								</a>
							</Link>
						</div>
					</header>
					<InvoicesTableContainer query={{ page: 1 }} disableRouting />
				</section>
			</div>
		</AuthGuard>
	);
};

export default Dashboard;
