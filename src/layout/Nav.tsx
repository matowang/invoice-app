import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";

import { useRouter } from "next/router";
import Link from "next/link";

import React from "react";

import { AuthStatus } from "../user/AuthContext";

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

interface NavProps {
	authStatus: AuthStatus;
}

const Nav = ({ authStatus }: NavProps) => {
	return (
		<ul className='flex'>
			<NavItems authStatus={authStatus} />
		</ul>
	);
};

const NavItems = ({ authStatus }: { authStatus: AuthStatus }) => {
	const router = useRouter();
	switch (authStatus) {
		case "loading":
			return (
				<>
					{navItems.map((v, i) => (
						<div className='rounded-md animate-pulse bg-slate-200 w-20 h-6' key={v.href} />
					))}
				</>
			);
		case "authorized":
			return (
				<>
					{navItems.map((item) => (
						<React.Fragment key={item.href}>
							<li className='border-none sm:border-solid border-0 border-l-2 border-slate-300 md:px-3'>
								<Link href={item.href}>
									<a className='' data-active={router.pathname === item.href}>
										<div className='flex items-center gap-2 px-2 sm:px-4 py-2  text-gray-800 font-medium  text-xs sm:text-sm rounded-md transition-colors ease-in-out hover:bg-slate-100 bg-transparent'>
											{item.icon}
											{item.label}
										</div>
									</a>
								</Link>
							</li>
						</React.Fragment>
					))}
				</>
			);
		default:
			return null;
	}
};
export default Nav;
