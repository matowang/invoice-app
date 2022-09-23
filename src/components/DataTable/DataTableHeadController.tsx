import { useRouter } from "next/router";

import { MouseEvent } from "react";
import { SortOrder } from "../../api/base";
import { DataTableField } from "./DataTable";
import { DataTableHeaderProps } from "./DataTableHeader";

interface TableHeaderProps {
	headFields: DataTableField[];
	renderCell: (props: DataTableHeaderProps) => JSX.Element;
	disableRouting?: boolean;
}

const DataTableHeadController = ({ headFields, renderCell, disableRouting }: TableHeaderProps) => {
	const router = useRouter();

	const handleFieldClick = (event: MouseEvent, fieldName: string) => {
		if (disableRouting) return;

		let sortOrder: SortOrder;
		let sortBy: string | undefined = fieldName;
		if (router.query.sortBy === fieldName) {
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
	};

	return (
		<>
			{headFields.map((field, i) =>
				renderCell({
					onClick: field.isSortable ? (e) => handleFieldClick(e, field.name) : undefined,
					field,
					sortOrder:
						field.isSortable &&
						router.query.sortBy === field.name &&
						(router.query.sortOrder === "asc" || router.query.sortOrder === "desc")
							? router.query.sortOrder
							: undefined,
				})
			)}
		</>
	);
};
export default DataTableHeadController;
