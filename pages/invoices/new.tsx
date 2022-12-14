import CreateInvoiceForm from "../../src/invoices/CreateInvoiceForm";
import AuthGuard from "../../src/user/AuthGuard";

import { useRouter } from "next/router";

const NewInvoicePage = () => {
	const router = useRouter();

	return (
		<AuthGuard>
			<div className='my-40 mx-20 flex flex-col items-center relative'>
				<div className='max-w-4xl w-full'>
					<h1 className='my-3 text-lg'>Create New Invoice</h1>
					<CreateInvoiceForm
						clientId={typeof router.query.clientId === "string" ? router.query.clientId : undefined}
					/>
				</div>
			</div>
		</AuthGuard>
	);
};

export default NewInvoicePage;
