import { Button, TextField } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { number, z } from "zod";

// "invoice": {
//     "user_id": "111",
//     "invoice_number": "1234",
//     "client_id": "1644482450322",
//     "date": 1644492351880,
//     "dueDate": 1647084351880,
//     "value": 1234,
//     "id": "1644492391138"
// },

const InvoiceValuesSchema = z.object({
	date: z.number().int().min(1, "Must be a valid date."),
	dueDate: z.number().int().min(1, "Must be a valid date."),
	invoice_number: z.string().min(3, "Invoice Number must be 3 or more characters."),
	meta: z.object({
		projectCode: z.string().min(3, "Project Code must be 3 or more characters.").optional(),
		invoiceItems: z.object({
			description: z.string().min(3, "Item Description must be 3 or more characters."),
			value: z.number().positive(),
		}),
	}),
	client_id: z.string(),
});

export type InvoiceValues = z.infer<typeof InvoiceValuesSchema>;

interface InvoiceFormProps {
	onSubmit?: (data: InvoiceValues) => void;
	formError?: string | null;
	disabled?: boolean;
	defaultValues?: InvoiceValues;
}

const CreateInvoiceForm = ({ onSubmit, formError, disabled, defaultValues }: InvoiceFormProps) => {
	const {
		register,
		handleSubmit: handleFormHookSubmit,
		formState: { errors },
	} = useForm<InvoiceValues>({
		resolver: zodResolver(InvoiceValuesSchema),
	});
	const handleSubmit = async (data: InvoiceValues) => {
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
					type='date'
					{...register("date")}
					label='date'
					defaultValue={defaultValues?.date}
					error={!!errors.date}
					helperText={
						errors.date && <span data-test='client-date-error'>{errors.date?.message}</span>
					}
					inputProps={{ "data-test": "client-date" }}
				/>
				{/* <TextField
					{...register("name")}
					label='Name'
					defaultValue={defaultValues?.name}
					placeholder='Matthew Wang'
					error={!!errors.name}
					helperText={errors.name && <span data-test='client-name-error'>{errors.name?.message}</span>}
					disabled={disabled}
					inputProps={{ "data-test": "client-name" }}
				/>
				<TextField
					{...register("companyDetails.name")}
					label='Company Name'
					defaultValue={defaultValues?.companyDetails.name}
					placeholder='Toptal'
					error={!!errors.companyDetails?.name}
					helperText={errors.companyDetails?.name && <span data-test='client-company-name-error'>{errors.companyDetails?.name?.message}</span>}
					disabled={disabled}
					inputProps={{ "data-test": "client-company-name" }}
				/>
				<TextField
					{...register("companyDetails.vatNumber")}
					label='Company VAT Number'
					defaultValue={defaultValues?.companyDetails.vatNumber}
					placeholder='123456789'
					error={!!errors.companyDetails?.vatNumber}
					helperText={errors.companyDetails?.vatNumber && <span data-test='client-company-vat-error'>{errors.companyDetails?.vatNumber?.message}</span>}
					disabled={disabled}
					inputProps={{ "data-test": "client-company-vat" }}
				/>
				<TextField
					{...register("companyDetails.regNumber")}
					label='Company Registration number'
					defaultValue={defaultValues?.companyDetails.regNumber}
					placeholder='OC123456'
					error={!!errors.companyDetails?.regNumber}
					helperText={errors.companyDetails?.regNumber && <span data-test='client-company-reg-error'>{errors.companyDetails?.regNumber?.message}</span>}
					disabled={disabled}
					inputProps={{ "data-test": "client-company-reg" }}
				/>
				<TextField
					{...register("companyDetails.address")}
					label='Company Address'
					defaultValue={defaultValues?.companyDetails.address}
					placeholder='CA LA example st.'
					error={!!errors.companyDetails?.address}
					helperText={errors.companyDetails?.address && <span data-test='client-company-address-error'>{errors.companyDetails?.address?.message}</span>}
					disabled={disabled}
					inputProps={{ "data-test": "client-company-address" }}
				/>
				<TextField
					{...register("companyDetails.iban")}
					label='Company IBAN'
					defaultValue={defaultValues?.companyDetails.iban}
					placeholder='AL472121100900000002356987411'
					error={!!errors.companyDetails?.iban}
					helperText={errors.companyDetails?.iban && <span data-test='client-company-iban-error'>{errors.companyDetails?.iban?.message}</span>}
					disabled={disabled}
					inputProps={{ "data-test": "client-company-iban" }}
				/>
				<TextField
					{...register("companyDetails.swift")}
					label='Company SWIFT Code'
					defaultValue={defaultValues?.companyDetails.swift}
					placeholder='BOFAUS3N'
					error={!!errors.companyDetails?.swift}
					helperText={errors.companyDetails?.swift && <span data-test='client-company-swift-error'> {errors.companyDetails?.swift?.message} </span>}
					disabled={disabled}
					inputProps={{ "data-test": "client-company-swift" }}
				/> */}
				<Button type='submit' variant='contained' disabled={disabled} data-test='submit-client'>
					Submit
				</Button>
			</form>
		</>
	);
};

export default CreateInvoiceForm;
