import { useRouter } from "next/router";
import RegisterFormContainer from "../src/user/RegisterFormContainer";

const Register = () => {

    const router = useRouter();

    return <div className='my-40 mx-20 flex justify-center relative'>
        <div className='max-w-md w-full'>
            <RegisterFormContainer onRegisterSuccess={() => { router.push('/login') }} />
        </div>
    </div>
}

export default Register;