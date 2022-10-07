import { useRouter } from "next/router";
import { useEffect } from "react";

interface UsePaginationGaurdProps {
	maxPage?: number;
}

export const usePaginationGaurd = ({ maxPage }: UsePaginationGaurdProps) => {
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
		if (maxPage && page > maxPage) {
			router.replace({
				pathname: router.pathname,
				query: { ...router.query, page: maxPage },
			});
			return;
		}
	}, [router, router.isReady, maxPage]);
};
