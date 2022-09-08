import { useRouter } from "next/router";
import Error404 from "../../../src/components/Error404";
import PageLoader from "../../../src/components/PageLoader";
import InvoiceViewContainer from "../../../src/invoices/InvoiceViewContainer";

const InvoiceView = () => {
	const router = useRouter();

	if (!router.isReady) return <PageLoader />;

	if (typeof router.query.id !== "string") return <Error404 />;

	return (
		<div className='my-40 mx-20 flex flex-col items-center relative'>
			<InvoiceViewContainer invoiceId={router.query.id} />
		</div>
	);
};

export default InvoiceView;
