import InvoicesTable from "./InvoicesTable";

import { useInvoices } from "./useInvoices";

import { GetInvoicesQuery } from "../api/invoices";

interface InvoicesTableContainerProps {
	disableRouting?: boolean;
	query: GetInvoicesQuery;
}

const InvoicesTableContainer = ({ query, disableRouting }: InvoicesTableContainerProps) => {
	const { data, error, isLoading, totalPages, isFetching } = useInvoices(query);
	return (
		<InvoicesTable
			errorMessage={error ? "Something went wrong." : undefined}
			invoices={data?.invoices}
			totalPages={totalPages}
			disableRouting={disableRouting}
			isLoading={isLoading}
			isFetching={isFetching}
		/>
	);
};

export default InvoicesTableContainer;
