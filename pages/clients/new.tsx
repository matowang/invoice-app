import CreateClientForm from "../../src/clients/CreateClientForm";
import PageContainer from "../../src/components/PageContainer";
import AuthGuard from "../../src/user/AuthGuard";

const NewClient = () => {
	return (
		<AuthGuard>
			<PageContainer>
				<h1 className='my-3 text-lg text-center'>Create New Client</h1>
				<CreateClientForm />
			</PageContainer>
		</AuthGuard>
	);
};

export default NewClient;
