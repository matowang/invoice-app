import prisma from "lib/prisma";

import clientSchema from "src/schema/clientSchema";

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
				return await getClients(req, res);
			case "POST":
				return await createClient(req, res);
		}

		return res.status(400).send({ message: `Unexpected request method: ${req.method}` });
	} catch (e: any) {
		console.error("[media] Error responding:", e);
		return res.status(500).json({ message: e?.message || e });
	}
}

const clientsQuerySchema = z.object({
	limit: z.preprocess((val) => parseInt(String(val)), z.number()).optional(),
	offset: z.preprocess((val) => parseInt(String(val)), z.number()).optional(),
	sortBy: z.string().optional(),
	sortOrder: z.string().optional(),
});

const getClients = async (req: NextApiRequest, res: NextApiResponse) => {
	const parsedQuery = clientsQuerySchema.safeParse(req.query);
	if (!parsedQuery.success)
		return res.status(404).json({ error: "Invalid Query", details: parsedQuery.error });

	const { limit, offset, sortBy, sortOrder } = parsedQuery.data;

	const [count, clients] = await prisma.$transaction([
		prisma.client.count(),
		prisma.client.findMany({
			take: limit,
			skip: offset,
			orderBy: sortBy ? [{ [sortBy]: sortOrder }] : undefined,
			select: {
				companyDetails: true,
				createdAt: true,
				email: true,
				id: true,
				name: true,
				invoices: {
					select: {
						value: true,
					},
				},
				_count: {
					select: {
						invoices: true,
					},
				},
			},
		}),
	]);

	const data = {
		clients: clients.map(({ companyDetails, createdAt, email, id, name, invoices, _count }) => ({
			companyDetails,
			createdAt,
			email,
			id,
			name,
			totalBilled: invoices.reduce((a, invoice) => a + invoice.value, 0),
			invoicesCount: _count.invoices,
		})),
		total: count,
	};

	return res.json(data);
};

const createClient = async (req: NextApiRequest, res: NextApiResponse) => {
	const parsedValues = clientSchema.safeParse(req.body);
	if (!parsedValues.success)
		return res.status(400).json({ error: "Invalid Values", details: parsedValues.error });

	const { companyDetails, email, name } = parsedValues.data;

	try {
		await prisma.client.create({
			data: {
				email,
				name,
				companyDetails: {
					create: companyDetails,
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
