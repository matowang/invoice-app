import { useRouter } from "next/router";
import { useEffect } from "react";

interface UsePaginationGaurdProps {
	totalPages?: number;
}

export const usePaginationGaurd = ({ totalPages = Infinity }: UsePaginationGaurdProps) => {
	const router = useRouter();

	useEffect(() => {
		if (!router.isReady) return;
		if (!router.query.page) return;
		if (typeof router.query.page !== "string") {
			router.replace({
				pathname: router.pathname,
				query: { ...router.query, page: 1 },
			});
			return;
		}
		const page = parseInt(router.query.page);
		if (page < 1) {
			router.replace({
				pathname: router.pathname,
				query: { ...router.query, page: 1 },
			});
			return;
		}
		if (page > totalPages) {
			router.replace({
				pathname: router.pathname,
				query: { ...router.query, page: totalPages },
			});
			return;
		}
	}, [router, router.isReady, totalPages]);
};
