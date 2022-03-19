import type { NextApiRequest, NextApiResponse } from "next";

import { getSession } from "next-auth/react";

import prisma from "@lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const username = req.query.username.toString();
  const session = await getSession({ req });
  // @ts-ignore
  if (!session || !(session.user?.username === username)) {
    return res.status(403).send("Unauthorized");
  }
  switch (req.method) {
    case "PUT":
      try {
        const response = await prisma.user.update({ where: { username }, data: req.body });
        return res.status(200).json(response);
      } catch (e) {
        return res.status(500).json({ msg: "Error updating information", error: e });
      }
    default:
      res.setHeader("Allow", ["GET"]);
      return res.status(405).send(`Method ${req.method} Not Allowed`);
  }
}
