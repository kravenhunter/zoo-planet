import { defineEventHandler } from "#imports";
import { PrismaClient } from "@prisma/client";
import type { NuxtError } from "nuxt/app";

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
    const newError = error as NuxtError;
    throw createError({
      statusCode: newError.statusCode,
      statusMessage: newError.statusMessage,
    });
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
