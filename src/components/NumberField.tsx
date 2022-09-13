import { TextField, TextFieldProps } from "@mui/material";
import { Control, FieldValues, Path, useController } from "react-hook-form";

import { ReactNode } from "react";

interface NumberFieldProps<TFieldValues extends FieldValues> {
	disabled?: boolean;
	label?: string;
	errorMsg?: ReactNode;
	inputProps?: TextFieldProps["inputProps"];
	control: Control<TFieldValues>;
	name: Path<TFieldValues>;
}

const NumberField = <TFieldValues extends FieldValues>({
	disabled,
	label,
	errorMsg,
	inputProps,
	control,
	name,
}: NumberFieldProps<TFieldValues>) => {
	const {
		field: { onChange, value },
	} = useController({
		name,
		control,
	});
	return (
		<TextField
			onChange={(e) => {
				onChange(parseInt(e.target.value) || 0);
			}}
			error={!!errorMsg}
			value={value || ""}
			helperText={errorMsg && <span data-test='client-invoice-item-value-error'>{errorMsg}</span>}
			disabled={disabled}
			label={label}
			inputProps={inputProps}
		/>
	);
};

export default NumberField;
