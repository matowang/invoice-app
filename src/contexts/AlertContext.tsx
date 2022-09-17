import { ReactNode } from "react";
import { Snackbar, Alert } from "@mui/material";
import { AlertColor } from "@mui/material/Alert";

import create from "zustand";

interface AlertProviderProps {
	children: ReactNode;
}

interface AlertState {
	open: boolean;
	alertType: AlertColor;
	alertMsg: ReactNode;
	showAlert: (msg: ReactNode, alertType?: AlertColor) => void;
	closeAlert: () => void;
}

const useAlertStore = create<AlertState>((set) => ({
	open: false,
	alertType: "error",
	alertMsg: "",
	showAlert: (msg, alertType = "error") => {
		console.log(alertType);
		set({ open: true, alertMsg: msg, alertType: alertType });
	},
	closeAlert: () => set({ open: false }),
}));

export const useAlert = () => {
	const showAlert = useAlertStore((state) => state.showAlert);
	return { showAlert };
};

export const AlertProvider = ({ children }: AlertProviderProps) => {
	const { open, alertMsg, alertType, closeAlert } = useAlertStore((state) => state);
	return (
		<>
			{children}
			<Snackbar open={open} autoHideDuration={6000} key={Date.now()} onClose={closeAlert}>
				<Alert onClose={closeAlert} severity={alertType} sx={{ width: "100%" }}>
					{alertMsg}
				</Alert>
			</Snackbar>
		</>
	);
};
