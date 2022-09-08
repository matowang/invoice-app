import Error404 from "../components/Error404";
import PageLoader from "../components/PageLoader";
import { InvoiceView } from "./InvoiceView";
import { useInvoice } from "./useInvoice";

const InvoiceViewContainer = ({ invoiceId }: { invoiceId: string }) => {
	const { data, isLoading } = useInvoice(invoiceId);

	if (isLoading) return <PageLoader />;

	if (!data) return <Error404 />;

	return <InvoiceView invoiceData={data} />;
};

export default InvoiceViewContainer;
