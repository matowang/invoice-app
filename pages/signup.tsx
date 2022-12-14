import Link from "next/link";

import OutlinedButton from "../src/components/OutlinedButton";

import PageContainer from "../src/components/PageContainer";
import RegisterFormContainer from "../src/user/RegisterFormContainer";
import NotAuthGuard from "../src/user/NotAuthGuard";

import PixOutlinedIcon from "@mui/icons-material/PixOutlined";

import { useRouter } from "next/router";

const SignUp = () => {
	const router = useRouter();

	return (
		<NotAuthGuard>
			<PageContainer>
				<h1 className='my-3 mt-16 text-3xl font-normal text-center justify-center'>
					Welcome to
					<span className='inline-flex items-center mx-2 justify-center'>
						<PixOutlinedIcon sx={{ mr: 0.5 }} />
						Outvoice!
					</span>
				</h1>
				<p className='text-center mt-10 mb-6 text-gray-500'>Sign-up to Continue</p>
				<RegisterFormContainer
					onRegisterSuccess={() => {
						router.push("/login");
					}}
				/>
				<p className='text-center text-gray-500 pt-12 pb-5'>
					Already have an account?
					<Link href='/login'>
						<a className='font-bold w-full'> Login.</a>
					</Link>
				</p>
				<Link href='/login'>
					<a className='no-underline'>
						<OutlinedButton>LOGIN</OutlinedButton>
					</a>
				</Link>
			</PageContainer>
		</NotAuthGuard>
	);
};

export default SignUp;
