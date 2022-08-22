import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuth } from "../src/user/AuthContext";
import PageLoader from "../src/components/PageLoader";
import CompanyDetailsFormContainer from "../src/user/CompanyDetailsFormContainer";

const Register = () => {

    const { loading, user } = useAuth();
    const router = useRouter();
    useEffect(() => {
        if (!loading && !user)
            router.push('/login');

    }, [loading, user]);
    if (!user)
        return <PageLoader />;

    return (
        <div className='my-40 mx-20 flex flex-col items-center relative'>
            <div className='max-w-md w-full'>
                <CompanyDetailsFormContainer onSubmitSuccess={() => { router.push('/') }} />
            </div>
        </div>)
}

export default Register;