import { useRouter } from "next/router";
import { useEffect } from "react";

interface UsePaginationGaurdProps {
	totalPages?: number;
}

export const usePaginationGaurd = ({ totalPages }: UsePaginationGaurdProps) => {
	const router = useRouter();
	useEffect(() => {
		if (!router.isReady) return;
		if (!router.query.page) return;
		if (Array.isArray(router.query.page)) {
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
		if (totalPages && page > totalPages) {
			router.replace({
				pathname: router.pathname,
				query: { ...router.query, page: totalPages },
			});
			return;
		}
	}, [router, router.isReady, totalPages]);
};
