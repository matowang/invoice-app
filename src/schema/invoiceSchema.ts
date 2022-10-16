import { z } from "zod";

const invoiceSchema = z
	.object({
		date: z
			.number({ required_error: "Date is required", invalid_type_error: "Must be a valid date." })
			.int("Must be a valid date.")
			.transform((val) => new Date(val)),
		dueDate: z
			.number({
				required_error: "Due Date is required",
				invalid_type_error: "Must be a valid date.",
			})
			.int()
			.min(1, "Must be a valid date.")
			.transform((val) => new Date(val)),
		invoiceNumber: z.string().min(3, "Invoice Number must be 3 or more characters."),
		projectCode: z.string().min(3, "Project Code must be 3 or more characters.").optional(),
		meta: z.any().optional(),
		items: z
			.array(
				z.object({
					description: z.string().min(3, "Item Description must be 3 or more characters."),
					price: z.number().positive(),
				})
			)
			.min(1, "Must include atleast 1 invoice item"),
		clientId: z.string(),
		value: z
			.number()
			.optional()
			.transform((value) => value || 0),
	})
	.refine(({ date, dueDate }) => dueDate >= date, {
		message: "Due Date must be later than Date",
		path: ["dueDate"],
	});

export default invoiceSchema;
