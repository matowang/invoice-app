import { Avatar, Button, Skeleton } from "@mui/material";

import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import PixOutlinedIcon from "@mui/icons-material/PixOutlined";
import BusinessIcon from "@mui/icons-material/Business";

import Link from "next/link";

import MenuActions from "../components/ActionsMenu";

import { useAuth } from "../user/AuthContext";
import { useRouter } from "next/router";

import React from "react";

const navItems = [
	{
		href: "/clients",
		label: "CLIENTS",
		icon: <GroupsOutlinedIcon />,
	},
	{
		href: "/invoices",
		label: "INVOICES",
		icon: <DescriptionOutlinedIcon />,
	},
];

const Header = () => {
	const { loading, logout, token } = useAuth();
	const router = useRouter();
	return (
		<div className='fixed flex w-full top-0 items-center px-10 md:px-20 py-5 z-10 '>
			<Link href='/'>
				<a
					className='no-underline flex items-center text-gray-800'
					data-active={router.pathname === "/"}
				>
					<PixOutlinedIcon sx={{ mr: 1 }} />
					<h1 className='text-lg mr-0 md:mr-8'>Outvoice</h1>
				</a>
			</Link>
			{loading ? (
				<Skeleton sx={{ ml: "auto" }} width={100} />
			) : token ? (
				<>
					<ul className='flex pl-2 md:gap-6 list-none'>
						{navItems.map((item) => (
							<React.Fragment key={item.href}>
								<hr />
								<li>
									<Link href={item.href}>
										<a
											className='text-gray-800 no-underline'
											data-active={router.pathname === item.href}
										>
											<Button color='inherit' startIcon={item?.icon}>
												{item.label}
											</Button>
										</a>
									</Link>
								</li>
							</React.Fragment>
						))}
					</ul>
					<div className='ml-auto'>
						<MenuActions
							actions={[
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
							]}
							icon={<Avatar />}
						/>
					</div>
				</>
			) : null}
		</div>
	);
};

export default Header;
