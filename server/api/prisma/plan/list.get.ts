import { defineEventHandler } from "#imports";
import { PrismaClient } from "@prisma/client";

const prismaCLient = new PrismaClient();

export default defineEventHandler(async () => {
  try {
    const posts = await prismaCLient.planPrice.findMany();
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
