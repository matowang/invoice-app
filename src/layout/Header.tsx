import { AppBar, Avatar, Box, Button, Container, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography } from "@mui/material";
import AdbIcon from '@mui/icons-material/Adb';

import { useAuth } from '../user/AuthContext';

const Header = () => {

    const { logout } = useAuth();

    return (
        <AppBar position="fixed">
            <Toolbar    >
                <AdbIcon sx={{ mr: 1 }} />
                <Typography
                    variant="h6"
                    noWrap
                    component="a"
                    href="/"
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
                <Button sx={{ ml: 'auto' }} color="inherit" onClick={logout}>Logout</Button>
            </Toolbar>
        </AppBar>)
}

export default Header;