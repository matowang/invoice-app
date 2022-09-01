import { Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";

const ClientValuesSchema = z.object({
	email: z.string().email(),
	name: z.string().min(1, "Name must be included"),
	companyDetails: z.object({
		name: z.string().min(1, "Company Name must be included"),
		vatNumber: z.string().min(1, "VAG Number must be included"),
		regNumber: z.string().min(1, "Company Registration must be included"),
		address: z.string().min(1, "Company Address must be included"),
		swift: z.string().optional(),
		iban: z.string().optional(),
	}),
});

export type ClientValues = z.infer<typeof ClientValuesSchema>;

interface ClientFormProps {
	onSubmit?: (data: ClientValues) => void;
	formError?: string | null;
	disabled?: boolean;
	defaultValues?: ClientValues;
}

const ClientForm = ({ onSubmit, formError, disabled, defaultValues }: ClientFormProps) => {
	const {
		register,
		handleSubmit: handleFormHookSubmit,
		formState: { errors },
	} = useForm<ClientValues>({
		resolver: zodResolver(ClientValuesSchema),
		defaultValues: defaultValues,
	});
	const handleSubmit = async (data: ClientValues) => {
		if (disabled) return;
		await onSubmit?.(data);
	};
	return (
		<>
			{formError && (
				<p className='text-red-400' data-test='form-error'>
					{formError}
				</p>
			)}
			<form onSubmit={handleFormHookSubmit(handleSubmit)} className='flex flex-col gap-5'>
				<TextField
					{...register("email")}
					label='Email'
					placeholder='myemail@toptal.com'
					error={!!errors.email}
					helperText={
						errors.email && <span data-test='client-email-error'>{errors.email?.message}</span>
					}
					disabled={disabled}
					inputProps={{ "data-test": "client-email" }}
				/>
				<TextField
					{...register("name")}
					label='Name'
					placeholder='Matthew Wang'
					error={!!errors.name}
					helperText={
						errors.name && <span data-test='client-name-error'>{errors.name?.message}</span>
					}
					disabled={disabled}
					inputProps={{ "data-test": "client-name" }}
				/>
				<TextField
					{...register("companyDetails.name")}
					label='Company Name'
					placeholder='Toptal'
					error={!!errors.companyDetails?.name}
					helperText={
						errors.companyDetails?.name && (
							<span data-test='client-company-name-error'>
								{errors.companyDetails?.name?.message}
							</span>
						)
					}
					disabled={disabled}
					inputProps={{ "data-test": "client-company-name" }}
				/>
				<TextField
					{...register("companyDetails.vatNumber")}
					label='Company VAT Number'
					placeholder='123456789'
					error={!!errors.companyDetails?.vatNumber}
					helperText={
						errors.companyDetails?.vatNumber && (
							<span data-test='client-company-vat-error'>
								{errors.companyDetails?.vatNumber?.message}
							</span>
						)
					}
					disabled={disabled}
					inputProps={{ "data-test": "client-company-vat" }}
				/>
				<TextField
					{...register("companyDetails.regNumber")}
					label='Company Registration number'
					placeholder='OC123456'
					error={!!errors.companyDetails?.regNumber}
					helperText={
						errors.companyDetails?.regNumber && (
							<span data-test='client-company-reg-error'>
								{errors.companyDetails?.regNumber?.message}
							</span>
						)
					}
					disabled={disabled}
					inputProps={{ "data-test": "client-company-reg" }}
				/>
				<TextField
					{...register("companyDetails.address")}
					label='Company Address'
					placeholder='CA LA example st.'
					error={!!errors.companyDetails?.address}
					helperText={
						errors.companyDetails?.address && (
							<span data-test='client-company-address-error'>
								{errors.companyDetails?.address?.message}
							</span>
						)
					}
					disabled={disabled}
					inputProps={{ "data-test": "client-company-address" }}
				/>
				<TextField
					{...register("companyDetails.iban")}
					label='Company IBAN'
					placeholder='AL472121100900000002356987411'
					error={!!errors.companyDetails?.iban}
					helperText={
						errors.companyDetails?.iban && (
							<span data-test='client-company-iban-error'>
								{errors.companyDetails?.iban?.message}
							</span>
						)
					}
					disabled={disabled}
					inputProps={{ "data-test": "client-company-iban" }}
				/>
				<TextField
					{...register("companyDetails.swift")}
					label='Company SWIFT Code'
					placeholder='BOFAUS3N'
					error={!!errors.companyDetails?.swift}
					helperText={
						errors.companyDetails?.swift && (
							<span data-test='client-company-swift-error'>
								{" "}
								{errors.companyDetails?.swift?.message}{" "}
							</span>
						)
					}
					disabled={disabled}
					inputProps={{ "data-test": "client-company-swift" }}
				/>
				<Button type='submit' variant='contained' disabled={disabled} data-test='submit-client'>
					Submit
				</Button>
			</form>
		</>
	);
};

export default ClientForm;
