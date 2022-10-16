import { z } from "zod";

const clientSchema = z.object({
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

export default clientSchema;
