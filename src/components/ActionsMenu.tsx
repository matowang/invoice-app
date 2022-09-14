import { IconButton, IconButtonProps, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import { useMenuOpen } from "../hooks/useMenuOpen";

interface MenuActionsProps {
	actions: { label: string; onClick: () => void }[];
	iconButtonProps?: IconButtonProps<React.ElementType>;
}

const MenuActions = ({ actions, iconButtonProps }: MenuActionsProps) => {
	const { menuOpen, menuAnchorEl, handleMenuClick, handleMenuClose } = useMenuOpen();

	return (
		<>
			<IconButton {...iconButtonProps} onClick={handleMenuClick}>
				<MoreVertIcon />
			</IconButton>
			<Menu anchorEl={menuAnchorEl} open={menuOpen} onClose={handleMenuClose}>
				{actions.map((action, i) => (
					<MenuItem
						key={`action-${i}`}
						onClick={(e) => {
							handleMenuClose(e);
							action.onClick();
						}}
					>
						{action.label}
					</MenuItem>
				))}
			</Menu>
		</>
	);
};

export default MenuActions;
