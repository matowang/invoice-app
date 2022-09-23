import EditClientForm from "../../src/clients/EditClientForm";
import AuthGuard from "../../src/user/AuthGuard";
import PageLoader from "../../src/components/PageLoader";

import { useRouter } from "next/router";

const EditClient = () => {
	const router = useRouter();

	if (!router.isReady) return <PageLoader />;

	if (typeof router.query.id !== "string") {
		router.push("/404");
		return <PageLoader />;
	}

	return (
		<AuthGuard>
			<div className='my-40 mx-20 flex flex-col items-center relative'>
				<div className='max-w-md w-full'>
					<h1 className='my-3 text-lg'>Edit Client</h1>
					<EditClientForm
						clientId={router.query.id}
						// onGetClientError={(err) => {
						// 	if (axios.isAxiosError(err)) {
						// 		if (err.response?.status === 404) return router.push("/404");
						// 	}
						// }}
					/>
				</div>
			</div>
		</AuthGuard>
	);
};

export default EditClient;
