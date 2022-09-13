import { DesktopDatePicker } from "@mui/x-date-pickers";
import { TextField, TextFieldProps } from "@mui/material";

import dayjs from "dayjs";

import { ReactNode } from "react";

interface DatePickerProps {
	onChange: (...event: any[]) => void;
	value: number;
	disabled?: boolean;
	label?: string;
	errorMsg?: ReactNode;
	inputProps: TextFieldProps["inputProps"];
}

const DatePicker = ({
	onChange,
	value,
	disabled,
	errorMsg,
	inputProps,
	label,
}: DatePickerProps) => {
	return (
		<DesktopDatePicker
			onChange={(value) => onChange(value?.valueOf())}
			value={value ? dayjs(value) : null}
			disabled={disabled}
			label={label}
			renderInput={(params) => (
				<TextField
					{...params}
					error={!!errorMsg}
					helperText={errorMsg || "mm/dd/yyyy"}
					inputProps={{ ...params.inputProps, ...inputProps }}
					InputLabelProps={{
						shrink: true,
					}}
				/>
			)}
		/>
	);
};
export default DatePicker;
