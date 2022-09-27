import {
	IconButton,
	IconButtonProps,
	ListItemIcon,
	ListItemText,
	Menu,
	MenuItem,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import { useMenuOpen } from "../hooks/useMenuOpen";
import { ReactNode } from "react";

interface MenuActionsProps {
	actions: { label: string; onClick: () => void; icon?: ReactNode }[];
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
						{action.icon && <ListItemIcon>{action.icon}</ListItemIcon>}
						<ListItemText>{action.label}</ListItemText>
					</MenuItem>
				))}
			</Menu>
		</>
	);
};

export default MenuActions;
