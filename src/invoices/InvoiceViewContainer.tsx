import PageLoader from "../components/PageLoader";
import { InvoiceView } from "./InvoiceView";
import { useInvoice } from "./useInvoice";

const InvoiceViewContainer = ({ invoiceId }: { invoiceId: string }) => {
	const { data } = useInvoice(invoiceId);

	if (!data) return <PageLoader />;

	return <InvoiceView invoiceData={data} />;
};

export default InvoiceViewContainer;
