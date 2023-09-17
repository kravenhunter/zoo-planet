import { defineEventHandler } from "#imports";
import { PrismaClient } from "@prisma/client";

const prismaCLient = new PrismaClient();

export default defineEventHandler(async () => {
  const contacts = await prismaCLient.contactUs.findMany();
  return contacts;
});
