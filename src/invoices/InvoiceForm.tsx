import { Button, TextField } from "@mui/material";
import { Controller, useFieldArray, useForm, useWatch } from "react-hook-form";

import DatePickerField from "../components/formFields/DatePickerField";
import AutocompleteField from "../components/formFields/AutoCompleteField";
import ContainedButton from "../components/ContainedButton";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { ClientCompanyNameDTO } from "../api/clients";
import { ReactNode, useEffect } from "react";
import NumberField from "../components/formFields/NumberField";

// "invoice": {
//     "user_id": "111",
//     "invoiceNumber": "1234",
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
		dueDate: z
			.number({
				required_error: "Due Date is required",
				invalid_type_error: "Must be a valid date.",
			})
			.int()
			.min(1, "Must be a valid date."),
		invoiceNumber: z.string().min(3, "Invoice Number must be 3 or more characters."),
		projectCode: z.string().min(3, "Project Code must be 3 or more characters.").optional(),
		meta: z.object({}).optional(),
		items: z
			.array(
				z.object({
					description: z.string().min(3, "Item Description must be 3 or more characters."),
					price: z.number().positive(),
				})
			)
			.min(1, "Must include atleast 1 invoice item"),
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
		value: z
			.number()
			.optional()
			.transform((value) => value || 0),
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
	defaultValues?: Partial<InvoiceFormValues>;
	clientsCompanyNames: ClientCompanyNameDTO[];
	isLoadingClientsCompanyNames?: boolean;
	resetOnSuccesfulSubmit?: boolean;
	submitText?: ReactNode;
}

// TODO fix date to integrate with prisma

