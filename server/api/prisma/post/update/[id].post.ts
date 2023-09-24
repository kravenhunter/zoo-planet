import { defineEventHandler, readBody } from "#imports";
import { PrismaClient } from "@prisma/client";

const prismaCLient = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  console.log(body);

  try {
    const result = await prismaCLient.post.update({
      where: { id: event?.context?.params?.id },
      data: {
        title: body.title,
        imageBgLink: body.imageBgLink,
        imagePreviewLink: body.imagePreviewLink,
        description: body.description,
        category: body.category,
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
