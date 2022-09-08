import { Autocomplete, Button, TextField } from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";

import dayjs from "dayjs";

import { ClientCompanyNameDTO } from "../api/clients";
import { ReactNode, useEffect } from "react";

// "invoice": {
//     "user_id": "111",
//     "invoice_number": "1234",
//     "client_id": "1644482450322",
//     "date": 1644492351880,
//     "dueDate": 1647084351880,
//     "value": 1234,
//     "id": "1644492391138"
// },

const InvoiceValuesSchema = z
	.object({
		date: z
			.number({ required_error: "Date is required", invalid_type_error: "Must be a valid date." })
			.int("Must be a valid date."),
		dueDate: z.number().int().min(1, "Must be a valid date."),
		invoice_number: z.string().min(3, "Invoice Number must be 3 or more characters."),
		projectCode: z.string().min(3, "Project Code must be 3 or more characters.").optional(),
		meta: z
			.object({
				items: z
					.array(
						z.object({
							description: z.string().min(3, "Item Description must be 3 or more characters."),
							value: z.number().positive(),
						})
					)
					.min(1, "Must include atleast 1 invoice item"),
			})
			.optional(),
		clientCompany: z.object(
			{
				id: z.string().min(1),
				companyName: z.string({
					required_error: "Company Name is Required",
					invalid_type_error: "Must be a valid Company Name",
				}),
			},
			{
				required_error: "Company Name is Required",
				invalid_type_error: "Must be a valid Company Name",
			}
		),
	})
	.refine(({ date, dueDate }) => dueDate >= date, {
		message: "Due Date must be later than Date",
		path: ["dueDate"],
	});

export type InvoiceFormValues = z.infer<typeof InvoiceValuesSchema>;

interface InvoiceFormProps {
	onSubmit?: (data: InvoiceFormValues) => void;
	formError?: string | null;
	disabled?: boolean;
	defaultValues?: InvoiceFormValues;
	clientsCompanyNames: ClientCompanyNameDTO[];
	isLoadingClientsCompanyNames?: boolean;
	resetOnSuccesfulSubmit?: boolean;
	submitText?: ReactNode;
}

