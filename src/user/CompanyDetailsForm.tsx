import { zodResolver } from "@hookform/resolvers/zod";
import { Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";

import { z } from "zod";

const CompanyDetailsSchema = z.object({
	name: z
		.string()
		.min(3, "Company name must contain more than 3 characters.")
		.max(16, "Company name can't contain more than 16 characters."),
	address: z.string().min(1, "This field is required"),
	vatNumber: z.string().min(1, "This field is required"),
	regNumber: z.string().min(1, "This field is required"),
	iban: z.string().optional(),
	swift: z.string().optional(),
});

export type CompanyDetails = z.infer<typeof CompanyDetailsSchema>;

interface CompanyDetailsFormProps {
	disabled: boolean;
	formError: string | null;
	onSubmit: (data: CompanyDetails) => unknown;
	defaultCompanyValues?: CompanyDetails;
}

const CompanyDetailsForm = ({
	disabled,
	onSubmit,
	defaultCompanyValues,
	formError,
}: CompanyDetailsFormProps) => {
	const {
		register,
		handleSubmit: handleFormHookSubmit,
		formState: { errors },
	} = useForm<CompanyDetails>({
		resolver: zodResolver(CompanyDetailsSchema),
		defaultValues: defaultCompanyValues,
	});

	const handleSubmit = async (data: CompanyDetails) => {
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
			<form onSubmit={handleFormHookSubmit(handleSubmit)} className='flex flex-col gap-5'>
				<TextField
					{...register("name")}
					label='Company Name'
					placeholder='Toptal'
					error={!!errors.name}
					helperText={
						errors.name && <span data-test='company-name-error'>{errors.name?.message}</span>
					}
					disabled={disabled}
					inputProps={{ "data-test": "company-name" }}
				/>
				<TextField
					{...register("address")}
					label='Company Address'
					error={!!errors.address}
					helperText={
						errors.name && <span data-test='company-address-error'>{errors.address?.message}</span>
					}
					disabled={disabled}
					inputProps={{ "data-test": "company-address" }}
				/>
				<TextField
					{...register("vatNumber")}
					label='VAT Number'
					placeholder='123456789'
					error={!!errors.vatNumber}
					helperText={
						errors.name && <span data-test='company-vat-error'>{errors.vatNumber?.message}</span>
					}
					disabled={disabled}
					inputProps={{ "data-test": "company-vat" }}
				/>
				<TextField
					{...register("regNumber")}
					label='Registration number'
					placeholder='OC123456'
					error={!!errors.regNumber}
					helperText={
						errors.name && <span data-test='company-reg-error'>{errors.regNumber?.message}</span>
					}
					disabled={disabled}
					inputProps={{ "data-test": "company-reg-number" }}
				/>
				<TextField
					{...register("iban")}
					label='International Bank Account Number (IBAN)'
					placeholder='AL472121100900000002356987411'
					error={!!errors.iban}
					helperText={
						errors.name && <span data-test='company-iban-error'>{errors.iban?.message}</span>
					}
					disabled={disabled}
					inputProps={{ "data-test": "company-iban" }}
				/>
				<TextField
					{...register("swift")}
					label='SWIFT code'
					placeholder='BOFAUS3N'
					error={!!errors.swift}
					helperText={
						errors.name && <span data-test='company-swift-error'>{errors.swift?.message}</span>
					}
					disabled={disabled}
					inputProps={{ "data-test": "company-swift" }}
				/>
				<Button
					type='submit'
					variant='contained'
					disabled={disabled}
					data-test='submit-company-details'
				>
					Submit
				</Button>
			</form>
		</>
	);
};

export default CompanyDetailsForm;
