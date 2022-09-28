import { DesktopDatePicker } from "@mui/x-date-pickers";
import { TextField, TextFieldProps } from "@mui/material";

import dayjs from "dayjs";

import { ReactNode } from "react";
import { Control, FieldValues, Path, PathValue, useController } from "react-hook-form";

interface DatePickerProps<TFieldValues extends FieldValues> {
	disabled?: boolean;
	label?: string;
	errorMsg?: ReactNode;
	inputProps: TextFieldProps["inputProps"];
	control: Control<TFieldValues>;
	name: Path<TFieldValues>;
}

const DatePickerField = <TFieldValues extends FieldValues>({
	disabled,
	errorMsg,
	inputProps,
	label,
	name,
	control,
}: DatePickerProps<TFieldValues>) => {
	const {
		field: { onChange, value },
	} = useController({
		name,
		control,
	});
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
export default DatePickerField;
