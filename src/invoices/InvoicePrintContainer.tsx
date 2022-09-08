import Error404 from "../components/Error404";
import PageLoader from "../components/PageLoader";
import { InvoicePrint } from "./InvoicePrint";
import { useInvoice } from "./useInvoice";

const InvoicePrintContainer = ({ invoiceId }: { invoiceId: string }) => {
	const { data, isLoading } = useInvoice(invoiceId);

	if (isLoading) return <PageLoader />;

	if (!data) return <Error404 />;

	return <InvoicePrint invoiceData={data} />;
};

export default InvoicePrintContainer;
