import prisma from "lib/prisma";

import invoiceSchema from "src/schema/invoiceSchema";

import z from "zod";
import { Prisma } from "@prisma/client";

import type { NextApiRequest, NextApiResponse } from "next";

const TEMP_USER_ID = "781bf4a1-cbc9-4146-a478-0d7fd01a9b21";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	try {
		console.log(
			"[media] Incoming request:",
			JSON.stringify(
				{
					method: req.method,
					query: req.query,
					body: req.body,
				},
				null,
				2
			)
		);

		switch (req.method) {
			case "GET":
				return await getInvoices(req, res);
			case "POST":
				return await createInvoice(req, res);
		}

		return res.status(400).send({ message: `Unexpected request method: ${req.method}` });
	} catch (e: any) {
		console.error("[media] Error responding:", e);
		return res.status(500).json({ message: e?.message || e });
	}
}

const invoicesQuerySchema = z.object({
	limit: z.preprocess((val) => parseInt(String(val)), z.number()).optional(),
	offset: z.preprocess((val) => parseInt(String(val)), z.number()).optional(),
	sortBy: z.string().optional(),
	sortOrder: z.string().optional(),
	projectCode: z.string().optional(),
	clientId: z.string().optional(),
	startDueDate: z
		.preprocess((val) => parseInt(String(val)), z.number())
		.optional()
		.transform((val) => (val === undefined ? undefined : new Date(val))),
	endDueDate: z
		.preprocess((val) => parseInt(String(val)), z.number())
		.optional()
		.transform((val) => (val === undefined ? undefined : new Date(val))),
	startDate: z
		.preprocess((val) => parseInt(String(val)), z.number())
		.optional()
		.transform((val) => (val === undefined ? undefined : new Date(val))),
	endDate: z
		.preprocess((val) => parseInt(String(val)), z.number())
		.optional()
		.transform((val) => (val === undefined ? undefined : new Date(val))),
});

const getInvoices = async (req: NextApiRequest, res: NextApiResponse) => {
	const parsedQuery = invoicesQuerySchema.safeParse(req.query);
	if (!parsedQuery.success)
		return res.status(404).json({ error: "Invalid Query", details: parsedQuery.error });

	const {
		limit,
		offset,
		sortBy,
		sortOrder,
		projectCode,
		clientId,
		startDueDate,
		endDueDate,
		startDate,
		endDate,
	} = parsedQuery.data;

	console.log(parsedQuery.data);

	const [count, invoices] = await prisma.$transaction([
		prisma.invoice.count(),
		prisma.invoice.findMany({
			take: limit,
			skip: offset,
			orderBy: sortBy ? [{ [sortBy]: sortOrder }] : undefined,
			where: {
				projectCode,
				clientId,
				date: {
					gte: startDate,
					lte: endDate,
				},
				dueDate: {
					gte: startDueDate,
					lte: endDueDate,
				},
			},
			include: {
				//items: true,
				client: {
					include: {
						companyDetails: true,
					},
				},
			},
		}),
	]);

	return res.status(200).json({ invoices, total: count });
};

const createInvoice = async (req: NextApiRequest, res: NextApiResponse) => {
	const parsedValues = invoiceSchema.safeParse(req.body);
	if (!parsedValues.success)
		return res.status(400).json({ error: "Invalid Values", details: parsedValues.error });

	const { clientId, date, dueDate, invoiceNumber, items, value, meta, projectCode } =
		parsedValues.data;

	try {
		await prisma.invoice.create({
			data: {
				date,
				dueDate,
				invoiceNumber,
				value,
				meta,
				projectCode,
				items: {
					create: items,
				},
				client: {
					connect: {
						id: clientId,
					},
				},
				user: {
					connect: {
						id: TEMP_USER_ID,
					},
				},
			},
		});
		return res.status(200).end();
	} catch (e) {
		if (e instanceof Prisma.PrismaClientKnownRequestError)
			return res.status(500).json({ error: e.message, details: e.meta });
		throw new Error("Something went wrong");
	}
};
