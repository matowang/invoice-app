import Nav from "./Nav";
import UserMenu from "./UserMenu";

import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import PixOutlinedIcon from "@mui/icons-material/PixOutlined";
import BusinessIcon from "@mui/icons-material/Business";

import Link from "next/link";

import { useAuth } from "../user/AuthContext";
import { useRouter } from "next/router";

import React from "react";

const Header = () => {
	const { loading, logout, token, status } = useAuth();
	const router = useRouter();

	const menuItems = [
		{
			label: "Logout",
			onClick: logout,
			icon: <LogoutOutlinedIcon />,
			"data-test": "logout-button",
		},
		{
			label: "My Company Details",
			onClick: () => router.push("/company-details"),
			icon: <BusinessIcon />,
		},
	];

	return (
		<>
			<div className='flex fixed w-full top-0 items-center px-10 md:px-20 py-5 z-10 bg-white'>
				<Link href='/'>
					<a
						className='no-underline flex items-center text-gray-800 font-medium'
						data-active={router.pathname === "/"}
					>
						<PixOutlinedIcon sx={{ mr: 1 }} />
						<h1 className='hidden sm:inline text-lg m-0 mr-2 md:mr-8'>Outvoice</h1>
					</a>
				</Link>
				<Nav authStatus={status} />
				<div className='ml-auto flex flex-end'>
					<UserMenu authStatus={status} menuItems={menuItems}></UserMenu>
				</div>
			</div>
		</>
	);
};

export default Header;
