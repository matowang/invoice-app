import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { ReactNode } from "react";

interface SelectFieldProps {
	value: string;
	options: { value: string | number; label: ReactNode }[];
	onChange: (value: string | number) => void;
}

const SelectField = ({ value, options, onChange }: SelectFieldProps) => {
	return (
		<FormControl>
			<InputLabel>Age</InputLabel>
			<Select
				labelId='demo-simple-select-label'
				id='demo-simple-select'
				value={value}
				label='Age'
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
