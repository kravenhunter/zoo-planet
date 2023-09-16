import { defineEventHandler, readBody } from "#imports";
import { PrismaClient } from "@prisma/client";

const prismaCLient = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  console.log(body);

  try {
    const postCreate = await prismaCLient.ticketPrice.create({
      data: {
        adult: body.adult,
        childCategoryFirst: body.childCategoryFirst,
        childCategorySecond: body.childCategorySecond,
        concession: body.concession,
        seniors: body.seniors,
      },
    });
    return "Success";
  } catch (error) {
    console.log(error);
    return error;
  }
});
