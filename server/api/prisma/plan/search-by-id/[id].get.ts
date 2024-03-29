import { createError, defineEventHandler } from "#imports";
import { PrismaClient } from "@prisma/client";

const prismaCLient = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const post = await prismaCLient.planPrice.findFirst({
      where: {
        id: event?.context?.params?.id,
      },
    });

    if (!post) {
      // throw new Error("");
      throw createError({
        statusCode: 405,
        statusMessage: "Wrong Id ",
      });
    }

    return post;
  } catch (error) {
    console.log(error);
    return error;
  }
});