const InvoiceForm = ({
	onSubmit,
	formError,
	disabled,
	defaultValues,
	clientsCompanyNames,
	isLoadingClientsCompanyNames,
	resetOnSuccesfulSubmit: resetOnSuccessfulSubmit,
	submitText,
}: InvoiceFormProps) => {
	const {
		handleSubmit: handleFormHookSubmit,
		formState: { errors, isSubmitSuccessful, isSubmitted, dirtyFields },
		control,
		register,
		reset,
		setValue,
	} = useForm<InvoiceFormValues>({
		resolver: zodResolver(InvoiceValuesSchema),
		defaultValues: {
			meta: {
				...defaultValues?.meta,
			},
			items: defaultValues?.items?.length ? defaultValues?.items : [{}],
			...defaultValues,
		},
	});

	const {
		fields: itemsFields,
		append,
		remove: removeItem,
	} = useFieldArray({
		control,
		name: "items",
	});

	const handleSubmit = async (data: InvoiceFormValues) => {
		console.log(JSON.stringify(data));
		if (disabled) return;
		await onSubmit?.(data);
	};

	//clear values on submit
	useEffect(() => {
		if (resetOnSuccessfulSubmit && isSubmitSuccessful)
			reset(undefined, { keepDefaultValues: true, keepSubmitCount: true });
	}, [isSubmitSuccessful, reset, resetOnSuccessfulSubmit]);

	//set value sum
	const items = useWatch({ name: "items", control: control });
	useEffect(() => {
		const total = items.reduce((a, { price }) => a + price, 0);
		setValue("value", total, { shouldValidate: isSubmitted });
	}, [items, setValue, isSubmitted]);

	return (
		<>
			{formError && (
				<p className='text-red-400' data-test='form-error'>
					{formError}
				</p>
			)}
			{errors.items && (
				<p className='text-red-400' data-test='form-error'>
					{errors.items.message}
				</p>
			)}
			<form
				onSubmit={handleFormHookSubmit(handleSubmit)}
				className='grid grid-cols-1 md:grid-cols-2 gap-5 items-start relative md:h-20 '>
				<div className='grid gap-5 py-4'>
					<DatePickerField
						name='date'
						control={control}
						inputProps={{ "data-test": "invoice-date" }}
						label='Date'
						errorMsg={
							errors.date && <span data-test='invoice-date-error'>{errors.date.message}</span>
						}
						disabled={disabled}
					/>
					<DatePickerField
						name='dueDate'
						control={control}
						inputProps={{ "data-test": "invoice-due-date" }}
						label='Due Date'
						errorMsg={
							errors.dueDate && (
								<span data-test='invoice-due-date-error'>{errors.dueDate.message}</span>
							)
						}
						disabled={disabled}
					/>
					<TextField
						{...register("invoiceNumber")}
						label='Invoice Number'
						placeholder='1234'
						error={!!errors.invoiceNumber}
						helperText={
							errors.invoiceNumber && (
								<span data-test='invoice-number-error'>{errors.invoiceNumber?.message}</span>
							)
						}
						disabled={disabled}
						inputProps={{ "data-test": "invoice-number" }}
					/>
					<TextField
						{...register("projectCode")}
						label='Invoice Project Code'
						placeholder='A1234567'
						error={!!errors.projectCode}
						helperText={
							errors.projectCode && (
								<span data-test='invoice-project-code-error'>{errors.projectCode?.message}</span>
							)
						}
						disabled={disabled}
						inputProps={{ "data-test": "invoice-project-code" }}
					/>
					<AutocompleteField
						name='clientCompany'
						control={control}
						options={clientsCompanyNames}
						label='Client Company Name'
						getOptionLabel={(option) => option.companyName}
						isOptionEqualToValue={(option, value) => option.id === value.id}
						disabled={disabled}
						loading={!!isLoadingClientsCompanyNames}
						inputProps={{ "data-test": "invoice-company-id" }}
						errorMsg={
							errors.clientCompany && (
								<span data-test='invoice-company-id-error'>{errors.clientCompany?.message}</span>
							)
						}
					/>
				</div>
				<div className='grid gap-5 py-4 h-full md:overflow-y-scroll'>
					{itemsFields.map((field, i) => (
						<div
							className='grid gap-2 px-4 py-6 border-2 border-slate-200 border-solid rounded-lg relative'
							key={`invoice-item-${field.id}`}
							data-test={`invoice-item-${i}`}>
							<div className='absolute transform -translate-y-1/2 bg-white top-0 left-2 text-xs text-slate-500 p-2'>{`Invoice Item ${i}`}</div>
							<TextField
								{...register(`items.${i}.description`)}
								error={!!errors.items?.[i]?.description}
								helperText={
									errors.items?.[i]?.description && (
										<span data-test='invoice-item-description-error'>
											{errors.items[i]?.description?.message}
										</span>
									)
								}
								inputProps={{ "data-test": `invoice-item-description` }}
								disabled={disabled}
								label='Description'
							/>
							<NumberField
								name={`items.${i}.price`}
								control={control}
								label='Price'
								disabled={disabled}
								errorMsg={
									errors.items?.[i]?.price && (
										<span data-test='invoice-item-price-error'>
											{errors.items[i]?.price?.message}
										</span>
									)
								}
								inputProps={{ "data-test": `invoice-item-price` }}
							/>
							{i !== 0 && (
								<Button
									variant='outlined'
									disabled={disabled}
									data-test='invoice-remove-item'
									onClick={() => removeItem(i)}>
									Remove Invoice Item
								</Button>
							)}
						</div>
					))}
					<Button
						variant='outlined'
						className='py-12'
						disabled={disabled}
						data-test='invoice-add-item'
						onClick={() =>
							append({
								description: "",
								price: 0,
							})
						}>
						Add Invoice Item +
					</Button>
				</div>
				<Controller
					name={`value`}
					control={control}
					defaultValue={0}
					render={({ field: { value } }) => (
						<TextField
							error={!!errors.value}
							value={value || 0}
							helperText={
								errors.value && <span data-test='invoice-value-error'>{errors.value.message}</span>
							}
							disabled={disabled}
							label={`Total Value`}
							className='col-span-1 md:col-span-2'
							inputProps={{ "data-test": "invoice-value" }}
						/>
					)}
				/>
				<div className='col-span-1 md:col-span-2'>
					<ContainedButton type='submit' disabled={disabled} data-test='submit-invoice'>
						{submitText || "Submit"}
					</ContainedButton>
				</div>
			</form>
		</>
	);
};

export default InvoiceForm;
