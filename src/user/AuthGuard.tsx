import { ReactNode, useEffect } from "react";

import { useAuth } from "../user/AuthContext";

import { useRouter } from "next/router";
import PageLoader from "../components/PageLoader";

interface AuthGuardProps {
	children: ReactNode;
}

const AuthGuard = ({ children }: AuthGuardProps) => {
	const { loading, user } = useAuth();
	const router = useRouter();
	useEffect(() => {
		if (!loading)
			if (!user) {
				console.log("redirect to login");
				router.push("/login");
			} else if (!user.companyDetails) router.push("/company-details");
	}, [loading, router, user]);
	if (!user?.companyDetails) return <PageLoader />;
	return <>{children}</>;
};

export default AuthGuard;
