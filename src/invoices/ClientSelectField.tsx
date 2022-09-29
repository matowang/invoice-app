import SelectField from "../components/formFields/SelectField";

import { useClientCompanyNames } from "../clients/useClientsCompanyNames";

interface ClientSelectFieldProps {
	onChange: (value: string | number | undefined) => void;
	value: string;
}

const ClientSelectField = ({ onChange, value }: ClientSelectFieldProps) => {
	const { data } = useClientCompanyNames();
	return (
		<SelectField
			label='Company'
			value={value}
			options={
				data
					? [
							...data.map(({ id, companyName }) => ({ value: id, label: companyName })),
							{ value: "", label: "All Invoices" },
					  ]
					: []
			}
			onChange={onChange}
		/>
	);
};
export default ClientSelectField;
