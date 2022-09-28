import InvoicesTable from "./InvoicesTable";
import AddIcon from "@mui/icons-material/Add";

import { useInvoices } from "./useInvoices";

import { GetInvoicesQuery } from "../api/invoices";
import { Button } from "@mui/material";
import Link from "next/link";
import ClientSelectField from "./ClientSelectField";
import { ReactNode } from "react";

interface InvoicesTableContainerProps {
	disableRouting?: boolean;
	query: GetInvoicesQuery;
	renderHeader?: () => ReactNode;
}

const InvoicesTableContainer = ({
	query,
	disableRouting,
	renderHeader,
}: InvoicesTableContainerProps) => {
	const { data, error, isLoading, totalPages, isFetching } = useInvoices(query);
	return (
		<InvoicesTable
			errorMessage={
				error ? <span date-test='invoices-fetch-error'>Something went wrong.</span> : undefined
			}
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
