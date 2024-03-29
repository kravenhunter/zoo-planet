import { defineEventHandler } from "#imports";
import { PrismaClient } from "@prisma/client";

const prismaCLient = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const posts = await prismaCLient.post.findMany({
      take: 5, // Max rows
      where: {
        title: {
          contains: event?.context?.params?.id,
          //  mode: "insensitive",
        },
      },
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
    console.log(error);
    return error;
  }
});
