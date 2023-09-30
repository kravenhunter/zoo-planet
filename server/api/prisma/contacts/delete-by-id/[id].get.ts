import { defineEventHandler } from "#imports";
import { PrismaClient } from "@prisma/client";

const prismaCLient = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const result = await prismaCLient.contactUs.delete({
      where: {
        id: event?.context?.params?.id,
      },
    });

    return "Success";
  } catch (error) {
    return error;
  }
});
