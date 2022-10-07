import InvoicesTable, { InvoicesTableProps } from "./InvoicesTable";

import { useInvoices } from "./useInvoices";

import { GetInvoicesQuery } from "../api/invoices";
import { ReactNode } from "react";

interface InvoicesTableContainerProps {
	disableRouting?: boolean;
	query?: GetInvoicesQuery;
	renderHeader?: () => ReactNode;
	actionsOnClick: InvoicesTableProps["actionsOnClick"];
	onClickRow: InvoicesTableProps["onClickRow"];
	onClickField?: InvoicesTableProps["onClickField"];
	onChangePage?: InvoicesTableProps["onChangePage"];
}

const InvoicesTableContainer = ({
	query,
	disableRouting,
	renderHeader,
	actionsOnClick,
	onClickRow,
	onClickField,
	onChangePage,
}: InvoicesTableContainerProps) => {
	const { data, error, isLoading, isFetching, totalPages } = useInvoices(query);

	return (
		<InvoicesTable
			onChangePage={onChangePage}
			onClickField={onClickField}
			sortBy={query?.sortBy}
			sortOrder={query?.sortOrder}
			page={query?.page || 1}
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
