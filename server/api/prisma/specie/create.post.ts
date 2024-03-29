import { defineEventHandler, readBody } from "#imports";
import { PrismaClient } from "@prisma/client";

const prismaCLient = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  try {
    const postCreate = await prismaCLient.specie.create({
      data: {
        title: body.title,
        imageBgLink: body.imageBgLink,
        imagePreviewLink: body.imagePreviewLink,
        habitain: body.habitain,
        populationTrend: body.populationTrend,
        countLeft: body.countLeft,
        conservationStatus: body.conservationStatus,
        shordDescription: body.shordDescription,
        description: body.description,
        extraeDscription: body.extraeDscription,
      },
    });
    return postCreate;
  } catch (error) {
    console.log(error);
    return error;
  }
});
