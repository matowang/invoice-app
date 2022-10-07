import { Menu, Transition } from "@headlessui/react";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { Avatar } from "@mui/material";
import { Fragment, ReactNode } from "react";

interface MenuItem {
	label: string;
	onClick: () => void;
	icon: ReactNode;
	"data-test"?: string;
}

interface UserMenuProps {
	menuItems: MenuItem[];
}

const UserMenu = ({ menuItems }: UserMenuProps) => {
	return (
		<Menu as='div' className='relative leading-none'>
			<Menu.Button
				as='button'
				className='leading-none border-none bg-none bg-transparent p-1 text-sm font-medium rounded-full text-gray-600 hover:bg-opacity-5 hover:bg-black focus:outline-none focus-visible:ring-2'
			>
				<UserCircleIcon className='w-12 h-12' />
			</Menu.Button>
			<Transition
				as={Fragment}
				enter='transition ease-out duration-100'
				enterFrom='transform opacity-0 scale-95'
				enterTo='transform opacity-100 scale-100'
				leave='transition ease-in duration-75'
				leaveFrom='transform opacity-100 scale-100'
				leaveTo='transform opacity-0 scale-95'
			>
				<Menu.Items className='absolute right-0 mt-2 w-56 rounded-md bg-white divide-y divide-gray-200 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
					{menuItems.map((item) => (
						<Menu.Item key={`${item.label}`}>
							{({ active }) => (
								<div className='p-1 border-0 border-solid'>
									<button
										className={`${
											active ? "bg-gray-100" : "text-gray-600"
										} group flex w-full items-center p-2 text-sm bg-white border-0 rounded-md`}
										onClick={item.onClick}
									>
										{item.icon}
										<span className='ml-2'>{item.label}</span>
									</button>
								</div>
							)}
						</Menu.Item>
					))}
				</Menu.Items>
			</Transition>
		</Menu>
	);
};
export default UserMenu;
