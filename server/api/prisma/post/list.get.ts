import { defineEventHandler } from "#imports";
import { PrismaClient } from "@prisma/client";

const prismaCLient = new PrismaClient();

export default defineEventHandler(async () => {
  try {
    const posts = await prismaCLient.post.findMany({
      orderBy: { timeStamp: "desc" },
    });
    if (!posts) {
      // throw new Error("");
      throw createError({
        statusCode: 405,
        statusMessage: "No records in database ",
      });
    }

    return posts;
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: (error as Error).message,
    });
  }
});
