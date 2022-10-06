import { Button } from "@mui/material";
import Link from "next/link";

import AuthGuard from "../../../src/user/AuthGuard";

import PageLoader from "../../../src/components/PageLoader";
import Error404 from "../../../src/components/Error404";

import InvoicePrintContainer from "../../../src/invoices/InvoicePrintContainer";
import InvoiceViewContainer from "../../../src/invoices/InvoiceViewContainer";

import PrintOutlinedIcon from "@mui/icons-material/PrintOutlined";

import { useRouter } from "next/router";

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
		<AuthGuard>
			<div className='my-40 mx-20 flex flex-col  relative'>
				<InvoiceViewContainer invoiceId={router.query.id} />
				<Link href={`/invoices/${router.query.id}/view?print=true`}>
					<a>
						<Button
							variant='contained'
							className='self-start mt-6'
							startIcon={<PrintOutlinedIcon />}
						>
							Print
						</Button>
					</a>
				</Link>
			</div>
		</AuthGuard>
	);
};

export default InvoiceView;
