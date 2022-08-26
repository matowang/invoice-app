import { Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";

// user_id: string;
// email: string;
// name: string;
// companyDetails: {
//     name: string;
//     vatNumber: string;
//     regNumber: string;
//     address: string;
// };

const ClientValuesSchema = z.object({
	email: z.string().email(),
	name: z.string(),
	companyDetails: z.object({
		name: z.string(),
		vatNumber: z.string(),
		regNumber: z.string(),
		address: z.string(),
	}),
});

export type ClientValues = z.infer<typeof ClientValuesSchema>;

interface ClientFormProps {
	onSubmit: (data: ClientValues) => void;
	formError: string | null;
	disabled: boolean;
	defaultValues?: ClientValues;
}

const ClientForm = ({
	onSubmit,
	formError,
	disabled,
	defaultValues,
}: ClientFormProps) => {
	const {
		register,
		handleSubmit: handleFormHookSubmit,
		formState: { errors },
	} = useForm<ClientValues>({
		resolver: zodResolver(ClientValuesSchema),
	});

	const handleSubmit = async (data: ClientValues) => {
		if (disabled) return;
		await onSubmit(data);
	};

	return (
		<>
			{formError && (
				<p className='text-red-400' data-test='form-error'>
					{formError}
				</p>
			)}
			<form
				onSubmit={handleFormHookSubmit(handleSubmit)}
				className='flex flex-col gap-5'
			>
				<TextField
					{...register("email")}
					label='Email'
					defaultValue={defaultValues?.email}
					placeholder='myemail@toptal.com'
					error={!!errors.email}
					helperText={errors.email?.message}
					disabled={disabled}
				/>
				<TextField
					{...register("name")}
					label='Name'
					defaultValue={defaultValues?.name}
					placeholder='Matthew Wang'
					error={!!errors.name}
					helperText={errors.name?.message}
					disabled={disabled}
				/>
				<TextField
					{...register("companyDetails.name")}
					label='Company Name'
					defaultValue={defaultValues?.companyDetails.name}
					placeholder='Toptal'
					error={!!errors.companyDetails?.name}
					helperText={errors.companyDetails?.name?.message}
					disabled={disabled}
				/>
				<TextField
					{...register("companyDetails.vatNumber")}
					label='Company VAT Number'
					defaultValue={defaultValues?.companyDetails.vatNumber}
					placeholder='123456789'
					error={!!errors.companyDetails?.vatNumber}
					helperText={errors.companyDetails?.vatNumber?.message}
					disabled={disabled}
				/>
				<TextField
					{...register("companyDetails.regNumber")}
					label='Company Registration number'
					defaultValue={defaultValues?.companyDetails.regNumber}
					placeholder='OC123456'
					error={!!errors.companyDetails?.regNumber}
					helperText={errors.companyDetails?.regNumber?.message}
					disabled={disabled}
				/>
				<TextField
					{...register("companyDetails.address")}
					label='Company Address'
					defaultValue={defaultValues?.companyDetails.address}
					placeholder='CA LA example st.'
					error={!!errors.companyDetails?.address}
					helperText={errors.companyDetails?.address?.message}
					disabled={disabled}
				/>
				<Button type='submit' variant='contained' disabled={disabled}>
					Submit
				</Button>
			</form>
		</>
	);
};

export default ClientForm;
