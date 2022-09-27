import PageLoader from "../src/components/PageLoader";
import CompanyDetailsFormContainer from "../src/user/CompanyDetailsFormContainer";
import PageContainer from "../src/components/PageContainer";

import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuth } from "../src/user/AuthContext";

const Register = () => {
	const { loading, user } = useAuth();
	const router = useRouter();
	useEffect(() => {
		if (!loading && !user) router.push("/login");
	}, [loading, router, user]);
	if (!user) return <PageLoader />;

	return (
		<PageContainer>
			<div className='my-20'>
				<h1 className='text-lg'>Enter Company Details</h1>
				<CompanyDetailsFormContainer
					onSubmitSuccess={() => {
						router.push("/");
					}}
				/>
			</div>
		</PageContainer>
	);
};

export default Register;
