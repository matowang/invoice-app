import Link from "next/link";
import type { NextPage } from "next";

import OutlinedButton from "../src/components/OutlinedButton";
import ContainedButton from "../src/components/ContainedButton";

import AddIcon from "@mui/icons-material/Add";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";

import AuthGuard from "../src/user/AuthGuard";

import InvoicesTableContainer from "../src/invoices/InvoicesTableContainer";
import ClientsTableContainer from "../src/clients/ClientsTableContainer";
import DataTableHeaderContainer from "../src/components/DataTable/DataTableHeaderContainer";

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
							<DataTableHeaderContainer title='Clients'>
								<Link href='/clients'>
									<a className='no-underline'>
										<OutlinedButton
											data-test='view-all-clients'
											startIcon={<RemoveRedEyeOutlinedIcon />}
											size='small'
										>
											SEE ALL
										</OutlinedButton>
									</a>
								</Link>
								<Link href='/clients/new'>
									<a className='no-underline'>
										<ContainedButton data-test='add-client' size='small'>
											<AddIcon />
											ADD CLIENT
										</ContainedButton>
									</a>
								</Link>
							</DataTableHeaderContainer>
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
							<DataTableHeaderContainer title='Invoices'>
								<Link href='/invoices'>
									<a className='no-underline'>
										<OutlinedButton
											data-test='view-all-invoices'
											startIcon={<RemoveRedEyeOutlinedIcon />}
											size='small'
										>
											SEE ALL
										</OutlinedButton>
									</a>
								</Link>
								<Link href='/invoices/new'>
									<a className='no-underline'>
										<ContainedButton size='small'>
											<AddIcon />
											ADD INVOICE
										</ContainedButton>
									</a>
								</Link>
							</DataTableHeaderContainer>
						)}
					/>
				</section>
			</div>
		</AuthGuard>
	);
};

export default Dashboard;
