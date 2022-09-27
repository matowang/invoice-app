import {
	IconButton,
	IconButtonProps,
	ListItemIcon,
	ListItemText,
	Menu,
	MenuItem,
	MenuItemProps,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import { useMenuOpen } from "../hooks/useMenuOpen";
import { ReactNode } from "react";

interface MenuActionsProps {
	actions: {
		label: string;
		onClick: () => void;
		icon?: ReactNode;
		itemProps?: MenuItemProps;
		"data-test"?: string;
	}[];
	iconButtonProps?: IconButtonProps<React.ElementType>;
	icon?: ReactNode;
}

const MenuActions = ({ actions, iconButtonProps, icon }: MenuActionsProps) => {
	const { menuOpen, menuAnchorEl, handleMenuClick, handleMenuClose } = useMenuOpen();

	return (
		<>
			<IconButton {...iconButtonProps} onClick={handleMenuClick}>
				{icon || <MoreVertIcon />}
			</IconButton>
			<Menu
				anchorEl={menuAnchorEl}
				open={menuOpen}
				onClose={handleMenuClose}
				disableScrollLock={true}
			>
				{actions.map((action, i) => (
					<MenuItem
						key={`action-${i}`}
						onClick={(e) => {
							handleMenuClose(e);
							action.onClick();
						}}
						data-test={action["data-test"]}
						{...action.itemProps}
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
