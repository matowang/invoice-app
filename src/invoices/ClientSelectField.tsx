import SelectField from "../components/formFields/SelectField";

import { useRouter } from "next/router";
import { useClientCompanyNames } from "../clients/useClientsCompanyNames";

const ClientSelectField = () => {
	const router = useRouter();
	const { data } = useClientCompanyNames();
	return (
		<SelectField
			label='Company'
			value={typeof router.query?.clientId === "string" ? router.query.clientId : ""}
			options={
				data
					? [
							...data.map(({ id, companyName }) => ({ value: id, label: companyName })),
							{ value: "", label: "All Invoices" },
					  ]
					: []
			}
			onChange={(value) =>
				router.replace(
					JSON.parse(
						JSON.stringify({
							pathname: router.pathname,
							query: { ...router.query, clientId: value || undefined },
						})
					)
				)
			}
		/>
	);
};
export default ClientSelectField;
