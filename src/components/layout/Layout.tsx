import { Container } from '@mui/material';
import { ReactNode } from 'react';
import Header from './Header';

interface LayoutProps {
    children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    return <div>
        <Header />
        <Container sx={{ my: 20 }}>{children}</Container>
    </div>
}

export default Layout;