import InvoiceForm from "../../src/invoices/InvoiceForm";
import AuthGuard from "../../src/user/AuthGuard";

const NewInvoicePage = () => {
	return (
		<AuthGuard>
			<div className='my-40 mx-20 flex flex-col items-center relative'>
				<div className='max-w-md w-full'>
					<h1>Create New Invoice</h1>
					<InvoiceForm />
				</div>
			</div>
		</AuthGuard>
	);
};

export default NewInvoicePage;