import SelectField from "../components/formFields/SelectField";

import { useClientCompanyNames } from "../clients/useClientsCompanyNames";
import { Skeleton } from "@mui/material";

interface ClientSelectFieldProps {
	onChange: (value: string | number | undefined) => void;
	value: string;
}

const ClientSelectField = ({ onChange, value }: ClientSelectFieldProps) => {
	const { data, isLoading, isError } = useClientCompanyNames();
	if (isLoading) {
		return <Skeleton height='100%' />;
	}
	return (
		<SelectField
			label='Company'
			value={isError ? "" : value}
			options={
				isError
					? [{ value: "", label: "Couldn't Load Options" }]
					: [
							...data.map(({ id, companyName }) => ({ value: id, label: companyName })),
							{ value: "", label: "All Invoices" },
					  ]
			}
			onChange={onChange}
		/>
	);
};
export default ClientSelectField;
