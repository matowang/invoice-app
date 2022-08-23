import axios from "axios";

import { useAlert } from "../components/AlertContext";
import { useCreateClient } from "./useCreateClient";
import { useState } from "react";

import ClientForm from "./ClientForm";
import LinearLoader from "../components/LinearLoader";

interface ClientFormContainerProps {
    onSubmitSuccess?: () => unknown;
}

const CreateClientForm = ({ onSubmitSuccess }: ClientFormContainerProps) => {

    const { showAlert } = useAlert();
    const [formError, setFormError] = useState<string | null>(null);
    const { mutate, isLoading } = useCreateClient();

    return <>
        <LinearLoader loading={isLoading} />
        <ClientForm
            formError={formError}
            disabled={isLoading}
            onSubmit={(clientValues) => {
                mutate(clientValues, {
                    onSuccess: () => {
                        showAlert("Added Client Successfully.", 'success');
                        onSubmitSuccess?.();
                        setFormError(null);
                    },
                    onError: (err) => {
                        console.log(err);
                        if (!axios.isAxiosError(err) || typeof err.response?.data !== 'string')
                            return showAlert("Something went wrong.");
                        showAlert(err.response.data);
                        setFormError(err.response.data);
                    }
                });
            }} />
    </>
}

export default CreateClientForm;