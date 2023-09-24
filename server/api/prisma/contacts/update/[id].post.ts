import { defineEventHandler, readBody } from "#imports";
import { PrismaClient } from "@prisma/client";

const prismaCLient = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  try {
    const result = await prismaCLient.contactUs.update({
      where: { id: event?.context?.params?.id },
      data: {
        title: body.title,
        imageBgLink: body.imageBgLink,
        imagePreviewLink: body.imagePreviewLink,
        description: body.description,
        extraeDscription: body.extraeDscription,
        phone: body.phone,
        email: body.email,
        socialLink_1: body.socialLink_1,
        socialLink_2: body.socialLink_2,
        socialLink_3: body.socialLink_3,
        socialLink_4: body.socialLink_4,
        socialLink_5: body.socialLink_5,
        copyright: body.copyright,
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
