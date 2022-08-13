import { Container } from '@mui/material';
import { ReactNode } from 'react';
import Header from './Header';

interface LayoutProps {
    children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    return <>
        <Header />
        <div className='relative w-full'>{children}</div>
    </>
}

export default Layout;