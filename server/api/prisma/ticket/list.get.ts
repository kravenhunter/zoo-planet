import { defineEventHandler } from "#imports";
import { PrismaClient } from "@prisma/client";

const prismaCLient = new PrismaClient();

export default defineEventHandler(async () => {
  try {
    const result = await prismaCLient.ticketPrice.findMany();
    if (!result) {
      // throw new Error("");
      throw createError({
        statusCode: 405,
        statusMessage: "No records in database ",
      });
    }

    return result;
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: (error as Error).message,
    });
  }
});
