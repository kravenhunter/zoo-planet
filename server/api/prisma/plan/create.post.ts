import { defineEventHandler, readBody } from "#imports";
import { PrismaClient } from "@prisma/client";

const prismaCLient = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  console.log(body);

  try {
    const postCreate = await prismaCLient.planPrice.createMany({
      data: [body.first, body.second, body.third],
    });

    return postCreate;
  } catch (error) {
    console.log(error);
    return error;
  }
});
