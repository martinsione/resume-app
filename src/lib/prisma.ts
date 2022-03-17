// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
//
// Learn more:
// https://pris.ly/d/help/next-js-best-practices

import { PrismaClient } from "@prisma/client";

declare global {
  // allow global `var` declarations
  // eslint-disable-next-line no-var, vars-on-top
  var prisma: PrismaClient | undefined;
}

export default prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") global.prisma = prisma;
