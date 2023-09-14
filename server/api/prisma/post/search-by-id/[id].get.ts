import { createError, defineEventHandler } from "#imports";
import { PrismaClient } from "@prisma/client";

const prismaCLient = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const post = await prismaCLient.post.findFirst({
      where: {
        id: event?.context?.params?.id,
      },
    });
    console.log(post);
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
