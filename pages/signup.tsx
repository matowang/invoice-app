import Link from "next/link";
import { useRouter } from "next/router";
import RegisterFormContainer from "../src/user/RegisterFormContainer";
import NotAuthGuard from "../src/user/NotAuthGuard";


const SignUp = () => {

    const router = useRouter();

    return <NotAuthGuard>
        <div className='my-40 mx-20 flex flex-col items-center relative'>
            <div className='max-w-md w-full'>
                <RegisterFormContainer onRegisterSuccess={() => { router.push('/login') }} />
            </div>
            <Link href='/login'><a className="my-5">Already have an account? Login here.</a></Link>
        </div>
    </NotAuthGuard>
}

export default SignUp;