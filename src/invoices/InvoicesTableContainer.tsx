import { useInvoices } from './useInvoices';
import InvoicesTable from './InvoicesTable';

interface InvoicesTableContainerProps {
    page?: number;
}

const InvoicesTableContainer = ({ page }: InvoicesTableContainerProps) => {

    const { data, error, isLoading } = useInvoices({ page });
    return (
        <InvoicesTable
            loading={isLoading}
            errorMessage={error ? "Something went wrong." : undefined}
            invoices={data?.invoices} />
    )
}

export default InvoicesTableContainer;