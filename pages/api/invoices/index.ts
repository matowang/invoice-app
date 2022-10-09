import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "lib/prisma";

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
				return res.json(
					await prisma.invoice.findMany({
						//where: { id },
					})
				);
			case "POST":
				return res.json(
					await prisma.invoice.create({
						data: req.body, //as Prisma.MediaCreateInput,
					})
				);
			case "PUT":
				return res.json(
					await prisma.invoice.update({
						where: {
							//id,
						},
						data: req.body, //as Prisma.MediaUpdateInput,
					})
				);
			// case "DELETE":
			// 	return res.json(
			// 		await prisma.invoice.delete({
			// 			where: { id },
			// 		})
			// 	);
		}

		return res.status(400).send({ message: `Unexpected request method: ${req.method}` });
	} catch (e: any) {
		console.error("[media] Error responding:", e);
		return res.status(500).json({ message: e?.message || e });
	}
}
