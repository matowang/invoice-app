import { Autocomplete, TextField, TextFieldProps } from "@mui/material";

import { ReactNode } from "react";

interface AutocompleteFieldProps<TOption> {
	onChange: (...event: any[]) => void;
	value: TOption;
	options: TOption[];
	disabled?: boolean;
	label?: string;
	errorMsg?: ReactNode;
	inputProps?: TextFieldProps["inputProps"];
	getOptionLabel?: (option: TOption) => string;
	isOptionEqualToValue: (option: TOption, value: TOption) => boolean;
	loading: boolean;
}

const AutocompleteField = <TOption extends unknown>({
	onChange,
	value,
	options,
	disabled,
	label,
	errorMsg,
	inputProps,
	getOptionLabel,
	isOptionEqualToValue,
	loading,
}: AutocompleteFieldProps<TOption>) => {
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
