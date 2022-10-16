import prisma from "lib/prisma";

import type { NextApiRequest, NextApiResponse } from "next";

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
		}

		return res.status(400).send({ message: `Unexpected request method: ${req.method}` });
	} catch (e: any) {
		console.error("[media] Error responding:", e);
		return res.status(500).json({ message: e?.message || e });
	}
}

const getClients = async (req: NextApiRequest, res: NextApiResponse) => {
	const data = await prisma.client.findMany({
		select: {
			id: true,
			companyDetails: {
				select: {
					name: true,
				},
			},
		},
	});

	const clientCompanyNames = data.map((item) => ({
		id: item.id,
		companyName: item.companyDetails.name,
	}));

	return res.status(200).json({ success: true, clients: clientCompanyNames });
};
