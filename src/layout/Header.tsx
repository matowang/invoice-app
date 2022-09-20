import { AppBar, Button, Skeleton, Toolbar, Typography } from "@mui/material";
import AdbIcon from "@mui/icons-material/Adb";

import { useAuth } from "../user/AuthContext";
import Link from "next/link";
import { useRouter } from "next/router";

const navItems = [
	{
		href: "/clients",
		label: "CLIENTS",
	},
	{
		href: "/invoices",
		label: "INVOICES",
	},
];

const Header = () => {
	const { loading, logout, token } = useAuth();
	const router = useRouter();
	return (
		<AppBar position='fixed'>
			<Toolbar>
				<AdbIcon sx={{ mr: 1 }} />
				<Link href='/'>
					<a className='no-underline' data-active={router.pathname === "/"}>
						<h1 className='text-white text-lg'>INVOICE APP</h1>
					</a>
				</Link>
				<ul className='flex gap-12 list-none'>
					{navItems.map((item) => (
						<li key={item.href}>
							<Link href={item.href}>
								<a className='text-white no-underline' data-active={router.pathname === item.href}>
									<Button color='inherit'>{item.label}</Button>
								</a>
							</Link>
						</li>
					))}
				</ul>
				{loading ? (
					<Skeleton sx={{ ml: "auto" }} width={100} />
				) : token ? (
					<Button sx={{ ml: "auto" }} color='inherit' onClick={logout} data-test='logout-button'>
						Logout
					</Button>
				) : null}
			</Toolbar>
		</AppBar>
	);
};

export default Header;
