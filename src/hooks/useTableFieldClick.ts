import { useRouter } from "next/router";
import { useCallback } from "react";

import { SortOrder } from "../api/base";
import { DataTableField } from "../components/DataTable/DataTable";

export const useTableFieldClick = () => {
	const router = useRouter();
	const handleFieldClick = useCallback(
		(field: DataTableField) => {
			let sortOrder: SortOrder;
			let sortBy: string | undefined = field.name;
			if (router.query.sortBy === field.name) {
				if (router.query.sortOrder === "asc") sortOrder = "desc";
				else if (router.query.sortOrder === "desc") {
					sortOrder = undefined;
					sortBy = undefined;
				} else sortOrder = "asc";
			} else {
				sortOrder = "asc";
			}
			router.push({
				pathname: router.pathname,
				query: JSON.parse(JSON.stringify({ ...router.query, sortOrder, sortBy })),
			});
		},
		[router]
	);
	return { handleFieldClick };
};
