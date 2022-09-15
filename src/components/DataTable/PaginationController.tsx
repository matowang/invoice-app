import { useRouter } from "next/router";
import { ReactNode } from "react";

interface RenderPageChangeProps {
	page: number;
	handlePageChange: (page: number) => void;
	totalPages: number;
}

type renderPageChange = ({
	page,
	handlePageChange,
	totalPages,
}: RenderPageChangeProps) => ReactNode;

interface TableHeaderProps {
	children: renderPageChange;
	totalPages?: number;
}

const PaginationController = ({ children, totalPages = 1 }: TableHeaderProps) => {
	const router = useRouter();

	const page = typeof router.query.page === "string" ? parseInt(router.query.page) : 1;

	const handlePageChange = (page: number) => {
		router.push({
			pathname: router.pathname,
			query: { ...router.query, page: page },
		});
	};

	return <>{children({ page, handlePageChange, totalPages })}</>;
};
export default PaginationController;
