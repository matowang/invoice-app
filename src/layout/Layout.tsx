import { Container } from "@mui/material";
import { ReactNode } from "react";
import Header from "./Header";

interface LayoutProps {
	children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
	return (
		<>
			<div className='h-full w-full fixed top-0 left-0 overflow-hidden -z-10'>
				<div className='w-5/12 aspect-square bg-[#0B1D23] opacity-60 rounded-full absolute bottom-0 left-0 translate-y-3/4 mix-blend-multiply' />
				<div className='w-5/12 aspect-square bg-[#108EAA] opacity-30 rounded-full absolute bottom-0 left-0 -translate-x-1/2 translate-y-1/2 mix-blend-multiply' />
			</div>
			<Header />
			{children}
		</>
	);
};

export default Layout;
