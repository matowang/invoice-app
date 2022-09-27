import PageContainer from "../src/components/PageContainer";
import LoginFormContainer from "../src/user/LoginFormContainer";
import NotAuthGuard from "../src/user/NotAuthGuard";

import PixOutlinedIcon from "@mui/icons-material/PixOutlined";

const Login = () => {
	return (
		<NotAuthGuard>
			<PageContainer>
				<h1 className='my-3 mt-20 text-3xl font-normal text-center justify-center'>
					Welcome Back to
					<span className='inline-flex items-center mx-2 justify-center'>
						<PixOutlinedIcon sx={{ mr: 0.5 }} />
						Outvoice!
					</span>
				</h1>
				<p className='text-center mt-10 mb-6 text-gray-500'>Login to Continue</p>
				<LoginFormContainer />
			</PageContainer>
		</NotAuthGuard>
	);
};

export default Login;
