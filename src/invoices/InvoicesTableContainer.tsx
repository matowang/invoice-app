import InvoicesTable, { InvoicesTableProps } from "./InvoicesTable";

import { useInvoices } from "./useInvoices";

import { GetInvoicesQuery } from "../api/invoices";
import { ReactNode } from "react";

interface InvoicesTableContainerProps {
	disableRouting?: boolean;
	query: GetInvoicesQuery;
	renderHeader?: () => ReactNode;
	actionsOnClick: InvoicesTableProps["actionsOnClick"];
	onClickRow: InvoicesTableProps["onClickRow"];
	onClickField?: InvoicesTableProps["onClickField"];
}

const InvoicesTableContainer = ({
	query,
	disableRouting,
	renderHeader,
	actionsOnClick,
	onClickRow,
	onClickField,
}: InvoicesTableContainerProps) => {
	const { data, error, isLoading, totalPages, isFetching } = useInvoices(query);
	return (
		<InvoicesTable
			onClickField={onClickField}
			sortBy={query.sortBy}
			sortOrder={query.sortOrder}
			actionsOnClick={actionsOnClick}
			onClickRow={onClickRow}
			errorMessage={error ? "Something went wrong" : undefined}
			invoices={data?.invoices}
			totalPages={totalPages}
			disableRouting={disableRouting}
			isLoading={isLoading}
			isFetching={isFetching}
			renderHeader={renderHeader}
		/>
	);
};

export default InvoicesTableContainer;
