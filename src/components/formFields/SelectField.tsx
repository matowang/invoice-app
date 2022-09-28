import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { ReactNode } from "react";

interface SelectFieldProps {
	value?: string;
	options: { value?: string | number; label: ReactNode }[];
	onChange: (value?: string | number) => void;
	label?: ReactNode;
}

const SelectField = ({ value, options, onChange, label }: SelectFieldProps) => {
	return (
		<FormControl fullWidth size='small'>
			<InputLabel>{label}</InputLabel>
			<Select
				sx={{ height: "100%" }}
				labelId='demo-simple-select-label'
				id='demo-simple-select'
				value={value}
				label={label}
				onChange={(e) => onChange(e.target.value)}
			>
				{options.map(({ value, label }) => (
					<MenuItem value={value} key={value}>
						{label}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
};

export default SelectField;
