import { useState } from "react";

export const useMenuOpen = () => {
	const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
	const menuOpen = !!menuAnchorEl;
	return {
		menuOpen,
		menuAnchorEl,
		handleMenuClick: (event: React.MouseEvent<HTMLButtonElement>) => {
			event.stopPropagation();
			setMenuAnchorEl(event.currentTarget);
		},
		handleMenuClose: (event: any) => {
			event?.stopPropagation?.();
			setMenuAnchorEl(null);
		},
	};
};
