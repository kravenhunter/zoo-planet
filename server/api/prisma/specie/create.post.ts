import { defineEventHandler, readBody } from "#imports";
import { PrismaClient } from "@prisma/client";

const prismaCLient = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  console.log(body);

  try {
    const postCreate = await prismaCLient.specie.create({
      data: {
        title: body.title,
        imageBgLink: body.imageBgLink,
        habitain: body.habitain,
        populationTrend: body.populationTrend,
        countLeft: body.countLeft,
        conservationStatus: body.conservationStatus,
        shordDescription: body.shordDescription,
        description: body.description,
        extraeDscription: body.extraeDscription,
      },
    });
    return "Success";
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
