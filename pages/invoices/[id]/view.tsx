import { useRouter } from "next/router";

import { Button } from "@mui/material";
import Error404 from "../../../src/components/Error404";
import Link from "next/link";
import PageLoader from "../../../src/components/PageLoader";
import InvoicePrintContainer from "../../../src/invoices/InvoicePrintContainer";
import InvoiceViewContainer from "../../../src/invoices/InvoiceViewContainer";

const InvoiceView = () => {
	const router = useRouter();

	if (!router.isReady) return <PageLoader />;

	if (typeof router.query.id !== "string") return <Error404 />;

	if (router.query.print === "true")
		return (
			<div className='my-40 mx-20 flex flex-col items-center relative'>
				<InvoicePrintContainer invoiceId={router.query.id} />
			</div>
		);

	return (
		<div className='my-40 mx-20 flex flex-col  relative'>
			<InvoiceViewContainer invoiceId={router.query.id} />
			<Link href={`/invoices/${router.query.id}/view?print=true`}>
				<a>
					<Button variant='contained' className='self-start mt-6'>
						Print
					</Button>
				</a>
			</Link>
		</div>
	);
};

export default InvoiceView;
