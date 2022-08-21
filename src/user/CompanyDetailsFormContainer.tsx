import CompanyDetailsForm from "./CompanyDetailsForm"
import AuthAPI from '../api/auth';
import { useState } from "react";
import { useAlert } from "../components/AlertContext";
import LinearLoader from "../components/LinearLoader";
import { useAuth } from "./AuthContext";

interface CompanyDetailsFormContainerProps {
    onSubmitSuccess: () => unknown;
}

const CompanyDetailsFormContainer = ({ onSubmitSuccess }: CompanyDetailsFormContainerProps) => {

    const { showAlert } = useAlert();
    const { updateUser, user } = useAuth();

    const [formError, setFormError] = useState<string | null>(null);
    const [disabled, setDisabled] = useState<boolean>(false);

    return <>
        <LinearLoader loading={disabled} />
        <CompanyDetailsForm
            defaultCompanyValues={user?.companyDetails}
            formError={formError}
            disabled={disabled}
            onSubmit={async (data) => {
                setDisabled(true);
                try {
                    const newUser = await AuthAPI.setCompanyDetails(data);
                    updateUser(newUser);
                    onSubmitSuccess();
                } catch (err) {
                    showAlert("Something went wrong");
                    setDisabled(false);
                }
            }} />
    </>
}

export default CompanyDetailsFormContainer;