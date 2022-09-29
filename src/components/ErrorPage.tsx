import { ReactNode } from "react";

interface ErrorPageProps {
	children: ReactNode;
}

const ErrorPage = ({ children }: ErrorPageProps) => {
	return (
		<div className='h-screen w-full flex items-center justify-center'>
			<div className='flex h-20 gap-4'>
				<h1 className='self-center'>Error</h1>
				<hr />
				<p className='self-center'>{children}</p>
			</div>
		</div>
	);
};

export default ErrorPage;
