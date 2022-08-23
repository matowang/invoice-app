import CreateClientForm from "../../src/clients/CreateClientForm";
import AuthGuard from "../../src/user/AuthGuard";

const NewClient = () => {
    return (
        <AuthGuard>
            <div className='my-40 mx-20 flex flex-col items-center relative'>
                <div className='max-w-md w-full'>
                    <h1>Create New Client</h1>
                    <CreateClientForm />
                </div>
            </div>
        </AuthGuard>
    )
}

export default NewClient;