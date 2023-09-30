import { createError, defineEventHandler } from "#imports";
import { PrismaClient } from "@prisma/client";

const prismaCLient = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const result = await prismaCLient.contactUs.findFirst({
      where: {
        id: event?.context?.params?.id,
      },
    });

    if (!result) {
      // throw new Error("");
      throw createError({
        statusCode: 405,
        statusMessage: "Wrong Id ",
      });
    }

    return result;
  } catch (error) {
    return error;
  }

  /*  const url = 'https://google.com/404' // or: baseURL+'/company?bookingAppApiKey='+config.apiSecret

  try {
    return await $fetch(url)
  } catch (err) {
    throw createError({
      statusCode: 444,
      message: 'Oh no!',
      data: {
        statusCode: (err as FetchError).response?.status,
        responseBody: (err as FetchError).data,
      },
    })
  } */
});
