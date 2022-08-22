import { Button } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { getInvoices, InvoiceDTO } from '../api/base';
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