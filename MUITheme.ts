import type {} from "@mui/x-date-pickers/themeAugmentation";

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
	palette: {
		mode: "light",
		primary: {
			main: "#008088",
		},
	},
	components: {
		MuiTextField: {
			styleOverrides: {
				root: {
					"& .MuiInputBase-input": {
						background: "white",
					},
				},
			},
		},
	},
});

export default theme;
