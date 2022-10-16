import prisma from "lib/prisma";

import invoiceSchema from "src/schema/invoiceSchema";

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
				return await getInvoice(req, res);
			case "PUT":
				return await editInvoice(req, res);
			case "DELETE":
				return await deleteInvoice(req, res);
		}

		return res.status(400).send({ message: `Unexpected request method: ${req.method}` });
	} catch (e: any) {
		console.error("[media] Error responding:", e);
		return res.status(500).json({ message: e?.message || e });
	}
}

const editInvoice = async (req: NextApiRequest, res: NextApiResponse) => {
	if (typeof req.query.id !== "string") return res.status(400).json({ error: "Invalid Query" });

	const parsedValues = invoiceSchema.safeParse(req.body);
	if (!parsedValues.success)
		return res.status(400).json({ error: "Invalid Values", details: parsedValues.error });

	const { clientId, date, dueDate, invoiceNumber, items, value, meta, projectCode } =
		parsedValues.data;

	try {
		const invoice = await prisma.invoice.update({
			where: {
				id: req.query.id,
			},
			data: {
				date,
				dueDate,
				invoiceNumber,
				value,
				meta,
				projectCode,
				items: {
					deleteMany: {},
					createMany: { data: items },
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
		return res.status(200).json({ id: invoice.id });
	} catch (e) {
		console.error(e);
		if (e instanceof Prisma.PrismaClientKnownRequestError)
			return res.status(500).json({ error: e.message, details: e.meta });
		throw new Error("Something went wrong");
	}
};

const deleteInvoice = async (req: NextApiRequest, res: NextApiResponse) => {
	if (typeof req.query.id !== "string") return res.status(400).json({ error: "Invalid Query" });

	try {
		await prisma.invoice.delete({
			where: { id: req.query.id },
		});
		return res.status(200).end();
	} catch (e) {
		if (e instanceof Prisma.PrismaClientKnownRequestError)
			return res.status(500).json({ error: e.message, details: e.meta });
		throw new Error("Something went wrong");
	}
};

const getInvoice = async (req: NextApiRequest, res: NextApiResponse) => {
	if (typeof req.query.id !== "string") return res.status(400).json({ error: "Invalid Query" });

	try {
		const invoice = await prisma.invoice.findFirst({
			where: { id: req.query.id },
			include: {
				items: true,
				client: true,
			},
		});
		if (!invoice)
			return res.status(404).json({ error: `Invoice with id "${req.query.id}" does not exist` });
		return res.json({ success: true, invoice });
	} catch (e) {
		if (e instanceof Prisma.PrismaClientKnownRequestError)
			return res.status(500).json({ error: e.message, details: e.meta });
		throw new Error("Something went wrong");
	}
};
