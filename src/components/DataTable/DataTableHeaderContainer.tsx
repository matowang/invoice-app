import { ReactNode } from "react";

interface DataTableHeaderContainerProps {
	children: ReactNode;
	title: ReactNode;
}

const DataTableHeaderContainer = ({ children, title }: DataTableHeaderContainerProps) => {
	return (
		<header className='flex justify-between p-4'>
			<h2 className='m-0 text-lg'>{title}</h2>
			<div className='flex gap-2'>{children}</div>
		</header>
	);
};
export default DataTableHeaderContainer;
