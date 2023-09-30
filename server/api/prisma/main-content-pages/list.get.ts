import { defineEventHandler } from "#imports";
import { PrismaClient } from "@prisma/client";

const prismaCLient = new PrismaClient();

export default defineEventHandler(async () => {
  try {
    const result = await prismaCLient.contentPages.findMany({
      orderBy: { timeStamp: "desc" },
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
    return error;
  }

  // const orders = await prismaCLient.orders.findMany({
  //   where:{userId: event?.context.params.userId},
  //   orderBy: { timeStamp: "desc" },
  //   include:{
  //      orderItem: {
  //       include: {
  //         product: true
  //       }
  //      }
  //   }
  // });
});
