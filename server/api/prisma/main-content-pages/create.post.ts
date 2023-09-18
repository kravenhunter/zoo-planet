import { defineEventHandler, readBody } from "#imports";
import { PrismaClient } from "@prisma/client";

const prismaCLient = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  try {
    const postCreate = await prismaCLient.contentPages.create({
      data: {
        title: body.title,
        imageBgLink: body.imageBgLink,
        subTitle: body.subTitle,
        shortDescription: body.shortDescription,
        description: body.description,
        extraeDscription: body.extraeDscription,
      },
    });
    return postCreate;
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
