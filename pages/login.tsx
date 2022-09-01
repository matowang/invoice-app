import Link from "next/link";
import LoginFormContainer from "../src/user/LoginFormContainer";
import NotAuthGuard from "../src/user/NotAuthGuard";
const Login = () => {
	return (
		<NotAuthGuard>
			<div className='my-40 mx-20 flex flex-col items-center relative'>
				<div className='max-w-md w-full'>
					<LoginFormContainer />
				</div>
				<Link href='/signup'>
					<a className='my-5'>Don&apos;t have an account? Sign-up here.</a>
				</Link>
			</div>
		</NotAuthGuard>
	);
};

export default Login;