const InvoiceForm = ({
	onSubmit,
	formError,
	disabled,
	defaultValues,
	clientsCompanyNames,
	isLoadingClientsCompanyNames,
	resetOnSuccesfulSubmit,
	submitText,
}: InvoiceFormProps) => {
	const {
		handleSubmit: handleFormHookSubmit,
		formState: { errors, isSubmitSuccessful },
		control,
		register,
		reset,
	} = useForm<InvoiceFormValues>({
		resolver: zodResolver(InvoiceValuesSchema),
		defaultValues: {
			meta: {
				items: [{}],
			},
			...defaultValues,
		},
	});
	const {
		fields: itemsFields,
		append,
		remove: removeItem,
	} = useFieldArray({
		control,
		name: "meta.items",
	});

	const handleSubmit = async (data: InvoiceFormValues) => {
		if (disabled) return;
		await onSubmit?.(data);
	};

	//clear values on submit
	useEffect(() => {
		if (resetOnSuccesfulSubmit && isSubmitSuccessful) reset(undefined, { keepDefaultValues: true });
	}, [isSubmitSuccessful, reset, resetOnSuccesfulSubmit]);

	return (
		<>
			{formError && (
				<p className='text-red-400' data-test='form-error'>
					{formError}
				</p>
			)}
			{errors.meta?.items && (
				<p className='text-red-400' data-test='form-error'>
					{errors.meta?.items.message}
				</p>
			)}
			<form onSubmit={handleFormHookSubmit(handleSubmit)} className='flex flex-col gap-5'>
				<Controller
					name='date'
					control={control}
					render={({ field: { onChange, value } }) => (
						<DesktopDatePicker
							onChange={(value) => onChange(value?.valueOf())}
							value={value ? dayjs(value) : null}
							label='Date'
							disabled={disabled}
							renderInput={(params) => (
								<TextField
									{...params}
									error={!!errors.date}
									helperText={
										errors.date ? (
											<span data-test='client-date-error'>{errors.date?.message}</span>
										) : (
											"mm/dd/yyyy"
										)
									}
									inputProps={{ ...params.inputProps, "data-test": "client-date" }}
									InputLabelProps={{
										shrink: true,
									}}
								/>
							)}
						/>
					)}
				/>
				<Controller
					name='dueDate'
					control={control}
					render={({ field: { onChange, value } }) => (
						<DesktopDatePicker
							onChange={(value) => onChange(value?.valueOf())}
							value={value ? dayjs(value) : null}
							label='Due Date'
							disabled={disabled}
							renderInput={(params) => (
								<TextField
									{...params}
									error={!!errors.dueDate}
									helperText={
										errors.dueDate ? (
											<span data-test='client-due-date-error'>{errors.dueDate?.message}</span>
										) : (
											"mm/dd/yyyy"
										)
									}
									inputProps={{ ...params.inputProps, "data-test": "client-due-date" }}
									InputLabelProps={{
										shrink: true,
									}}
								/>
							)}
						/>
					)}
				/>
				<TextField
					{...register("invoice_number")}
					label='Invoice Number'
					placeholder='1234'
					error={!!errors.invoice_number}
					helperText={
						errors.invoice_number && (
							<span data-test='client-invoice-number-error'>{errors.invoice_number?.message}</span>
						)
					}
					disabled={disabled}
					inputProps={{ "data-test": "client-invoice-number" }}
				/>
				<TextField
					{...register("projectCode")}
					label='Invoice Project Code'
					placeholder='A1234567'
					error={!!errors.projectCode}
					helperText={
						errors.projectCode && (
							<span data-test='client-invoice-project-code-error'>
								{errors.projectCode?.message}
							</span>
						)
					}
					disabled={disabled}
					inputProps={{ "data-test": "client-invoice-project-code" }}
				/>
				<Controller
					name='clientCompany'
					control={control}
					render={({ field: { onChange, value } }) => (
						<Autocomplete
							disablePortal
							onChange={(e, value) => onChange(value)}
							value={value || null}
							options={clientsCompanyNames}
							getOptionLabel={(option) => option.companyName}
							isOptionEqualToValue={(option, value) => option.id === value.id}
							loading={isLoadingClientsCompanyNames}
							renderInput={(params) => (
								<TextField
									{...params}
									error={!!errors.clientCompany}
									helperText={
										errors.clientCompany && (
											<span data-test='client-invoice-project-code-error'>
												{errors.clientCompany?.message}
											</span>
										)
									}
									disabled={disabled}
									label='Client Company Name'
								/>
							)}
						/>
					)}
				/>
				{itemsFields.map((field, i) => (
					<div
						className='grid gap-2 px-4 py-6 border-2 border-slate-200 border-solid rounded-lg relative'
						key={`invoice-item-${field.id}`}
					>
						<div className='absolute transform -translate-y-1/2 bg-white top-0 left-2 text-xs text-slate-500 p-2'>{`Invoice Item ${i}`}</div>
						<TextField
							{...register(`meta.items.${i}.description`)}
							error={!!errors.meta?.items?.[i]?.description}
							helperText={
								errors.meta?.items?.[i]?.description && (
									<span data-test='client-invoice-project-code-error'>
										{errors.meta?.items[i]?.description?.message}
									</span>
								)
							}
							disabled={disabled}
							label='Description'
						/>
						<Controller
							name={`meta.items.${i}.value`}
							control={control}
							render={({ field: { onChange, value } }) => (
								<TextField
									onChange={(e) => onChange(parseInt(e.target.value))}
									error={!!errors.meta?.items?.[i]?.value}
									value={value || ""}
									helperText={
										errors.meta?.items?.[i]?.value && (
											<span data-test='client-invoice-project-code-error'>
												{errors.meta?.items[i]?.value?.message}
											</span>
										)
									}
									disabled={disabled}
									label={`Value`}
								/>
							)}
						/>
						{i !== 0 && (
							<Button
								variant='outlined'
								disabled={disabled}
								data-test='add-invoice-item'
								onClick={() => removeItem(i)}
							>
								Remove Invoice Item
							</Button>
						)}
					</div>
				))}
				<Button
					variant='outlined'
					className='py-12'
					disabled={disabled}
					data-test='add-invoice-item'
					onClick={() =>
						append({
							description: "",
							value: 0,
						})
					}
				>
					Add Invoice Item +
				</Button>
				<Button type='submit' variant='contained' disabled={disabled} data-test='submit-client'>
					{submitText || "Submit"}
				</Button>
			</form>
		</>
	);
};

export default InvoiceForm;
