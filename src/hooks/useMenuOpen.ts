import { useState } from "react";

export const useMenuOpen = () => {
    const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
    const menuOpen = !!menuAnchorEl;
    return {
        menuOpen,
        menuAnchorEl,
        handleMenuClick: (event: React.MouseEvent<HTMLButtonElement>) => {
            setMenuAnchorEl(event.currentTarget);
        },
        handleMenuClose: () => {
            setMenuAnchorEl(null);
        }
    }
}