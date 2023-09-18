import { defineEventHandler, readBody } from "#imports";
import { PrismaClient } from "@prisma/client";

const prismaCLient = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  try {
    const result = await prismaCLient.ticketPrice.update({
      where: { id: event?.context?.params?.id },
      data: {
        adult: body.adult,
        childCategoryFirst: body.childCategoryFirst,
        childCategorySecond: body.childCategorySecond,
        concession: body.concession,
        seniors: body.seniors,
      },
    });

    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
  /*  body.array.forEach(async prod => {
      await prismaCLient.orderItem.create({
        data:{
            orderId: postCreate.id,
            productId: Number(prod.id), 
        }
      })
  }); */
});
