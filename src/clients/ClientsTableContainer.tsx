import { useClients } from './useClients';
import ClientsTable from './ClientsTable';

interface ClientsTableContainerProps {
    page?: number;
}

const ClientsTableContainer = ({ page }: ClientsTableContainerProps) => {

    const { data, error, isLoading } = useClients({ page });
    return (
        <ClientsTable
            loading={isLoading}
            errorMessage={error ? "Something went wrong." : undefined}
            clients={data?.clients} />
    )
}

export default ClientsTableContainer;