import { ReactNode } from "react";

interface PageContainerProps {
	children: ReactNode;
}

const PageContainer = ({ children }: PageContainerProps) => {
	return (
		<div className='py-20 mx-10 md:mx-20 flex flex-col items-center relative'>
			<div className='max-w-md w-full'>{children}</div>
		</div>
	);
};

export default PageContainer;
