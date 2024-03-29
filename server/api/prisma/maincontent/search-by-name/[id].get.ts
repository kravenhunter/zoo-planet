import { defineEventHandler } from "#imports";
import { PrismaClient } from "@prisma/client";

const prismaCLient = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const result = await prismaCLient.contentPages.findFirst({
      where: {
        title: {
          contains: event?.context?.params?.id,
          //   mode: "insensitive",
        },
      },
    });

    if (!result) {
      // throw new Error("");
      throw createError({
        statusCode: 405,
        statusMessage: "No records in database ",
      });
    }

    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
});
