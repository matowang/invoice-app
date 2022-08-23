import { AppBar, Button, Skeleton, Toolbar, Typography } from "@mui/material";
import AdbIcon from '@mui/icons-material/Adb';

import { useAuth } from '../user/AuthContext';
import Link from "next/link";

const Header = () => {

    const { loading, logout } = useAuth();

    return (
        <AppBar position="fixed">
            <Toolbar    >
                <AdbIcon sx={{ mr: 1 }} />
                <Link href="/">
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        BILLING APP
                    </Typography>
                </Link>
                {true ? <Skeleton sx={{ ml: 'auto' }} width={100} /> :
                    <Button sx={{ ml: 'auto' }} color="inherit" onClick={logout}>Logout</Button>}
            </Toolbar>
        </AppBar>)
}

export default Header;