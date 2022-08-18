import { createContext, ReactNode, useContext, useState } from "react";
import { Snackbar, Alert } from '@mui/material';
import { AlertColor } from "@mui/material/Alert";


interface AlertContextType {
    showAlert: (msg: string, type?: AlertColor) => void;
}

interface AlertProviderProps {
    children: ReactNode
}

const AlertContext = createContext<AlertContextType | null>(null);

export const useAlert = () => {
    const ctx = useContext(AlertContext);
    if (ctx === null)
        throw new Error("You cannot use Alert Context without Alert Provider");
    return ctx;
};

export const AlertProvider = ({ children }: AlertProviderProps) => {
    const [open, setOpen] = useState<boolean>(false);
    const [alertType, setAlertType] = useState<AlertColor>("success");
    const [alertMessage, setAlterMessage] = useState<string>("Alert");

    const showAlert = (msg: string, type: AlertColor = 'error'): void => {
        setAlertType(type);
        setAlterMessage(msg.toString());
        setOpen(true);
    }

    return (
        <AlertContext.Provider value={{ showAlert }}>
            {children}
            <Snackbar open={open} autoHideDuration={6000} onClose={() => setOpen(false)}>
                <Alert onClose={() => setOpen(false)} severity={alertType} sx={{ width: '100%' }}>
                    {alertMessage}
                </Alert>
            </Snackbar>
        </AlertContext.Provider>
    )
}