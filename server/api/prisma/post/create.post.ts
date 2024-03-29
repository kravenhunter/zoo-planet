import { defineEventHandler, readBody } from "#imports";
import { PrismaClient } from "@prisma/client";

const prismaCLient = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  try {
    const postCreate = await prismaCLient.post.create({
      data: {
        title: body.title,
        imageBgLink: body.imageBgLink,
        imagePreviewLink: body.imagePreviewLink,
        description: body.description,
        category: body.category,
        extraeDscription: body.extraeDscription,
      },
    });

    return postCreate;
  } catch (error) {
    console.log(error);
    return error;
  }
});
