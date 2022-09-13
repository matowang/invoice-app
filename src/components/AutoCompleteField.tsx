import { Autocomplete, TextField, TextFieldProps } from "@mui/material";

import { ReactNode } from "react";
import { Control, FieldValues, Path, useController } from "react-hook-form";

interface AutocompleteFieldProps<TOption, TFieldValues extends FieldValues> {
	options: TOption[];
	disabled?: boolean;
	label?: string;
	errorMsg?: ReactNode;
	inputProps?: TextFieldProps["inputProps"];
	getOptionLabel?: (option: TOption) => string;
	isOptionEqualToValue: (option: TOption, value: TOption) => boolean;
	loading: boolean;
	control: Control<TFieldValues>;
	name: Path<TFieldValues>;
}

const AutocompleteField = <TOption extends unknown, TFieldValues extends FieldValues>({
	options,
	disabled,
	label,
	errorMsg,
	inputProps,
	getOptionLabel,
	isOptionEqualToValue,
	loading,
	control,
	name,
}: AutocompleteFieldProps<TOption, TFieldValues>) => {
	const {
		field: { onChange, value },
	} = useController({
		name,
		control,
	});
	return (
		<Autocomplete
			disablePortal
			onChange={(e, value) => onChange(value)}
			value={value || null}
			options={options}
			getOptionLabel={getOptionLabel}
			isOptionEqualToValue={isOptionEqualToValue}
			loading={loading}
			disabled={disabled}
			renderInput={(params) => (
				<TextField
					{...params}
					error={!!errorMsg}
					helperText={errorMsg && errorMsg}
					label={label}
					inputProps={{ ...params.inputProps, ...inputProps }}
				/>
			)}
		/>
	);
};
export default AutocompleteField;
