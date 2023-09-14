import { defineEventHandler } from "#imports";
import { PrismaClient } from "@prisma/client";

const prismaCLient = new PrismaClient();

export default defineEventHandler(async () => {
  const posts = await prismaCLient.post.findMany();
  return posts;
});
