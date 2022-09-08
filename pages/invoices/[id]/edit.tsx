import axios from "axios";
import { useRouter } from "next/router";
import PageLoader from "../../../src/components/PageLoader";
import EditInvoiceForm from "../../../src/invoices/EditInvoiceForm";
import AuthGuard from "../../../src/user/AuthGuard";

const NewInvoicePage = () => {
	const router = useRouter();

	if (!router.isReady) return <PageLoader />;

	if (typeof router.query.id !== "string") {
		router.push("/404");
		return <PageLoader />;
	}

	return (
		<AuthGuard>
			<div className='my-40 mx-20 flex flex-col items-center relative'>
				<div className='max-w-md w-full'>
					<h1>Edit Invoice</h1>
					<EditInvoiceForm
						invoiceId={router.query.id}
						// onGetInvoiceError={(err) => {
						// 	if (axios.isAxiosError(err)) {
						// 		if (err.response?.status === 404) return router.push("/404");
						// 	}
						// }}
					/>
				</div>
			</div>
		</AuthGuard>
	);
};

export default NewInvoicePage;
