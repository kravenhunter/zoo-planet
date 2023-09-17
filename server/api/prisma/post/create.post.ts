import { defineEventHandler, readBody } from "#imports";
import { PrismaClient } from "@prisma/client";

const prismaCLient = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  console.log(body);

  try {
    const postCreate = await prismaCLient.post.create({
      data: {
        title: body.title,
        imageBgLink: body.imageBgLink,
        description: body.description,
        category: body.category,
        extraeDscription: body.extraeDscription,
      },
    });
    console.log("Create Post", postCreate);

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
