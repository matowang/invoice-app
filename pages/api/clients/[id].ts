import prisma from "lib/prisma";

import { Prisma } from "@prisma/client";

import type { NextApiRequest, NextApiResponse } from "next";
import clientSchema from "src/schema/clientSchema";

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
				return await getClient(req, res);
			case "PUT":
				return await editClient(req, res);
			case "DELETE":
				return await deleteClient(req, res);
		}

		return res.status(400).send({ message: `Unexpected request method: ${req.method}` });
	} catch (e: any) {
		console.error("[media] Error responding:", e);
		return res.status(500).json({ message: e?.message || e });
	}
}

const editClient = async (req: NextApiRequest, res: NextApiResponse) => {
	if (typeof req.query.id !== "string") return res.status(400).json({ error: "Invalid Query" });

	const parsedValues = clientSchema.safeParse(req.body);
	if (!parsedValues.success)
		return res.status(400).json({ error: "Invalid Values", details: parsedValues.error });

	const { companyDetails, email, name } = parsedValues.data;

	try {
		await prisma.client.update({
			where: {
				id: req.query.id,
			},
			data: {
				email,
				name,
				companyDetails: {
					update: companyDetails,
				},
				user: {
					connect: {
						id: TEMP_USER_ID,
					},
				},
			},
		});
		return res.status(204).end();
	} catch (e) {
		if (e instanceof Prisma.PrismaClientKnownRequestError)
			return res.status(500).json({ error: e.message, details: e.meta });
		throw new Error("Something went wrong");
	}
};

const deleteClient = async (req: NextApiRequest, res: NextApiResponse) => {
	if (typeof req.query.id !== "string") return res.status(400).json({ error: "Invalid Query" });

	try {
		await prisma.client.delete({
			where: { id: req.query.id },
		});
		return res.status(200).end();
	} catch (e) {
		if (e instanceof Prisma.PrismaClientKnownRequestError)
			return res.status(500).json({ error: e.message, details: e.meta });
		throw new Error("Something went wrong");
	}
};

const getClient = async (req: NextApiRequest, res: NextApiResponse) => {
	if (typeof req.query.id !== "string") return res.status(400).json({ error: "Invalid Query" });

	try {
		const client = await prisma.client.findFirst({
			where: { id: req.query.id },
			include: {
				companyDetails: true,
			},
		});
		if (!client)
			return res.status(404).json({ error: `Client with id "${req.query.id}" does not exist` });
		return res.status(200).json({ success: true, client });
	} catch (e) {
		if (e instanceof Prisma.PrismaClientKnownRequestError)
			return res.status(500).json({ error: e.message, details: e.meta });
		throw new Error("Something went wrong");
	}
};
