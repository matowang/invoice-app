import { useRouter } from "next/router";
import { ReactNode, MouseEvent } from "react";

type SortOder = "asc" | "desc" | undefined;

interface DataTableCellComponentProps {
	onClick: (event: MouseEvent) => void;
	index: number;
	children: ReactNode;
}

interface TableHeaderProps {
	headFields: { name: string; label: string }[];
	RenderCell: (props: DataTableCellComponentProps) => JSX.Element;
	disableRouting?: boolean;
}

const DataTableHead = ({ headFields, RenderCell, disableRouting }: TableHeaderProps) => {
	const router = useRouter();

	const handleFieldClick = (event: MouseEvent, fieldName: string) => {
		if (disableRouting) return;

		let sortOrder: SortOder;
		if (router.query.sortBy === fieldName) {
			if (router.query.sortOrder === "asc") sortOrder = "desc";
			else if (router.query.sortOrder === "desc") sortOrder = undefined;
			else sortOrder = "asc";
		} else {
			sortOrder = "asc";
		}
		router.push({
			pathname: router.pathname,
			query: { ...router.query, sortOrder, sortBy: fieldName },
		});
	};

	return (
		<>
			{headFields.map((field, i) => (
				<RenderCell
					onClick={(e) => handleFieldClick(e, field.name)}
					key={`field-${field.name}-${i}`}
					index={i}
				>
					{field.label}
				</RenderCell>
			))}
		</>
	);
};
export default DataTableHead;
