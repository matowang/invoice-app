import PageLoader from "../components/PageLoader";

import { ReactNode, useEffect } from "react";
import { useAuth } from "../user/AuthContext";
import { useRouter } from "next/router";

interface NotAuthGuardProps {
	children: ReactNode;
}

const NotAuthGuard = ({ children }: NotAuthGuardProps) => {
	const { loading, user } = useAuth();
	const router = useRouter();
	useEffect(() => {
		if (!loading && user) router.push("/");
	}, [loading, router, user]);
	if (loading || user) return <PageLoader />;
	return <>{children}</>;
};

export default NotAuthGuard;
