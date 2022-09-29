import { Button } from "@mui/material";
import Link from "next/link";
import type { NextPage } from "next";

import AddIcon from "@mui/icons-material/Add";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";

import AuthGuard from "../src/user/AuthGuard";

import InvoicesTableContainer from "../src/invoices/InvoicesTableContainer";
import ClientsTableContainer from "../src/clients/ClientsTableContainer";

import { useRouter } from "next/router";

const Dashboard: NextPage = () => {
	const router = useRouter();
	return (
		<AuthGuard>
			<div className='grid grid-cols-1 gap-10 xl:grid-cols-[3fr_5fr] py-32 mx-10 md:mx-20'>
				<section>
					<ClientsTableContainer
						onClickRow={(client) => router.push(`/clients/${client.id}`)}
						actionsOnClick={{
							editClient: (client) => router.push(`clients/${client.id}`),
							addInvoice: (client) => router.push(`invoices/new?clientId=${client.id}`),
						}}
						query={{ page: 1 }}
						disableRouting
						renderHeader={() => (
							<header className='flex justify-between items-end p-4'>
								<h2 className='m-0 text-lg'>Clients</h2>
								<div className='flex gap-2'>
									<Link href='/clients'>
										<a className='no-underline'>
											<Button
												variant='outlined'
												data-test='view-all-clients'
												startIcon={<RemoveRedEyeOutlinedIcon />}
												sx={{ borderRadius: 8 }}
											>
												See all
											</Button>
										</a>
									</Link>
									<Link href='/clients/new'>
										<a className='no-underline'>
											<Button
												variant='contained'
												data-test='add-client'
												startIcon={<AddIcon />}
												sx={{ borderRadius: 8 }}
											>
												Add Client
											</Button>
										</a>
									</Link>
								</div>
							</header>
						)}
					/>
				</section>
				<section>
					<InvoicesTableContainer
						onClickRow={(invoice) => router.push(`/invoices/${invoice.id}/view`)}
						actionsOnClick={{
							editInvoice: (invoice) => router.push(`/invoices/${invoice.id}/edit`),
							printInvoice: (invoice) => router.push(`/invoices/${invoice.id}/view?print=true`),
						}}
						query={{ page: 1 }}
						disableRouting
						renderHeader={() => (
							<header className='flex justify-between items-end p-4'>
								<h1 className='m-0 text-lg'>Invoices</h1>
								<div className='flex gap-2'>
									<Link href='/invoices'>
										<a className='no-underline'>
											<Button
												variant='outlined'
												data-test='view-all-invoices'
												startIcon={<RemoveRedEyeOutlinedIcon />}
												sx={{ borderRadius: 8 }}
											>
												See all
											</Button>
										</a>
									</Link>
									<Link href='/invoices/new'>
										<a className='no-underline'>
											<Button
												variant='contained'
												data-test='add-invoice'
												startIcon={<AddIcon />}
												sx={{ borderRadius: 8 }}
											>
												Add Invoice
											</Button>
										</a>
									</Link>
								</div>
							</header>
						)}
					/>
				</section>
			</div>
		</AuthGuard>
	);
};

export default Dashboard;
